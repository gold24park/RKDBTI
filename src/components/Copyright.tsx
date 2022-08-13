import styled from "styled-components"

const CopyrightText = styled.footer`
    text-align: center;
    font-size: 14px;
    color: #8c8f92;
`

type Prop = {
    className?: string
}

export const Copyright = ({ className }: Prop) => {
    return (
        <CopyrightText className={className}>
            Copyright 2022 RailKim
        </CopyrightText>
    )
}