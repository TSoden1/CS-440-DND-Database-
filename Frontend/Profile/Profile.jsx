import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentProfile } from "./profileAPI.js";
import "./Profile.css";

function formatCompleted(completed) {
    if (completed === true) {
        return "True";
    }

    if (completed === false) {
        return "False";
    }

    return "Not provided";
}

function getValue(value) {
    return value || "Not provided";
}

function getUserDisplayName(user) {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    return fullName || user.username || user.email || "Profile";
}

function getCharacterName(character) {
    return character.name || character.characterName || "Unnamed Character";
}

function getCharacterClass(character) {
    return character.className || character.class || "Not provided";
}

function getCampaignTitle(campaign) {
    return (
        campaign.name ||
        campaign.campaignName ||
        campaign.characters ||
        campaign.characterName ||
        campaign.charName ||
        "Campaign"
    );
}

function getCampaignCharacter(campaign) {
    return campaign.characters || campaign.characterName || campaign.charName || "Not provided";
}

function getCampaignMeetingTime(campaign) {
    return campaign.meetingTime || campaign.meetTime || "Not provided";
}

function getCampaignPlayer(campaign) {
    return campaign.players || campaign.player || campaign.userName || "Not provided";
}

function getCampaignStarted(campaign) {
    return campaign.started || campaign.startDate || "Not provided";
}

export default function Profile() {
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [openAccount, setOpenAccount] = useState(false);
    const [openCharacter, setOpenCharacter] = useState(null);
    const [openCampaign, setOpenCampaign] = useState(null);
    const [openClassSections, setOpenClassSections] = useState({});
    const [openRaceSections, setOpenRaceSections] = useState({});

    useEffect(() => {
        let ignore = false;

        async function loadProfile() {
            try {
                setLoading(true);
                setError("");

                const data = await getCurrentProfile();

                if (!ignore) {
                    setProfileData(data);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadProfile();

        return () => {
            ignore = true;
        };
    }, []);

    const toggleCharacter = (characterKey) => {
        setOpenCharacter((current) => (current === characterKey ? null : characterKey));
    };

    const toggleCampaign = (campaignKey) => {
        setOpenCampaign((current) => (current === campaignKey ? null : campaignKey));
    };

    const toggleClassSection = (characterKey) => {
        setOpenClassSections((prev) => ({
            ...prev,
            [characterKey]: !prev[characterKey]
        }));
    };

    const toggleRaceSection = (characterKey) => {
        setOpenRaceSections((prev) => ({
            ...prev,
            [characterKey]: !prev[characterKey]
        }));
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-header-bar">
                    <h1>DNDatabase</h1>
                </div>

                <div className="profile-main">
                    <div className="profile-shell">
                        <p className="profile-empty-message">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-page">
                <div className="profile-header-bar">
                    <h1>DNDatabase</h1>
                </div>

                <div className="profile-main">
                    <div className="profile-shell">
                        <p className="profile-empty-message">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!profileData || !profileData.user) {
        return (
            <div className="profile-page">
                <div className="profile-header-bar">
                    <h1>DNDatabase</h1>
                </div>

                <div className="profile-main">
                    <div className="profile-shell">
                        <p className="profile-empty-message">No profile data found.</p>
                    </div>
                </div>
            </div>
        );
    }

    const currentUser = profileData.user;
    const currentCharacters = profileData.characters || [];
    const currentCampaigns = profileData.campaigns || [];

    const characterCount = profileData.summary?.characterCount ?? currentCharacters.length;
    const campaignCount = profileData.summary?.campaignCount ?? currentCampaigns.length;

    return (
        <div className="profile-page">
            <div className="profile-header-bar">
                <h1>DNDatabase</h1>
            </div>

            <div className="profile-main">
                <div className="profile-shell">
                    <div className="profile-top-row">
                        <div>
                            <h2 className="profile-home-title">Profile</h2>
                            <p className="profile-home-subtitle">
                                Welcome back, @{getValue(currentUser.username)}
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
                                    {getUserDisplayName(currentUser)}
                                </span>
                                <span className="profile-account-meta">
                                    @{getValue(currentUser.username)}
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
                                    <span className="profile-detail-value">{getValue(currentUser.id)}</span>
                                </div>

                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Username</span>
                                    <span className="profile-detail-value">{getValue(currentUser.username)}</span>
                                </div>

                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Email</span>
                                    <span className="profile-detail-value">{getValue(currentUser.email)}</span>
                                </div>

                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">First Name</span>
                                    <span className="profile-detail-value">{getValue(currentUser.firstName)}</span>
                                </div>

                                <div className="profile-detail-row">
                                    <span className="profile-detail-label">Last Name</span>
                                    <span className="profile-detail-value">{getValue(currentUser.lastName)}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="profile-summary-grid">
                        <div className="profile-summary-card">
                            <span className="profile-summary-label">Characters</span>
                            <span className="profile-summary-value">{characterCount}</span>
                        </div>

                        <div className="profile-summary-card">
                            <span className="profile-summary-label">Campaigns</span>
                            <span className="profile-summary-value">{campaignCount}</span>
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

                                <button
                                    type="button"
                                    className="profile-primary-button"
                                    onClick={() => navigate("/CharacterCreation?create=true")}
                                >
                                    Create New Character
                                </button>
                            </div>

                            {currentCharacters.length > 0 ? (
                                <div className="profile-accordion-list">
                                    {currentCharacters.map((character, index) => {
                                        const characterKey = character.id || getCharacterName(character) || index;
                                        const characterName = getCharacterName(character);
                                        const className = getCharacterClass(character);
                                        const classDetails = character.classDetails || character.classInfo || null;
                                        const raceDetails = character.raceDetails || character.raceInfo || null;

                                        const isCharacterOpen = openCharacter === characterKey;
                                        const isClassOpen = Boolean(openClassSections[characterKey]);
                                        const isRaceOpen = Boolean(openRaceSections[characterKey]);

                                        return (
                                            <div className="profile-accordion-card" key={characterKey}>
                                                <button
                                                    type="button"
                                                    className="profile-accordion-toggle"
                                                    onClick={() => toggleCharacter(characterKey)}
                                                >
                                                    <div className="profile-accordion-main">
                                                        <span className="profile-accordion-title">
                                                            {characterName}
                                                        </span>
                                                        <span className="profile-accordion-meta">
                                                            {getValue(character.race)} • {className} • Level {getValue(character.level)}
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
                                                                <span className="profile-detail-value">{characterName}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Class</span>
                                                                <span className="profile-detail-value">{className}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Race</span>
                                                                <span className="profile-detail-value">{getValue(character.race)}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Level</span>
                                                                <span className="profile-detail-value">{getValue(character.level)}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Background</span>
                                                                <span className="profile-detail-value">{getValue(character.background)}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">HP</span>
                                                                <span className="profile-detail-value">{getValue(character.hp)}</span>
                                                            </div>
                                                        </div>

                                                        <div className="profile-nested-sections">
                                                            <div className="profile-nested-card">
                                                                <button
                                                                    type="button"
                                                                    className="profile-nested-toggle"
                                                                    onClick={() => toggleClassSection(characterKey)}
                                                                >
                                                                    <span>Class Info</span>
                                                                    <span>{isClassOpen ? "▾" : "▸"}</span>
                                                                </button>

                                                                {isClassOpen && (
                                                                    classDetails ? (
                                                                        <div className="profile-detail-table profile-nested-table">
                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Class</span>
                                                                                <span className="profile-detail-value">{className}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Primary Ability</span>
                                                                                <span className="profile-detail-value">{getValue(classDetails.primaryAbility)}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Hit Point Die</span>
                                                                                <span className="profile-detail-value">{getValue(classDetails.hitPointDie)}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Saving Throw Proficiencies</span>
                                                                                <span className="profile-detail-value">{getValue(classDetails.savingThrowProficiencies)}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Skill Proficiencies</span>
                                                                                <span className="profile-detail-value">{getValue(classDetails.skillProficiencies)}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Weapon Proficiencies</span>
                                                                                <span className="profile-detail-value">{getValue(classDetails.weaponProficiencies)}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Armor Proficiencies</span>
                                                                                <span className="profile-detail-value">{getValue(classDetails.armorProficiencies)}</span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <p className="profile-empty-message">No class details found.</p>
                                                                    )
                                                                )}
                                                            </div>

                                                            <div className="profile-nested-card">
                                                                <button
                                                                    type="button"
                                                                    className="profile-nested-toggle"
                                                                    onClick={() => toggleRaceSection(characterKey)}
                                                                >
                                                                    <span>Race Info</span>
                                                                    <span>{isRaceOpen ? "▾" : "▸"}</span>
                                                                </button>

                                                                {isRaceOpen && (
                                                                    raceDetails ? (
                                                                        <div className="profile-detail-table profile-nested-table">
                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Race</span>
                                                                                <span className="profile-detail-value">{getValue(character.race)}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Size</span>
                                                                                <span className="profile-detail-value">{getValue(raceDetails.size)}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Type</span>
                                                                                <span className="profile-detail-value">{getValue(raceDetails.type)}</span>
                                                                            </div>

                                                                            <div className="profile-detail-row">
                                                                                <span className="profile-detail-label">Speed</span>
                                                                                <span className="profile-detail-value">{getValue(raceDetails.speed)}</span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <p className="profile-empty-message">No race details found.</p>
                                                                    )
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

                                <button
                                    type="button"
                                    className="profile-primary-button"
                                    onClick={() => navigate("/Campaigns?create=true")}
                                >
                                    Create New Campaign
                                </button>
                            </div>

                            {currentCampaigns.length > 0 ? (
                                <div className="profile-accordion-list">
                                    {currentCampaigns.map((campaign, index) => {
                                        const campaignKey = campaign.id || `${getCampaignTitle(campaign)}-${index}`;
                                        const isCampaignOpen = openCampaign === campaignKey;

                                        return (
                                            <div className="profile-accordion-card" key={campaignKey}>
                                                <button
                                                    type="button"
                                                    className="profile-accordion-toggle"
                                                    onClick={() => toggleCampaign(campaignKey)}
                                                >
                                                    <div className="profile-accordion-main">
                                                        <span className="profile-accordion-title">
                                                            {getCampaignTitle(campaign)}
                                                        </span>
                                                        <span className="profile-accordion-meta">
                                                            {getCampaignMeetingTime(campaign)} • Started {getCampaignStarted(campaign)}
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
                                                                <span className="profile-detail-value">{getCampaignPlayer(campaign)}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Character</span>
                                                                <span className="profile-detail-value">{getCampaignCharacter(campaign)}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Meeting Time</span>
                                                                <span className="profile-detail-value">{getCampaignMeetingTime(campaign)}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Started</span>
                                                                <span className="profile-detail-value">{getCampaignStarted(campaign)}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">Completed</span>
                                                                <span className="profile-detail-value">{formatCompleted(campaign.completed)}</span>
                                                            </div>

                                                            <div className="profile-detail-row">
                                                                <span className="profile-detail-label">DM ID</span>
                                                                <span className="profile-detail-value">{getValue(campaign.dmId)}</span>
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