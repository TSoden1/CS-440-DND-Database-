const express = require("express");
const router = express.Router();
const db = require("../db");

//CREATE campaign
router.post("/", async (req, res) => {
  const { userID, campaignName, meetTime, started, completed } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO campaigns (campaignName, meetTime, started, completed)
       VALUES (?, ?, ?, ?)`,
      [campaignName, meetTime, started, completed]
    );

    const campaignID = result.insertId;

    await db.query(
      "INSERT INTO userCampaigns (userID, campaignID) VALUES (?, ?)",
      [userID, campaignID]
    );

    res.json({ campaignID });
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET user campaigns
router.get("/user/:userID", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*
       FROM campaigns c
       JOIN userCampaigns uc ON c.campaignID = uc.campaignID
       WHERE uc.userID = ?`,
      [req.params.userID]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE campaign
router.delete("/:campaignID", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM campaigns WHERE campaignID = ?",
      [req.params.campaignID]
    );
    res.json({ message: "Campaign deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;