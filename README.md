# CardanoPress: Cardano + WordPress
A tool box of integrations for Cardano &amp; WordPress all packaged into a neat plugin.

This plugin allows you to integrate various Cardano blockchain web3 features including:
- NFT enabled Membership areas
- Gated content based on stake pool delegation, token amount, NFTs in a wallet
- Assign user access levels based on NFT properties, e.g rarity metadata
- Single sign-on with a web3 wallet such as Nami
- Accepting payments for minting and
- Interacting with the blockchain and Cardano Non-Fungible Tokens (NFTs).

Here is a step by step guide on how to install and get the plugin working on your WordPress website.

[![CardanoPress: Cardano + WordPress](https://i.ytimg.com/vi/g26MLYmvGnc/hq720.jpg)](https://www.youtube.com/watch?v=g26MLYmvGnc)


## Features

- Nami Wallet login. Sign up and login to a website using your Nami Wallet. Use a NFT or token to verify your access to the website.
- Assign policy IDs to the website to restrict access by those policy IDs.
- Stake pool delegation
- NFT Minting page for drops, not vending machine, just the frontend to handle a mint with antibot protection.
- Nami, Eternl, Typhon, Yoroi, GeroWallet, Flint, NuFi, CardWallet are currently supported
- Accepting payments with ADA
- Permissions and roles based on your stake delegation
- Permissions and roles base on NFT in your wallet giving user access to pay wall content
- Permissions and roles based on NFT metadata being able to assign an access level based on rarity

## Roadmap

- User profiles and Dashboards
- Sexy theme and template for dashboard

## Installation

Install & activate the plugin as you would any other WordPress plugin.

The Emurgo Serialization lib will only work with if the file type is enabled on your server. For Apache based servers, please add this MIME Type to your config or htaccess file:

`AddType application/wasm .wasm`

That will allow for the .wasm files to load on your server.

Without this the server will not be able to load the required libraries to load the various wallets to connect to the website.

## Feature Requests

Please submit an [issue](https://github.com/cardanopress/cardanopress/issues) on the GitHub repo to submit requests and ideas for the project.

## Support

Join us on Discord to learn more about the project and get support on integrations.
[https://discord.gg/CEX4aSfkXF](https://discord.gg/CEX4aSfkXF)

You can find more documentation on our main website: https://cardanopress.io

> Support the development of our plugin by delegating to our Stake pool Ticker: *ADAOZ* - [https://cardanode.com.au](https://cardanode.com.au).
