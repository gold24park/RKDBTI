import { MyCharacterResult } from "@services/models/MyCharacterResult";
import { StatisticsResult } from "@services/models/StatisticsResult";
import { media, size } from "@styles/size";
import styled from "styled-components";
import Image from "next/image";
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
  color: ${({ mainColor }) => mainColor};
`;
const ResultWrapper = styled.div<{
  mainColor: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid black;
  position: relative;
  ${({ theme, mainColor }) => `
    background-image:  repeating-linear-gradient(45deg, ${mainColor} 25%, transparent 25%, transparent 75%, #eee 75%, #ccc), repeating-linear-gradient(45deg, ${mainColor} 25%, #ffffff 25%, #ffffff 75%, ${mainColor} 75%, ${mainColor});
  `}
  background-position: 0 0, 1px 1px;
  background-size: 2px 2px;
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
  return (
    <>
      <ResultWrapper mainColor={result.main_color}>
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
