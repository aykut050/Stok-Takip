import React, { useState } from 'react';
import './solMenu.css';
import {
    Link,
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Modal from 'react-modal';
import App from '../../App';
import Dashboard from '../Dashboard/dashboard';
import Sayfa from '../Sayfa/Sayfa';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function SolMenu() {
    const [logoutModal, setLogoutModal] = useState(false);


    function logout() {
        localStorage.removeItem("admin");
        window.location.reload();
    }

    return (
        <div className="solMenu">
            <div className="başlık">
                Admin
            </div>
            <Modal isOpen={logoutModal} style={customStyles}>
                <h1>Çıkış Yapmak İster misiniz ? </h1>
                <div className="deleteButtons">
                    <button onClick={() => logout()} className="evetButton">Evet</button>
                    <button onClick={() => setLogoutModal(false)} className="hayırButton">Hayır</button>
                </div>
            </Modal>
            <div className="solMenuEleman">
                <Link to="/"><i class="fas fa-tachometer-alt"></i>Genel Bakış</Link>
                <Link to="/cariAlım"><i class="fas fa-users"></i>Cari (Alım)</Link>
                <Link to="/cariSatım"><i class="fas fa-users"></i>Cari (Satım)</Link>
                <Link to="/urunler"><i class="fas fa-tags"></i>Ürünler</Link>
                <Link to="/kategoriler"><i class="fas fa-book"></i>Kategoriler</Link>
                <Link to="/fisKesme"><i class="fas fa-receipt"></i>Fiş</Link>
                <Link to="/satış"><i class="fas fa-shopping-basket"></i>Satış</Link>
                <Link onClick={() => setLogoutModal(true)}><i class="fas fa-sign-out-alt"></i>Çıkış Yap</Link>
            </div>
        </div>

    )
}
