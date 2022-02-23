# CardanoPress
A tool box of integrations for Cardano &amp; WordPress all packaged into a neat plugin.

This plugin allows you to integrate various Cardano blockchain web3 features from single sign-on with a web3 wallet such as NamiWallet or Yoroi, accepting payments for minting and interacting with the blockchain and Cardano Non-Fungible Tokens (NFTs).

Checkout our video about the first integration with the Ronin Universe project.

[![NamiWallet + WordPress](http://img.youtube.com/vi/eh4-Hy85xOQ/0.jpg)](http://www.youtube.com/watch?v=eh4-Hy85xOQ)


## Features

- Nami Wallet login. Sign up and login to a website using your Nami Wallet. Use a NFT or token to verify your access to the website.
- Assign policy IDs to the website to restrict access by those policy IDs.
- Stake pool delegation
- CNFT Minting page for drops, not vending machine, just the frontend to handle a mint with antibot protection.
- Flint Wallet, Typhon, Nami, Yoroi dApp Connector and CCVault are now all supported.
- Accepting payments
- Permissions and roles based on your stake delegation
- Permissions and roles base on NFT in your wallet giving user access to pay wall content

## Roadmap

- User profiles and Dashboards
- Sexy theme and template for dashboard

## Installation

Install the plugin as you would any other WordPress plugin.

The Emurgo Serialization lib will only work with if the file type is enabled on your server. For Apache based servers, please add this MIME Type to your config or htaccess file:

AddType application/wasm .wasm

That will allow for the .wasm files to load on your server.

Without this the server will not be able to load the required libraries to load the various wallets to connect to the website.

## Feature Requests

Please submit an [issue](https://github.com/pbwebdev/cardanopress/issues) on the GitHub repo to submit requests and ideas for the project.

## Support

Join us on Discord to learn more about the project and get support on integrations.
[https://discord.gg/CEX4aSfkXF](https://discord.gg/CEX4aSfkXF)

> Support the development of our plugin by delegating to our Stake pool Ticker: *ADAOZ* - [https://cardanode.com.au](https://cardanode.com.au).
