import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/app/Layout";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import SinglePost from "./pages/SinglePost";
import { useRecoilValue } from "recoil";
import { ValueType, authAtom } from "./atoms/authAtom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";


export default function App() {
  const { isLogged } = useRecoilValue(authAtom);
  const setAuthState = useSetRecoilState<ValueType>(authAtom);

  useEffect(() => {
    const session = sessionStorage.getItem("token")
    const getSession = JSON.parse(session!)
    if (getSession === null) {
      setAuthState({
        isLogged: null,
      });
    } else {
      setAuthState({
        isLogged: {
          username: getSession.username,
          token: getSession.token,
          userId: getSession.userId,
        },
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/write"
          element={isLogged ? <CreatePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/posts/:id"
          element={<SinglePost />}
        />
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isLogged ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Route>
    </Routes>
  );
}
