import styled from "styled-components";

export const DefaultButton = styled.button`
    display: inline-block;
    outline: solid 2px;
    border-color: black;
    font-family: 'ChosunBg', sans-serif;
    font-size: 20px;
    height: 60px;
    width: 100%;
`

export const PrimaryButton = styled(DefaultButton)`
    background: #2A7ED3;
`

export const SecondaryButton = styled(DefaultButton)`
    background: #ECECF3;
`