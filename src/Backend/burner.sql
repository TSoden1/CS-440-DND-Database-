

CREATE TABLE Users (
    ID INT AUTO_INCREMENT,
    Name VARCHAR(25) NOT NULL,
    Email VARCHAR(50) UNIQUE NOT NULL,
    Username VARCHAR(25) UNIQUE NOT NULL,
    PRIMARY KEY (ID) 
);

CREATE TABLE Characters (
    Name VARCHAR(25) NOT NULL,
    Class VARCHAR(15) NOT NULL,
    Race VARCHAR(15) NOT NULL,
    Level SMALLINT NOT NULL,
    Background VARCHAR(15) NOT NULL,
    HP SMALLINT,
    USER_ID INT,
    FOREIGN KEY (USER_ID) REFERENCES Users(ID),
    FOREIGN KEY (Class) REFERENCES Classes (CharacterClass),
    FOREIGN KEY (Race) REFERENCES Races (CharacterRace)
);

CREATE TABLE Campaigns (
    CampaignName VARCHAR(50) UNIQUE NOT NULL,
    MeetTime TIME,
    Completed BOOLEAN NOT NULL,
    Started BOOLEAN NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES Users(ID),
    PRIMARY KEY (CampaignName)
);

CREATE TABLE Races (
    CharacterRace VARCHAR(50) NOT NULL,
    Size VARCHAR(5) NOT NULL,
    Type VARCHAR(15) NOT NULL,
    Speed INT NOT NULL,
    PRIMARY KEY (CharacterRace)
);

CREATE TABLE Classes (
    CharacterClass VARCHAR(50) NOT NULL,
    PrimaryAbility VARCHAR(10) NOT NULL,
    HitPointDie INT NOT NULL,
    SavingThrow VARCHAR(20),
    Proficiencies VARCHAR(20) NOT NULL,
    SkillProficiencies VARCHAR(20) NOT NULL,
    WeaponProficiencies VARCHAR(20) NOT NULL,
    ArmorProficiencies VARCHAR(20),
    PRIMARY KEY (CharacterClass)
);

CREATE TABLE User_Campaigns (
    UserID INT,
    CampaignName VARCHAR(50),
    CharacterName VARCHAR(25),
    IsDM BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, CampaignName),
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (CampaignName) REFERENCES Campaigns(CampaignName)
);


/*
    I feel like i need to add the connecting tables from the RM diagram but i dont entierly know yet
    so i need to ask some questions

    Make sure you go back and look at the primary keys and the foreign keys shit like that

*/

INSERT INTO Users (Name, Email, Username)
VALUES 
    ('Morgan Harris', 'Morg@gmail.com', 'SodaFiz'),
    ('Tyler Soden', 'Tyler@gmail.com', 'TylersDumb'),
    ('Tyler Wright', 'Wrig@gmail.com', 'GoldenTek'),
    ('Gary Shears', 'Gary@gmail.com', 'Tman2088'),
    ('Jack Doorbell', 'GPM@gmail.com', 'GrandpaMoose');

INSERT INTO Characters (Name, Class, Race, Level, Background, HP)
VALUES
    ('Dain', 'Rouge', 'Sea Elf', 12, 'Sailor', 82),
    ('Rowan', 'Artificer', 'Aasimar', 3, 'Haunted One', 24),
    ('Wrig', 'Paladin', 'Hill Dwarf', 5, 'Acolyte', 52),
    ('Troulin', 'Wizard', 'Dragonborn', 5, 'Soldier', 41),
    ('Zavier', 'Druid', 'Warforged', 6, 'Faceless', 57);

-- INSERT INTO Campaigns (CampaignName, Character, MeetTime, Completed, DmID, UserID)
-- VALUES
--     (),
--     (),
--     (),
--     (),
--     ();

INSERT INTO Classes (Class, PrimaryAbility, HitPointDie, SavingThrowProficiency, WeaponProficiency, ArmorProficiency)
VALUES
    ('Artificer', 'Intelligence', 8, 'Constitution, Intelligence', 'Simple', 'Light, Medium, Shields'),
    ('Barbarian', 'Strength', 12, 'Strength, Constitution', 'Simple, Martial', 'Light, Medium, Shields'),
    ('Bard', 'Charisma', 8, 'Dexterity, Charisma', 'Simple', 'Light'),
    ('Cleric', 'Wisdom', 8, 'Wisdom, Charisma', 'Simple', 'Light, Medium, Shields'),
    ('Druid', 'Wisdom', 8, 'Intelligence, Wisdom', 'Simple', 'Light, Shields'),
    ('Fighter', 'Strength', 10, 'Strength, Constitution', 'Simple, Martial', 'Light, Medium, Heavy, Shields'),
    ('Monk', 'Dexterity, Wisdom', 8, 'Strength, Dexterity', 'Simple, Martial', NULL),
    ('Paladin', 'Strength, Charisma', 10, 'Wisdom, Charisma', 'Simple, Martial', 'Light, Medium, Heavy, Shields'),
    ('Ranger', 'Dexterity, Wisdom', 10, 'Strength, Dexterity', 'Simple, Martial', 'Light, Medium, Shields'),
    ('Rouge', 'Dexterity', 8, 'Dexterity, Intellegence', 'Simple, Martial', 'Light'),
    ('Sorcerer', 'Charisma', 6, 'Constitution, Charisma', 'Simple', NULL),
    ('Warlock', 'Charisma', 8, 'Wisdom, Charisma', 'Simple', 'Light'),
    ('Wizard', 'Intelligence', 6, 'Intelligence, Wisdom', 'Daggers, Darts, Staves', NULL);