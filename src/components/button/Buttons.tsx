import { MyCharacterResult } from "@services/models/MyCharacterResult";
import { media } from "@styles/size";
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
    border: 3px solid black;
    font-family: 'ChosunBg', sans-serif;
    font-size: 18px;
    height: 60px;
    width: 100%;
    cursor: pointer;

    ${media.phone} {
        font-size: 15px;
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
    background: #444;
    color: white;
    &:hover,
    &:active {
        background: #2A7ED3;
        transition: ease 200ms;
        color: white;
    }
`

export const SecondaryButton = styled(DefaultButton)`
    background: transparent;
    &:hover,
    &:active {
        background: #2A7ED3;
        transition: ease 200ms;
        color: white;
    }
`