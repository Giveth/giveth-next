This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


#### Prerequisites
- You need to use NodeJS v14 or higher.
- You need to use yarn.
- You need to have git.

### Install
1. Click **Star** on this repo near the top-right corner of this web page (if you want to).
2. Join us on  [Discord](https://discord.gg/Uq2TaXP9bC) if you haven't already.
3. Fork this repo by clicking **Fork** button in top-right corner of this web page. Continue to follow instruction steps from your own giveth-next repo.
4. Clone your own "giveth-next" repo. Copy the link from the "Clone or download" button near the top right of this repo's home page.
5. The rest of these steps must be done from your machine's command line

#### OSX and Linux

1. From the desired directory you wish to copy the "giveth-next" folder with source files to.
    ```
    git clone {paste your own repo link here}
    ```

2. Change directories to giveth-next:
    ```
    cd giveth-next
    ```
3. Make sure you have [NodeJS](https://nodejs.org/) (v14 or higher) and [yarn](https://yarnpkg.com/) installed.
4. Install dependencies from within giveth-next directory:
    ```
    yarn install
    ```
5. cp `.env.example` `.env.development.local`
6. We filled the public data in config file, you should fill the `.env.development.local` with needed data
   (for example create account in infura to put `NEXT_PUBLIC_ETHEREUM_NODE`)  
7. `npm run dev`
8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**PS**: if you run your [Backend](https://github.com/Giveth/impact-graph) locally and want to connect that you can change `NEXT_PUBLIC_APOLLO_SERVER` 
value in `.env.development.local` to `http://localhost:4000/graphql`
