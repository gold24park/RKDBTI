import { size } from "@styles/size";
import React from "react";
import styled from "styled-components";


const BannerAd = styled.div`
  width: 100%;
  max-width: ${size.container_width}px;
`

export class AdfitBannerAd extends React.Component<{inline?: boolean}> {

    constructor(props: {inline?: boolean}) {
        super(props)
    }
    
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
        let style = {};
        if (!this.props.inline) {
            style = {
                position: 'absolute',
                left: '50%',
                bottom: '-6px',
                zIndex: '100',
                transform: 'translateX(-50%)',
            }
        }
        return (
            <BannerAd id="banner_ad" style={style}/>
        )
    }
}