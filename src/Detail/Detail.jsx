import { Link, useParams, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import Commentaire from "../Commentaire/Commentaire.jsx";
import Critique from "../Critique/Critique.jsx";
import './Detail.css';

//use location 
export default function Detail(props)
{
    const { courriel, connecter, produits, setProduits } = props;
    const { id } = useParams();   // Paramètres du routeur
    const location = useLocation();

    let [commentaire, setCommentaire] = useState("");
    let [sid, setId] = useState('1')
    let [miseAJour, setMiseAJour] = useState(false);
    let oBiere = {};
    let [sBiere, setBiere] = useState(oBiere);

    let aCommentaires = [];
    let [commentaires, setCommentaires] = useState(aCommentaires);
    let idCommentaire = '';


    useEffect(() =>
    {
        setId(id);


    }, [id, location]);
    useEffect(() =>
    {
        getBiereParId(sid);


    }, [miseAJour, sid]);

    useEffect(() =>
    {

        getBieres();

    }, [miseAJour]);

    function valideCommentaire()
    {
        if (commentaire == '')
            return true
        else
            return false
    }
    function etoilesCaculation()
    {
        const etoiles = document.querySelectorAll('.star');//la source du video https://www.youtube.com/watch?v=fQIerHqB71w

        etoiles.forEach((etoile, i) =>
        {
            etoile.onclick = function ()
            {
                let etoileNote = (i + 1);
                ajouterNote(etoileNote);
                etoiles.forEach((etoile, j) =>
                {
                    if (etoileNote >= (j + 1))
                    {

                        etoile.innerHTML = '&#9733'
                    } else
                    {
                        etoile.innerHTML = '&#9734'
                    }
                })
            }
        })
    }

    function ajouterNote(note)
    {
        let oNote = {
            note: note,
            courriel: courriel
        }

        const entetes = new Headers();
        entetes.append("Authorization", "Basic " + btoa('biero:biero'));

        const options = {
            method: 'PUT',
            mode: "cors",
            body: JSON.stringify(oNote),
            headers: entetes
        }
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${sid}/note`, options)
            .then(data => data.json())
            .then(data =>
            {

                getBiereParId(sid)
            })

    }

    function getBieres()
    {
        fetch("http://127.0.0.1:8000/webservice/php/biere")
            .then(data => data.json())
            .then(data =>
            {
                setProduits(data.data);
                setMiseAJour(false);


            })

    }

    function getBiereParId(sid)
    {
        let resultat = {};
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${sid}`)
            .then(data => data.json())
            .then(data =>
            {
                resultat = data;
                fetch(`http://127.0.0.1:8000/webservice/php/biere/${sid}/note`)
                    .then(data => data.json())
                    .then(data =>
                    {
                        if (resultat.data !== null)
                        {
                            resultat.data.note_moyenne = data.data.note;
                            resultat.data.note_nombre = data.data.nombre;
                            setBiere(resultat.data);
                            setMiseAJour(false);
                            getCommentaires(sid);
                        }
                    })
            })
    }


    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () =>
    {
        setShowModal(true);

    };

    const handleCloseModal = () =>
    {
        setShowModal(false);

    };

    function ajouterCommentaires()
    {
        let ocommentaire = {
            commentaire: commentaire,
            courriel: courriel
        }
        const entetes = new Headers();
        entetes.append("Authorization", "Basic " + btoa('biero:biero'));

        const options = {
            method: 'PUT',
            mode: "cors",
            body: JSON.stringify(ocommentaire),
            headers: entetes
        }
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${sid}/commentaire`, options)
            .then(data => data.json())
            .then(data =>
            {
                setCommentaire('')
                getCommentaires(sid)
            })

    }

    function getCommentaires(sid)
    {
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${sid}/commentaire`)
            .then(data => data.json())
            .then(data =>
            {
                //console.log(data.data);
                data.data.reverse();
                setCommentaires(data.data);

                setMiseAJour(false);
            })
        // getCritique(sid);  
    }

    const index = props.produits.findIndex((beer) => beer.id_biere === id);
    const isInList = produits.some(biere => biere.id_biere === id)


    const htmlCommentaire = commentaires.map((uneCommentaire, index) =>
    {

        return (
            <Commentaire key={index} uneCommentaire={uneCommentaire} {...uneCommentaire} />
        );
    })
    return (
        <>
            {isInList ? (

                <div>
                    <div className="fiche_biere">
                        <h1>Les détails ({sid})</h1>
                        <p> <strong>Nom : </strong>  {sBiere.nom}</p>
                        <p> <strong> Brasserie :</strong>  {sBiere.brasserie}</p>
                        <p> <strong> Note :</strong>  {sBiere.note_moyenne}</p>
                        <p> <strong> Nombre de note :</strong>  {sBiere.note_nombre}</p>
                        <p> <strong> Descritpion :</strong>  {sBiere.description}</p>
                        <button className="critique" onClick={handleShowModal}>Afficher la Critique</button>
                        {showModal && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={handleCloseModal}>
                                        &times;
                                    </span>
                                    <Critique id={sid} setId={setId} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="avance_recule">
                        {index > 0 && (
                            <Link to={"/detail/" + props.produits[index - 1].id_biere} >🢀 Précedent</Link>
                        )}
                        {index < props.produits.length - 1 ? (
                            <Link to={"/detail/" + props.produits[index + 1].id_biere} >Prochain 🢂</Link>
                        ) : null}
                    </div>
                    <div className="note_commentaire">
                        <section className="star_rating" onClick={etoilesCaculation()}>
                            Note : <button disabled={!connecter} className="star" >&#9734;</button><button disabled={!connecter} className="star">&#9734;</button><button disabled={!connecter} className="star">&#9734;</button><button disabled={!connecter} className="star">&#9734;</button><button disabled={!connecter} className="star">&#9734;</button>

                            Commentaire

                            <input disabled={!connecter} value={commentaire} onChange={(e) => { setCommentaire(e.target.value) }} type="text"></input>
                            <button disabled={valideCommentaire()} onClick={() => { ajouterCommentaires() }}>Commentez</button>

                        </section>
                    </div>


                    <hr />
                    <section>
                        {htmlCommentaire}
                    </section>
                </div>
            ) : (<div>ID n'est disponible dans la base de donneé</div>)
            }


        </>

    )
}