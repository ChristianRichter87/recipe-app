import React from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewRecipe() {

    const location = useLocation();
    const recipe = location.state.rec

    let navigate = useNavigate();

    const onClickEditRecipe = () => {
        navigate("../create", {state: {rec: recipe}, replace: true})
    }

    const onClickDeleteRecipe = () => {
        if (window.confirm("Rezept wirklich löschen?")) {
            axios.delete('http://localhost:5000/recipes/'+recipe._id).then(res => console.log(res.data));
            window.location = "/";
        }
    }

    return (
        <article className="viewRecipe--container">
            <section className="viewRecipe--header">
                <img className="viewRecipe--img" src={recipe.picture}/>
                <h3 className="viewRecipe--title">
                    {recipe.title}
                </h3>
            </section>
            <section className="viewRecipe--edit">
                <button className="btns-large" type="button" onClick={onClickEditRecipe}>Rezept bearbeiten</button>
            </section>
            <section className="viewRecipe--ingredients">
                <h4 className="viewRecipe--h4">Zutaten:</h4>
                <ul>
                    {recipe.ingredients.map(item => {
                        return (
                            <li key={item.name}>
                                {item.name} {item.qty} {item.me}
                            </li>
                        )
                    })}
                </ul>
            </section>
            <hr/>
            <section className="viewRecipe--steps">
                <h4 className="viewRecipe--h4">Zubereitungsschritte:</h4>
                <ol>
                    {recipe.description.map(item => {
                        return (
                            <li key={item}>
                                {item}
                            </li>
                        )
                    })}
                </ol>
            </section>
            <section className="viewRecipe--delete">
                <button className="btns-large" type="button" onClick={onClickDeleteRecipe}>Rezept löschen</button>
            </section>
        </article>
    )
}