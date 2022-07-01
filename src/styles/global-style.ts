import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* 만화영어 폰트는 'Limelight' */
    /* 조선 굴림체 */
    @font-face {
        font-family: 'ChosunGu';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    /* 조선 견고딕 */
    @font-face {
        font-family: 'ChosunBg';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunBg.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    /* 조선 굵은 명조 */
    @font-face {
        font-family: 'ChosunKm';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunKm.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    html {
        font-size: 16px;
        font-family: 'ChosunGu', sans-serif;
        line-height: 1.4;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    body {
        position: absolute;
        margin: auto !important;
        max-width: 500px;
        width: 100%;
        height: 100%;
        max-height: 1080px;
        overflow: hidden;
        display: flex;
    }
    #wrapper {
        position: absolute;
        padding: 20px;
        border: 1px solid black;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-shadow: 10px 10px 0px black;
    }
    * {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
`;
