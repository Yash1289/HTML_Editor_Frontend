import React, {useContext, useEffect, useState} from 'react';
import './Homepage.css';
import { useGoogleLogin } from '@react-oauth/google';
import useToken from './tokenHook';
import { AuthContext } from '../Context/authContext';
import { tokenContext } from '../Context/tokenContext';


async function getUserInfo(codeResponse) {
  var response = await fetch("https://html-editor-server-backend.onrender.com/google_login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codeResponse.code }), 
  });
  console.log(response)
  return await response.json();
}

const Homepage = (props) => {

  const {token, setToken} = useToken() 

  const { setUser } = useContext(AuthContext);
  const { setAToken } = useContext(tokenContext);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    scope : 'https://www.googleapis.com/auth/drive.readonly',
    onSuccess: async (codeResponse) => {
     
      console.log(codeResponse, "present here")
      var loginDetails = await getUserInfo(codeResponse);
      console.log(loginDetails.user, "from homepage")
      setToken(loginDetails.user)
      setUser(loginDetails.user.email)
      setAToken(loginDetails.user.access_token)
    },
  }); 

  useEffect(() => {
    // When the component mounts, update the parent's state with childData
    console.log(token, " hello from homepage 3")

    const email = token?.email
    const access_token = token?.access_token

    setUser(email)
    setAToken(access_token)
   
    // props.updateState(token);
  }, [token, props]);

  return (
    <div className="homepage">
      <div className="background-image"></div>
      <button type="button" className="login-with-google-btn" onClick={() => googleLogin()} >
        Sign in with Google
      </button>
    </div>
  );
};

export default Homepage;
