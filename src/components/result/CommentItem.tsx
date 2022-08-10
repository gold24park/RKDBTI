import { Comment } from "@services/models/Comment";
import { theme } from "@styles/theme";
import styled from "styled-components";
import moment from 'moment';
import { media } from "@styles/size";

const CommentWrapper = styled.div`
  padding: 10px 4px;
  border-bottom: 1px solid ${theme.colors.divider};
  position: relative;
  ${media.phone} {
    padding: 10px 4px 36px 4px;
  }
`

const MetaContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Nickname = styled.span`
  font-family: 'ChosunBg', san-serif;
  font-size: 14px;
  margin-right: 5px;
  span {
    font-family: sans-serif;
    font-size: 12px;
    margin-left: 2px;
    color: ${props => props.theme.colors.text200}
  }
`

const CharacterName = styled.span<{
  color?: string;
}>`
  font-family: 'ChosunBg', san-serif;
  margin-right: 5px;
  font-size: 14px;
  color: ${props => props.color || 'black'};
`

const CreatedDate = styled.span`
  flex-grow: 1;
  text-align: right;
  font-size: 12px;

  ${media.phone} {
    position: absolute; 
    right: 4px;
    bottom: 10px;
  }
`;

const CommentButton = styled.button`
  border: none;
  font-size: 11px;
  margin-right: 5px;
  border-radius: 5px;
  color: blue;
  opacity: 0.5;
`

type Props = {
  comment: Comment;
  handleOnClickDelete: (comment: Comment) => void;
  handleOnClickReport: (comment: Comment) => void;
};

export const CommentItem = ({ comment, handleOnClickDelete, handleOnClickReport }: Props) => {
  if (comment.is_reported) {
    return (
      <CommentWrapper>
        <div style={{ padding: "10px 4px" }}>
          신고 처리된 댓글입니다.
        </div>
      </CommentWrapper>
    )
  }

  return (
    <CommentWrapper>
      <MetaContentWrapper>
        {
          comment.character_name && (
            <CharacterName color={comment.color}>({comment.character_name})</CharacterName>
          )
        }
        <Nickname>
          {comment.nickname || "익명"}
          <span>#{comment.session_id.substr(-5)}</span>
        </Nickname>
        {
          comment.is_mine && (
            
            <CommentButton onClick={
              (e: React.MouseEvent) => {
                e.preventDefault();
                handleOnClickDelete(comment)
              }
            }>삭제</CommentButton>
          )
        }
        {
          comment.is_mine == false && (
            <CommentButton onClick={
              (e: React.MouseEvent) => {
                e.preventDefault();
                handleOnClickReport(comment)
              }
            }>신고</CommentButton>
          )
        }
        <CreatedDate>{
            moment.unix(comment.created / 1000).format('YYYY/MM/DD HH:mm')
        }</CreatedDate>
        <br/>
      </MetaContentWrapper>
      {comment.text}
    </CommentWrapper>
  );
};
