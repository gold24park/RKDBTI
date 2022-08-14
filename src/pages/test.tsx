import { AnswerButton } from "@components/button/AnswerButton";
import { Layout } from "@components/layout/Layout";
import { Navbar } from "@components/Navbar";
import { TestLoading } from "@components/test/LoadingLayout";
import { ProgressBar } from "@components/test/ProgressBar";
import { Question } from "@components/test/Question";
import { Animations } from "@services/animations";
import questions from "@services/json/questions.json";
import { ResultConverter } from "@services/ResultConverter";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

enum Direction {
  NEXT = 1,
  PREV = -1,
}

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
    updateQuestion(typeScores, Direction.NEXT);

    if (questionIndex < questions.length - 1) {
      setAnswers([...answers, answer]);
    } else {
      setLoading(true);

      let typeNumber = scores.indexOf(Math.max(...scores)) + 1;

      if (typeNumber > 0) {
        await updateStatistics(typeNumber);
        await new Promise((r) => setTimeout(r, 500));
      }

      // t: 직접 테스트함을 표시
      router.push({
        pathname: "/result",
        query: {
          type: ResultConverter.encode(typeNumber),
          t: 1
        },
      });
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
        <TestLoading />
      </Layout>
    );
  }

  return (
    <Layout wrapper="test_wrapper">
      <Navbar onClickBack={handleClickBack} />
        
      <AnimatePresence>
        <Question
          key="question"
          question={questions[questionIndex].q}
          questionIndex={questionIndex}
        />
        <br />
        <motion.div          
          key={questionIndex}
          variants={Animations.list.variants}
          initial="hidden"
          animate="visible"
        >
          <AnswerWrapper>
            {questions[questionIndex].a.map(({ answer, type }, answerIndex) => (
              <motion.div
                key={`Answer-${questionIndex}-${answerIndex}`}
                variants={Animations.listItem.variants}
              >
                <AnswerButton
                  index={answerIndex}
                  onClick={debounce(async () => {
                    await handleClickAnswer(answerIndex, type);
                  }, 50)}
                >
                  {answer}
                </AnswerButton>
              </motion.div>
            ))}
          </AnswerWrapper>
        </motion.div>
      </AnimatePresence>

      <ProgressBar current={questionIndex + 1} total={questions.length} />
    </Layout>
  );
};

export default TestPage;
