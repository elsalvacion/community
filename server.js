const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const nodemailer = require("nodemailer");

// config
const connectDB = require("./config/db");

// require and use config files
require("dotenv").config({ path: "./config/.env" });
connectDB();

// require routes
const treasury = require("./routes/treasury");
const secrets = require("./routes/secrets");
const users = require("./routes/users");
const meetings = require("./routes/meetings");

const app = express();

// external middlewares
app.use(mongoSanitize());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());

// express body parser

app.use(express.json());

// send email

app.post("/send-secret", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: "Community <elsalvacion2022@gmail.com>",
    to: req.body.email,
    subject: "Registration Secret",
    html: `
    <b>Welcome to our community.</b>,
    <br/>
    <p>Here is your secret to complete your registration: </p>
    <h1>${req.body.secret}</h1>
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

// routes
app.use("/treasury", treasury);
app.use("/secrets", secrets);
app.use("/users", users);
app.use("/meetings", meetings);

const PORT = process.env.PORT || 5000;
// listen to a port
app.listen(PORT, () =>
  console.log(
    `server up and running on ${process.env.NODE_ENV} MODE at ${PORT}`
  )
);
