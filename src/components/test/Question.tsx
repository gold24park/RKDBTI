import { Animations } from "@services/animations";
import { media, size } from "@styles/size";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BaseImageWrapper } from "@components/BaseImageWrapper";
import { theme } from "@styles/theme";
import Image from "next/image";

const TestQuestion = styled.pre`
  font-family: "ChosunKm", serif;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: white;
  padding: 10px 20px;
  white-space: break-spaces;
  margin: 0;
  ${media.phone} {
    font-size: 15px;
  }
`;

const TestIllustWrapper = styled(BaseImageWrapper)`
  width: 100%;
  aspect-ratio: 16 / 9.07;
  margin: auto;
  height: auto;
  padding: 0 ${size.content_padding}px;
  img {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover;
  }
  & > span {
    margin-top: ${size.content_padding}px !important;
  }
`;

type Props = {
  question: string;
  questionIndex: number;
};

export const Question = ({ question, questionIndex }: Props) => {
  return (
    <div style={{ background: theme.colors.text500 }}>
      <motion.div
        key={questionIndex}
        variants={Animations.slide.variants}
        transition={Animations.slide.transition}
      >
        <TestIllustWrapper key="">   
          <Image
            className="image"
            src={`/images/question/${questionIndex + 1}.jpg`}
            layout="fill"
            objectFit="contain"
            priority={true}
            alt={question}
          />
        </TestIllustWrapper>

        <motion.div
          key={questionIndex}
          variants={Animations.fade.variants}
          transition={Animations.fade.transition}
        >
          <TestQuestion>{question}</TestQuestion>
        </motion.div>
      </motion.div>
    </div>
  );
};
