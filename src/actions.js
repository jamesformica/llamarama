export const PLAY = 'PLAY'
export const GAMEOVER = 'GAMEOVER'
export const READY = 'READY'

export const play = () => ({ type: PLAY })
export const gameover = score => ({ type: GAMEOVER, score })
export const ready = sprites => ({ type: READY, sprites })
