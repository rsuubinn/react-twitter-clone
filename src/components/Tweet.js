import { dbService } from "../firebase";

const Tweet = ({ tweet, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("트윗을 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`tweets/${tweet.id}`).delete();
    }
  };
  return (
    <div>
      <h4>{tweet.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>삭제하기</button>
          <button>수정하기</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
