const router = require("express").Router();
const Secrets = require("../models/Secrets");

// create secret

router.post("/", async (req, res) => {
  try {
    const secret = await Secrets.create(req.body);

    if (!secret) {
      res.status(400).json({ error: "secret not created" });
    }

    res.status(200).json({ msg: "secret created" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get all secret

router.get("/", async (req, res) => {
  try {
    const secret = await Secrets.find();

    if (!secret) {
      res.status(400).json({ error: "Could not fetch secret" });
    }

    res.status(200).json(secret);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get one secret
router.get("/:id", async (req, res) => {
  try {
    const secret = await Secrets.findById(req.params.id);

    if (!secret) {
      res.status(400).json({ error: "Could not fetch secret" });
    }

    res.status(200).json(secret);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update secret
router.put("/:id", async (req, res) => {
  try {
    const secret = await Secrets.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!secret) {
      res.status(400).json({ msg: "Could not update secret" });
    }

    res.status(200).json(secret);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update secret
router.delete("/:id", async (req, res) => {
  try {
    await Secrets.findByIdAndRemove(req.params.id, {
      new: true,
    });

    res.status(200).json({ msg: "secret deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
