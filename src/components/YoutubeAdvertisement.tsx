import styled from "styled-components";
import { SectionTitle } from "./SectionTitle";
import Link from "next/link"
import { media, size } from "@styles/size";
import Image from "next/image";

const Wrapper = styled.div`
    border: 3px solid black;
    padding: ${size.content_padding}px;
`

const AdWrapper = styled.div`
  display: flex;
`;

const SubTitle = styled.div`
  text-align: center;
  font-family: "ChosunBg", serif;
  font-size: 20px;
`;

const Title = styled(SubTitle)`
  margin: 0;
  font-size: 30px;
`;

const Ad = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    flex: 1;
    text-align: center;
    margin-top: 20px;
    padding 10px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 16px;
    cursor: pointer;
    &:hover {
        background: #eee;
        transition: all 0.3s;
    }
    ${media.phone} {
        font-size: 12px;
    }
`

const ImageWrapper = styled.div`
    img {
        width: 90%;
    }
    margin-bottom: 14px;
`

const LinkTitle = styled.div`
    font-family: 'ChosunKm', san-serif;
    font-size: 22px;  
    font-weight: bold;
    ${media.phone} {
      font-size: 15px;
    }
`

const Credit = styled.ul`
    margin-top: 0;
    b {
      width: 60px;
    }
    padding-inline-start: 10px;
    li {
      display: flex;
      &::before {
        content: '●';
        margin-right: 8px;
      }
    }
`

type Props = {
  subtitle: string;
  title: string;
  youtubeUrl: string;
  twitchUrl: string;
};

export const YoutubeAdvertisement = ({ title, subtitle, youtubeUrl, twitchUrl }: Props) => {
  return (
    <>
      <SectionTitle>{`🙄 만든이`}</SectionTitle>
      <Wrapper>
        <SubTitle>{subtitle}</SubTitle>
        <Title>{title}</Title>
        <AdWrapper>
            <Link href={youtubeUrl}>
                <Ad>
                    <ImageWrapper>
                        <Image
                          src="/images/dbti_youtube.png" 
                          width={200}
                          height={200}
                          alt="youtube railkim"
                        />
                    </ImageWrapper>
                    {`게임‧토크‧오타쿠 분석`}
                    <LinkTitle>김래일 유튜브</LinkTitle>
                </Ad>
            </Link>
            <Link href={twitchUrl}>
                <Ad>
                    <ImageWrapper>
                      <Image
                          src="/images/dbti_twitch.png" 
                          width={200}
                          height={200}
                          alt="youtube railkim"
                      />
                    </ImageWrapper>
                    {`다정한 오타쿠 친구`}
                    <LinkTitle>트위치 월~목 5시</LinkTitle>
                </Ad>
            </Link>
        </AdWrapper>
      </Wrapper>
      <br/>

      <Credit>
        <li><b>오타쿠</b> 김래일</li>
        <li><b>아트</b> 차라리라차‧파란 외계인</li>
        <li><b>개발</b> 선홍‧쪼오리‧파이리<br/></li>
      </Credit>
    </>
  );
};
