import React, { useState } from 'react';
import './Sayfa.css';
import Dashboard from '../Dashboard/dashboard';
import Urunler from '../Ürünler/Ürünler';
import SolMenu from '../solMenu/SolMenu';
import Kategori from '../Kategori/Kategori';
import Fiş from '../Fiş/Fiş';
import CariAlım from '../cariAlım/cariAlım';
import CariSatım from '../cariSatım/cariSatım';
import Satış from '../Satış/Satış';
import Login from '../Login/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const local = localStorage.getItem("admin");

export default function Sayfa() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Router>
            {
                JSON.parse(local).userName ? <div className="sayfa">
                <SolMenu />
                <div className="anaKısım">
                    <div className="üçÇizgi">
                        <Link href="#">
                            <i class="fas fa-bars"></i>
                        </Link>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route path="/urunler">
                            <Urunler />
                        </Route>
                        <Route path="/kategoriler">
                            <Kategori />
                        </Route>
                        <Route path="/fisKesme">
                            <Fiş />
                        </Route>
                        <Route path="/cariAlım">
                            <CariAlım />
                        </Route>
                        <Route path="/cariSatım">
                            <CariSatım />
                        </Route>
                        <Route path="/satış">
                            <Satış />
                        </Route>
                    </Switch>
                </div>
            </div> : 
                <Switch>
                    <Route exact path="/Login">
                        <Login />
                    </Route>
                </Switch>
            }
            
        </Router>

    )
}
