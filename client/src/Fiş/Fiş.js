import React from 'react'
import './Fiş.css'

export default function Fiş() {
    return (
        <div className="fişSayfası">
            <div className="fişSayfasıBaşlık">
                Fiş Kesme
            </div>
            <div className="fişKesmeAlanı">
                <div className="fiştekiAlan">
                    <div className="fiştekiİsim">
                        <b>Müşteri</b>
                    </div>
                    <div className="fiştekiDeğer">
                        <select name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </div>
                <div className="fiştekiAlanÜrün">
                    <div className="fiştekiAlanÜrünBorder">
                        <div className="ürünİsim">
                            <div className="ürünİsimLabel">
                                <div id="ad">
                                    Ürün Adı
                                </div>
                            </div>
                            <div className="ürünİsimDeğer">
                                <select name="cars" id="cars">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                        </div>
                        <div className="ürünAdet">
                            <div className="ürünAdetLabel">
                                <div id="adet">
                                    Adet
                                </div>
                            </div>
                            <div className="ürünAdetDeğer">
                                <input type="number" id="quantity" name="quantity" min="1" max="5" />
                            </div>
                        </div>
                        <div className="ürünFiyat">
                            <div className="ürünFiyatLabel">
                                <div id="fiyat">
                                   Birim Fiyat (TL)
                                </div>
                            </div>
                            <div className="ürünFiyatDeğer">
                                <input type="text" id="fname" name="fname"/>
                            </div>
                        </div>
                        <div className="ürünEkle">
                            <div className="ürünEkleLabel">
                                <div id="button">
                                    <button><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                            <div className="ürünEkleDeğer">
                                <button><i class="fas fa-times"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="fişSeçenekleri">
                        <div>

                        </div>
                        <div className="özellikler">
                            <div className="özellik">
                                <div id="kdv">
                                    <div className="kdvİsim">
                                        <b>KDV Oranı(%) </b>
                                    </div>
                                    <div className="kdvDeğer">
                                        <input type="number" id="quantity" name="quantity" min="1" max="5" />
                                    </div>
                                </div>
                            </div>
                            <div className="özellik">
                                <div id="ödemeDurumu">
                                    <div className="ödemeDurumuİsim">
                                        <b>Ödeme Durumu</b>
                                    </div>
                                    <div className="ödemeDurumuDeğer">
                                        <select name="cars" id="cars">
                                            <option value="volvo">Ödendi</option>
                                            <option value="saab">Ödenmedi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="fişButonları">
                        <div className="pdfOluştur">
                            <button>
                                <i class="fas fa-file-pdf"></i>PDF Oluştur
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
