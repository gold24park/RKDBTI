import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
};

const LoadingWrapper = styled.div`
  background-image: linear-gradient(0deg, #444 50%, black 50%);
  background-size: 4px 4px;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-family: "ChosunKm";
  text-align: center;
  font-size: 28px;
`;

const SpeechBubble = styled.div`
  width: calc(100% - 120px);
  margin: 20px auto;
  border: 4px solid black;
  padding: 20px;
  text-align: center;
  color: black;
  background: white;
  position: relative;
  font-family: "ChosunGu", serif;
  font-size: 24px;

  &:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid black;
    border-top: 10px solid black;
    border-bottom: 10px solid transparent;
    right: 20px;
    bottom: -23px;
  }

  &:after {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid #fff;
    border-top: 10px solid #fff;
    border-bottom: 10px solid transparent;
    right: 24px;
    bottom: -13px;
  }
`;

export const TestDots = styled.h2`
  margin: 0 auto;
  text-align: center;
`;

export const TestLoading = (props: Props) => (
  <LoadingWrapper>
    <i>만약에</i>
    <br />
    <TestDots>⋮</TestDots>
    <SpeechBubble>
      <div style={{ fontSize: "34px" }}>
        당신이
        <br />
        <b>애니캐릭터</b>라면...
      </div>
    </SpeechBubble>
  </LoadingWrapper>
);
