import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import session from 'express-session';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: 'dndatabase-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CS440SeaDogs",
    database: "DNDatabase"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to database.");
});

//Signup
app.post('/Signup', (req, res) => {
    const sql = "INSERT INTO users (username, displayName, email, password) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.username,
        req.body.displayName,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if(err) {
            console.error(err);
            return res.json("Signup Failed");
        }
        return res.json(data);
    });
});

//Login
app.post('/Login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [req.body.username, req.body.password];
    db.query(sql, values, (err, users) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (users.length === 0) return res.status(401).json({ message: "Invalid username or password" });

        req.session.userID = users[0].userID;
        return res.json({ message: "Login successful" });
    });
});

//Profile
app.get('/profile/me', (req, res) => {
    const userID = req.session.userID;
    if (!userID) return res.status(401).json({ message: "Not logged in" });

    const userSql = "SELECT * FROM users WHERE userID = ?";
    db.query(userSql, [userID], (err, users) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (users.length === 0) return res.status(404).json({ message: "User not found" });

        const user = users[0];

        //use character details view from database
        const charSql = "SELECT * FROM userCharacterDetails WHERE userID = ?";

        db.query(charSql, [userID], (err, characters) => {
            if (err) return res.status(500).json({ message: "Database error" });

            const formattedCharacters = characters.map(c => ({
                id: c.characterID,
                name: c.characterName,
                className: c.class,
                race: c.races,
                level: c.charLevel,
                background: c.background,
                hp: c.hp,
                classDetails: {
                    primaryAbility: c.primaryAbility,
                    hitPointDie: c.hitPointDie,
                    savingThrowProficiencies: c.saveThrowProficiencies,
                    skillProficiencies: c.skillProficiencies,
                    weaponProficiencies: c.weaponProficiencies,
                    armorProficiencies: c.armorProficiencies
                },
                raceDetails: {
                    size: c.size,
                    type: c.characterType,
                    speed: c.speed
                }
            }));

            const campSql = `
                        SELECT
                            c.campaignID,
                            c.campaignName,
                            c.characterName,
                            c.meetTime,
                            c.started,
                            c.completed,
                            u.displayName
                        FROM campaigns c
                        JOIN userCampaigns uc ON c.campaignID = uc.campaignID
                        JOIN users u ON uc.userID = u.userID
                        WHERE uc.userID = ?`;

            db.query(campSql, [userID], (err, campaigns) => {
                if (err) return res.status(500).json({ message: "Database error" });

                const formattedCampaigns = campaigns.map(c => ({
                    id: c.campaignID,
                    name: c.campaignName,
                    characters: c.characterName,
                    meetingTime: c.meetTime,
                    started: c.started,
                    completed: c.completed,
                    players: c.displayName
                }));

                res.json({
                    user: {
                        id: user.userID,
                        username: user.username,
                        email: user.email,
                        displayName: user.displayName
                    },
                    characters: formattedCharacters,
                    campaigns: formattedCampaigns,
                    summary: {
                        characterCount: formattedCharacters.length,
                        campaignCount: formattedCampaigns.length
                    }
                });
            });
        });
    });
});

//CreateCharacter
app.post('/characters', (req, res) => {
    const userID = req.session.userID;
    if (!userID) return res.status(401).json({ message: "Not logged in" });

    const { name, class: charClass, race, level, background, hp } = req.body;

    if (!name || !charClass) {
        return res.status(400).json({ message: "Name and class are required" });
    }

    const charSql = `INSERT INTO characters (characterName, class, races, charLevel, background, hp) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
    const charValues = [name, charClass, race || null, level || null, background || null, hp || null];

    db.query(charSql, charValues, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create character" });
        }

        const characterID = result.insertId;

        const linkSql = "INSERT INTO userCharacters (userID, characterID) VALUES (?, ?)";
        db.query(linkSql, [userID, characterID], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to link character to user" });
            }

            //Fetch full character with class and race details to return to frontend
            const fetchSql = `
                SELECT
                    c.characterID,
                    c.characterName,
                    c.class,
                    c.races,
                    c.charLevel,
                    c.background,
                    c.hp,
                    cl.primaryAbility,
                    cl.hitPointDie,
                    cl.saveThrowProficiencies,
                    cl.skillProficiencies,
                    cl.weaponProficiencies,
                    cl.armorProficiencies,
                    r.size,
                    r.characterType,
                    r.speed
                FROM characters c
                LEFT JOIN classes cl ON c.class = cl.className
                LEFT JOIN races r ON c.races = r.raceName
                WHERE c.characterID = ?`;

            db.query(fetchSql, [characterID], (err, rows) => {
                if (err || rows.length === 0) {
                    return res.json({ id: characterID, name, className: charClass, race, level, background, hp });
                }

                const c = rows[0];
                res.json({
                    id: c.characterID,
                    name: c.characterName,
                    className: c.class,
                    race: c.races,
                    level: c.charLevel,
                    background: c.background,
                    hp: c.hp,
                    classDetails: {
                        primaryAbility: c.primaryAbility,
                        hitPointDie: c.hitPointDie,
                        savingThrowProficiencies: c.saveThrowProficiencies,
                        skillProficiencies: c.skillProficiencies,
                        weaponProficiencies: c.weaponProficiencies,
                        armorProficiencies: c.armorProficiencies
                    },
                    raceDetails: {
                        size: c.size,
                        type: c.characterType,
                        speed: c.speed
                    }
                });
            });
        });
    });
});

//CreateCampaign
app.post('/campaigns', (req, res) => {
    const userID = req.session.userID;
    if (!userID) return res.status(401).json({ message: "Not logged in" });

    const { name, charName, meetTime } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Campaign name is required" });
    }

    const campSql = `INSERT INTO campaigns (campaignName, characterName, meetTime, started, completed) 
                     VALUES (?, ?, ?, false, false)`;
    const campValues = [name, charName || null, meetTime || null];

    db.query(campSql, campValues, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to create campaign" });
        }

        const campaignID = result.insertId;

        const linkSql = "INSERT INTO userCampaigns (userID, campaignID) VALUES (?, ?)";
        db.query(linkSql, [userID, campaignID], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to link campaign to user" });
            }

            res.json({
                id: campaignID,
                name,
                characters: charName || null,
                meetingTime: meetTime || null,
                started: null,
                completed: false
            });
        });
    });
});

//Logout
app.post('/Logout', (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
});

//UpdateCharacter
app.put('/characters/:id', (req, res) => {
    const userID = req.session.userID;
    if (!userID) return res.status(401).json({ message: "Not logged in" });

    const { name, class: charClass, race, level, background, hp } = req.body;
    const characterID = req.params.id;

    const verifySql = "SELECT * FROM userCharacters WHERE userID = ? AND characterID = ?";
    db.query(verifySql, [userID, characterID], (err, rows) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (rows.length === 0) return res.status(403).json({ message: "Not authorized" });

        const updateSql = `UPDATE characters SET characterName = ?, class = ?, races = ?, 
                   charLevel = ?, background = ?, hp = ? WHERE characterID = ?`;
        db.query(updateSql, [name, charClass, race, level, background, hp, characterID], (err) => {
            if (err) return res.status(500).json({ message: "Failed to update character" });
            res.json({ message: "Character updated" });
        });
    });
});

//DeleteCharacter
app.delete('/characters/:id', (req, res) => {
    const userID = req.session.userID;
    if (!userID) return res.status(401).json({ message: "Not logged in" });

    const characterID = req.params.id;

    const verifySql = "SELECT * FROM userCharacters WHERE userID = ? AND characterID = ?";
    db.query(verifySql, [userID, characterID], (err, rows) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (rows.length === 0) return res.status(403).json({ message: "Not authorized" });


        const deleteSql = "DELETE FROM characters WHERE characterID = ?";
        db.query(deleteSql, [characterID], (err) => {
            if (err) return res.status(500).json({ message: "Failed to delete character" });
            res.json({ message: "Character deleted" });
        });
    });
});

//UpdateCampaign
app.put('/campaigns/:id', (req, res) => {
    const userID = req.session.userID;
    if (!userID) return res.status(401).json({ message: "Not logged in" });

    const { name, charName, meetTime, started, completed } = req.body;
    const campaignID = req.params.id;

    const verifySql = "SELECT * FROM userCampaigns WHERE userID = ? AND campaignID = ?";
    db.query(verifySql, [userID, campaignID], (err, rows) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (rows.length === 0) return res.status(403).json({ message: "Not authorized" });

        const updateSql = `UPDATE campaigns SET campaignName = ?, characterName = ?, 
                           meetTime = ?, started = ?, completed = ? WHERE campaignID = ?`;
        db.query(updateSql, [name, charName, meetTime, started, completed, campaignID], (err) => {
            if (err) return res.status(500).json({ message: "Failed to update campaign" });
            res.json({ message: "Campaign updated" });
        });
    });
});

//DeleteCampaign
app.delete('/campaigns/:id', (req, res) => {
    const userID = req.session.userID;
    if (!userID) return res.status(401).json({ message: "Not logged in" });

    const campaignID = req.params.id;

    const verifySql = "SELECT * FROM userCampaigns WHERE userID = ? AND campaignID = ?";
    db.query(verifySql, [userID, campaignID], (err, rows) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (rows.length === 0) return res.status(403).json({ message: "Not authorized" });

        const deleteSql = "DELETE FROM campaigns WHERE campaignID = ?";
        db.query(deleteSql, [campaignID], (err) => {
            if (err) return res.status(500).json({ message: "Failed to delete campaign" });
            res.json({ message: "Campaign deleted" });
        });
    });
});

app.listen(3001, () => {
    console.log("Listening for connection");
});


