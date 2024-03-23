import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

 const handleClick = ()=>{
    window.location.href='http://www.strava.com/oauth/authorize?client_id=115322&response_type=code&redirect_uri=http://localhost:8080/exchange_token&approval_prompt=force&scope=read'
 }
 const handleData = ()=>{
  const queryParameters = new URLSearchParams(window.location.search)
  const code = queryParameters.get("code")
  const scope = queryParameters.get("scope")
  console.log(code + " " +scope)
 }

 const sentData = ()=>{
  const queryParameters = new URLSearchParams(window.location.search)
  const code = queryParameters.get("code")
  const scope = queryParameters.get("scope")

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code:code,scope:scope})
};
fetch('http://localhost:8080/athlete', requestOptions)
    .then(response => response.json());

 }
  return (
 <>   <button onClick={handleClick}>Login</button>
    <button onClick={handleData}>Read data</button>
    <button onClick={sentData}>Sent Data</button>
    </>
    );


}

export default App;
