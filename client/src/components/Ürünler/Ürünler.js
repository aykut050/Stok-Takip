import React, { useState, useEffect } from 'react';
import './Ürünler.css';
import axios from 'axios';
import Modal from 'react-modal';
import Login from '../Login/Login';
import {
    Redirect
} from "react-router-dom";

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

const localStore = localStorage.getItem("admin");

export default function Ürünler() {

    // Ürün Ekleye basıldı mı kontrol et
    const [açık, setAçık] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [productName, setProductName] = useState("");
    const [productKDV, setProductKDV] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productBarcodeNumber, setProductBarcodeNumber] = useState("");
    const [productUnitPrice, setProductUnitPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productBuyer, setProductBuyer] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [urunler, setUrunler] = useState([]);
    const [editProduct1, setEditProduct1] = useState([]);
    const [editProductId, setEditProductId] = useState("");
    const [editProductName, setEditProductName] = useState("");
    const [editProductKDV, setEditProductKDV] = useState("");
    const [editProductQuantity, setEditProductQuantity] = useState("");
    const [editProductBarcodeNumber, setEditProductBarcodeNumber] = useState("");
    const [editProductUnitPrice, setEditProductUnitPrice] = useState("");
    const [editProductCategory, setEditProductCategory] = useState("");
    const [editProductBuyer, setEditProductBuyer] = useState("");
    const [editProductDescription, setEditProductDescription] = useState("");
    const [arama, setArama] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState("");
    const [submit, setSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const token = JSON.parse(localStorage.getItem("admin")).accessToken;
        const product = {}
        await axios
            .post('http://localhost:5000/verify', product, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
            .then((response) => {
                if (response.data.err == "Token is not valid!") {
                    localStorage.removeItem("admin");
                    window.location.replace("http://localhost:3000/Login")
                }
            })
        await getProducts();
    }, [submit, modalVisible, deleteModal]);

    const getProducts = async () => {
        const token = await JSON.parse(localStorage.getItem("admin")).accessToken;
        await axios.get('http://localhost:5000/getProducts', {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then((response) => { setUrunler(response.data) });
        setIsLoading(false)
    }

    const successSubmit = () => {
        setSubmit(!submit);
        alert("Ürün Başarıyla Eklendi")
    }

    const handleSubmit = async (e) => {
        try {
            const product = {
                productName: productName,
                productKDV: productKDV,
                productQuantity: productQuantity,
                productBarcodeNumber: productBarcodeNumber,
                productUnitPrice: productUnitPrice,
                productCategory: productCategory,
                productBuyer: productBuyer,
                productDescription: productDescription,
            }
            const token = JSON.parse(localStorage.getItem("admin")).accessToken;
            let i = 0;
            urunler.map((data) => {
                if (productName == data.urun_isim) {
                    ++i;
                    const quantity = parseInt(data.urun_adet) + parseInt(productQuantity);
                    const existProduct = {
                        productId: data.urun_id,
                        productQuantity: quantity,
                    }
                    axios
                        .put('http://localhost:5000/editProductExist', existProduct)
                        .then(setSubmit(!submit))
                        .catch(err => {
                            console.error(err);
                        });
                }
            })
            if (i == 0) {
                if(productName == "" || productBarcodeNumber == "" || productBuyer == "" || productUnitPrice == "" || productCategory == "" || productUnitPrice == "" ) {
                    alert("Lütfen Gerekli Bilgileri Doldurunuz")
                }
                else {
                    await axios
                    .post('http://localhost:5000/addProduct', product, {
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    })
                    .then(successSubmit())
                    .catch(err => {
                        console.error(err);
                    });
                }
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleSubmitEdit = async (e) => {
        try {
            const product = {
                productId: editProductId,
                productName: editProductName,
                productKDV: editProductKDV,
                productQuantity: editProductQuantity,
                productBarcodeNumber: editProductBarcodeNumber,
                productUnitPrice: editProductUnitPrice,
                productCategory: editProductCategory,
                productBuyer: editProductBuyer,
                productDescription: editProductDescription,
            }
            axios
                .put('http://localhost:5000/editProduct', product)
                .then(setModalVisible(false))
                .catch(err => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err.message)
        }
    }

    async function edit(id) {
        await setModalVisible(true)
        let editProduct = urunler.find(element => id === element.urun_id)
        let editProduct2 = JSON.stringify(editProduct);
        editProduct2 = JSON.parse(editProduct2);
        setEditProduct1(editProduct2);
        setEditProductId(editProduct2.urun_id)
        setEditProductName(editProduct2.urun_isim)
        setEditProductKDV(editProduct2.urun_kdv)
        setEditProductBarcodeNumber(editProduct2.urun_barkod_numarası)
        setEditProductCategory(editProduct2.urun_kategori)
        setEditProductDescription(editProduct2.urun_aciklama)
        setEditProductQuantity(editProduct2.urun_adet)
        setEditProductUnitPrice(editProduct2.urun_fiyat)
    }

    async function deleteProduct(id) {
        setDeleteModal(true);
        setDeleteProductId(id)
    }

    async function productDelete() {
        try {
            axios.post('http://localhost:5000/deleteProduct', { deleteProductId })
                .then(setDeleteModal(false))
        } catch (error) {
            console.log(error)
        }
    }

    function Login() {
        return (<Redirect to={'/Login'} />)
    }

    return (
        localStore ?
            isLoading ? <div>
                Sayfa Yükleniyor
            </div> :
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
                            <div>
                                <div className="ekleFormBaşlık">
                                    Ürün Ekleme Formu
                                </div>
                                <div className="girdiler">
                                    <div className="girdi">
                                        <span>Ürün Adı : </span>
                                        <input type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün KDV (%) : </span>
                                        <input type="number" name="productKDV" value={productKDV} onChange={(e) => setProductKDV(e.target.value)} />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Adet : </span>
                                        <input type="number" name="productQuantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Barkod Numarası : </span>
                                        <input type="text" name="productBarcodeNumber" value={productBarcodeNumber} onChange={(e) => setProductBarcodeNumber(e.target.value)} required />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Birim Fiyat : </span>
                                        <input type="number" name="productUnitPrice" value={productUnitPrice} onChange={(e) => setProductUnitPrice(e.target.value)} required />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Kategori : </span>
                                        <select name="productCategory" id="cars" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                                            <option value="">Kategori</option>
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                            <option value="mercedes">Mercedes</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Alım : </span>
                                        <select name="productBuyer" id="cars" value={productBuyer} onChange={(e) => setProductBuyer(e.target.value)}>
                                            <option value="">Kimden alındı</option>
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                            <option value="mercedes">Mercedes</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Açıklama : </span>
                                        <textarea name="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="ekleButonu">
                                    <button onClick={handleSubmit}>
                                        Ekle
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Modal isOpen={modalVisible} style={customStyles}>
                            <div className="düzenleForm">
                                <input type="hidden" name="productId" value={editProductId} />
                                <div className="ekleFormBaşlık">
                                    Ürün Düzenleme <button onClick={() => setModalVisible(false)} id="düzenleKapat">X</button>
                                </div>
                                <div className="girdiler">
                                    <div className="girdi">
                                        <span>Ürün Adı : </span>
                                        <input type="text" name="productName" style={{ border: "1px solid black" }} value={editProductName} onChange={(e) => setEditProductName(e.target.value)} required />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün KDV (%) : </span>
                                        <input type="number" name="productKDV" style={{ border: "1px solid black" }} value={editProductKDV} onChange={(e) => setEditProductKDV(e.target.value)} />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Adet : </span>
                                        <input type="number" name="productQuantity" style={{ border: "1px solid black" }} value={editProductQuantity} onChange={(e) => setEditProductQuantity(e.target.value)} required />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Barkod Numarası : </span>
                                        <input type="text" name="productBarcodeNumber" style={{ border: "1px solid black" }} value={editProductBarcodeNumber} onChange={(e) => setEditProductBarcodeNumber(e.target.value)} required />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Birim Fiyat : </span>
                                        <input type="number" name="productUnitPrice" style={{ border: "1px solid black" }} value={editProductUnitPrice} onChange={(e) => setEditProductUnitPrice(e.target.value)} required />
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Kategori : </span>
                                        <select name="productCategory" style={{ border: "1px solid black" }} id="cars" value={editProductCategory} onChange={(e) => setEditProductCategory(e.target.value)}>
                                            <option value="">Kategori</option>
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                            <option value="mercedes">Mercedes</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Alım : </span>
                                        <select name="productBuyer" id="cars" style={{ border: "1px solid black" }} onChange={(e) => setEditProductBuyer(e.target.value)}>
                                            <option value="">Kimden alındı</option>
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                            <option value="mercedes">Mercedes</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                    </div>
                                    <div className="girdi">
                                        <span>Ürün Açıklama : </span>
                                        <textarea name="productDescription" style={{ border: "1px solid black" }} value={editProductDescription} onChange={(e) => setEditProductDescription(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="ekleButonu">
                                    <button onClick={handleSubmitEdit}>
                                        Düzenle
                                    </button>
                                </div>
                            </div>
                        </Modal>
                        <Modal isOpen={deleteModal} style={customStyles}>
                            <h1>Bu Ürünü Silmek İstediğinizden emin misiniz?  </h1>
                            <div className="deleteButtons">
                                <button className="evetButton" onClick={() => productDelete(deleteProductId)}>Evet</button>
                                <button className="hayırButton" onClick={() => setDeleteModal(false)}>Hayır</button>
                            </div>
                        </Modal>
                        <div className="yönetim">
                            <div className="başlıkYönetim">
                                Ürün Yönetimi
                            </div>
                            <div className="aramaAlanı">
                                <div className="arama">
                                    Arama: <input type="text" onChange={e => setArama(e.target.value)} placeholder="Ürün arayabilirsiniz..." />
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
                                            {
                                                urunler.filter((val) => {
                                                    if (arama == "") {
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
                                                                {urun.urun_isim}
                                                            </td>
                                                            <td>
                                                                <button onClick={() => edit(urun.urun_id)} className="düzenle"><i class="fas fa-edit"></i>Düzenle</button>
                                                                <button onClick={() => deleteProduct(urun.urun_id)} className="sil"><i class="fas fa-trash-alt"></i>Sil</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : Login()
    )
}
