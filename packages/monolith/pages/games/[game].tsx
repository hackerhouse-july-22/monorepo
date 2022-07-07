import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Game: NextPage = () => {
  const {query} = useRouter()

  return (
    <div>
      <h1>Game {query.game}</h1>
    </div>
  )
}

export default Game
