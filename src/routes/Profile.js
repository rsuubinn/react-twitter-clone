import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { dbService, authService } from "../firebase";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  return (
    <>
      <button onClick={onLogoutClick}>Log Out</button>
    </>
  );
};

export default Profile;
