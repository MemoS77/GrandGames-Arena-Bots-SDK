// Last changes: 2026-03-12
// Using const object instead of enum for better Node.js compatibility

export const PlayerState = {
  Passive: 0, // Not currently making a move
  Active: 1, // Currently making a move
  Winner: 2, // Won the game
  Looser: 3, // Lost the game
  Drawer: 4, // Game ended in a draw
  Unused: 5, // Not participating (e.g., left at the start)
} as const

export type PlayerState = (typeof PlayerState)[keyof typeof PlayerState]

export const TableState = {
  Empty: 0, // Has free slots
  Started: 1, // Game in progress
  Finished: 2, // Game finished
  Canceled: 3, // Game canceled
} as const

export type TableState = (typeof TableState)[keyof typeof TableState]

export type UserInfo = {
  uid: number
  login: string
}

export type PositionInfo<T = object> = {
  moveNumber: number
  position: T
  // Whether the time per move is fixed. If true, the bot can use all available time. If false, calculate appropriate thinking time.
  fixedMoveTime: boolean
  // Additional time in seconds (only used when fixedMoveTime = false)
  addTime?: number
  // Bot's position index
  botIndex: number | null
  // Whether the bot needs to make a move now
  needMove: boolean
  // Unique game identifier on GrandGames Arena
  game: number
  // Table identifier
  tableId: number

  state: TableState

  players: (null | {
    uid: number
    login: string
    rating?: number
    time: number
    state: PlayerState
  })[]
}

export type ConnectionOptions = {
  games: number[]
  serverUrl?: string | null
}

export interface IBotSDK {
  // Connect and specify supported games. Returns bot uid and login if token is valid.
  connect(token: string, options: ConnectionOptions): Promise<UserInfo>

  // Called when the connection is lost.
  onDisconnect(handler: (code: number) => void): void

  // Triggered on any table update, not just position changes (time updates, state changes, new players, etc.).
  // Use the needMove flag to determine if you need to make a move now.
  // Be careful when analyzing moves, as a new position may arrive before you respond to the previous one.
  onPosition<T>(handler: (data: PositionInfo<T>) => void): void

  /**
   * Called when another player (not you) sends a message in the table chat.
   */
  onMessage(
    handler: (tableId: number, text: string, login: string) => void,
  ): void

  /**
   * Make a move. Throws an error if a previous move on this table is still pending. Returns the new position after the move.
   * In many games, interim states may be sent via onPosition shortly after your move (e.g., point calculation animations, card movements).
   * In others, like chess, the final position is sent immediately without interim states.
   * Listen for new states after making a move and in onPosition handler. Note: onPosition is not triggered immediately after your own move.
   */
  move(tableId: number, move: string): Promise<PositionInfo>

  // Send a chat message. Avoid spam - sending too many messages in a short time will be rejected by the server.
  message(tableId: number, text: string): Promise<void>
}
