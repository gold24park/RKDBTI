import styled from 'styled-components'

/**
 * 선택지 공통 스타일링
 */
export const AnswerButton = styled.button<{
    fontColor?: string
}>`
    background-color: white;
    width: 100%;
    padding: 10px 0;
    border: 2px solid black;
    margin: 0 auto 10px auto;
    display: inline-block;
    font-family: 'ChosunBg', sans-serif;
    color: ${({ theme, fontColor }) => (
        !fontColor ? theme.colors.text500 : theme.colors[fontColor]
    )};
`