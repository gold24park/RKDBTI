import { CommentInput } from "@components/result/CommentInput";
import { CommentItem } from "@components/result/CommentItem";
import { SectionTitle } from "@components/SectionTitle";
import { Comment } from "@services/models/Comment";
import { request } from "http";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

type Props = {
  unique_id?: number,
  character_name?: string,
  color?: string
}

export const CommentLayout = ({ unique_id, character_name, color }: Props) => {
  const reqHeaders = new Headers({
    "Content-Type": "application/json",
  });
  const pageSize = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE || "8");
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);

  const requestPage = () => {
    fetch(`/api/comments?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setTotalCount(res.total_count);
        setComments(res.comments);
      });
  };

  const handleOnClickReport = (comment: Comment) => {
    if (confirm("이 댓글을 신고할까요?")) {
      fetch(`/api/report`, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify({ id: comment._id }),
      }).then((res) => {
        if (!res.ok) {
          alert("신고에 실패했어요.");
        } else {
          comments.forEach((c) => {
            if (c._id == comment._id) {
              comment.is_reported = true;
            }
          });
          setComments([...comments]);
        }
      });
    }
  };

  const handleOnClickDelete = (comment: Comment) => {
    if (confirm("이 댓글을 삭제할까요?")) {
      fetch(`/api/comments`, {
        method: "DELETE",
        headers: reqHeaders,
        body: JSON.stringify({ id: comment._id }),
      }).then((res) => {
        if (!res.ok) {
          alert("댓글을 삭제할 권한이 없어요.");
        } else {
          requestPage();
        }
      });
    }
  };

  useEffect(() => {
    requestPage();
  }, [page]);

  return (
    <>
      <SectionTitle>
      💬 댓글 {totalCount > 0 ? `(${totalCount})` : ``}
      </SectionTitle>
      <CommentInput 
        unique_id={unique_id}
        character_name={character_name}
        color={color}
        requestNewPage={() => {
          page == 1 ? requestPage() : setPage(1);
        }} />
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment._id}
            comment={comment}
            handleOnClickDelete={handleOnClickDelete}
            handleOnClickReport={handleOnClickReport}
          />
        );
      })}
      <Pagination
        hideNavigation
        firstPageText={`◀`}
        lastPageText={`▶`}
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        onChange={setPage.bind(this)}
      />
    </>
  );
};
