const router = require("express").Router();
const Users = require("../models/Users");

// create user

router.post("/", async (req, res) => {
  try {
    const user = await Users.create(req.body);

    if (!user) {
      res.status(400).json({ error: "user not created" });
    }

    res.status(200).json({ msg: "user created" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get all user

router.get("/", async (req, res) => {
  try {
    const user = await Users.find();

    if (!user) {
      res.status(400).json({ error: "Could not fetch user" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get one user
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      res.status(400).json({ error: "Could not fetch user" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update user
router.put("/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      res.status(400).json({ msg: "Could not update user" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update user
router.delete("/:id", async (req, res) => {
  try {
    await Users.findByIdAndRemove(req.params.id, {
      new: true,
    });

    res.status(200).json({ msg: "user deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
