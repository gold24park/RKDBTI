import { MyCharacterResult } from "@services/models/MyCharacterResult";
import styled from "styled-components";

export type Props = {
    shareTitle: string
    result: MyCharacterResult
}

/**
 * 버튼 공통 스타일링
 */
export const DefaultButton = styled.button`
    display: inline-block;
    outline: solid 2px;
    border-color: black;
    font-family: 'ChosunBg', sans-serif;
    font-size: 20px;
    height: 60px;
    width: 100%;
    cursor: pointer;

    @media only screen and (max-width: 480px) {
        font-size: 18px;
    }
`

/**
 * SNS 버튼 공통 스타일링
 */
 export const SnsButton = styled(DefaultButton)`
 background-color: blue;
 border: none;
`

export const PrimaryButton = styled(DefaultButton)`
    background: #2A7ED3;
`

export const SecondaryButton = styled(DefaultButton)`
    background: #ECECF3;
`