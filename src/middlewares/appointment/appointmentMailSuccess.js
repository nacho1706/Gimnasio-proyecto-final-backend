const fs = require('fs');
const path = require('path');
const transporter = require('./../nodemailer'); // Suponiendo que tu archivo de nodemailer se llama 'transporter.js'

// Middleware para enviar el correo electrónico
const sendAppointmentEmail = async (req, res, next) => {
  const { appointment } = res.locals; // Asumimos que el controlador anterior ha guardado la cita en res.locals

  try {
    // Leer la plantilla HTML desde un archivo
    const templatePath = path.join(__dirname, 'appointmentTemplate.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Reemplazar los marcadores de posición con los datos del turno
    htmlTemplate = htmlTemplate.replace('[Nombre del Usuario]', appointment.user.name);
    htmlTemplate = htmlTemplate.replace('[Nombre de la Actividad]', appointment.shift.activity.name);
    htmlTemplate = htmlTemplate.replace('[Fecha del Turno]', new Date(appointment.shift.date).toLocaleDateString());
    htmlTemplate = htmlTemplate.replace('[Hora de Inicio]', appointment.shift.startTime);
    htmlTemplate = htmlTemplate.replace('[Hora de Fin]', appointment.shift.endTime);
    htmlTemplate = htmlTemplate.replace('[Día de la Semana]', appointment.shift.dayOfWeek);
    htmlTemplate = htmlTemplate.replace('[Nombre de la Sucursal]', appointment.shift.branch.name);

    // Configuración del correo electrónico
    const mailOptions = {
      from: process.env.NODEMAILER_USER, // Usar la dirección de correo configurada
      to: appointment.user.email,
      subject: 'Tu turno ha sido creado exitosamente!',
      html: htmlTemplate
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado exitosamente.');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }

  next(); // Continuar con la siguiente función middleware o la respuesta al cliente
};

module.exports = sendAppointmentEmail;
