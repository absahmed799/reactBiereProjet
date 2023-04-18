import './App.css'
import Accueil from '../Accueil/Accueil';
import Entete from '../Entete/Entete';
import Footer from '../Footer/Footer';
import Liste from '../Liste/Liste';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from '../Detail/Detail';

function App()
{
  let [sTitre, setTitre] = useState("Biero");
  let [courriel, setCourriel] = useState("");
  let [connecter, setConnecter] = useState(false);
  let aProduits = [];
  let [produits, setProduits] = useState(aProduits);





  return (
    <Router>
      <Entete setConnecter={setConnecter} setTitre={setTitre} sTitre={sTitre} connecter={connecter} setCourriel={setCourriel} courriel={courriel} />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/liste" element={<Liste produits={produits} setProduits={setProduits} connecter={connecter} titre={sTitre} />} />
        <Route path='/detail/:id' element={<Detail produits={produits} connecter={connecter} setProduits={setProduits} courriel={courriel} />} />
        <Route path='*' element={<h1>Non trouvé - 404</h1>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
