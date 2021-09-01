import React, { useState, useEffect } from 'react';
import './Ürünler.css';
import Modal from 'react-modal';
import axios from 'axios';

export default function Ürünler(query, pageNumber) {
    
    // Ürün Ekleye basıldı mı kontrol et
    const [açık, setAçık] = useState(false); 
    const [modal, setModal] = useState(false); 
    const [desc, setDesc] = useState("");
    const [urunler, setUrunler] = useState([]);
    const [arama, setArama] = useState('');

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:5000/todos')
            .then(response => setUrunler(response.data));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [query, pageNumber]);

    const onSubmitForm = async(e) => {
        try {
            const body = { desc };

            var headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*"
            }

            axios
                .post('http://localhost:5000/todos', body, headers)
                .then(() => console.log('asd'))
                .catch(err => {
                    console.error(err);
                });
            window.location.reload();
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <div className="ürünlerSayfası">
            <div className="ürünlerİç">
                <div className="başlık">
                    Ürünleri Yönet (Ekle, Sil, Düzenle)
                </div>
                <div className="button">
                    <button onClick={() => setAçık(!açık)}>
                        {açık ? "Ürün Ekle Kapat" : "Ürün Ekle"}
                        
                    </button>
                </div>
                <div className={`${açık ? "ekleForm" : "ekleFormKapalı"}`}>
                    <div className="ekleFormBaşlık">
                        Ürün Ekleme Formu
                    </div>
                    <div className="girdiler">
                        <div className="girdi">
                            <span>Ürün Adı : </span>
                            <input type="text"/>
                        </div>
                        <div className="girdi">
                            <span>Ürün KDV (%) : </span>
                            <input type="number"/>
                        </div>
                        <div className="girdi">
                            <span>Ürün Adet : </span>
                            <input type="number"/>
                        </div>
                        <div className="girdi">
                            <span>Ürün Barkod Numarası : </span>
                            <input type="text"/>
                        </div>
                        <div className="girdi">
                            <span>Ürün Birim Fiyat : </span>
                            <input type="number"/>
                        </div>
                        <div className="girdi">
                            <span>Ürün Kategori : </span>
                            <select name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        <div className="girdi">
                            <span>Ürün Alım : </span>
                            <select name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>  
                        <div className="girdi">
                            <span>Ürün Açıklama : </span>
                            <textarea></textarea>
                        </div>
                    </div>
                    <div className="ekleButonu">
                        <button>
                            Ekle
                        </button>
                    </div>
                </div>
                <div className="yönetim">
                    <div className="başlıkYönetim">
                        Ürün Yönetimi
                    </div>
                    <div className="aramaAlanı">
                        <div className="arama">
                            Arama: <input type="text" onChange={e => setArama(e.target.value)} placeholder="Ürün arayabilirsiniz..." /><button onClick={onSubmitForm}>Gönder</button>
                        </div>
                    </div>
                    <div className="ürünler">
                        <div className="ürünlerTablosu">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ürün Adı</th>
                                        <th>Düzenle-Sil</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {urunler.filter((val) => {
                                        if(arama == "") {
                                            return val;
                                        }
                                        else if (val.urun_isim.toLowerCase().includes(arama.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((urun) => 
                                    <>
                                        <tr key={urun.urun_id}>
                                            <td>{urun.urun_id}</td>
                                            <td>
                                                {
                                                    duzenle ? 
                                                    <input placeholder={`${urun.urun_isim}`} /> 
                                                    : 
                                                    urun.urun_isim
                                                }
                                                
                                            </td>
                                            <td>
                                                <button onClick={() => setModal(!duzenle)} className="düzenle"><i class="fas fa-edit"></i>Düzenle</button>
                                                <button className="sil"><i class="fas fa-trash-alt"></i>Sil</button>
                                            </td>
                                        </tr>
                                        <Modal isOpen={modal}>

                                        </Modal>
                                        </>
                                    )} 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
