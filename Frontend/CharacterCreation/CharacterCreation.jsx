import React, { useState } from "react";
import "./CharacterCreator.css";

export default function CharacterCreator() {
    const CharacterCreator = ({ onCreateCharacter }) => {
    const [character, setCharacter] = useState({
        name: "",
        class: "",
        race: "",
        level: "",
        background: "",
        hp: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter({ ...character, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // input vaidation??
        if (!character.name || !character.class) return;

        // replace with database call
        if (onCreateCharacter) {
        onCreateCharacter(character);
        }

        // reset form
        setCharacter({
        name: "",
        class: "",
        race: "",
        level: "",
        background: "",
        hp: ""
        });
    };

    return (
        <div className="page">
        <div className="header"></div>

        <div className="center">
            <div className="nav-box">
            <div className="nav-title">Create Character</div>

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                name="name"
                value={character.name}
                onChange={handleChange}
                required
                />

                <label>Class</label>
                <input
                name="class"
                value={character.class}
                onChange={handleChange}
                required
                />

                <label>Race</label>
                <input
                name="race"
                value={character.race}
                onChange={handleChange}
                />

                <label>Level</label>
                <input
                type="number"
                name="level"
                value={character.level}
                onChange={handleChange}
                min="1"
                />

                <label>Background</label>
                <input
                name="background"
                value={character.background}
                onChange={handleChange}
                />

                <label>HP</label>
                <input
                type="number"
                name="hp"
                value={character.hp}
                onChange={handleChange}
                min="0"
                />

                <button type="submit" className="nav-signup">
                Register Character
                </button>
            </form>
            </div>
        </div>
        </div>
    );
    };
}