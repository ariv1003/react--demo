import React, { useContext, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { isUserLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof isUserLoggedIn !== "undefined" && isUserLoggedIn) {
      navigate("/dashboard");
    }
  }, [isUserLoggedIn]);

  return (
    <>
      <AuthForm page={"signup"} />
    </>
  );
}

export default Signup;
