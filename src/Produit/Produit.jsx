import { Link } from "react-router-dom";
import './Produit.css';

export default function Produit(props)
{
    return (
        <article className="unProduit">
            <p>Nom Du biére : {props.nom}</p>
            <p>Brasserie : {props.brasserie}</p>
            <p>Note : {props.note_moyenne}</p>

            <Link to={"/detail/" + props.id_biere}>Voir détails</Link>
        </article>
    )
}