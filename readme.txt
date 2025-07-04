=== CardanoPress - Cardano Blockchain Integration for WordPress ===
Contributors: pbwebdev, gaft
Donate link: https://www.paypal.com/donate/?hosted_button_id=T8MR6AMVWWGK8
Tags: cardano, blockchain, web3, ada, token-gating
Requires at least: 5.9
Tested up to: 6.8.99
Stable tag: 1.30.0
Requires PHP: 7.4
License: GPLv3
License URI: https://www.gnu.org/licenses/licenses.html

Integrate the Cardano blockchain with your WordPress website. Merging Web2 and Web3.


== Description ==

CardanoPress handles the heavy lifting and integration with the Cardano blockchain using the Blockfrost API, enabling you to interact with the blockchain via your preferred Web3 wallet.

We've done all the technical and hard work, so you, as a builder, can integrate Cardano quickly and easily. Use our Bootstrap starter and child theme, or use your favourite page builder, such as Divi, WPBakery, or Elementor, with shortcodes.

We are supporting various wallets, including:

* Eternl
* Yoroi
* Typhon
* GeroWallet
* NuFi
* Lace
* Begin

The plugin is created by the team at [Mesh With Us](https://meshwithus.com.au).

= Example Use Cases =

We have covered numerous use cases for projects that may wish to utilise the plugin, including small DApp developers, NFT projects, stake pool operators, and Initial Stake Pool Offering (ISPO) projects.

* Wallet login. Sign up and log in to a website using your Cardano Wallet. Message signing authentication
* Use an NFT or token to verify your access to the website by assigning policy IDs
* Stake pool delegation
* NFT Minting page for drops, not a vending machine; just the front end to handle minting with anti-bot protection.
* Lace, Eternl, Typhon, Yoroi, GeroWallet, NuFi, Begin and Vespr are currently supported
* Accepting payments with ADA
* Permissions and roles based on your stake delegation, e.g access content if the user has been delegated to your pool for a month
* Permissions and roles based on NFT in your wallet, giving the user access to paywall content for purchase and holding NFTs
* Permissions and roles based on NFT metadata, being able to assign an access level based on rarity, rarer NFTs have higher access


= Video: Installation and first steps =

https://www.youtube.com/watch?v=g26MLYmvGnc


= Video: Interview with Timmy from Cardano Ecosystem News =

https://youtu.be/YOm10Mu5XcM?t=1509

== Screenshots ==
1. CardanoPress configuration screen
2. NFT Configuration
3. Example wallet connector


== Follow Us ==

Follow us on [X](https://x.com/cardanopress)
Please view all of our repos on [GitHub](https://github.com/CardanoPress/)
Please view all of our documentation and resources on our [website](https://cardanopress.io)


== Installation ==

This plugin has been tested to work on shared and standalone hosting environments, including WordPress.com, Pressable, SiteGround, WPEngine, AWS and many more.

1. Installing the plugin

Find the plugin in the list at the backend and click to install it. Or, upload the ZIP file through the admin backend. Or, upload the unzipped tag-groups folder to the /wp-content/plugins/ directory.

2. Activate the plugin

Navigate to Plugins from the WordPress admin area and activate the CardanoPress plugin.

The plugin will create the base pages for all that you need.

3. Sign up for a Blockfrost

CardanoPress is dependent on the Blockfrost API to communicate with the Cardano blockchain. You can get an API key for free at [Blockfrost API](https://blockfrost.io/).

Obtain your key and paste it into the CardanoPress configuration screen.

Once you've completed this step, you will be able to connect your WordPress website to the Cardano blockchain.

For more detailed documentation and tutorials on how to use the plugin, please visit the [CardanoPress documentation website](https://cardanopress.io).


== Get Support ==

We offer community support on our website, accessible under the [CardanoPress forums](https://cardanopress.io/community/). We encourage you to use the forums first, though, as it will help others who read through the forums for support.

You can find more documentation and support on our main website: https://cardanopress.io.

Agency design, development and support via our company, https://MeshWithUs.com.au

Support the development of our plugin by delegating to our Stake pool: Ticker *ADAOZ* - [https://cardanode.com.au](https://cardanode.com.au).



== Frequently Asked Questions ==

= Can I Get Paid Support? =

Yes you can, we offer subscription to support for our plugins and consultation to help get your project started and to a professional level.

= Where Can I See Other Projects That Are Using CardanoPress? =

If you visit our main website, [CardanoPress.io](https://cardanopress.io), there will be a section dedicated to all the websites and projects that have built using CardanoPress.

= Can I customise the look and feel of the plugin? =

Yes, we've built the plugin and sub plugins with hooks and template layouts that can over overridden in a child theme. We've followed the same methods as WooCommerce where you simply need to copy the template files into your child theme to start overriding the layouts.

We've also taking into account page builders and created short codes for all the template parts of the theme. This will allow builders such as Divi, Elementor, WPBakery to be used with CardanoPress.


== Privacy ==

This plugin does not collect or process any personal user data.


== Changelog ==

You can follow our [GitHub release](https://github.com/CardanoPress/cardanopress/releases) for full details on updates to the plugins.

= 1.30.0 =
- Remove filters in shortcodes
- Officially support the VESPR wallet
- Follow the order of wallets from PHP filter

= 1.29.1 =
- Correct loading order of scripts

= 1.29.0 =
- Always load AlpineJS last
- Vite builds handled in framework
- Minor code updates; stricter and clearer
- Update assets for extensions building transaction

= 1.28.0 =
- Directly log compatibility issues
- Require $_POST data signature key
- Always verify wallet on connects
- Updated framework and code types
- Handle possible incorrect values

= 1.27.0 =
- Own strings for the plugin requirements notice
- Remove old wallets; deprecated and unsupported
- Skip unnecessary check for active block themes
- Reset server and review notice on every update
- Only require dashboard and collection pages
- Only set the compatibility status once

= 1.26.0 =
- Templates with controlled components
- Bump PHP version on future updates
- Minor code and exports cleanup
- Updated framework and tests

= 1.25.0 =
- Used CIP30 Typhon namespace
- Exposed Buffer for extensions
- Cleanup assets and fully-typed

= 1.24.0 =
- Use latest CSL; version 14
- Break all long texts in templates
- Show notification while verifying wallet

= 1.23.1 =
- Updated dependencies fixing translations loaded too early

= 1.23.0 =
- Handle wallets with more data during message signing
- Rebuild assets to fully bypass the local server for WASM

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
