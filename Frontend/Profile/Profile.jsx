import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const USERS = Object.freeze([
    {
        id: 1,
        username: "GoldenTek",
        email: "wrig@gmail.com",
        firstName: "Tyler",
        lastName: "Wright"
    }
]);

const CHARACTERS = Object.freeze([
    {
        player: "GoldenTek",
        name: "Wrig",
        className: "Paladin",
        race: "Hill Dwarf",
        level: 5,
        background: "Acolyte",
        hp: 52
    },
    {
        player: "GoldenTek",
        name: "Danimal",
        className: "Worlock",
        race: "Dark Elf",
        level: 5,
        background: "Acolyte",
        hp: 23
    }
]);

const CAMPAIGNS = Object.freeze([
    {
        players: "GoldenTek",
        characters: "Wrig",
        meetingTime: "6:00 PM",
        started: "2026-02-01",
        completed: false,
        dmId: 3245
    },
    {
        players: "GoldenTek",
        characters: "Bryan",
        meetingTime: "9:00 PM",
        started: "2026-03-31",
        completed: true,
        dmId: 4902
    }
]);

const CLASS_INFO = Object.freeze({
    Paladin: {
        primaryAbility: "Strength / Charisma",
        hitPointDie: "d10",
        savingThrowProficiencies: "Wisdom, Charisma",
        skillProficiencies: "Choose 2",
        weaponProficiencies: "Simple, Martial",
        armorProficiencies: "All armor, Shields"
    },
    Worlock: {
        primaryAbility: "Charisma",
        hitPointDie: "d8",
        savingThrowProficiencies: "Wisdom, Charisma",
        skillProficiencies: "Choose 2",
        weaponProficiencies: "Simple",
        armorProficiencies: "Light armor"
    }
});

const RACE_INFO = Object.freeze({
    "Hill Dwarf": {
        size: "Medium",
        type: "Humanoid",
        speed: 25
    },
    "Dark Elf": {
        size: "Medium",
        type: "Humanoid",
        speed: 30
    }
});

function formatCompleted(completed) {
    return completed ? "True" : "False";
}

export default function Profile() {
    const navigate = useNavigate();

    const [openAccount, setOpenAccount] = useState(false);
    const [openCharacter, setOpenCharacter] = useState(null);
    const [openCampaign, setOpenCampaign] = useState(null);
    const [openClassSections, setOpenClassSections] = useState({});
    const [openRaceSections, setOpenRaceSections] = useState({});

    const currentUser = USERS[0];

    const currentCharacters = useMemo(
        () => CHARACTERS.filter((character) => character.player === currentUser.username),
        [currentUser.username]
    );

    const currentCampaigns = useMemo(
        () => CAMPAIGNS.filter((campaign) => campaign.players === currentUser.username),
        [currentUser.username]
    );

    const toggleCharacter = (characterName) => {
        setOpenCharacter((current) => (current === characterName ? null : characterName));
    };

    const toggleCampaign = (campaignIndex) => {
        setOpenCampaign((current) => (current === campaignIndex ? null : campaignIndex));
    };

    const toggleClassSection = (characterName) => {
        setOpenClassSections((prev) => ({
            ...prev,
            [characterName]: !prev[characterName]
        }));
    };

    const toggleRaceSection = (characterName) => {
        setOpenRaceSections((prev) => ({
            ...prev,
            [characterName]: !prev[characterName]
        }));
    };

    return (
        <div className="profile-page">
            <div className="profile-header-bar">
                <h1>DNDatabase</h1>
            </div>

            <div className="profile-main">
                <div className="profile-shell">
                    <div className="profile-top-row">
                        <div>
                            <h2 className="profile-title">Profile</h2>
                            <p className="profile-subtitle">
                                Welcome back, @{currentUser.username}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="profile-logout-button"
                            onClick={() => navigate("/Login")}
                        >
                            Logout
                        </button>
                    </div>

                    <div className="profile-account-banner">
                        <button
                            type="button"
                            className="profile-account-toggle"
                            onClick={() => setOpenAccount((current) => !current)}
                        >
                            <div className="profile-account-main">
                                <span className="profile-account-name">
                                    {currentUser.firstName} {currentUser.lastName}
                                </span>
                                <span className="profile-account-meta">
                                    @{currentUser.username}
                                </span>
                            </div>

                            <span className="profile-account-arrow">
                                {openAccount ? "▾" : "▸"}
                            </span>
                        </button>

                        {openAccount && (
                            <div className="profile-account-details">
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">ID</span>
                                    <span className="profile-detail-value">{currentUser.id}</span>
                                </div>
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Username</span>
                                    <span className="profile-detail-value">{currentUser.username}</span>
                                </div>
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Email</span>
                                    <span className="profile-detail-value">{currentUser.email}</span>
                                </div>
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">First Name</span>
                                    <span className="profile-detail-value">{currentUser.firstName}</span>
                                </div>
                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Last Name</span>
                                    <span className="profile-detail-value">{currentUser.lastName}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="profile-summary-grid">
                        <div className="profile-summary-card">
                            <span className="profile-summary-label">Characters</span>
                            <span className="profile-summary-value">{currentCharacters.length}</span>
                        </div>

                        <div className="profile-summary-card">
                            <span className="profile-summary-label">Campaigns</span>
                            <span className="profile-summary-value">{currentCampaigns.length}</span>
                        </div>
                    </div>

                    <div className="profile-dashboard-grid">
                        <div className="profile-panel">
                            <div className="profile-panel-header">
                                <div>
                                    <h3 className="profile-panel-title">Characters</h3>
                                    <p className="profile-panel-subtitle">
                                        Expand a character to view details
                                    </p>
                                </div>

                                <button type="button" className="profile-primary-button">
                                    Create New Character
                                </button>
                            </div>

                            {currentCharacters.length > 0 ? (
                                <div className="profile-accordion-list">
                                    {currentCharacters.map((character) => {
                                        const classDetails = CLASS_INFO[character.className];
                                        const raceDetails = RACE_INFO[character.race];
                                        const isCharacterOpen = openCharacter === character.name;
                                        const isClassOpen = Boolean(openClassSections[character.name]);
                                        const isRaceOpen = Boolean(openRaceSections[character.name]);

                                        return (
                                            <div className="profile-accordion-card" key={character.name}>
                                                <button
                                                    type="button"
                                                    className="profile-accordion-toggle"
                                                    onClick={() => toggleCharacter(character.name)}
                                                >
                                                    <div className="profile-accordion-main">
                                                        <span className="profile-accordion-title">
                                                            {character.name}
                                                        </span>
                                                        <span className="profile-accordion-meta">
                                                            {character.race} • {character.className} • Level {character.level}
                                                        </span>
                                                    </div>

                                                    <span className="profile-accordion-arrow">
                                                        {isCharacterOpen ? "▾" : "▸"}
                                                    </span>
                                                </button>

                                                {isCharacterOpen && (
                                                    <div className="profile-accordion-body">
                                                        <div className="profile-detail-table">
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Name</span>
                                                                <span className="profile-detail-value">{character.name}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Class</span>
                                                                <span className="profile-detail-value">{character.className}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Race</span>
                                                                <span className="profile-detail-value">{character.race}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Level</span>
                                                                <span className="profile-detail-value">{character.level}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Background</span>
                                                                <span className="profile-detail-value">{character.background}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">HP</span>
                                                                <span className="profile-detail-value">{character.hp}</span>
                                                            </div>
                                                        </div>

                                                        <div className="profile-nested-sections">
                                                            <div className="profile-nested-card">
                                                                <button
                                                                    type="button"
                                                                    className="profile-nested-toggle"
                                                                    onClick={() => toggleClassSection(character.name)}
                                                                >
                                                                    <span>Class Info</span>
                                                                    <span>{isClassOpen ? "▾" : "▸"}</span>
                                                                </button>

                                                                {isClassOpen && classDetails && (
                                                                    <div className="profile-detail-table profile-nested-table">
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Class</span>
                                                                            <span className="profile-detail-value">{character.className}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Primary Ability</span>
                                                                            <span className="profile-detail-value">{classDetails.primaryAbility}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Hit Point Die</span>
                                                                            <span className="profile-detail-value">{classDetails.hitPointDie}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Saving Throw Proficiencies</span>
                                                                            <span className="profile-detail-value">{classDetails.savingThrowProficiencies}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Skill Proficiencies</span>
                                                                            <span className="profile-detail-value">{classDetails.skillProficiencies}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Weapon Proficiencies</span>
                                                                            <span className="profile-detail-value">{classDetails.weaponProficiencies}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Armor Proficiencies</span>
                                                                            <span className="profile-detail-value">{classDetails.armorProficiencies}</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="profile-nested-card">
                                                                <button
                                                                    type="button"
                                                                    className="profile-nested-toggle"
                                                                    onClick={() => toggleRaceSection(character.name)}
                                                                >
                                                                    <span>Race Info</span>
                                                                    <span>{isRaceOpen ? "▾" : "▸"}</span>
                                                                </button>

                                                                {isRaceOpen && raceDetails && (
                                                                    <div className="profile-detail-table profile-nested-table">
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Race</span>
                                                                            <span className="profile-detail-value">{character.race}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Size</span>
                                                                            <span className="profile-detail-value">{raceDetails.size}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Type</span>
                                                                            <span className="profile-detail-value">{raceDetails.type}</span>
                                                                        </div>
                                                                        <div className="profile-detail-row">
                                                                            <span className="profile-detail-label">Speed</span>
                                                                            <span className="profile-detail-value">{raceDetails.speed}</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="profile-empty-message">No characters found.</p>
                            )}
                        </div>

                        <div className="profile-panel">
                            <div className="profile-panel-header">
                                <div>
                                    <h3 className="profile-panel-title">Campaigns</h3>
                                    <p className="profile-panel-subtitle">
                                        Expand a campaign to view details
                                    </p>
                                </div>

                                <button type="button" className="profile-primary-button">
                                    Create New Campaign
                                </button>
                            </div>

                            {currentCampaigns.length > 0 ? (
                                <div className="profile-accordion-list">
                                    {currentCampaigns.map((campaign, index) => {
                                        const isCampaignOpen = openCampaign === index;

                                        return (
                                            <div className="profile-accordion-card" key={`${campaign.characters}-${index}`}>
                                                <button
                                                    type="button"
                                                    className="profile-accordion-toggle"
                                                    onClick={() => toggleCampaign(index)}
                                                >
                                                    <div className="profile-accordion-main">
                                                        <span className="profile-accordion-title">
                                                            {campaign.characters}
                                                        </span>
                                                        <span className="profile-accordion-meta">
                                                            {campaign.meetingTime} • Started {campaign.started}
                                                        </span>
                                                    </div>

                                                    <span className="profile-accordion-arrow">
                                                        {isCampaignOpen ? "▾" : "▸"}
                                                    </span>
                                                </button>

                                                {isCampaignOpen && (
                                                    <div className="profile-accordion-body">
                                                        <div className="profile-detail-table">
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Player</span>
                                                                <span className="profile-detail-value">{campaign.players}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Character</span>
                                                                <span className="profile-detail-value">{campaign.characters}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Meeting Time</span>
                                                                <span className="profile-detail-value">{campaign.meetingTime}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Started</span>
                                                                <span className="profile-detail-value">{campaign.started}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Completed</span>
                                                                <span className="profile-detail-value">{formatCompleted(campaign.completed)}</span>
                                                            </div>
                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">DM ID</span>
                                                                <span className="profile-detail-value">{campaign.dmId}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="profile-empty-message">No campaigns found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}