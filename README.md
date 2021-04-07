# TrueSite

### Dapp built as part of the [Spring 2021 Chainlink Virtual Hackathon](https://chainlink-2021.devpost.com/) to demonstrate a simple usage of [TrueSight](https://truesight.link/), a prototype for an oracle network built to provide moderation labels for user-generated content.

Users are able to upload images to an [API](https://github.com/H0M13/true-site-api). There the images are pinned to IPFS and the IPFS content hash is returned. The user is then prompted to make a transaction to store the image content hash on the dapp smart contract.

Upon submission of the transaction the smart contract requests moderation labels on the image from a Chainlink node and receives back another IPFS content hash representing the generated moderation labels. <b>Note: the IPFS content hash is transformed to a bytes32 type to respect the maximum size of return values from Chainlink nodes of 32 bytes</b>.

The client-side application converts moderation labels from bytes32 to IPFS content hash format and is then able to prompt all users whether any moderation labels were flagged for an image before they view it.

#### This repository began as a fork of [`scaffold-eth`](https://github.com/austintgriffith/scaffold-eth)!

# Quick Start

required: [Node](https://nodejs.org/dist/latest-v12.x/) and [Yarn](https://classic.yarnpkg.com/en/docs/install/)

```bash

yarn install

```

```bash

yarn start

```

## Backend API

By default the application will point to our pre-deployed API but this can be configured by setting the `REACT_APP_API_URL` environment variable.

## Smart contract

By default the application will point to a pre-deployed [contract on the Polygon Mumbai testnet](https://explorer-mumbai.maticvigil.com/address/0x1934cb5F7e57126756ba6eC17815e7866233f7bC/transactions).

If you wish to deploy your own contract run

```bash
yarn deploy
```

and be sure to fund it with testnet LINK so it can make moderation requests!