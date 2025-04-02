import React from "react";
import Login from "./Login/Login";
import "./styles.css";
export default function LoginContainer() {
  return (
    <div className="loginContainer">
      <p className="informationPhrase">Faça login para ter acesso.</p>
      <Login />
    </div>
  );
}
