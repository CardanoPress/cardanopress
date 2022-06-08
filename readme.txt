=== CardanoPress - Cardano Blockchain Integration for WordPress ===
Contributors: pbwebdev
Donate link: https://www.paypal.com/donate/?hosted_button_id=ZNEH34AN2TLUS
Tags: cardano, blockchain, web3, metamask, nami, eternl, ada
Requires at least: 4.9
Tested up to: 6.0.0
Stable tag: 0.34.0
Requires PHP: 7.2
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
* GeoWallet
* Flint
* Yoroi (to a point)

=== Example Use Cases ===

There are many  use cases that we have covered for projects that may wish to use the plugin from small DApp developers, NFT projects, stake pool operators and Initial Stake Pool Offering projects.

* Projects looking to provide access control to walled content based on delegation of a wallet, or NFTs that are within a users wallet. E.g, if user has a NFT with policy ID x, then assign the user permissions to access private content.
* Stake pool operators that want to build a quick and simple way to delegate to their stake pools.
* Initial Stake Pool Offerings needing a delegation point and dashboard for rewards.
* NFT projects looking for a spam controlled minting page.


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

1. Find the plugin in the list at the backend and click to install it. Or, upload the ZIP file through the admin backend. Or, upload the unzipped tag-groups folder to the /wp-content/plugins/ directory.

2. Activate the plugin through the ‘Plugins’ menu in WordPress.

The plugin will create the base pages for all that you need.

For it to work, you will need to supply your [Blockfrost API](https://blockfrost.io/) key which can be obtained for free on their website for small projects.

You will also need to allow for the WASM MIME type to be loaded on your server. This is the file that will load the integration between the wallets and the website. Without this file access enabled, the 'connect to wallet' and other blockchain interactions will not work.

Open your htaccess file from your server and add this line of code to the top of the file.

> AddType application/wasm .wasm

This will add the MIME type WASM and allow the loading of the Cardano Serialisation Library on your website.

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

You can follow our GitHub commits for full details on updates to the plugins.

### 0.34.0 ###

First official release with full support of 6 popular Cardano wallets and extensive testing with various projects using CardanoPress to build their websites.


== Upgrade Notice ==

Please ensure that you backup your website before upgrading or modifying any of the code.
