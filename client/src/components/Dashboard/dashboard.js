import React, { useState, useEffect } from 'react';
import './dashboard.css';
import {
    Link
} from "react-router-dom";
import axios from 'axios';

export default function Dashboard() {
    const [urun, setUrun] = useState([])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("admin")).accessToken;

        axios.get('http://localhost:5000/getProducts', {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(response => setUrun(Object.keys(response.data).length));
    }, []);

    return (
        <div className="dashSayfası">
            <div className="başlık">
                Genel Bakış
            </div>
            <div className="dashElemanlar">
                <Link to="/urunler" className="genelBakışKutuÜrün">
                    <p className="sayı">
                        {urun}
                    </p>
                    <p className="açıklama">
                        Toplam Ürün
                    </p>
                    <Link to="/urunler">
                        Detay Bilgi İçin Tıklayın
                    </Link>
                </Link>
                <Link to="/cariAlım" className="genelBakışKutuCariAlım">
                    <p className="sayı">
                        0
                    </p>
                    <p className="açıklama">
                        Cari (Alım)
                    </p>
                    <Link to="/cariAlım">
                        Detay Bilgi İçin Tıklayın
                    </Link>
                </Link>
                <Link to="/cariSatım" className="genelBakışCariSatım">
                    <p className="sayı">
                        0
                    </p>
                    <p className="açıklama">
                        Cari (Satım)
                    </p>
                    <Link to="/cariSatım">
                        Detay Bilgi İçin Tıklayın
                    </Link>
                </Link>
                <Link to="/kategoriler" className="genelBakışKategoriler">
                    <p className="sayı">
                        0
                    </p>
                    <p className="açıklama">
                        Toplam Kategoriler
                    </p>
                    <Link to="/kategoriler">
                        Detay Bilgi İçin Tıklayın
                    </Link>
                </Link>
                <Link to="/fisKesme" className="genelBakışFişKesme">
                    <p className="sayı">
                        0
                    </p>
                    <p className="açıklama">
                        Fiş Kesme
                    </p>
                    <Link to="/fisKesme">
                        Detay Bilgi İçin Tıklayın
                    </Link>
                </Link>
                <Link to="/satış" className="genelBakışKutuSatış">
                    <p className="sayı">
                        0
                    </p>
                    <p className="açıklama">
                        Toplam Satışlar
                    </p>
                    <Link to="/satış">
                        Detay Bilgi İçin Tıklayın
                    </Link>
                </Link>
            </div>
        </div>
    )
}
