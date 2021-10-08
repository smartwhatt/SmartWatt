export default function contact (req, res) {
    let nodemailer = require('nodemailer')
    const EMAIL = process.env.EMAIL_ADDRESS
    const PASSWORD = process.env.EMAIL_PASSWORD
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        },
        secure: true,
    });

    // console.log(req.body)
    const mailData = {
        from: EMAIL,
        to: 'smartwattana@gmail.com',
        subject: req.body.subject,
        text: req.body.body,
        html: `
        <div style="font-size:24px">${req.body.body}</div>
        <p style="font-size:18px">Sent from: ${req.body.email}</p>
        <hr />
        <footer style="text-align:center">Sent from <a href="https://smartwatt.me/">smartwatt.me</a></footer>
        `
    }
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info)
        res.status(200).json({ message: 'Email Sent successfully' })
    })
  }