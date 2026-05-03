USE DNDatabase;

-- filler example users
INSERT INTO users (username, displayName, email, password) VALUES
('tsoden', 'Tyler', 'tylerS@email.com', 'abcd1234'),
('twright', 'Tyler', 'tylerW@email.com', 'abcd1234'),
('mharris', 'Morgan', 'morgan@email.com', 'abcd1234'),
('gShears', 'Gary', 'gary@email.com', 'abcd1234'),
('bigRease', 'Reaser', 'reaser@email.com', 'abcd1234');

-- filler user campaigns
INSERT INTO campaigns (campaignName, characterName, meetTime, started, completed) VALUES
('Cursed Lands', 'Senshi', '2026-03-09 18:00:00', TRUE, TRUE),
('Lost Mines', 'Selene', '2026-05-03 19:00:00', TRUE, FALSE),
('Dragon Heist', 'Nyx', '2026-06-22 20:00:00', FALSE, FALSE),
('Stormy Seas', 'Himmel', '2026-05-18 17:30:00', TRUE, FALSE),
('Tales of Haevern', 'Shayla', '2026-07-18 18:30:00', FALSE, FALSE);

-- filler characters
INSERT INTO characters (characterName, class, races, charLevel, background, hp) VALUES
('Senshi', 'Fighter', 'Dwarf', 5, 'Soldier', 45),
('Selene', 'Wizard', 'Elf', 4, 'Sage', 22),
('Nyx', 'Rogue', 'Tiefling', 6, 'Criminal', 38),
('Himmel', 'Cleric', 'Human', 5, 'Acolyte', 40),
('Shayla', 'Barbarian', 'Half-Orc', 7, 'Outlander', 65),
('Atlas', 'Bard', 'Half-Elf', 3, 'Entertainer', 24),
('Hunter', 'Ranger', 'Human', 4, 'Hunter', 34),
('Zara', 'Sorcerer', 'Aasimar', 5, 'Noble', 28);

-- connect filler users to filler campaigns
INSERT INTO userCampaigns (userID, campaignID) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

-- connect filler users and characters
INSERT INTO userCharacters (userID, characterID) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(1,6),
(2,7),
(3,8);