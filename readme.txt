=== CardanoPress - Cardano Blockchain Integration for WordPress ===
Contributors: pbwebdev
Donate link: https://www.paypal.com/donate/?hosted_button_id=T8MR6AMVWWGK8
Tags: cardano, blockchain, web3, metamask, nami, eternl, ada
Requires at least: 4.9
Tested up to: 6.1.1
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv3
License URI: https://www.gnu.org/licenses/licenses.html

Integrate the Cardano blockchain with your WordPress website. Merging Web2 and Web3.

== Description ==

CardanoPress does the heavy lifting and integration to the Cardnao blockchain using the Blockfrost API, allowing you to interact with the blockchain via your favourite Web3 wallet.

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

=== Example Use Cases ===

There are many  use cases that we have covered for projects that may wish to use the plugin from small DApp developers, NFT projects, stake pool operators and Initial Stake Pool Offering (ISPO) projects.

* Members only content. Projects looking to provide access control to pay walled content based on delegation of a wallet, tokens or NFTs that are within a users wallet. E.g, if user has an NFT from a collection with policy ID x, then assign the user permissions to access private content.
* Stake pool operators that want to build a quick and simple way to delegate to their stake pools.
* Initial Stake Pool Offerings needing a delegation point and dashboard for rewards.
* NFT projects looking for a spam controlled minting page.
* Single sign on with using a wallet instead of using a username and password across WordPress websites


== Video: Installation and first steps ==

https://www.youtube.com/watch?v=g26MLYmvGnc


== Video: Interview with Timmy from Cardano Ecosystem News ==

https://youtu.be/YOm10Mu5XcM?t=1509


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

=== 0.40.1 ===
Fix payment amount

=== 0.40.0 ===
Correctly escape all variables
Update all dependencies

=== 0.39.0 ===
Sanitize $_POST variables
Escape template outputs

=== 0.38.0 ===
Recommend plugins to install:
User Role Editor
User Access Manager

=== 0.37.0 ===
Correct counted asset unit quantity
Bump version for the GuzzleHTTP

=== 0.36.1 ===
Handle edge cases where the user sets a Policy ID but misses to select an Additional Role to assign under the Asset Access settings box

=== 0.36.0 ===
Support for Cardwallet and NuFi
Fix the display of calculated payment total
Showing the wallet balance is now an opt-in action

=== 0.35.1 ===
Security update patch for guzzle 7.4.4
GHSA-f2wf-25xc-69c9

=== 0.35.0 ===
Helpful field descriptions in the Settings
Handy component-level shortcodes
cardanopress_component_cardanopress
cardanopress_component_pooldelegation
cardanopress_component_paymentform
cardanopress_component_splitform

=== 0.34.0 ===
Fully optional reCaptcha in the payments
Copy value to clipboard notification
Serve production built assets

=== 0.33.0 ===
Expose Blockfrost API endpoint for getting pool information
Clear off the favorited handle if no longer in the wallet

=== 0.32.0 ===
Dynamically list the pages under the menu dropdown with their custom titles
One more hook for the currently read asset cardanopress_associated_asset
Minor code fixes and optimizations

=== 0.31.0 ===
General code improvements

=== 0.30.0 ===
Customizable notification messages and translation ready; via filter hooks
-- cardanopress_ajax_messages
-- cardanopress_script_messages

=== 0.29.0 ===
Optimize asset checks; less Blockfrost request
Secure WP accounts creation from wallets; hashed passwords
Provide action hooks during login
-- cardanopress_wallet_status_checks
-- cardanopress_associated_assets
-- cardanopress_account_history

=== 0.28.0 ===
Nag a notice for missing Blockfrost API Token
Support ADA Handle https://adahandle.com/

=== 0.27.0 ===
Tie WP user to stake address
Load back the extra scripts normally
Skip nonce check for non-authenticated actions
Move shared logs to <WP_CONTENT_DIR>/cardanopress-logs

=== 0.26.0 ===
Update scripts loading order
Handle an array image metadata field
Add the settings link in the plugin action row

=== 0.25.0 ===
Better error handling; mainly due to incomplete plugin setup
Blockfrost API key: The connect action not working properly
Payment address: The payment page does not fully load
Default network to mainnet; API key field now required to set
Pretty print notices instead of random JS error strings

=== 0.24.0 ===
Bug fixes and improvements (also testing discord integration).



== Upgrade Notice ==

Please ensure that you backup your website before upgrading or modifying any of the code.
