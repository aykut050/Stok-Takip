import React from 'react';
import './solMenu.css';
import {
    Link
} from "react-router-dom";

export default function solMenu() {
    return (
        <div className="solMenu">
            <div className="başlık">
                Admin
            </div>
            <div className="solMenuEleman">
                <Link to="/"><i class="fas fa-tachometer-alt"></i>Genel Bakış</Link>
                <Link to="/cariAlım"><i class="fas fa-users"></i>Cari (Alım)</Link>
                <Link to="/cariSatım"><i class="fas fa-users"></i>Cari (Satım)</Link>
                <Link to="/urunler"><i class="fas fa-tags"></i>Ürünler</Link>
                <Link to="/kategoriler"><i class="fas fa-book"></i>Kategoriler</Link>
                <Link to="/fisKesme"><i class="fas fa-receipt"></i>Fiş</Link>
                <Link to="/satış"><i class="fas fa-shopping-basket"></i>Satış</Link>
                <Link to="/"><i class="fas fa-sign-out-alt"></i>Çıkış Yap</Link>
            </div>
        </div>
    )
}
