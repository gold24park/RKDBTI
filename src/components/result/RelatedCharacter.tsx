import { MyCharacterResult } from "@services/models/MyCharacterResult";
import { media } from "@styles/size";
import styled from "styled-components";
import Image from "next/image";
import { SectionTitle } from "@components/SectionTitle";
import { BaseImageWrapper } from "@components/BaseImageWrapper";

const RelatedCharacterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-family: 'ChosunBg', san-serif;
  border: 1px solid black;
  display: inline-block;
  font-size: 20px;
  padding: 6px;
  box-shadow: 10px 10px 0px black;
  margin: 4px 60px 10px 0px;
  background-image: linear-gradient(0deg, #ffffff 50%, #eee 50%);
  background-size: 2px 2px;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

  ${media.phone} {
    font-size: 18px;
  }
`;

const Number = styled.div<{
    isGood: boolean;
    mainColor: string;
}>`
    position: absolute;
    right: 10px;
    padding: 1px 10px;
    border-radius: 100px;
    bottom: 10px;
    font-family: 'ChosunKm', serif;

    ${({ isGood, mainColor }) => 
        isGood === true && `
            background: ${mainColor};
            color: white;
        ` ||
        isGood === false && `
            background: white;
            color: black;
            border: 2px solid black;
        ` 
    }

    ${media.phone} {
        bottom: 0px;
    }
`

const Ment = styled.p`
  font-weight: bold;
  margin: 10px 50px 10px 0px;
  font-size: 18px;
  ${media.phone} {
    font-size: 16px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const ImageWrapper = styled(BaseImageWrapper)`
  width: 160px;
  ${media.phone} {
    width: 120px;
  }
`;

type Props = {
  isGood: boolean;
  result: MyCharacterResult;
};

export const RelatedCharacter = ({ isGood, result }: Props) => {
  let character = isGood ? result.good : result.bad;
  let ment = isGood ? result.goodment : result.badment;
  let image = `/images/facial/${character?.unique_id}.png`
  let name = character?.name || ""
 
  return (
    <>
      <SectionTitle>{isGood ? `❤️ 좋은상성` : `☠️ 나쁜상성`}</SectionTitle>
      <RelatedCharacterWrapper>
        <ContentWrapper>
          <Title >{character?.name}</Title>
          <Ment>{ment}</Ment>
          <Number isGood={isGood} mainColor={character?.main_color}>
            {character?.unique_id?.toString().padStart(2, '0')}
        </Number>
        </ContentWrapper>
        <ImageWrapper>
          <Image 
            src={image} 
            width={160} height={160} objectFit="contain"
            alt={name}
          />
        </ImageWrapper>
      </RelatedCharacterWrapper>
    </>
  );
};
