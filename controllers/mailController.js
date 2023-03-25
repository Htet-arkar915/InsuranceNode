const pdf = require("pdf-node");
const mailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
  },
  footer: {
    height: "28mm",
    contents: {
      first: "Cover page",
      2: "Second page", // Any page number is working. 1-based index
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: "Last Page",
    },
  },
};
var users = [
  {
    name: "tom",
    age: "21",
  },
  {
    name: "dick",
    age: "23",
  },
  {
    name: "harry",
    age: "29",
  },
];
const html = `<!DOCTYPE html>
<html>
  <head>
    <mate charest="utf-8" />
    <title>YIG Insurance</title>
  </head>
  <body>
  <img src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297__340.png"/>
    <h1>User List</h1>
    <ul>
      {{#each users}}
      <li>Name: {{this.name}}</li>
      <li>Age: {{this.age}}</li>
      <br />
      {{/each}}
    </ul>
  </body>
</html>`;
var document = {
  html: html,
  data: {
    users: users,
  },
  path: "./file/output.pdf",
  type: "pdf",
};

const smtpProtocol = mailer.createTransport({
  host: "mail.ecofriendlytower.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

const sendMail = async (req, res) => {
  try {
    if (!req?.body?.mail) {
      return res.status(401).json({ message: "User email is required" });
    } else {
      pdf(document, options)
        .then((result) => {
          console.log(result);
          const sendPdf = fs.readFileSync("./file/output.pdf");
          const mailOptions = {
            from: `"YIG INSURANCE" <${process.env.MAIL}>`,
            to: req.body.mail,
            subject: "Mail For Our Policy",
            text: "Please see the attached PDF file",
            html:
              "<h4>Dear [Customer],</h4>" +
              "<p>I hope this email finds you well. I wanted to take a moment to express my sincerest thanks for choosing Young Insurance for your travel insurance needs. We are thrilled to have you as a customer and we appreciate your business.</p> " +
              "<p>Attached to this email, you will find the travel insurance policy PDF, which outlines the terms and conditions of your coverage. We encourage you to review it carefully and contact us if you have any questions or concerns.</p>" +
              "<p>We understand that travel can be unpredictable, and having travel insurance can provide peace of mind while you are on your trip. Our team is committed to ensuring that you have a positive experience with our products and services.</p>" +
              "<p>Thank you again for choosing Young Insurance. We value your trust in us and look forward to serving you in the future.</p>" +
              "<h4>Best regards,</h4>" +
              "<h3>Young Insurance</h3>",
            attachments: [
              {
                filename: "output.pdf",
                content: sendPdf,
              },
            ],
          };
          smtpProtocol.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Mail sent" + response.message);
              smtpProtocol.close();
            }
          });
          res.status(201).json({ message: `Mail sent to ${req.body.mail}` });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendMail };
