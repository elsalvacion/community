const router = require("express").Router();
const Treasury = require("../models/Treasury");

// create treasury

router.post("/", async (req, res) => {
  try {
    const treasury = await Treasury.create(req.body);

    if (!treasury) {
      res.status(400).json({ error: "Treasury not created" });
    }

    res.status(200).json({ msg: "Treasury created" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get all treasury

router.get("/", async (req, res) => {
  try {
    const treasury = await Treasury.find();

    if (!treasury) {
      res.status(400).json({ error: "Could not fetch treasury" });
    }

    res.status(200).json(treasury);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get one treasury
router.get("/:id", async (req, res) => {
  try {
    const treasury = await Treasury.findById(req.params.id);

    if (!treasury) {
      res.status(400).json({ error: "Could not fetch treasury" });
    }

    res.status(200).json(treasury);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update treasury
router.put("/:id", async (req, res) => {
  try {
    const treasury = await Treasury.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!treasury) {
      res.status(400).json({ msg: "Could not update treasury" });
    }

    res.status(200).json(treasury);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update treasury
router.delete("/:id", async (req, res) => {
  try {
    await Treasury.findByIdAndRemove(req.params.id, {
      new: true,
    });

    res.status(200).json({ msg: "Treasury deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
