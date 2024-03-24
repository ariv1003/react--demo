import React, { useContext, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { isUserLoggedIn, handleSetUserLoggedInTrue } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof isUserLoggedIn !== "undefined" && isUserLoggedIn) {
      navigate("/dashboard");
    }
  }, [isUserLoggedIn]);

  return (
    <>
      <AuthForm
        page="login"
        handleSetUserLoggedInTrue={handleSetUserLoggedInTrue}
      />
    </>
  );
}

export default Login;
