import React from "react";
import styled from "styled-components";

const BannerAd = styled.div`
  z-index: 100;
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`

export class AdfitBannerAd extends React.Component {
    
    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        let ins = document.createElement('ins');
        let scr = document.createElement('script');

        ins.className = 'kakao_ad_area';
        ins.setAttribute('style', 'display: none;');
        scr.async = true;
        scr.type = 'text/javascript';
        scr.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        ins.setAttribute('data-ad-width', '320');
        ins.setAttribute('data-ad-height', '90');
        ins.setAttribute('data-ad-unit', 'DAN-4k5WUBxAKAw120nf');

        let parent = document.getElementById('banner_ad');
        parent?.appendChild(ins);
        parent?.appendChild(scr);
    }

    render() {
        return (
            <BannerAd id="banner_ad"/>
        )
    }
}