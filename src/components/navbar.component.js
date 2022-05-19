import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

    const toggleNavbar = () => {
        const navBtn = document.querySelector(".navbar-btn");
        const navBar = document.getElementById("navbar--list");
        const btnStatus = navBar.getAttribute("data-visible");

        navBar.setAttribute("data-visible", btnStatus === "false" ? true : false);
        navBtn.childNodes[0].classList.toggle("fa-bars");
        navBtn.childNodes[0].classList.toggle("fa-xmark");

        // <i className="fa-solid fa-xmark"></i>
    }

    return (
        <nav className="navbar--main">
            <h2 id="navbar--header">Meine Rezepte</h2>
            <button className="navbar-btn" onClick={toggleNavbar}><i className="fa-solid fa-bars"></i></button>
            <ul id="navbar--list" data-visible="false">
                <li className="navbar--elem">
                    <Link to="/" className="navbar--link">Alle Rezepte</Link>
                </li>
                {/* <li id="salate" className="navbar--elem" onClick={props.category}>Salate</li>
                <li id="pasta" className="navbar--elem" onClick={props.category}>Pasta</li>
                <li id="desserts" className="navbar--elem" onClick={props.category}>Desserts</li> */}
                <li className="navbar--elem">
                    <Link to="/create" className="navbar--link">Rezept erstellen</Link>
                </li>
            </ul>
        </nav>
    )
};

/*
    - Kategorien in Rezept hinzufügen? -> Gleiche Array für Navbar und Auswahl in Rezepterfassung
    - Dauer des Rezepts hinzufügen?
    - Rezept erstellen Link aus Rezept bearbeiten funktioniert nicht (Maske wird nicht gecleared)
    - Picture delete S3 falls Rezept gelöscht wird
*/