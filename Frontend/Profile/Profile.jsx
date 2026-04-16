import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("info");

    const users = [
        {
            id: 1,
            username: "GoldenTek",
            email: "wrig@gmail.com",
            firstName: "Tyler",
            lastName: "Wright"
        }
    ];

    const characters = [
        {
            player: "GoldenTek",
            name: "Wrig",
            className: "Paladin",
            race: "Hill Dwarf",
            level: 5,
            background: "Acolyte",
            hp: 52
        }
    ];

    const currentUser = users[0];
    const currentCharacters = characters.filter(
        (character) => character.player === currentUser.username
    );

    return (
        <div className="page">
            <div className="header">
                <h1>DNDatabase</h1>
            </div>

            <div className="center">
                <div className="profile-box">
                    <div className="profile-top">
                        <div>
                            <h2 className="profile-title">Profile</h2>
                            <p className="profile-subtitle">@{currentUser.username}</p>
                        </div>

                        <button
                            className="profile-button"
                            onClick={() => navigate("/Login")}
                        >
                            Logout
                        </button>
                    </div>

                    <div className="profile-tabs">
                        <button
                            className={`tab-button ${activeSection === "info" ? "active-tab" : ""}`}
                            onClick={() => setActiveSection("info")}
                        >
                            Info
                        </button>

                        <button
                            className={`tab-button ${activeSection === "characters" ? "active-tab" : ""}`}
                            onClick={() => setActiveSection("characters")}
                        >
                            Characters
                        </button>
                    </div>

                    <div className="profile-content">
                        {activeSection === "info" && (
                            <div className="section-box">
                                <h3 className="section-title">User Info</h3>

                                <div className="info-row">
                                    <span className="info-label">ID</span>
                                    <span className="info-value">{currentUser.id}</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Username</span>
                                    <span className="info-value">{currentUser.username}</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{currentUser.email}</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">First Name</span>
                                    <span className="info-value">{currentUser.firstName}</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Last Name</span>
                                    <span className="info-value">{currentUser.lastName}</span>
                                </div>
                            </div>
                        )}

                        {activeSection === "characters" && (
                            <div className="section-box">
                                <h3 className="section-title">My Characters</h3>

                                {currentCharacters.length > 0 ? (
                                    <div className="character-list">
                                        {currentCharacters.map((character, index) => (
                                            <div className="character-card" key={index}>
                                                <div className="info-row">
                                                    <span className="info-label">Name</span>
                                                    <span className="info-value">{character.name}</span>
                                                </div>

                                                <div className="info-row">
                                                    <span className="info-label">Class</span>
                                                    <span className="info-value">{character.className}</span>
                                                </div>

                                                <div className="info-row">
                                                    <span className="info-label">Race</span>
                                                    <span className="info-value">{character.race}</span>
                                                </div>

                                                <div className="info-row">
                                                    <span className="info-label">Level</span>
                                                    <span className="info-value">{character.level}</span>
                                                </div>

                                                <div className="info-row">
                                                    <span className="info-label">Background</span>
                                                    <span className="info-value">{character.background}</span>
                                                </div>

                                                <div className="info-row">
                                                    <span className="info-label">HP</span>
                                                    <span className="info-value">{character.hp}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="empty-message">No characters found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}