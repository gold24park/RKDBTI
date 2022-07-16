import { BaseImageWrapper } from "@components/BaseImageWrapper";
import { AnswerButton } from "@components/button/AnswerButton";
import { Layout } from "@components/Layout";
import { TestDots, TestLoading } from "@components/LoadingLayout";
import { Navbar } from "@components/Navbar";
import { ProgressBar } from "@components/ProgressBar";
import questions from "@services/json/questions.json";
import { ResultConverter } from "@services/ResultConverter";
import { media } from "@styles/size";
import { debounce } from "lodash";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

enum Direction {
  NEXT = 1,
  PREV = -1,
}

const TestQuestion = styled.pre`
  font-family: "ChosunKm", serif;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  background: black;
  color: white;
  padding: 10px 20px;
  margin: 20px;
  white-space: break-spaces;
  ${media.phone} {
    font-size: 18px;
  }
`;

const TestIllustWrapper = styled(BaseImageWrapper)`
  width: calc(100% - 40px);
  aspect-ratio: 16 / 9;
  border: 3px solid black;
  margin: auto;
  height: auto;
  img {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover;
  }
`;


const AnswerWrapper = styled.div`
  padding: 0 20px;
`;

const TestPage: NextPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState<number[]>(new Array());
  const [scores, setScores] = useState<number[]>(
    new Array(questions[0].a[0].type.length).fill(0)
  );
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  // 답변 선택후 스크롤 가장 위로
  useEffect(() => {
    const wrapper = document.querySelector("#test_wrapper");
    if (wrapper) {
      wrapper.scrollTop = 0;
    }
  }, scores);

  const updateStatistics = async (typeNumber: number) => {
    await fetch(`/api/statistics`, {
      method: "POST",
      body: JSON.stringify({
        typeNumber: typeNumber,
      }),
    });
  };

  // 현재 질문 상태를 앞, 뒤로 넘깁니다.
  const updateQuestion = (typeScores: number[], direction: Direction) => {
    setScores(scores.map((v, i) => v + typeScores[i] * direction));
    setQuestionIndex(questionIndex + direction);
  };

  const handleClickAnswer = async (answer: number, typeScores: number[]) => {
    if (questionIndex == questions.length - 1) {
      const finalScores = scores.map(
        (v, i) => v + typeScores[i] * Direction.NEXT
      );
      // 마지막 답변을 했으므로 결과화면으로 이동합니다.
      setLoading(true);

      let typeNumber = finalScores.indexOf(Math.max(...finalScores)) + 1;

      if (typeNumber > 0) {
        await updateStatistics(typeNumber);
        await new Promise((r) => setTimeout(r, 500));
      }

      router.push({
        pathname: "/result",
        query: {
          type: ResultConverter.encode(typeNumber),
        },
      });
    } else {
      // 선택지를 기록하고, 다음 질문으로 이동
      setAnswers([...answers, answer]);
      updateQuestion(typeScores, Direction.NEXT);
    }
  };

  const handleClickBack = () => {
    if (questionIndex == 0) {
      // 갈 곳이 없으므로 홈으로
      router.push("/");
    } else {
      // 마지막 선택지를 나가리 시키고, 이전 질문으로 이동
      let lastAnswer = answers.at(-1) || 0;
      setAnswers(answers.slice(0, -1));
      updateQuestion(
        questions[questionIndex - 1].a[lastAnswer].type,
        Direction.PREV
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <TestLoading/>
      </Layout>
    );
  }

  return (
    <Layout wrapper="test_wrapper">
      <Navbar onClickBack={handleClickBack} />

      <TestQuestion>{questions[questionIndex].q}</TestQuestion>

      <TestIllustWrapper>
        <Image
          className="image"
          src="https://via.placeholder.com/1280x720.png"
          layout="fill"
          objectFit="cover"
          alt={questions[questionIndex].q}
        />
      </TestIllustWrapper>

      <TestDots>⋮</TestDots>

      <AnswerWrapper>
        {questions[questionIndex].a.map(({ answer, type }, answerIndex) => (
          <AnswerButton
            index={answerIndex}
            key={`answer_${answerIndex}`}
            onClick={debounce(async () => {
              await handleClickAnswer(answerIndex, type);
            }, 50)}
          >
            {answer}
          </AnswerButton>
        ))}
      </AnswerWrapper>
      <ProgressBar current={questionIndex + 1} total={questions.length} />
    </Layout>
  );
};

export default TestPage;
