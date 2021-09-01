import React from 'react';
import './Satış.css';


export default function Satış() {
    return (
        <div className="satışSayfası">
            <div className="satışSayfasıPadding">
                <div className="satışSayfasıBaşlık">
                    Satışları Görüntüle
                </div>
                <div className="satışSayfasıGörüntülemeAlanı">
                    <div className="satışSayfasıGörüntülemeAlanıPadding">
                        <div className="satışSayfasıTarihSeçme">
                            <div className="satışSayfasıTarihSeçmePadding">
                                <div className="ilkTarihSeç">
                                    <div className="ilkTarihSeçPadding">
                                        İlk Tarihi Seçiniz: 
                                        <input type="date" id="birthday" name="birthday" />
                                    </div>

                                </div>
                                <div className="sonTarihSeç">
                                    <div className="sonTarihSeçPadding">
                                        Son Tarihi Seçiniz:
                                        <input type="date" id="birthday" name="birthday" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="satışSayfasıSonuçGörüntüle">
                            <div className="satışSayfasıSonuçGörüntülePadding">
                                <div className="satışSayfasıSonuçGörüntüleBaşlık">
                                    Seçmiş Olduğunuz Tarihler Arası Yapılan Satışlar
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Ürün Adı</th>
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
        </div>
    )
}
