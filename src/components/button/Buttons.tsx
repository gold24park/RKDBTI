import { MyCharacterResult } from "@services/models/MyCharacterResult";
import { media, size } from "@styles/size";
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
    height: ${size.button_height}px;
    width: 100%;
    cursor: pointer;

    ${media.phone} {
        font-size: 15px;
    }
`

export const TextButton = styled(DefaultButton)`
    border: none;
    background: none;
    height: 50px;
    padding: 10px;
    border-radius: 16px;
    &:hover {
        font-size: 19px;
        transition: ease 300ms;
    }
`

/**
 * SNS 버튼 공통 스타일링
 */
export const SnsButton = styled(DefaultButton)<{
    backgroundColor: string;
    fontColor: string;
}>`
    background-color: blue;
    position: relative;
    background: ${({ backgroundColor }) => backgroundColor};
    color: ${({ fontColor }) => fontColor};
    margin-bottom: 10px;
    .imageWrapper {
        position: absolute;
        display: inline;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    &:hover {
        transition: ease 200ms;
        background: ${({ backgroundColor }) => `${backgroundColor}AA`}
    }
`

export const PrimaryButton = styled(DefaultButton)`
    background: #444;
    color: white;
    &:hover {
        background: #2A7ED3;
        transition: ease 200ms;
        color: white;
    }
`

export const SecondaryButton = styled(DefaultButton)`
    background: transparent;
    &:hover {
        background: #2A7ED3;
        transition: ease 200ms;
        color: white;
    }
`