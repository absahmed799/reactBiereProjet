import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Critique.css';

export default function Critique(props)
{
    //let [courriel, setCourriel] = useState("");
    //let [connecter, setConnecter] = useState(false);
    // console.log(props)
    const { id, setId } = props;
    let aCritique = { acf: { image: '', critique: '' }, guid: '' };
    let [critique, setCritique] = useState(aCritique);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        getCritique(id);
    }, [id]);
    function getCritique(id)
    {
        fetch(`http://127.0.0.1:8000/wp/wp-json/biero/v1/critique/${id}`)
            .then(data => data.json())
            .then(data =>
            {

                if (data == null)
                {
                    setCritique(aCritique);
                } else
                {
                    setCritique(data)
                }
                setIsLoading(false);
            })
    }
    return (
        <>

            {isLoading ? (<div><p>Soyez patient, nous récupérons vos informations...</p>
                <img src="../src/assets/loading.gif" alt="" />
            </div>)

                : (<div>
                    <p><img src={critique.acf.image} alt="" /></p>
                    {critique.acf.note && (<p>Note Degustation : {critique.acf.note}</p>)}

                    {critique.acf.critique && (
                        <p><strong> Critique : {critique.acf.critique.split(' ').slice(0, 20).join(' ')}</strong></p>)}
                    {critique.guid ? (<a href={critique.guid} target="_blank" >read more</a>

                    ) : (
                        <p>Cette biére est n'est encore critiquer Par site WordPress Biero</p>
                    )}

                </div>



                )}

        </>
    );

}