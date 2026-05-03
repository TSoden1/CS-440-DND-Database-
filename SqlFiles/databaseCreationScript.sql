CREATE DATABASE DNDatabase;
USE DNDatabase;

-- users table
CREATE TABLE users(userID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
					username VARCHAR(50) NOT NULL,
                    displayName VARCHAR(50) NOT NULL,
                    email VARCHAR(50) NOT NULL UNIQUE,
                    password VARCHAR(50) NOT NULL);
                 
-- campaigns table
CREATE TABLE campaigns(campaignID INT AUTO_INCREMENT PRIMARY KEY,
						campaignName VARCHAR(50) NOT NULL,
						characterName VARCHAR(50),
                        meetTime DATETIME,
                        started BOOLEAN,
                        completed BOOLEAN);
                       
-- races table
CREATE TABLE races(raceName VARCHAR(50) CHECK (raceName IN ('Aasimar', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Orc', 'Tiefling')), 
					size VARCHAR(20) CHECK (size IN ('Small', 'Medium')), 
                    characterType VARCHAR(50) CHECK (characterType = 'Humanoid'),  
                    speed VARCHAR(20),
                    PRIMARY KEY (raceName));

-- classes table
CREATE TABLE classes(className VARCHAR(50) CHECK (className IN ('Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard')), 
					primaryAbility VARCHAR(50) CHECK (primaryAbility IN ('Strength', 'Dexterity', 'Intelligence', 'Wisdom', 'Charisma', 'Constitution')), 
                    hitPointDie VARCHAR(20), 
                    saveThrowProficiencies VARCHAR(50), 
                    skillProficiencies VARCHAR(75), 
                    weaponProficiencies VARCHAR(75),
                    armorProficiencies VARCHAR(50),
                    PRIMARY KEY (className));
                     
-- characters table
CREATE TABLE characters(characterID INT AUTO_INCREMENT PRIMARY KEY,
						characterName VARCHAR(50) NOT NULL,
						class VARCHAR(50),
                        races VARCHAR(50),
                        charLevel SMALLINT,
                        background VARCHAR(50),
                        hp SMALLINT,
                        FOREIGN KEY (races) REFERENCES races(raceName),
                        FOREIGN KEY (class) REFERENCES classes(className));

CREATE TABLE userCampaigns(userID INT UNSIGNED,
							  campaignID INT,
							  PRIMARY KEY (userID, campaignID),
							  FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
							  FOREIGN KEY (campaignID) REFERENCES campaigns(campaignID) ON DELETE CASCADE);
                            
CREATE TABLE userCharacters(userID INT UNSIGNED,
							  characterID INT,
							  PRIMARY KEY (userID, characterID),
							  FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
							  FOREIGN KEY (characterID) REFERENCES characters(characterID) ON DELETE CASCADE);

-- set up race references for characters
INSERT INTO races (raceName, size, characterType, speed) VALUES
('Human', 'Medium', 'Humanoid', '30 ft'),
('Elf', 'Medium', 'Humanoid', '30 ft'),
('Dwarf', 'Medium', 'Humanoid', '25 ft'),
('Halfling', 'Small', 'Humanoid', '25 ft'),
('Dragonborn', 'Medium', 'Humanoid', '30 ft'),
('Tiefling', 'Medium', 'Humanoid', '30 ft'),
('Gnome', 'Small', 'Humanoid', '25 ft'),
('Half-Elf', 'Medium', 'Humanoid', '30 ft'),
('Half-Orc', 'Medium', 'Humanoid', '30 ft'),
('Orc', 'Medium', 'Humanoid', '30 ft'),
('Aasimar', 'Medium', 'Humanoid', '30 ft');

-- set up class references for characters
INSERT INTO classes (className, primaryAbility, hitPointDie, saveThrowProficiencies, skillProficiencies, weaponProficiencies, armorProficiencies) VALUES
('Fighter', 'Strength', 'd10', 'Strength, Constitution', 'Athletics, Survival', 'Simple, Martial', 'All armor, Shields'),
('Wizard', 'Intelligence', 'd6', 'Intelligence, Wisdom', 'Arcana, History', 'Daggers, Quarterstaffs', 'None'),
('Rogue', 'Dexterity', 'd8', 'Dexterity, Intelligence', 'Stealth, Acrobatics', 'Simple, Hand Crossbows', 'Light armor'),
('Cleric', 'Wisdom', 'd8', 'Wisdom, Charisma', 'Religion, Insight', 'Simple', 'Light, Medium, Shields'),
('Barbarian', 'Strength', 'd12', 'Strength, Constitution', 'Intimidation, Survival', 'Simple, Martial', 'Light, Medium, Shields'),
('Paladin', 'Charisma', 'd10', 'Wisdom, Charisma', 'Persuasion, Religion', 'Simple, Martial', 'All armor, Shields'),
('Ranger', 'Dexterity', 'd10', 'Strength, Dexterity', 'Nature, Survival', 'Simple, Martial', 'Light, Medium, Shields'),
('Sorcerer', 'Charisma', 'd6', 'Constitution, Charisma', 'Arcana, Deception', 'Daggers', 'None'),
('Warlock', 'Charisma', 'd8', 'Wisdom, Charisma', 'Arcana, Intimidation', 'Simple', 'Light armor'),
('Monk', 'Dexterity', 'd8', 'Strength, Dexterity', 'Acrobatics, Stealth', 'Simple, Shortswords', 'None'),
('Druid', 'Wisdom', 'd8', 'Intelligence, Wisdom', 'Nature, Medicine', 'Clubs, Daggers', 'Light, Medium'),
('Bard', 'Charisma', 'd8', 'Dexterity, Charisma', 'Performance, Persuasion', 'Simple, Hand Crossbows', 'Light armor'),
('Artificer', 'Intelligence', 'd8', 'Constitution, Intelligence', 'Arcana, Investigation', 'Simple', 'Light, Medium');

CREATE VIEW userCharacterDetails AS
	SELECT
		uc.userID,
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
	JOIN userCharacters uc ON c.characterID = uc.characterID
	LEFT JOIN classes cl ON c.class = cl.className
	LEFT JOIN races r ON c.races = r.raceName;
    
-- trigger to update started boolean when meetTime has passed
DELIMITER $$

CREATE TRIGGER set_campaign_started
BEFORE UPDATE ON campaigns
FOR EACH ROW
BEGIN
    IF NEW.meetTime IS NOT NULL AND NEW.meetTime <= NOW() THEN
        SET NEW.started = TRUE;
    ELSE
        SET NEW.started = FALSE;
    END IF;
END$$

DELIMITER ;

-- indexes
CREATE INDEX idx_userCharacters_userID ON userCharacters(userID);
CREATE INDEX idx_userCampaigns_userID ON userCampaigns(userID);
CREATE INDEX idx_users_username ON users(username);