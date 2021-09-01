import React from 'react'
import './Login.css'

export default function Login() {
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
                        <input type="text" placeholder="Kullanıcı Adı" name="kullanıcıAdı"/>
                    </div>
                    <div className="şifre">
                        <input type="password" placeholder="Şifre" name="şifre"/>
                    </div>
                </div>
                <div className="loginButton">
                    <button>Giriş Yap</button>
                </div>
            </div>
        </div>
    )
}
