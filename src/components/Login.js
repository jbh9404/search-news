import React, {useState, useEffect} from 'react';
import styles from "./Login.module.css";
import {useCookies} from 'react-cookie';


function Login() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [cookie, setCookie] = useCookies(["isLogin"]);
    const [state, setState] = useState(cookie.isLogin || false);

    const handleId = (e) => {
        setId(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const submit = () => {
        if(id === "test" && password === "test") {
            setAlert(false);
            setCookie("isLogin", true);
            window.location.href = '/';
        }
        else{
            setAlert(true);
        }
    }

    console.log(state);

  return (
    <div>
        <div className={styles.loginBox}>
            <div className={styles.subtitle}>LOGIN</div>
            <input className={styles.inputBox} type="text" onChange={handleId} placeholder="Type id"></input>
            <input className={styles.inputBox} type="password" onChange={handlePassword} placeholder="Type password"></input>
            <div className={styles.loginBtn} onClick={submit}>Login</div>
            {alert && (<span className={styles.message}>Please type correct information</span>)}
        </div>
    </div>
  );
}

export default Login;