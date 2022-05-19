import React from 'react';
import Recipe from './recipe.component';
import { useNavigate } from 'react-router-dom';

export default function RecipeList(props) {

    const [clickedRecipe, setClickedRecipe] = React.useState();

    let navigate = useNavigate();

    const clickRecipe = (rec) => {
        setClickedRecipe(rec)
      }

    const recipeList = props.recipesList.length > 0 && props.recipesList.map(recipe => {
        return (<Recipe title={recipe.title} img={recipe.picture} key={recipe._id} clickRecipe={() => clickRecipe(recipe)}/>)
    })


    return (
        clickedRecipe
            ? (navigate("view", {state: {rec: clickedRecipe}}))
            : (
                <div className="recipeListContainer">
                    {recipeList}
                </div>)
    )
}