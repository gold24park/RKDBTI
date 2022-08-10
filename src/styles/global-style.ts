import { createGlobalStyle } from "styled-components";
import { media, size } from "./size";
import { theme } from "./theme";

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
        width: 100%;
        height: 100%;
        max-width: ${size.container_width}px;
        max-height: ${size.container_height}px;
        overflow: hidden;
        display: flex;
    }
    ${media.tablet} {
        body {
            max-height: ${size.tablet.container_height}px;
        }
    }
    #__next {
        width: 100%;
        height: 100%;
    }
    #frame {
        border: 1px solid black;
        width: 100%;
        height: 100%;
        box-shadow: 10px 10px 0px black;
    }
    #wrapper {
        position: absolute;
        border: 1px solid black;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #test_wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        padding-top: ${size.navbar_height}px;
        padding-bottom: 56px;
        overflow-x: hidden;
        overflow-y: scroll;
        background: ${theme.colors.darkSurface};
    }
    #result_wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: ${size.navbar_height}px ${size.content_padding}px 36px ${size.content_padding}px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    * {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    
    ::-webkit-scrollbar {
        width: 4px;  /* 스크롤바의 너비 */
        height: 100%;
    }

    ::-webkit-scrollbar-thumb {
        height: 20%; /* 스크롤바의 길이 */
        background: #bbb; /* 스크롤바의 색상 */
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background: white;
    }
    ${media.phone} {
        #test_wrapper {
            padding-top: ${size.mobile.navbar_height}px;
        }
        #result_wrapper {
            padding: ${size.mobile.navbar_height}px ${size.content_padding}px 36px ${size.content_padding}px;
        }
    }
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        font-family: 'ChosunBg', sans-serif;
      }
      
      ul {
        list-style: none;
        padding: 0;
      }
      
      ul.pagination li {
        display: inline-block;
        width: 30px;
        height: 30px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
      }
    
      ul.pagination li:first-child{
        border-radius: 5px 0 0 5px;
      }
    
      ul.pagination li:last-child{
        border-radius: 0 5px 5px 0;
      }
      
      ul.pagination li a {
        text-decoration: none;
        color: ${theme.colors.text500};
        font-size: 1rem;
      }
      
      ul.pagination li.active a {
        color: ${theme.colors.primary};
      }
    
      ul.pagination li.active {
        border-radius: 16px;
        border: 2px solid ${theme.colors.primary};
      }
      
      ul.pagination li a:hover,
      ul.pagination li a.active {
        color: ${theme.colors.primary};
        
      }
      
      .page-selection {
        width: 48px;
        height: 30px;
        color: #337ab7;
      }
`;
