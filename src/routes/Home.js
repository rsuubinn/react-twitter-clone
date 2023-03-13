import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onChange = (event) => {
    setTweet(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
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
    </div>
  );
};

export default Home;
