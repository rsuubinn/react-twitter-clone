import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const onChange = (event) => {
    setTweet(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
  };

  const getTweets = async () => {
    const dbTweets = await dbService.collection("tweets").get();
    dbTweets.forEach((document) => {
      const newTweet = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [newTweet, ...prev]);
    });
  };
  useEffect(() => {
    getTweets();
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
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <h4 key={tweet.id}>{tweet.tweet}</h4>
        ))}
      </div>
    </div>
  );
};

export default Home;
