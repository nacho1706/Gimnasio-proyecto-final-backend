const transporter = require("../../nodemailer");

const emailRegisterSuccess = async (req, res, next) => {
  try {
    const { email } = req.body;
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Register success 👻" <ignacio.albarracn@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Gracias por registrarte en nuestro sitio. Estamos emocionados de tenerte a bordo.", // plain text body
      html: `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>Registro Exitoso</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  padding: 20px;
              }
              .header {
                  background-color: #4CAF50;
                  color: #ffffff;
                  padding: 10px 0;
                  text-align: center;
              }
              .content {
                  margin: 20px 0;
              }
              .content h1 {
                  color: #4CAF50;
              }
              .content p {
                  line-height: 1.6;
              }
              .footer {
                  text-align: center;
                  padding: 10px 0;
                  color: #888888;
                  font-size: 12px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Registro Exitoso</h1>
              </div>
              <div class="content">
                  <h1>¡Hola!</h1>
                  <p>Gracias por registrarte en nuestro sitio. Estamos emocionados de tenerte a bordo. A continuación, encontrarás algunos recursos para comenzar.</p>
                  <p>Si tienes alguna pregunta, no dudes en responder a este correo. Estamos aquí para ayudarte.</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 Gimnasio. Todos los derechos reservados.</p>
              </div>
          </div>
      </body>
      </html>` // html body
    });

    if (info.response.includes("OK")) {
      next();
    } else {
      res.status(500).send("Email sending failed");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(504).send("Server timeout");
  }

};

module.exports = emailRegisterSuccess;
