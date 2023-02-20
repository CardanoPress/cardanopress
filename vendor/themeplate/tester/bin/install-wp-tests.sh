#!/usr/bin/env bash

if [ $# -lt 3 ]; then
	echo "usage: $(basename $0) <db-name> <db-user> <db-pass> [db-host] [wp-version] [database-create]"
	exit 1
fi

DB_NAME=$1
DB_USER=$2
DB_PASS=$3
DB_HOST=${4-localhost}
WP_VERSION=${5-latest}
DB_CREATE=${6-true}

TMPDIR=${TMPDIR-/tmp}
TMPDIR=$(echo $TMPDIR | sed -e "s/\/$//")
WP_LOCAL_DIR=$(echo .cache | sed -e "s/\/$//")
WP_TESTS_DIR=${WP_TESTS_DIR-$WP_LOCAL_DIR/wordpress-tests-lib}
WP_CORE_DIR=${WP_CORE_DIR-$WP_LOCAL_DIR/wordpress}

mkdir -p $WP_LOCAL_DIR

download() {
    if [ `which curl` ]; then
        curl -Ls "$1" > "$2";
    elif [ `which wget` ]; then
        wget -nv -O "$2" "$1"
    fi
}

if [[ $WP_VERSION =~ ^[0-9]+\.[0-9]+\-(beta|RC)[0-9]+$ ]]; then
	WP_BRANCH=${WP_VERSION%\-*}
	WP_TESTS_TAG="heads/$WP_BRANCH"
elif [[ $WP_VERSION =~ ^[0-9]+\.[0-9]+$ ]]; then
	WP_TESTS_TAG="heads/$WP_VERSION"
elif [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0-9]+ ]]; then
	if [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0] ]]; then
		# version x.x.0 means the first release of the major version, so strip off the .0 and download version x.x
		WP_TESTS_TAG="tags/${WP_VERSION%??}"
	else
		WP_TESTS_TAG="tags/$WP_VERSION"
	fi
else
	# http serves a single offer, whereas https serves multiple. we only want one
	download http://api.wordpress.org/core/version-check/1.7/ $TMPDIR/wp-latest.json
	grep '[0-9]+\.[0-9]+(\.[0-9]+)?' $TMPDIR/wp-latest.json
	LATEST_VERSION=$(grep -o '"version":"[^"]*' $TMPDIR/wp-latest.json | sed 's/"version":"//')
	if [[ -z "$LATEST_VERSION" ]]; then
		echo "Latest WordPress version could not be found"
		exit 1
	fi
	WP_TESTS_TAG="heads/$LATEST_VERSION"
fi
set -ex

install_wp() {
	if [ -d $WP_CORE_DIR ]; then
		return;
	fi

	mkdir -p $WP_CORE_DIR

	local FORCE_DOWNLOAD='false'
	local ARCHIVE_NAME=''
	local DOWNLOAD_URL=''

	if [ $WP_VERSION == 'latest' ]; then
		FORCE_DOWNLOAD='true'
		ARCHIVE_NAME='wordpress-latest'
		DOWNLOAD_URL="https://wordpress.org/latest.tar.gz"
	elif [[ $WP_VERSION =~ [0-9]+\.[0-9]+ ]]; then
		# https serves multiple offers, whereas http serves single.
		download https://api.wordpress.org/core/version-check/1.7/ $TMPDIR/wp-latest.json
		if [[ $WP_VERSION =~ [0-9]+\.[0-9]+\.[0] ]]; then
			# version x.x.0 means the first release of the major version, so strip off the .0 and download version x.x
			LATEST_VERSION=${WP_VERSION%??}
		else
			# otherwise, scan the releases and get the most up to date minor version of the major release
			local VERSION_ESCAPED=`echo $WP_VERSION | sed 's/\./\\\\./g'`
			LATEST_VERSION=$(grep -o '"version":"'$VERSION_ESCAPED'[^"]*' $TMPDIR/wp-latest.json | sed 's/"version":"//' | head -1)
		fi
		if [[ -z "$LATEST_VERSION" ]]; then
			ARCHIVE_NAME="wordpress-$WP_VERSION"
		else
			ARCHIVE_NAME="wordpress-$LATEST_VERSION"
		fi
		DOWNLOAD_URL="https://wordpress.org/${ARCHIVE_NAME}.tar.gz"
	else
		ARCHIVE_NAME="wordpress-$WP_VERSION"
		DOWNLOAD_URL="https://wordpress.org/${ARCHIVE_NAME}.tar.gz"
	fi

	if [[ 'true' == $FORCE_DOWNLOAD || ! -f ${TMPDIR}/${ARCHIVE_NAME}.tar.gz ]]; then
		download $DOWNLOAD_URL ${TMPDIR}/${ARCHIVE_NAME}.tar.gz
	fi

	tar --strip-components=1 -zxmf ${TMPDIR}/${ARCHIVE_NAME}.tar.gz -C $WP_CORE_DIR

	if [ ! -f $WP_CORE_DIR/wp-content/db.php ]; then
		download https://raw.github.com/markoheijnen/wp-mysqli/master/db.php $WP_CORE_DIR/wp-content/db.php
	fi
}

install_test_suite() {
	# portable in-place argument for both GNU sed and Mac OSX sed
	if [[ $(uname -s) == 'Darwin' ]]; then
		local ioption='-i.bak'
	else
		local ioption='-i'
	fi

	# set up testing suite if it doesn't yet exist
	if [ ! -d $WP_TESTS_DIR ]; then
		# set up testing suite
		mkdir -p $WP_TESTS_DIR/temp


		local ARCHIVE_NAME=$(echo $WP_TESTS_TAG | sed "s:/\+:-:")
		if [ ! -f $TMPDIR/wordpress-develop-${ARCHIVE_NAME}.tar.gz ]; then
			download https://github.com/WordPress/wordpress-develop/archive/refs/${WP_TESTS_TAG}.tar.gz  $TMPDIR/wordpress-develop-${ARCHIVE_NAME}.tar.gz
		fi

		tar --strip-components=1 -zxmf $TMPDIR/wordpress-develop-${ARCHIVE_NAME}.tar.gz -C $WP_TESTS_DIR/temp
		mv $WP_TESTS_DIR/temp/tests/phpunit/includes $WP_TESTS_DIR
		mv $WP_TESTS_DIR/temp/tests/phpunit/data $WP_TESTS_DIR
	fi

	if [ ! -f $WP_LOCAL_DIR/wp-tests-config.php ]; then
		mv $WP_TESTS_DIR/temp/wp-tests-config-sample.php "$WP_LOCAL_DIR"/wp-tests-config.php
		# remove all forward slashes in the end
		sed $ioption "s: ) . '/src/':, 2 ) . '/$WP_CORE_DIR/':" "$WP_LOCAL_DIR"/wp-tests-config.php
		sed $ioption "s/youremptytestdbnamehere/$DB_NAME/" "$WP_LOCAL_DIR"/wp-tests-config.php
		sed $ioption "s/yourusernamehere/$DB_USER/" "$WP_LOCAL_DIR"/wp-tests-config.php
		sed $ioption "s/yourpasswordhere/$DB_PASS/" "$WP_LOCAL_DIR"/wp-tests-config.php
		sed $ioption "s|localhost|${DB_HOST}|" "$WP_LOCAL_DIR"/wp-tests-config.php
	fi

	rm -rf $WP_TESTS_DIR/temp
}

recreate_db() {
	if [ ${DB_CREATE} = "force" ]; then
		mysqladmin drop $DB_NAME -f --user="$DB_USER" --password="$DB_PASS"$EXTRA
		create_db
		echo "Recreated the database ($DB_NAME)."
	else
		echo "Leaving the existing database ($DB_NAME) in place."
	fi
}

create_db() {
	mysqladmin create $DB_NAME --user="$DB_USER" --password="$DB_PASS"$EXTRA
}

install_db() {
	if [ ${DB_CREATE} = "false" ]; then
		return 0
	fi

	# parse DB_HOST for port or socket references
	local PARTS=(${DB_HOST//\:/ })
	local DB_HOSTNAME=${PARTS[0]};
	local DB_SOCK_OR_PORT=${PARTS[1]};
	local EXTRA=""

	if ! [ -z $DB_HOSTNAME ] ; then
		if [ $(echo $DB_SOCK_OR_PORT | grep -e '^[0-9]\{1,\}$') ]; then
			EXTRA=" --host=$DB_HOSTNAME --port=$DB_SOCK_OR_PORT --protocol=tcp"
		elif ! [ -z $DB_SOCK_OR_PORT ] ; then
			EXTRA=" --socket=$DB_SOCK_OR_PORT"
		elif ! [ -z $DB_HOSTNAME ] ; then
			EXTRA=" --host=$DB_HOSTNAME --protocol=tcp"
		fi
	fi

	# create database
	if [ $(mysql --user="$DB_USER" --password="$DB_PASS"$EXTRA --execute='show databases;' | grep ^$DB_NAME$) ]
	then
		recreate_db
	else
		create_db
	fi
}

install_wp
install_test_suite
install_db
