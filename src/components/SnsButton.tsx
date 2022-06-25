import { MyCharacterResult } from '@services/models/MyCharacterResult'
import styled from 'styled-components'

export type Props = {
    shareTitle: string
    result: MyCharacterResult
}

/**
 * SNS 버튼 공통 스타일링
 */
export const SnsButton = styled.button<{
    fontColor?: string
}>`
    background-color: blue;
    border: none;
    color: ${({ theme, fontColor }) => (
        !fontColor ? theme.colors.primary : theme.colors[fontColor]
    )};
`