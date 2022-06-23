import { Layout } from "@components/Layout"
import { NextPage } from "next"
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ResultPage: NextPage = () => {
    const router = useRouter()

    const { typeNumber } = router.query

    const [result, setResult] = useState<any>()
    const [isLoading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetch(`api/result?typeNumber=${typeNumber}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
            .then((result) => {
                setLoading(false)
                setResult(result)
            })
            .catch((err) => {
                setLoading(false)
                setResult(null)
            })
    }, [])

    if (isLoading) {
        // TODO: 두구두구~ 애니메이션이 나왔으면!
        return (
            <Layout>
                <h1>결과를 불러오는 중...</h1>
            </Layout>
        )
    }

    if (result == null) {
        return (
            <Layout>
                <h1>앗 찾을 수 없는 결과입니다</h1>
            </Layout>
        )
    }
    
    return (
        <Layout>
            <h1>당신의 타입은 {typeNumber}</h1>
            <pre>
                {JSON.stringify(result)}
            </pre>
        </Layout>
    )
}

export default ResultPage