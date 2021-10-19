const router = require("express").Router();
const nodemailer = require("nodemailer");
const Meeting = require("../models/Meetings");
const Users = require("../models/Users");

// accept
router.get("/accept", async (req, res) => {
  try {
    const user = await Users.findById(req.query.coming);

    if (!user) return res.send("<h2>Server Error</h2>");

    const meeting = await Meeting.findById(req.query.to);

    if (!meeting) return res.send("<h2>Server Error</h2>");

    const exist = meeting.coming.includes(user);

    if (exist) return res.send("<h2>You have already been registered</h2>");

    meeting.coming.push(user);

    await Meeting.findByIdAndUpdate(req.query.to, meeting);

    res.send("<h2>You have been booked</h2>");
  } catch (err) {
    res.send("<h2>Server Error</h2>");
  }
});

// create meeting
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "elsalvacion2022@gmail.com",
        pass: "Barrow@2020",
      },
    });

    const users = await Users.find();
    const meeting = await Meeting.create(req.body);

    if (!users) {
      return res.status(400).json({ error: "Could not fetch users" });
    }

    users.forEach((user) => {
      const mailOptions = {
        from: "Community <elsalvacion2022@gmail.com>",
        to: user.email,
        subject: req.body.subject,
        html: `
        <b>Hi ${user.firstName} ${user.lastName}</b>,
        <br/>
        <p>You have been invited to a meeting that is to be hosted on ${req.body.date} at ${req.body.time} </p>
        <p>Below is the meeting link in case the day arise</p>
        <a href="${req.body.link}">${req.body.link}</a>
        <br />
        <i>If you will be coming please click on accept to book a sit.</i>
        <br />
        <br />
        <a href="http://localhost:5000/meetings/accept?coming=${user._id}&to=${meeting._id}" style="background: teal; color: white; text-decoration: none; padding: 10px 20px;">Accept</a>  
        <br />
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });

    res.status(200).json({ msg: "Message sent" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get all meeting

router.get("/", async (req, res) => {
  try {
    const meeting = await Meeting.find();

    if (!meeting) {
      res.status(400).json({ error: "Could not fetch meeting" });
    }

    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// get one meeting
router.get("/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      res.status(400).json({ error: "Could not fetch meeting" });
    }

    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update meeting
router.put("/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!meeting) {
      res.status(400).json({ msg: "Could not update meeting" });
    }

    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// update meeting
router.delete("/:id", async (req, res) => {
  try {
    await Meeting.findByIdAndRemove(req.params.id, {
      new: true,
    });

    res.status(200).json({ msg: "meeting deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
