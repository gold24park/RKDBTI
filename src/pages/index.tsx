import { AnswerButton } from '@components/AnswerButton'
import { Layout } from '@components/Layout'
import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'


const Home: NextPage = () => {

  const router = useRouter()

  const handleClick = () => {
    router.push("/test")
  }

  return (
    <Layout>
      <h1>자 이제시작이야</h1>
      <br/>
      <AnswerButton onClick={handleClick}>
        내꿈을 위한여행
      </AnswerButton>
    </Layout>
  )
}

export default Home
