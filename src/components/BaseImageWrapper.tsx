import styled from "styled-components";

export const BaseImageWrapper = styled.div`
    height: 100%;
    position: relative;
`

export const AutoHeightImageWrapper = styled.div`
    width: 100%;
    position: relative;
    & > span {
        position: unset !important;
        & img {
            object-fit: contain !important;
            position: relative !important;
            height: auto !important;
        }
    }
`