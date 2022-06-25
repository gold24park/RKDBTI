import { ResultConverter } from '@services/ResultConverter'
import { Props, SnsButton } from './SnsButton'

export const TwitterButton = ({shareTitle, result}: Props) => {
    const handleOnClick = () => {
        const baseUrl = `https://${location.host}`
        const resultUrl = `${baseUrl}/result?type=${ResultConverter.encode(result.unique_id)}`

        const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(resultUrl)}&text=${encodeURIComponent(shareTitle)}`
        window.open(shareUrl, "tweet", "width=486, height=386,scrollbars=yes")
    }

    return (
        <SnsButton onClick={handleOnClick}>
            트위터 공유하기
        </SnsButton>
    )
}