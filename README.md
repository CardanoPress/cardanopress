<!--

███╗   ███╗███████╗███████╗██╗  ██╗    ██╗    ██╗██╗████████╗██╗  ██╗    ██╗   ██╗███████╗
████╗ ████║██╔════╝██╔════╝██║  ██║    ██║    ██║██║╚══██╔══╝██║  ██║    ██║   ██║██╔════╝
██╔████╔██║█████╗  ███████╗███████║    ██║ █╗ ██║██║   ██║   ███████║    ██║   ██║███████╗
██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║    ██║███╗██║██║   ██║   ██╔══██║    ██║   ██║╚════██║
██║ ╚═╝ ██║███████╗███████║██║  ██║    ╚███╔███╔╝██║   ██║   ██║  ██║    ╚██████╔╝███████║
╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝     ╚══╝╚══╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝     ╚═════╝ ╚══════╝

Built by Mesh With Us
https://meshwithus.com.au

-->

# CardanoPress: Cardano + WordPress

[![WordPress Plugin Version](https://img.shields.io/wordpress/plugin/v/cardanopress?label=wordpress.org)](https://wordpress.org/plugins/cardanopress/)
[![WordPress Tested](https://img.shields.io/wordpress/plugin/tested/cardanopress)](https://wordpress.org/plugins/cardanopress/)
[![Required PHP](https://img.shields.io/wordpress/plugin/required-php/cardanopress)](https://wordpress.org/plugins/cardanopress/)
[![Active Installs](https://img.shields.io/wordpress/plugin/installs/cardanopress)](https://wordpress.org/plugins/cardanopress/)
[![Downloads](https://img.shields.io/wordpress/plugin/dt/cardanopress)](https://wordpress.org/plugins/cardanopress/)
[![Rating](https://img.shields.io/wordpress/plugin/stars/cardanopress)](https://wordpress.org/plugins/cardanopress/#reviews)
[![License: GPL v3](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**Integrate the Cardano blockchain with your WordPress website — bridging Web2 and Web3.** CardanoPress is a toolbox of Cardano integrations packaged into a single plugin, enabling web3 wallet login, NFT & token gating, ADA payments, and stake pool delegation on any WordPress site.

CardanoPress does the heavy lifting and integration with the Cardano blockchain using the [Blockfrost API](https://blockfrost.io/), so you, as a builder, can integrate Cardano quickly and easily. Use our Bootstrap starter and child theme, or your favourite page builder — Divi, WPBakery or Elementor — with the bundled shortcodes.

This plugin lets you integrate Cardano web3 features such as:

- NFT and FT gated content based on stake pool delegation, token amount, or NFTs held in a wallet
- NFT-enabled membership areas
- User access levels based on NFT properties, e.g. rarity metadata
- Single sign-on with a Cardano web3 wallet such as Lace or Eternl
- Accepting ADA payments and minting front-ends
- Interacting with the blockchain and Cardano fungible (FT) and non-fungible tokens (NFTs)

[![CardanoPress: Cardano + WordPress](https://i.ytimg.com/vi/g26MLYmvGnc/hq720.jpg)](https://www.youtube.com/watch?v=g26MLYmvGnc)

## Features

- **Wallet login** — sign up and log in with a Cardano wallet using message-signing authentication
- **Token gating** — restrict access by assigning policy IDs to verify an NFT or token in the visitor's wallet
- **Stake pool delegation** — show delegation prompts and gate content by delegation
- **NFT minting page** — a front end to handle drops with anti-bot protection (not a vending machine)
- **ADA payments** — accept payments in ADA, including multi-output and split payments
- **Roles by delegation** — grant access based on stake delegation, e.g. delegated to your pool for a month
- **Roles by NFT ownership** — gate paywalled content behind holding specific NFTs
- **Roles by NFT metadata** — assign access levels by rarity; rarer NFTs unlock higher access

## Supported wallets

All major CIP-30 Cardano web3 wallets are supported:

**Lace** · **Eternl** · **Yoroi** · **Typhon** · **GeroWallet** · **NuFi** · **Begin** · **VESPR**

## Roadmap

- DRep and governance-related features
- Smart contract integrations and APIs of third-party services such as ADA Anvil, NMKR and more

## Requirements

- WordPress 5.9 or higher
- PHP 7.4 or higher
- A free [Blockfrost API](https://blockfrost.io/) key

## Installation

CardanoPress has been tested on shared and standalone hosting environments, including WordPress.com, Pressable, SiteGround, WP Engine, AWS and many more.

### 1. Install the plugin

From your WordPress dashboard, go to **Plugins → Add New**, search for "CardanoPress", then click **Install Now**.

Alternatively, [download the ZIP from wordpress.org](https://wordpress.org/plugins/cardanopress/) and upload it via **Plugins → Add New → Upload Plugin**, or extract it and copy the `cardanopress` folder into your site's `/wp-content/plugins/` directory.

### 2. Activate the plugin

Go to **Plugins** in the WordPress admin area and click **Activate** on CardanoPress. On activation, the plugin automatically creates the base pages you need to get started.

### 3. Get a free Blockfrost API key

CardanoPress uses the [Blockfrost API](https://blockfrost.io/) to communicate with the Cardano blockchain. Sign up for a free account, create a project for your chosen network (Mainnet, Preprod or Preview), and copy the project's API key.

### 4. Configure CardanoPress

Open the CardanoPress settings screen, select your network, and paste in your Blockfrost API key. Once saved, your site is connected to Cardano and ready to use wallet login, token gating, payments and delegation.

For detailed documentation, tutorials and shortcode references, visit the [CardanoPress documentation website](https://cardanopress.io).

## Documentation & resources

- 📖 Documentation: [cardanopress.io](https://cardanopress.io)
- ▶️ Video — installation and first steps: [YouTube](https://www.youtube.com/watch?v=g26MLYmvGnc)
- 🐦 Follow us on [X](https://x.com/cardanopress)
- 🧩 More of our repos on [GitHub](https://github.com/CardanoPress/)

## Feature requests

Please submit an [issue](https://github.com/CardanoPress/cardanopress/issues) on the GitHub repo to share requests and ideas for the project.

## Development

CardanoPress uses Composer for dependencies and the ThemePlate tooling for builds, linting, static analysis and tests.

```bash
# Install dev dependencies
composer install

# Bundle the runtime dependencies (Guzzle, Monolog, etc.)
cd dependencies && composer install && cd ..

# Set up the WordPress test library (requires a MySQL/MariaDB database)
composer exec themeplate setup -- --db-name=wordpress_test --db-user=root --db-pass=root

# Run the test suite, linter and static analysis
composer test
composer lint
composer analyse
```

The front-end assets in `assets/` are built with Vite via pnpm (`pnpm install && pnpm run build`).

## Support

We offer community support on our website, accessible under the [CardanoPress forums](https://cardanopress.io/community/). We encourage you to use the forums first, though, as it will help others who read through the forums for support.

You can find more documentation and support on our main website: https://cardanopress.io.

Agency design, development and support via our company, https://MeshWithUs.com.au

Support the development of our plugin by delegating to our Stake pool: Ticker *ADAOZ* - [https://cardanode.com.au](https://cardanode.com.au).
