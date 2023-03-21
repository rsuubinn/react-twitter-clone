import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();
  const onChange = (event) => {
    setTweet(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);
    // await dbService.collection("tweets").add({
    //   text: tweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setTweet("");
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const image = files[0];
    const reader = new FileReader();
    reader.onload = (finishEvent) => {
      const {
        currentTarget: { result },
      } = finishEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(image);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {attachment && (
          <>
            <img src={attachment} width="100px" height="100px" />
            <button onClick={onClearAttachment}>지우기</button>
          </>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
