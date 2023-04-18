import { useState, useEffect } from "react";
import Produit from "../Produit/Produit";
import "./Liste.css";
export default function Liste(props)
{
    const { produits, setProduits } = props;

    let [miseAJour, setMiseAJour] = useState(false);
    //console.log(props.test)
    //prop.titre = "test";
    useEffect(() =>
    {
        getBieres();

    }, [miseAJour]);

    const htmlProduit = produits.map((unProduit, index) =>
    {
        // console.log(unProduit);

        return (
            <Produit key={index} connecter={props.connecter} unProduit={unProduit} {...unProduit} />
        );
    })

    function getBieres()
    {
        fetch("http://127.0.0.1:8000/webservice/php/biere")
            .then(data => data.json())
            .then(data =>
            {
                setProduits(data.data);
                //  console.log(data.data);
                setMiseAJour(false);
            })
    }

    function ajouterProduit()
    {

        let item = {
            nom: " Item 100",
            fabricant: "Fab 100",
            prix: Math.floor(Math.random() * 50)
        };
        setProduits(produits.concat(item));
        //console.log(aProduits);
    }

    return (
        <>
            <div className="liste">
                <h1 className="">{props.titre}</h1>
                <button onClick={() => { ajouterProduit() }}>AjouterProduit</button>
                <section className="catalogue">
                    {htmlProduit}
                </section>
            </div>

        </>
    )

}