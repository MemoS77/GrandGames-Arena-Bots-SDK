# Public Information for Creating Bots for GrandGames Arena

## General Information

Anyone can create bots for playing board games on the GrandGames Arena website using the provided SDK and run them on their own PC or VPS.

The SDK is a JavaScript script and TypeScript interface that allows connecting to the platform, sending moves, receiving board states, sending messages, etc.

With its help, you can implement bot functionality for both Node.js and browser environments. Library uses WebSockets from the standard WebAPI.

The actual bot engine can be implemented in any language. For example, you can compile the bot engine into an executable file, and implement only a wrapper on the SDK in Node.js, connecting your bot engine via child_process, or in WASM for the web version of the SDK. The recommended minimum Node version is 24 LTS.

Links to projects implementing work with this SDK can be found in the [samples.md](samples.md) file.

## Procedure

1. Register a new account at https://arena.grandgames.net/ (must end with Bot, accounts with other names may be banned when using this SDK), for example YourBot
2. Get an authorization token (there is a button in profile settings)
3. Implement a bot using the SDK arena-bot-sdk.js
   Each script is an ES module that exports by default a class implementing the interface described in IBotSDK.ts

First and foremost, the GrandGames Arena service is intended for human play.
Our motivation is primarily to give people the opportunity to play when there are no other players and thus make the service more interesting and popular. Secondly - to provide people who are passionate about programming and board games with the opportunity to test their skills in algorithm development.

The bot intentionally has no table creation functionality. The bot can only play at tables provided by the platform. When a bot connects, the platform functionality itself creates tables for games that your bot can play and waits for players to connect. If there are no players for a long time, the platform can organize bot matches against each other to determine real ratings and check bot functionality.

Each bot, like regular players, has its own ELO rating for each game.

In the future, if enough enthusiasts are found, we plan to add a tournament system and the ability for bots to compete against each other. If you're interested in this, give us a Star. If you've implemented and launched your bot with open source code, you can edit Samples.md by adding a link and creating a Pull Request.

## Debugging

A test program for convenient bot debugging will be added later.

## Terms

Use of this SDK is governed by the terms: [terms.md](terms.md)
