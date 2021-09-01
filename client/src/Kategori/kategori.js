import React from 'react';
import './kategori.css'

export default function Kategoriler() {
    return (
        <div className="ürünlerSayfası">
            <div className="ürünlerİç">
                <div className="başlık">
                    Kategorileri Yönet (Ekle, Sil, Düzenle)
                </div>
                <div className="button">
                    <button>
                        Kategori Ekle
                    </button>
                </div>
                <div className="yönetim">
                    <div className="başlıkYönetim">
                        Kategori Yönetimi
                    </div>
                    <div className="aramaAlanı">
                        <div className="arama">
                            Arama: <input placeholder="Kategori arayabilirsiniz..." />
                        </div>
                    </div>
                    <div className="ürünler">
                        <div className="ürünlerTablosu">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Kategori Adı</th>
                                        <th>Düzenle-Sil</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>
                                            <button className="düzenle"><i class="fas fa-edit"></i>Düzenle</button>
                                            <button className="sil"><i class="fas fa-trash-alt"></i>Sil</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>                                            
                                            <button className="düzenle"><i class="fas fa-edit"></i>Düzenle</button>
                                            <button className="sil"><i class="fas fa-trash-alt"></i>Sil</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry the Bird</td>
                                        <td>
                                            <button className="düzenle"><i class="fas fa-edit"></i>Düzenle</button>
                                            <button className="sil"><i class="fas fa-trash-alt"></i>Sil</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
