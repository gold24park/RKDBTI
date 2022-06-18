import styled from 'styled-components'

export const AnswerButton = styled.button<{
    fontColor?: string
}>`
    background-color: red;
    border: none;
    color: ${({ theme, fontColor }) => (
        !fontColor ? theme.colors.text500 : theme.colors[fontColor]
    )};
`