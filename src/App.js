import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar.component';
import CreateRecipe from './components/create-recipe.component';
import RecipeList from './components/recipe-list.component';
import ViewRecipe from "./components/view-recipe.component";
import axios from 'axios';

function App() {
  const [filter, setFilter] = React.useState("");

  const [recipes, setRecipes] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:5000/recipes')
            .then(res => {
                setRecipes(res.data)
            })
            .catch(err => console.log("Error: " + err));
    }, []);

  function handleClick(e) {
    setFilter(e.target.id)
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList recipesList={recipes} />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path="view" element={<ViewRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
