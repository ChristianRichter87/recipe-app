import React from "react";
import axios from 'axios';
import {useLocation} from 'react-router-dom';

export default function CreateRecipe(props) {

    const masseinheiten = ["g", "kg", "tl", "el", "ml", "l", "Stück"];
    const kategorien = ["Abendessen", "Mittagessen", "Backen", "Frühstück", "Snacks"];

    const location = useLocation();
    const rec = location.state ? location.state.rec : {
        title: "",
        ingredients: [],        
        description: [],
        picture: ""
    };

    const editFlag = location.state ? true : false;

    const [curIngr, setCurIngr] = React.useState({
        name: "",
        qty: "",
        me: masseinheiten[0],
        editFlag: false,
        indexId: null
    });

    const [curBeschr, setCurBeschr] = React.useState({
        content: "",
        editFlag: false,
        indexId: null
    });

    const [recipe, setRecipe] = React.useState(rec);

    React.useEffect(() => {
        if (props.length > 0) {
            setRecipe({
                title: rec.title,
                ingredients: rec.ingredients,
                description: rec.description,
                picture: rec.picture
            })
        }
    }, [])

    const onChangeTitle = (e) => {
        setRecipe(prevRec => ({
            ...prevRec,
            title: e.target.value
        }))
    }

    const onChangeCurIngrName = (e) => {
        setCurIngr(prevIngr => ({
            ...prevIngr,
            name: e.target.value
        }))
    };

    const onChangeCurIngrQty = (e) => {
        setCurIngr(prevIngr => ({
            ...prevIngr,
            qty: e.target.value
        }))
    }

    const onChangeCurIngrMe = (e) => {
        setCurIngr(prevIngr => ({
            ...prevIngr,
            me: e.target.value
        }))
    }

    const onSubmitZutatForm = (e) => {
        e.preventDefault();
        let ingrToAdd = {
            name: curIngr.name,
            qty: curIngr.qty,
            me: curIngr.me
        }

        let ingredientsArray = [...recipe.ingredients];

        if (curIngr.editFlag) {
            ingredientsArray[curIngr.indexId] = ingrToAdd;
        } else {
            ingredientsArray.push(ingrToAdd);
        }
        
        setRecipe(prevRec => ({
            ...prevRec,
            ingredients: [...ingredientsArray]
        }));

        setCurIngr({
            name: "",
            qty: "",
            me: masseinheiten[0],
            editFlag: false,
            indexId: null
        });
    }

    const onSubmitBeschreibungForm = (e) => {
        e.preventDefault();

        let beschrArray = [...recipe.description];

        if (curBeschr.editFlag) {
            beschrArray[curBeschr.indexId] = curBeschr.content
        } else {
            beschrArray.push(curBeschr.content);
        }

        setRecipe(prevRec => ({
            ...prevRec,
            description: beschrArray
        }));

        setCurBeschr({
            content: "",
            editFlag: false,
            indexId: null
        });
    }

    const onClickDeleteZutat = (itemToDelete) => {
        if(!curIngr.editFlag) {
            setRecipe(prevRec => ({
            ...prevRec,
            ingredients: prevRec.ingredients.filter(item => item.name !== itemToDelete.name)
            }))
        }
    }

    const onClickEditZutat = (itemToEdit) => {
        setCurIngr({
            ...itemToEdit,
            editFlag: true,
            indexId: recipe.ingredients.findIndex(item => item.name === itemToEdit.name)
        });
    }    

    const onClickDeleteBeschr = (itemToDelete) => {
        if(!curBeschr.editFlag) {
                setRecipe(prevRec => ({
                ...prevRec,
                description: prevRec.description.filter(item => item !== itemToDelete)
            }))
        }
    }

    const onClickEditBeschr = (itemToEdit) => {
        setCurBeschr({
            content: itemToEdit,
            editFlag: true,
            indexId: recipe.description.findIndex(item => item === itemToEdit)
        });
    }

    const onChangeDescription = (e) => {
        setCurBeschr(prevDesc => ({
            ...prevDesc,
            content: e.target.value
        })
        )
    }

    const addRecipe = (e) => {
        e.preventDefault();
        if(editFlag) {
            axios.post('http://localhost:5000/recipes/update/'+recipe._id, recipe).then(res => console.log(res.data));
        }
        else {
            axios.post('http://localhost:5000/recipes/add', recipe)
            .then(res => console.log(res.data));
        }
        window.location = "/";
    }

    const onChangeUpload = (e) => {
        let formData = new FormData();

        formData.append('picture', e.target.files[0]);

        axios.post('http://localhost:5000/recipes/upload', formData, {'content-type': 'multipart/form-data'})
            .then(res => setRecipe(prevRec => ({
                ...prevRec,
                picture: res.data.data
            })))
    }

    return (
        <div className="createRecipe--container">
            <h3 className="viewRecipe--h4">{editFlag ? "" : "Neues " }Rezept {editFlag ? "anpassen" : "erstellen"}</h3>
            <div className="form--recipe">
                <div className="form--element">
                    <label>Rezeptname: </label>
                    <input type="text" className="form--text" value={recipe.title} onChange={onChangeTitle}/>
                </div>
                <div className="form--element">
                    <label>Foto wählen: </label>
                    <input type="file" className="form--file" onChange={onChangeUpload}/>
                </div>
                <form className="form--zutat">
                    <div className="form--element">
                        <label>Zutat hinzufügen: </label>
                        <input type="text" id="zutatName" value={curIngr.name} className="form--text" placeholder="Zutat eingeben..." onChange={onChangeCurIngrName}/>
                        <input type="number" id="zutatQty" value={curIngr.qty} className="form--text" placeholder="Menge eingeben..." onChange={onChangeCurIngrQty}/>
                        <select className="form--text" value={curIngr.me} onChange={onChangeCurIngrMe}>
                            {masseinheiten.map(me => {
                                return (
                                    <option key={me} value={me}>{me}</option>
                                )
                            })}
                        </select>
                        <button type="submit" className="submit--btns" onClick={onSubmitZutatForm}><i className="fa-solid fa-plus"></i></button>
                        <br/>
                        {recipe.ingredients.length > 0 && recipe.ingredients.map(ingr => {
                            return (
                                <div className="ingr--list" key={ingr.name} id={ingr.name}>
                                    <div>{ingr.name} {ingr.qty} {ingr.me}</div>
                                    <div className="ingr--buttons">
                                        <i className="form--buttons fa-solid fa-pen" onClick={() => onClickEditZutat(ingr)}></i>
                                        <i className="form--buttons fa-solid fa-trash-can" onClick={() => onClickDeleteZutat(ingr)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </form>
                <form className="form--beschreibung">
                    <label>Zubereitungsschritt hinzufügen: </label>
                    <div className="textarea--div">
                        <textarea type="text" className="form--text" placeholder="Zubereitung in Schritten erfassen..." value={curBeschr.content} onChange={onChangeDescription}/>
                        <button type="submit" className="submit--btns" onClick={onSubmitBeschreibungForm}><i className="fa-solid fa-plus"></i></button>
                    </div>
                    <ol className="beschr--list">
                        {recipe.description.length > 0 && recipe.description.map(step => {
                            return (
                                <li key={step} id={step} className="beschr--li">
                                    <div className="beschr--div">
                                        <div>{step}</div>
                                        <div className="beschr--buttons">
                                            <i className="form--buttons fa-solid fa-pen" onClick={() => onClickEditBeschr(step)}></i>
                                            <i className="form--buttons fa-solid fa-trash-can" onClick={() => onClickDeleteBeschr(step)}></i>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </form>
                <button type="submit" onClick={addRecipe} className="btns-large" id="addRecipeBtn">Rezept {editFlag ? "anpassen" : "hinzufügen"}</button>
            </div>
        </div>
    )
}