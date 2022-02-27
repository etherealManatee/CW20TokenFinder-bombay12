## CW20 Token Finder - Terra Testnet (bombay-12)

Develop a frontend website that will allow users to input a contract address and search for a CW20 token's information.
Information includes name, symbol and total supply.

After forking and git cloning the repository, `cd` into the tokenfinder folder and run `npm i`. Then, `npm run dev` and head to `http://localhost:3000` to access the website.
Some contracts you can try searching:
MARS - terra1qs7h830ud0a4hj72yr8f7jmlppyx7z524f7gw6
LOOP - terra1s8s39cnse493rzkmyr95esa44chc6vgztdm7gh
NOT (self deployed) - terra15akep48yc6ed7wwwxmwcvgtw3du99typ5656ae

API used - https://bombay-lcd.terra.dev/swagger/#/Query/ContractInfo

## General Approach

1. Plan and design the look using pen and paper and some minor colour testing with Figma
2. Search for a usable testnet API and test it
3. Build the base of the website and ensure it works as intended
4. Work on the looks and feel of the website

## Reflections

Tried out solid-js for the first time, so far seems like a pretty good frontend framework, and would like to experiment with it more.

# Solid-JS 
## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
