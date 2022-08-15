import isDarkColor from '@services/ColorUtil';
import { MyCharacterResult } from "@services/models/MyCharacterResult";
import { StatisticsResult } from "@services/models/StatisticsResult";
import { media } from "@styles/size";
import styled from "styled-components";
import { AutoHeightImageWrapper } from "../BaseImageWrapper";

const CharacterInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 20px;
  bottom: 0px;
  z-index: 1;
  ${media.phone} {
    bottom: 20px;
  }
`

const NameWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10px;
  flex-direction: column;
  font-family: "ChosunBg", sans-serif;
  .name {
    margin: 0;
    font-weight: 500;
    text-shadow: -4px -1px 0 #000, 2px -1px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
    margin-top: -10px;
    color: white;
    font-size: 48px;
  }
  .subname {
    font-size: 28px;
  }
  ${media.phone} {
    .name {
      font-size: 28px;
      margin-top: -4px;
    }
    .subname {
      font-size: 18px;
    }
  }
`

const Number = styled.h2<{
  mainColor: string;
}>`
  font-size: 110px;
  margin: 0;
  font-family: "Limelight";
  text-shadow: -6px -1px 0 #000, 2px -1px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  color: white;
  ${media.phone} {
    font-size: 64px;
  }
`;

const ResultWrapper = styled.div<{
  isDark: boolean;
  mainColor: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3px;
  outline: 3px solid black;
  position: relative;
  ${({ isDark, mainColor }) => `
    color: ${isDark ? 'white' : 'black'};
    background: ${mainColor};
    background-image: url("/images/emblem.png");
    background-repeat: no-repeat;
    background-position: center;
    ${media.phone} {
      background-size: 300px;
    }
  `}
`;

const Ment = styled.div`
  font-family: "ChosunKm", serif;
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: -20px;
  text-align: center;
  ${media.phone} {
    font-size: 22px;
  }
`;

const ResultImageWrapper = styled(AutoHeightImageWrapper)`
  width: 70%;
  z-index: 0;
  margin-bottom: 60px;
  ${media.phone} {
    width: 80%;
    margin-bottom: 40px;
  }
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const Statistics = styled.div`
  padding: 10px;
  border-top: 2px solid black;
  font-weight: bold;
  width: 100%;
  text-align: right;
  padding-top: 20px;
  background-image: linear-gradient(0deg, #ffffff 50%, #c7c7c7 50%);
  background-size: 2px 2px;
  color: black;
`;

const Description = styled.div`
  font-weight: bold;
  margin: 20px 0;
  white-space: pre-wrap;
  font-size: 18px;
  ${media.phone} {
    font-size: 16px;
  }
`;

type Props = {
  data?: StatisticsResult;
  result: MyCharacterResult;
};

export const Result = ({ result, data }: Props) => {

  const isDark = isDarkColor(result.main_color);

  return (
    <>
      <ResultWrapper isDark={isDark} mainColor={result.main_color}>
        <CharacterInfoWrapper>
          <Number mainColor={result.main_color}>
            {result.unique_id.toString().padStart(2, "0")}
          </Number>
          <NameWrapper>
            <div className="subname">{result.subname}</div>
            <h1 className="name">{result.name}</h1>
          </NameWrapper>
        </CharacterInfoWrapper>
        
        <Ment>{`"${result.ment}"`}</Ment>
        <ResultImageWrapper>
          <img
            src={`/images/character/${result.unique_id}.png`}
            alt={result.name}
          />
        </ResultImageWrapper>
        {data && (
          <Statistics>전체 참여자중 {data.percentage.toFixed(1)}%의 유형!</Statistics>
        )}
      </ResultWrapper>
      <Description>{result.description}</Description>
    </>
  );
};
