import { media, size } from "@styles/size";
import styled from "styled-components";

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  font-weight: bold;
  font-size: 14px;
  padding: 10px ${size.content_padding}px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1px;
  background: white;
  border-top: 1px solid #eee;
  width: calc(100% - 2px);
  max-width: ${size.container_width - 2}px;

  @media (min-height: ${size.container_height}px) {
    bottom: calc(50% - ${size.container_height / 2}px + 1px);
  }

  ${media.tablet} {
    bottom: calc(50% - ${size.tablet.container_height / 2}px + 2px);
  }
`;

const ProgressBackground = styled.div`
  height: 6px;
  background-image:  repeating-linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), repeating-linear-gradient(45deg, #ccc 25%, #ffffff 25%, #ffffff 75%, #ccc 75%, #ccc);
  background-position: 0 0, 1px 1px;
  background-size: 2px 2px;
  border: 1px solid black;
  flex: 1;
  margin-right: 10px;
`;

const ProgressForeground = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.text500};
`;

type Props = {
  current: number;
  total: number;
};

export const ProgressBar = ({ current, total }: Props) => {
  const progress = (current / total) * 100;

  return (
    <ProgressBarWrapper>
      <ProgressBackground>
        <ProgressForeground
          style={{ width: `${progress}%`, transition: "all 200ms" }}
        ></ProgressForeground>
      </ProgressBackground>
      {current} / {total}쪽
    </ProgressBarWrapper>
  );
};
