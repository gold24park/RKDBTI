import { MyCharacterResult } from "@services/models/MyCharacterResult";
import { StatisticsResult } from "@services/models/StatisticsResult";
import { media, size } from "@styles/size";
import styled from "styled-components";
import Image from "next/image";
import isDarkColor from '@services/ColorUtil';
import { AutoHeightImageWrapper, BaseImageWrapper } from "../BaseImageWrapper";

const Number = styled.h2<{
  mainColor: string;
}>`
  position: absolute;
  left: 20px;
  bottom: 0px;
  font-size: 80px;
  margin: 0;
  font-family: "Limelight";
  text-shadow: -6px -1px 0 #000, 2px -1px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  color: white;
`;

const ResultWrapper = styled.div<{
  isDark: boolean;
  mainColor: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid black;
  position: relative;
  ${({ isDark, mainColor }) => `
    color: ${isDark ? 'white' : 'black'};
    background: ${mainColor};
  `}
`;

const Ment = styled.div`
  font-family: "ChosunKm", serif;
  font-size: 28px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  ${media.phone} {
    font-size: 22px;
  }
`;

const Subname = styled.div`
  font-family: "ChosunBg", sans-serif;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  ${media.phone} {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const Name = styled.h1`
  font-family: "ChosunBg", sans-serif;
  font-weight: 500;
  margin: 0;
  padding: 10px 20px;
  background: white;
  border: 3px solid black;
  color: black;
`;

const ResultImageWrapper = styled(AutoHeightImageWrapper)`
  width: 80%;
  z-index: 0;
`;

const Statistics = styled.div`
  padding: 10px;
  border-top: 2px solid black;
  font-weight: bold;
  width: 100%;
  text-align: right;
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
        <Number mainColor={result.main_color}>
          {result.unique_id.toString().padStart(2, "0")}
        </Number>
        <Ment>{`"${result.ment}"`}</Ment>
        <Subname>{result.subname}</Subname>
        <Name>{result.name}</Name>
        <ResultImageWrapper>
          <Image
            src={`/images/character/${result.unique_id}.png`}
            layout="fill"
            objectFit="contain" 
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
