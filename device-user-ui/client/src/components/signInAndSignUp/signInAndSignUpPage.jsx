import React from "react";

import SignIn from "../../components/signIn/signIn.jsx";
import SignUp from "../../components/signUp/signUp.jsx";
import "./signInAndSignUp.scss";

const SignInAndSignUpPage = () => (
  <div className="header">
    <h1 className="main-title">SMART HOME USER APPLICATION</h1>

    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  </div>
);

export default SignInAndSignUpPage;
