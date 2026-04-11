# GrandGames Arena Bots SDK

## Extended Documentation

In english: [readme_en.md](readme_en.md)

На русском: [readme_ru.md](readme_ru.md)

## NPM Package

https://www.npmjs.com/package/gga-bots

## Examples usage this SDK

### Basic usage

```bash
npm i gga-bots
```

```typescript
import { BotSDK, GameId } from 'gga-bots'
const sdk = new BotSDK()
sdk.connect('YOUR_ARENA_TOKEN', [GameId.Chess])

sdk.onPosition<{ fen: string }>(async (p) => {
  if (p.needMove) {
    // ai - your AI implementation
    const move = await ai.getBestMove(p)
    await sdk.move(p.tableId!, move)
  }
})
```

### Adapter for chess UCI engines, gomoku Gomocup engines, and other games

[GrandGames Arena Universal Bots](https://github.com/MemoS77/GrandGames-Arena-Universal-Bots)

### Bot for rock, paper, scissors game

[GrandGames Arena RPS Bots](https://github.com/MemoS77/GrandGames-Arena-RPS-Bots)

### Bot for islands game:

[GrandGames Arena Islands Bot](https://github.com/MemoS77/GrandGames-Arena-Islands-Bot)
