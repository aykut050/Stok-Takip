import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import {
    Redirect,
    Switch,
    Route,
    Router
} from "react-router-dom";
import Sayfa from '../Sayfa/Sayfa';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [notifi, setNotifi] = useState(false);

    // const refreshToken = async () => {
    //     try {
    //         const admin = JSON.parse(localStorage.getItem("admin"))
    //         const res = await axios.post("/refresh", {token: admin.refreshToken})
    //         JSON.parse(localStorage.getItem("admin")).acccessToken = res.data.acccessToken
    //         JSON.parse(localStorage.getItem("admin")).refreshToken = res.data.refreshToken
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // axios.interceptors.request.use(async (config) => {
    //     let currentDate = new Date();
    //     const decodedToken = (JSON.parse(localStorage.getItem("admin")).acccessToken)
    // })

    // console.log(jwt_decode(JSON.parse(localStorage.getItem("admin")).acccessToken))

    const eventHandler = async (event) => {
        try {
            const loginObject = {
                admin_user_name: username,
                admin_password: password
            }
            await axios.post('http://localhost:5000/api/adminLogin', loginObject).then(function (res) {
                if (res.data == "Hatalı Giriş Yaptınız") {
                    setNotifi(true);
                    setUsername("");
                    setPassword("");
                } else {
                    localStorage.setItem('admin', JSON.stringify(res.data))
                    setIsLogin(true)
                    window.location.reload();
                }
            })

            // if (res) {
            //     localStorage.setItem('admin', JSON.stringify(res.data))
            //     setIsLogin(true)
            // } else {
            //     setNotifi(true)
            // }
        } catch (error) {
            console.log(error.message)
        }
    }
    if (isLogin == true) {
        return (<Redirect to={'/'} />)
    }
    if (localStorage.getItem('admin')) {
        return (<Redirect to={'/'} />)
    }
    return (
        <div className="loginSayfası">
            <div className="loginBaşlık">
                Giriş Yap
            </div>
            <div className="loginForm">
                <div className="loginAçıklama">
                    Sistemi kullanmak için giriş yapmanız gerekmektedir.
                </div>
                <div className="loginInputlar">
                    <div className="kullanıcıAdı">
                        <input type="text" placeholder="Kullanıcı Adı" name="userName" value={username} onChange={e => setUsername(e.target.value)} autoComplete="off" required />
                    </div>
                    <div className="şifre">
                        <input type="password" placeholder="Şifre" name="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" required />
                    </div>
                </div>
                <div>
                    {
                        notifi ? <p style={{ color: "red" }}>Hatalı Giriş Yaptınız</p> : null
                    }
                </div>
                <div className="loginButton">
                    <button onClick={eventHandler}>Giriş Yap</button>
                </div>
            </div>
        </div>
    )
}
