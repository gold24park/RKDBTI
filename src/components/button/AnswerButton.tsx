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
        padding: 10px 50px;
        height: auto;
        font-size: 13px;
    }

    position: relative;

    
    ${({ theme, index }) => `
        background: ${theme.colors.surface};
        color: ${theme.colors.text500};

        @media (hover: none) {
            background: ${theme.colors.surface};
        }

        &::before {
            content: '${index + 1}';
            background: ${theme.colors.text500};
            border: 3px solid black;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: ${size.content_padding}px;
            width: 1rem;
            height: 1rem;
            color: white;
            font-family: 'ChosunBg', san-serif;
            font-size: 0.8rem;
            border-radius: 20px;
        }

        &:hover {
            background: ${theme.colors.primary};
            color: white;
        }
    `}
`