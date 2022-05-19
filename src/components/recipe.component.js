import React from 'react';

export default function Recipe(props) {
    return (
        <div className="recipeTile" key={props.title} onClick={props.clickRecipe}>
            <div>
                <img className="recipe--img" src={props.img}/>
            </div>
            <div className="recipeInfos">
                <h4 className="recipeTitle">{props.title}</h4>
            </div>
        </div>
    )
};