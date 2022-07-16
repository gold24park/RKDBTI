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
    b {
        font-size: 18px;
    }
    cursor: pointer;
    &:hover {
        background: #eee;
        transition: all 0.3s;
    }
    ${media.phone} {
        font-size: 12px;
        b {
            font-size: 16px;
        }
    }
`

const CircleImageWrapper = styled.div`
    img {
        border-radius: 50%;
        width: 90%;
    }
    margin-bottom: 14px;
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
      <SectionTitle>{`🙄 저기...이것도 봐주지 않을래?`}</SectionTitle>
      <Wrapper>
        <SubTitle>{subtitle}</SubTitle>
        <Title>{title}</Title>
        <AdWrapper>
            <Link href={youtubeUrl}>
                <Ad>
                    <CircleImageWrapper>
                        <Image
                          src="https://via.placeholder.com/120x120.png" 
                          width={120}
                          height={120}
                          alt="youtube railkim"
                        />
                    </CircleImageWrapper>
                    {`잘 손질된 광기의 흔적`}
                    <b>유튜브 채널 바로가기</b>
                </Ad>
            </Link>
            <Link href={twitchUrl}>
                <Ad>
                    <CircleImageWrapper>
                      <Image
                          src="https://via.placeholder.com/120x120.png" 
                          width={120}
                          height={120}
                          alt="youtube railkim"
                      />
                    </CircleImageWrapper>
                    {`다정한 오타쿠 친구`}
                    <b>트위치 생방 월~목 5시</b>
                </Ad>
            </Link>
        </AdWrapper>
      </Wrapper>
    </>
  );
};
