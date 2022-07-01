import { Layout } from "@components/Layout";
import { NextPage } from "next";
import { useState } from "react";
import questions from "@services/json/questions.json";
import { AnswerButton } from "@components/AnswerButton";
import { useRouter } from "next/router";
import { ResultConverter } from "@services/ResultConverter";
import { debounce } from "lodash";
import { Navbar } from "@components/Navbar";

enum Direction {
  NEXT = 1,
  PREV = -1,
}

const TestPage: NextPage = () => {
  const router = useRouter();

  const [answers, setAnswers] = useState<number[]>(new Array());
  const [scores, setScores] = useState<number[]>(
    new Array(questions[0].a[0].type.length).fill(0)
  );
  const [questionIndex, setQuestionIndex] = useState<number>(0);

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
      // 마지막 답변을 했으므로 결과화면으로 이동합니다.
      let typeNumber = scores.indexOf(Math.max(...scores));
      await updateStatistics(typeNumber);
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

  return (
    <Layout>
      <Navbar/>
      <h1>
        {questionIndex + 1}. {questions[questionIndex].q}
      </h1>

      <button onClick={handleClickBack}>뒤로</button>

      <br />

      {questions[questionIndex].a.map(({ answer, type }, answerIndex) => (
        <AnswerButton
          key={`answer_${answerIndex}`}
          onClick={debounce(async () => {
            await handleClickAnswer(answerIndex, type);
          }, 50)}
        >
          {answer}
        </AnswerButton>
      ))}

      <code>
        scores: {JSON.stringify(scores)}
        <br />
        answers: {JSON.stringify(answers)}
      </code>
    </Layout>
  );
};

export default TestPage;
