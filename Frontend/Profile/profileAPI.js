const USE_DUMMY_PROFILE = import.meta.env.VITE_USE_DUMMY_PROFILE === "true";

const dummyProfile = {
    user: {
        id: 1,
        username: "GoldenTek",
        email: "wrig@gmail.com",
        firstName: "Tyler",
        lastName: "Wright"
    },

    characters: [
        {
            id: 1,
            name: "Wrig",
            className: "Paladin",
            race: "Hill Dwarf",
            level: 5,
            background: "Acolyte",
            hp: 52,
            classDetails: {
                primaryAbility: "Strength / Charisma",
                hitPointDie: "d10",
                savingThrowProficiencies: "Wisdom, Charisma",
                skillProficiencies: "Choose 2",
                weaponProficiencies: "Simple, Martial",
                armorProficiencies: "All armor, Shields"
            },
            raceDetails: {
                size: "Medium",
                type: "Humanoid",
                speed: 25
            }
        },
        {
            id: 2,
            name: "Danimal",
            className: "Warlock",
            race: "Dark Elf",
            level: 5,
            background: "Acolyte",
            hp: 23,
            classDetails: {
                primaryAbility: "Charisma",
                hitPointDie: "d8",
                savingThrowProficiencies: "Wisdom, Charisma",
                skillProficiencies: "Choose 2",
                weaponProficiencies: "Simple",
                armorProficiencies: "Light armor"
            },
            raceDetails: {
                size: "Medium",
                type: "Humanoid",
                speed: 30
            }
        }
    ],

    campaigns: [
        {
            id: 1,
            name: "The Hollow Keep",
            players: "GoldenTek",
            characters: "Wrig",
            meetingTime: "6:00 PM",
            started: "2026-02-01",
            completed: false,
        },
        {
            id: 2,
            name: "Ashes of Arvandor",
            players: "GoldenTek",
            characters: "Danimal",
            meetingTime: "9:00 PM",
            started: "2026-03-31",
            completed: true,
        }
    ],

    summary: {
        characterCount: 2,
        campaignCount: 2
    }
};

const dummyProfileAPI = {
    getCurrentProfile() {
        return Promise.resolve(dummyProfile);
    },

    createCampaign(campaign) {
        return Promise.resolve({
            id: Date.now(),
            ...campaign
        });
    },

    createCharacter(character) {
        return Promise.resolve({
            id: Date.now(),
            ...character
        });
    }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getApiBaseUrl() {
    if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL is not configured.");
    }

    return API_BASE_URL.replace(/\/$/, "");
}

async function request(path, options = {}) {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
        credentials: 'include',  
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
            errorData.message || `Request failed with status ${response.status}`
        );
    }

    return response.json();
}

const realProfileAPI = {
    getCurrentProfile() {
        return request("/profile/me");
    },

    createCampaign(campaign) {
        return request("/campaigns", {
            method: "POST",
            body: JSON.stringify(campaign)
        });
    },

    createCharacter(character) {
        return request("/characters", {
            method: "POST",
            body: JSON.stringify(character)
        });
    },

    updateCharacter(id, character) {
        return request(`/characters/${id}`, { method: "PUT", body: JSON.stringify(character) });
    },

    deleteCharacter(id) {
        return request(`/characters/${id}`, { method: "DELETE" });
    },

    updateCampaign(id, campaign) {
        return request(`/campaigns/${id}`, { method: "PUT", body: JSON.stringify(campaign) });
    },

    deleteCampaign(id) {
        return request(`/campaigns/${id}`, { method: "DELETE" });
    }
};

const activeProfileAPI = USE_DUMMY_PROFILE ? dummyProfileAPI : realProfileAPI;

export async function getCurrentProfile() {
    return activeProfileAPI.getCurrentProfile();
}

export async function createCampaign(campaign) {
    return activeProfileAPI.createCampaign(campaign);
}

export function createCharacter(character) {
    return activeProfileAPI.createCharacter(character);
}

export function updateCharacter(id, character) {
    return activeProfileAPI.updateCharacter(id, character);
}

export function deleteCharacter(id) {
    return activeProfileAPI.deleteCharacter(id);
}

export function updateCampaign(id, campaign) {
    return activeProfileAPI.updateCampaign(id, campaign);
}

export function deleteCampaign(id) {
    return activeProfileAPI.deleteCampaign(id);
}