import { useState } from "react";
import "./CharacterCreation.css";

export default function CharacterCreation({ onCreateCharacter, onClose, initial }) {
    const [character, setCharacter] = useState(
        initial
            ? { name: initial.name || "", class: initial.className || "", race: initial.race || "",
                level: initial.level || "", background: initial.background || "", hp: initial.hp || "" }
            : { name: "", class: "", race: "", level: "", background: "", hp: "" }
    );

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!character.name || !character.class) return;
        setSubmitting(true);
        await onCreateCharacter(character);
        setSubmitting(false);
        onClose();
    };

    return (
        <div className="pop-up-overlay">
            <div className="pop-up-menu">
                <div className="closeBtn">
                    <button type="button" onClick={onClose}>X</button>
                </div>
                <h3>Create a Character</h3>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input name="name" value={character.name} onChange={handleChange} required />
                    <label>Class</label>
                    <input name="class" value={character.class} onChange={handleChange} required />
                    <label>Race</label>
                    <input name="race" value={character.race} onChange={handleChange} />
                    <label>Level</label>
                    <input type="number" name="level" value={character.level} onChange={handleChange} min="1" />
                    <label>Background</label>
                    <input name="background" value={character.background} onChange={handleChange} />
                    <label>HP</label>
                    <input type="number" name="hp" value={character.hp} onChange={handleChange} min="0" />
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Saving Character": "Create Character"}
                    </button>
                </form>
            </div>
        </div>
    );
}