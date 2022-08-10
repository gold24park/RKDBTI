import { theme } from "@styles/theme";
import React, { useState } from "react";
import styled from "styled-components";

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(0deg, #ffffff 50%, #aaa 50%);
  background-size: 2px 2px;
  border: 1px solid black;
`;

const CommentNicknameInput = styled.input`
  padding: 10px;
  border: none;
`;
const CommentTextInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border-top: none;
`;

const ButtonUpload = styled.button`
  background: ${theme.colors.primary};
  color: white;
  font-family: "ChosunBg", sans-serif;
  padding: 10px 30px;
  border: none;
  cursor: pointer;
  &:disabled {
    background: ${theme.colors.text200};
  }
`;

type Props = {
  unique_id?: number;
  character_name?: string;
  color?: string;
  requestNewPage: () => void;
};

const COMMENT_THRESHOLD = 5 * 1000

export const CommentInput = ({ unique_id, character_name, color, requestNewPage }: Props) => {
  
  const [nickname, setNickname] = useState<string>("익명");
  const [text, setText] = useState<string>("");

  const handleOnNicknameChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNickname(event.target.value.trim())
  };
  const handleOnTextChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value.trim())
  };

  const handleOnClickPost = (nickname: string, text: string) => {
    let lastCreated = Number(localStorage.getItem('comment_created') || '0');
    if (new Date().getTime() - lastCreated < COMMENT_THRESHOLD) {
      alert('5초 후에 다시 시도 해 주세요.')
      return
    }
    fetch(`/api/comments`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ 
        unique_id,
        character_name,
        color,
        text,
        nickname
      }),
    }).then((res) => {
      if (!res.ok) {
        alert("댓글 작성에 실패했어요.")
      }
      
      localStorage.setItem('comment_created', new Date().getTime().toString());
      setText("");
      requestNewPage();
    });
  }

  return (
    <>
      <FlexWrapper>
        <CommentNicknameInput
          type="text"
          value={nickname}
          id="comment_nickname"
          maxLength={10}
          onChange={handleOnNicknameChanged}
        ></CommentNicknameInput>
        <ButtonUpload
          disabled={text.length == 0 || nickname.length == 0}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleOnClickPost(nickname, text);
          }}
        >
          등록
        </ButtonUpload>
      </FlexWrapper>
      <CommentTextInput
        placeholder="나도 한마디!"
        id="comment_text"
        value={text}
        maxLength={150}
        onChange={handleOnTextChanged}
      ></CommentTextInput>
    </>
  );
};
