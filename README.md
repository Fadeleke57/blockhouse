# Crypto Project Setup

Let's discover **BlockHouse Crypto**.

## Getting Started

Get started by **cloning the repository** to your local machine.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.
- Git installed on your system

## Clone the repository

Clone the BlockHouse repository to your local machine by running one of the following commands:

Using HTTPS:
```
git clone https://github.com/Fadeleke57/blockhouse.git
```

Or using SSH (if you have SSH keys configured):
```
git clone git@github.com:Fadeleke57/blockhouse.git
```

## Project Structure

After cloning, you'll find two main directories:
- `web-app`: The Next.js application
- `docs`: The documentation site built with Docusaurus

## Set Up the Next.js Application

Navigate to the web-app directory and install dependencies:

```
cd blockhouse/web-app
npm install
```

### Configure Environment Variables

Create a `.env` file in the `web-app` directory with the following content:
```
COINGECKO_API_KEY="<COINGECKO_API_KEY>"
COINGECKO_BASE_URL="https://api.coingecko.com/api/v3"
```

Make sure to replace `COINGECKO_API_KEY` with your actual CoinGecko API key obtained from https://www.coingecko.com/

The web-app contains a modern Next.js 15 project with the following key dependencies:
- Next.js 15.2.0
- React 19.0.0
- TailwindCSS 4
- React Query
- Various UI components from Radix UI

## Start the Next.js Development Server

Run the development server:

```
npm run dev
```

This will start your Next.js application, which you can view at http://localhost:3000/

The development server features hot reloading, so any changes you make to your code will be immediately reflected in the browser.

## Interface Features

BlockHouse Crypto features a modern, intuitive interface with:

### Dynamic Search Functionality
A powerful search bar at the top of the dashboard allows you to filter through the displayed cryptocurrencies in real time. As you type, the dashboard automatically updates to show only matching results.

### Interactive Crypto Cards
Each cryptocurrency is displayed as an interactive card showing current price, 24-hour price change, and volume information. Clicking on a crypto's name opens a detailed modal with:
- Interactive price chart showing historical performance
- Comprehensive synopsis of the cryptocurrency
- Key statistics and market data
- Recent news and updates

This detail view provides in-depth analysis without cluttering the main dashboard interface.

![Here](interface.png)

## Set Up the Documentation

If you want to run the documentation site locally:

```
cd blockhouse/docs
npm install
npx docusaurus start
```

This will start the Docusaurus site at http://localhost:3000/ (or another port if 3000 is already in use, like 3001).

## Available Scripts

In the web-app directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run start` - Runs the built app in production mode
- `npm run lint` - Runs ESLint to check code quality

Enjoy building with BlockHouse Crypto!