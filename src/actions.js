export const PLAY = 'PLAY'
export const GAMEOVER = 'GAMEOVER'

export const play = () => ({ type: PLAY })
export const gameover = score => ({ type: GAMEOVER, score })
