import React, {useState, useEffect} from 'react';
import styles from "./Header.module.css";
import {useCookies} from 'react-cookie';

import { useDispatch, useSelector } from 'react-redux';
import { change } from '../actions';






function Header() {

    const [cookie, setCookie] = useCookies(["isLogin"]);
    const [state, setState] = useState(cookie.isLogin || false);

    const status = useSelector(state => state.status);
    const dispatch = useDispatch();


    const logout = () => {
      setCookie("isLogin", false);
      dispatch(change());
    }

    useEffect(() => {
      if(state !== status.toString()) {
        dispatch(change());
      }
    }, []);


  return (
    <div className={styles.header}>
        <span style={{marginRight: "20px"}} onClick={() => window.location.href = '/'}>Home</span>
        {status &&
        <span style={{marginRight: "20px"}} onClick={() => window.location.href = '/like'}>Like</span>
        }
        {!status &&
          <span onClick={() => window.location.href = '/login'}>Login</span>
        }
        {status && <span onClick={logout}>Logout</span>}
    </div>
  );
}

export default Header;