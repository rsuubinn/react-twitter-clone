import React, { useEffect, useState } from "react";
import firebase, { authService } from "../firebase";
import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // 초기에는 user가 null 값이지만 login 하면 user가 존재함
      } else setIsLoggedIn(false);
      setInit(true); // 초기화 완료
    });
  }, []);
  return (
    <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}</>
  );
}

export default App;
