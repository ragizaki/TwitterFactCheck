# Insight - Twitter Fact-Checker
Fact-Check tweets instantly with Insight

## Introduction
Insight is a chrome extension that allows users to fact-check tweets in real-time. The extension has an easy-to-use interface. A fact-check button is rendered when a user interacts with a tweet, and clicking the button fact-checks the tweet content using the <strong>OpenAI GPT-3.5 API.</strong>

## Tech Stack
- React (Vite)
- Chrome Extension Tools
- GPT 3.5
- TypeScript
- Chakra UI

## Features
The tool categorizes the tweet into 1 of three categories
- True
- False
- Unverifiable
There are plans to add more nuanced categories, and to support tweets with images with the release of GPT-4.

## Demo
https://user-images.githubusercontent.com/43770239/229266635-d05483b0-2933-47ad-b722-d5b91a33654e.mp4

## Setup

### Clone repository
```sh
git clone git@github.com:yosevu/react-content-script.git
```

### Install dependencies
```sh
yarn
```

### Build extension
```
yarn build
```

### Load extension

1. Navigate to [chrome://extensions/](chrome://extensions/)
1. Turn on the "Developer mode" toggle switch in the top right of the window
1. Click the "Load unpacked" button in top left of the window
1. Go to the `react-content-script` directory and select the `dist` directory to load the extension
1. Navigate to https://blank.org/ to see the Content Script React app
1. Go to extensions and click "React TypeScript Chrome Extension" to see the Popup React app
