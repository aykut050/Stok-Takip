import { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Sayfa from './components/Sayfa/Sayfa';
import Fiş from './components/Fiş/Fiş';
import Kategori from './components/Kategori/Kategori';
import Satış from './components/Satış/Satış';
import CariAlım from './components/cariAlım/cariAlım';
import Urunler from './components/Ürünler/Ürünler';
import CariSatım from './components/cariSatım/cariSatım';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const localApp = localStorage.getItem("admin");

function App() {
  return (
    <>
      <Router>
        {
          localApp ?
            <Switch>
              <Route exact path="/">
                <Sayfa />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/urunler">
                <Sayfa />
              </Route>
              <Route path="/kategoriler">
                <Sayfa />
              </Route>
              <Route path="/fisKesme">
                <Sayfa />
              </Route>
              <Route path="/cariAlım">
                <Sayfa />
              </Route>
              <Route path="/cariSatım">
                <Sayfa />
              </Route>
              <Route path="/satış">
                <Sayfa />
              </Route>
            </Switch> :
            <Login />
        }
      </Router>

    </>
  );
}

export default App;
