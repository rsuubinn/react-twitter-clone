import { useState } from "react";
import { dbService } from "../firebase";

const Tweet = ({ tweet, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweet.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("트윗을 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`tweets/${tweet.id}`).delete();
    }
  };
  const toggleIsEditing = () => setIsEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`/tweets/${tweet.id}`).update({ text: newTweet });
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" required value={newTweet} onChange={onChange} />
            <input type="submit" value="수정하기" />
          </form>
          <button onClick={toggleIsEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{tweet.text}</h4>
          {tweet.attachmentUrl && (
            <img src={tweet.attachmentUrl} width="100px" height="100px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제하기</button>
              <button onClick={toggleIsEditing}>수정하기</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
