=== CardanoPress - Cardano Blockchain Integration for WordPress ===
Contributors: pbwebdev, gaft
Donate link: https://www.paypal.com/donate/?hosted_button_id=T8MR6AMVWWGK8
Tags: cardano, blockchain, web3, ada, token-gating
Requires at least: 5.9
Tested up to: 6.6.99
Stable tag: 1.22.0
Requires PHP: 7.4
License: GPLv3
License URI: https://www.gnu.org/licenses/licenses.html

Integrate the Cardano blockchain with your WordPress website. Merging Web2 and Web3.


== Description ==

CardanoPress does the heavy lifting and integration to the Cardano blockchain using the Blockfrost API, allowing you to interact with the blockchain via your favourite Web3 wallet.

We've done all the technical and hard work so you as a builder can integrate Cardano quickly and easily. Use our Bootstrap starter and child theme or use your favourite page builder such as Divi, WPBakery or Elementor with shortcodes.

We are supporting various wallets including:

* Nami
* Eternl
* Typhon
* GeroWallet
* Flint
* Yoroi (to a point)
* NuFi
* Cardwallet

The plugin is created by the team at [PB Web Development](https://pbwebdev.com).

= Example Use Cases =

There are many  use cases that we have covered for projects that may wish to use the plugin from small DApp developers, NFT projects, stake pool operators and Initial Stake Pool Offering (ISPO) projects.

* Members only content. Projects looking to provide access control to pay walled content based on delegation of a wallet, tokens or NFTs that are within a users wallet. E.g, if user has an NFT from a collection with policy ID x, then assign the user permissions to access private content.
* Stake pool operators that want to build a quick and simple way to delegate to their stake pools.
* Initial Stake Pool Offerings needing a delegation point and dashboard for rewards.
* NFT projects looking for a spam controlled minting page.
* Single sign on with using a wallet instead of using a username and password across WordPress websites


= Video: Installation and first steps =

https://www.youtube.com/watch?v=g26MLYmvGnc


= Video: Interview with Timmy from Cardano Ecosystem News =

https://youtu.be/YOm10Mu5XcM?t=1509

== Screenshots ==
1. CardanoPress configuration screen
2. NFT Configuration
3. Example wallet connector


== Follow Us ==

Follow us on [Twitter](https://twitter.com/cardanopress)
View all of our repos on [GitHub](https://github.com/CardanoPress/)
View all of our documentation and resources on our [website](https://cardanopress.io)


== Installation ==

This plugin requires your own standalone WordPress installation and access to the web server to add a line of code to your htaccess file.

1. Installing the plugin

Find the plugin in the list at the backend and click to install it. Or, upload the ZIP file through the admin backend. Or, upload the unzipped tag-groups folder to the /wp-content/plugins/ directory.

2. Activate the plugin

Navigate to Plugins from the WordPress admin area and activate the CardanoPress plugin.

The plugin will create the base pages for all that you need.

3. Sign up for a Blockfrost

CardanoPress is dependent on the Blockfrost API to communicate to the Cardano blockchain. You can get an API key for free at [Blockfrost API](https://blockfrost.io/).

Obtain your key and paste it into the configuration screen of CardanoPress.

4. Allow WASM file type to be executed from your server

You will also need to allow for the WASM MIME type to be loaded on your server. This is the file that will load the integration between the wallets and the website. Without this file access enabled, the 'connect to wallet' and other blockchain interactions will not work.

Open your .htaccess file from your server and add this line of code to the top of the file.

> AddType application/wasm .wasm

This will add the MIME type WASM and allow the loading of the Cardano Serialisation Library on your website.

This may vary from server to server as not all use htaccess files or allow modifications to it.

Once you've done this, you will be able to connect your WordPress website to the Cardano blockchain.

For more detailed documentation and tutorials on how to use the plugin, please visit the [CardanoPress documentation website](https://cardanopress.io).


== Get Support ==

We have community support available on our website under the [CardanoPress forums](https://cardanopress.io/community/). We also have an online chat support via our [Discord server](https://discord.gg/CEX4aSfkXF). We encourage you to use the forums first though as it will help others that read through the forums for support.


== Frequently Asked Questions ==

= Can I Run This on My WordPress.com Website? =

No you can not. You need full access to your web server to be able to allow for the WASM file type to load. Without this access you will not be able to run the plugin.

= Can I Get Paid Support? =

Yes you can, we offer subscription to support for our plugins and consultation to help get your project started and to a professional level.

= Where Can I See Other Projects That Are Using CardanoPress? =

If you visit our main website, [CardanoPress.io](https://cardanopress.io), there will be a section dedicated to all the websites and projects that have built using CardanoPress.

= Can I customise the look and feel of the plugin? =

Yes, we've built the plugin and sub plugins with hooks and template layouts that can over overridden in a child theme. We've followed the same methods as WooCommerce where you simply need to copy the template files into your child theme to start overriding the layouts.

We've also taking into account page builders and created short codes for all the template parts of the theme. This will allow builders such as Divi, Elementor, WPBakery to be used with CardanoPress.


== Privacy ==

This plugin does not collect or process any personal user data unless you expressively opt-in.


== Changelog ==

You can follow our [GitHub release](https://github.com/CardanoPress/cardanopress/releases) for full details on updates to the plugins.

= 1.22.0 =
- Fix data/message for certain wallets
- Use the prefixed PSR/Log dependency

= 1.21.0 =
- Data/message signing for wallet authentication
- Minor adjustments to framework and dependencies

= 1.20.0 =
- Add index.php files to all folders
- Protect log files from public access
- Escape missed attributes in shortcodes
- Sanitize provided shortcode template name

= 1.19.0 =
- Use WP core polyfilled function
- Revamp compatibility check notices
- Ensure correct scripts loading order

= 1.18.0 =
- Remove server support check for WASM
- Fix handling redundant dependencies
- Add check support for HTML5 script

= 1.17.0 =
- Expose current running version
- Use latest version of AlpineJS
- Fix increasing wallet array size
- Remove old packages from webpack
- Load WASM remotely in the CDN

= 1.16.0 =
- Add the order parameter for the account history
- Revamp the delegation access check conditions
  - Loop-through all history for the extensions hook
  - Add a field for the required delegation amount in ADA

= 1.15.0 =
- Identify wallets from VESPR; add indicator in button
- A template `connect-wallet` to show the specified type
- A hook to filter the list of wallets shown in the modal

= 1.14.0 =
- Solve code warnings; add default fallback values
- Show the re-check button for possible issue fix
- Strip down exposed `cardanoPress` object in JS
- Pass additional relevant protocol parameters

= 1.13.0 =
- New exposed method to do a multi-output transaction
- Split payments form/component now with a single send
- Disable the action buttons after successful operation

= 1.12.0 =
- Updated assets; bundle with Vite and now pure ESM
- Only show a console error message on actual issue
- Minor cleanup; remove old and unused bits of code

= 1.11.0 =
- Correctly render provided templates in block themes
- Handle non-existent pool metadata json file

= 1.10.0 =
- Grab the latest packages and dependencies
  - much slimmer assets and optimized loading
- Stop using shorthand syntax: `@`prefixed attributes
  - prevents HTML parsers from breaking JS actions

= 1.9.1 =
- Serve AlpineJS locally by default, instead from CDN
  - cardanopress_alpinejs_cdn filter to revert
- Bump plugin headers for WP version 6.5

= 1.9.0 =
- Made AlpineJS script as external requirement (CDN)
  - registered with handle `cardanopress-alpinejs`
- Adjusted dependency loading to skip on no wasm
- Print all possible issues in browser console
- A much lighter build; lazy-loaded modules

= 1.8.1 =
- Update selectable roles
  - exclude the `administrator` in every list
  - customizable via filter `cardanopress_selectable_roles`

= 1.8.0 =
- Add a new field for managed roles (selected roles will be removed every wallet connect)

= 1.7.0 =
- Adjusted payment component shortcode to support custom address
- Add shortcode for showing a wallet balance `cardanopress_wallet_balance`
- Minor code fixes to return types and values (explicitly defined and filtered)

= 1.6.0 =
- Fix PHP warning introduced in 2fceb32
- Handle CIP68 asset packed name
- Prevent infinite loop on misconfigured pages
- New filter for asset collection cardanopress_collection_asset

= 1.5.0 =
- add a template if shortcode cardanopress_template_if
- log helpful wallet action errors during AJAX requests customizable and translate-ready cardanopress_error_messages
- improve getting pool details on settings save with fallback on the first settings page load
- include the extended pool metadata in saved details
- helper method to check already delegated account
- always check the request origin; even if logged in

= 1.4.0 =
- Better handling of classic themes that do not support the wp_body_open hook
- Temporarily render blank the shipped templates on block themes
- Check the server for wasm mime type support
- Warn on the incompatible themes and server setup stated
  - Print readable notice on the admin dashboard
  - Dump issue message on console and logs
- Expose a JS method to force refresh the status of all supported wallets

= 1.3.0 =
- fixed compatibility issue with some plugins Psr\Log\LoggerInterface
- Added Lace Wallet support

= 1.2.1 =
- Hot fix for 1.2.0 deploy

= 1.2.0 =
- An updated framework with prefixed dependencies
- Persist notice review dismissal; also increased timeout
- Customizable sanitization messages and made translatable
- Added "the_content" function to the default page templates

= 1.1.0 =
Update for new testnet; preview and preprod
Hint as a translation-ready plugin
Add info notice for a review

= 1.0.0 =
First stable release (exact same version as 0.40.1)


== Upgrade Notice ==

Please ensure that you back up your website before upgrading or modifying any of the code.
