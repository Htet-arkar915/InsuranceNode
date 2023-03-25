const { PDFNet } = require("@pdftron/pdfnet-node");
const mailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

//PDFNet.initialize()
//  .then(async () => {
//    const inputpath = path.resolve(__dirname, "./file/insurance.pdf");
//    const outputpath = path.resolve(__dirname, "./file/update.pdf");
//    const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(inputpath);
//    await pdfdoc.initSecurityHandler();
//    const replacer = await PDFNet.ContentReplacer.create();
//    const page = await doc.getPage(1);
//
//    await replacer.addString("numberofday", "3/24/2023");
//    await replacer.process(page);
//    pdfdoc.save(outputpath, PDFNet.PDFDoc.SavePotions.e_linearized);
//  })
//  .catch((e) => {
//    console.error(err);
//  });
const smtpProtocol = mailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (req, res) => {
  try {
    if (!req?.body?.mail) {
      return res.status(401).json({ message: "User email is required" });
    } else {
      const sendPdf = fs.readFileSync("./file/update.pdf");
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
            filename: "update.pdf",
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
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendMail };
