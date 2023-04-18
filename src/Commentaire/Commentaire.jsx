import { Link } from "react-router-dom";
import './Commentaire.css';

export default function Commentaire(props)
{

    //const {id, prix, nom, fabricant, connecter, courriel,commentaire} = props;

    /* function afficherPrix(){
      let elementPrix = <p>Prix : Non disponible</p>;
      if(props.connecter){
          elementPrix = <p>Prix : {prix}</p>
      }*/
    // console.log(elementPrix);
    // return elementPrix;
    //}
    return (
        <article className="uneCommentaire">
            <div className="user">
                <h3>👱{props.courriel}</h3>
                <p><small>{props.date_ajout}</small> </p>
            </div>

            <p>{props.commentaire}</p>

        </article>
    )
}