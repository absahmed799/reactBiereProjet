import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Entete.css';

export default function Entete(props)
{
    //let [courriel, setCourriel] = useState("");
    //let [connecter, setConnecter] = useState(false);
    // console.log(props)
    const { setConnecter, setCourriel, courriel, sTitre, setTitre, connecter } = props;
    const [courrielValide, setCourrielValide] = useState(false);
    // console.log(sTitre);

    function verifierCourriel()
    {
        //   console.log(courriel);
        if (courriel && !connecter)
        {
            setConnecter(true);
        }
        else if (courriel && connecter)
        {
            setConnecter(false);
        }

        // Mais comment lire le champ input?
    }

    function validerCourriel(sCourriel)
    {
        const regex = /.@./;
        setCourriel(sCourriel);
        if (regex.test(sCourriel))
        {
            setCourrielValide(true);
        }
        else
        {
            setCourrielValide(false);
        }
    }

    function etatConnection()
    {
        let html = <p>Pas connecté</p>;
        if (connecter)
        {
            html = <p>Est connecté</p>;
        }
        return html
    }
    function btnConnection()
    {
        let chaine = "Se connecter";
        if (connecter)
        {
            html = "Se déconnecter";
        }
        return chaine;
    }
    return (
        <header id='entete' className='entete'>
            <h1><NavLink to="/"><img className='logo' src="../src/assets/biero-low-resolution-logo-color-on-transparent-background.svg" alt="Biero" /></NavLink></h1>
            <span className='spacer'></span>
            <nav>
                Courriel<input disabled={connecter} value={courriel} onChange={(e) => { validerCourriel(e.target.value) }} type="text"></input>
                <button disabled={!courrielValide} onClick={(e) => { verifierCourriel() }}>{(!connecter ? "Se connecter" : "Se déconnecter")}</button>
                {etatConnection()}

                <NavLink to="/">Accueil</NavLink>

                <NavLink to="/liste">Liste</NavLink>
            </nav>
        </header>
    );

}