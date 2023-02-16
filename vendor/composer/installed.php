<?php return array(
    'root' => array(
        'name' => 'cardanopress/cardanopress',
        'pretty_version' => 'dev-main',
        'version' => 'dev-main',
        'reference' => 'c17700e427da65efb19673e464a14040006d449a',
        'type' => 'wordpress-plugin',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        'cardanopress/cardanopress' => array(
            'pretty_version' => 'dev-main',
            'version' => 'dev-main',
            'reference' => 'c17700e427da65efb19673e464a14040006d449a',
            'type' => 'wordpress-plugin',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'cardanopress/framework' => array(
            'pretty_version' => 'dev-edge',
            'version' => 'dev-edge',
            'reference' => 'fe1883f2745a3fbde941353a0cbb21a6a45d23a3',
            'type' => 'library',
            'install_path' => __DIR__ . '/../cardanopress/framework',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
    ),
);
