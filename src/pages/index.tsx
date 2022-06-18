import { AnswerButton } from '@components/AnswerButton'
import { Layout } from '@components/Layout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>자 이제시작이야</h1>
      <AnswerButton>
        내꿈을 위한여행
      </AnswerButton>
    </Layout>
  )
}

export default Home
