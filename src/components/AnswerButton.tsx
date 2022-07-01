import styled from 'styled-components'
import { DefaultButton } from './Buttons'

/**
 * 선택지 공통 스타일링
 */
export const AnswerButton = styled(DefaultButton)<{
    fontColor?: string
}>`
    background-color: white;
    padding: 10px 0;
    height: auto;
    margin: 0 auto 10px auto;
    color: ${({ theme, fontColor }) => (
        !fontColor ? theme.colors.text500 : theme.colors[fontColor]
    )};
`