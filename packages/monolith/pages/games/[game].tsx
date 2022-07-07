import PageContainer from '@/components/PageContainer'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Game: NextPage = () => {
  const {query} = useRouter()

  return (
    <PageContainer>
    </PageContainer>
  )
}

export default Game
