import { media, size } from '@styles/size'
import styled from 'styled-components'
import { DefaultButton } from './Buttons'

/**
 * 선택지 공통 스타일링
 */
export const AnswerButton = styled(DefaultButton)<{
    index: number,
}>`
    padding: 10px;
    height: 60px;
    margin: 0 auto 10px auto;
    white-space: pre-wrap;
    line-height: 1.3;
    font-size: 15px;

    ${media.phone} {
        height: 50px;
        font-size: 13px;
    }

    position: relative;

    
    ${({ theme, index }) => `
        background: ${theme.colors.surface};
        color: ${theme.colors.text500};

        &::before {
            content: '${index + 1}';
            background: ${theme.colors.text400};
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: ${size.content_padding}px;
            width: 20px;
            height: 20px;
            color: white;
            font-size: 16px;
            border-radius: 20px;
        }
    `}

    ${({ index }) => index == 0 && `
        &:hover {
            background-size: 4px 4px;
            background-image: repeating-linear-gradient(45deg, #ccc 0, #ccc 0.4px, #ffffff 0, #ffffff 50%);
        }
    `}

    ${({ index }) => index == 1 && `
        &:hover {
            background-image:  repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), repeating-linear-gradient(45deg, #ccc 25%, #ffffff 25%, #ffffff 75%, #ccc 75%, #ccc);
            background-position: 0 0, 1px 1px;
            background-size: 2px 2px;
        }
    `}

    ${({ index }) => index == 2 && `
        &:hover {
            background-image: linear-gradient(90deg, #ffffff 50%, #d7d7d7 50%);
            background-size: 2px 2px;
        }
    `}

    ${({ index }) => index == 3 && `
        &:hover {
            background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 4px ), repeating-linear-gradient( #cccccc55, #cccccc );
        }
    `}

    ${({ index }) => index == 4 && `
        &:hover {
            background-image: linear-gradient(0deg, #ffffff 50%, #d7d7d7 50%);
            background-size: 2px 2px;
        }
    `}
    
`