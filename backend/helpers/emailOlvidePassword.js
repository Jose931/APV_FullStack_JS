import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const {email, nombre, token} = datos;

  const info = await transporter.sendMail({
    from: 'APV - Administrador de Pacientes de Veterinaria',
    to: email, 
    subject: 'Reestablece tu contraseña',
    text: 'Reestablece tu contraseña',
    html: `
        <p>Hola ${nombre}, has solicitado reestablecer la contraseña.</p>
        <p>Sigue el siguiente enlace para generar otra contraseña: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">REESTABLECER PASSWORD</a> </p>
        <p>Si tu no creaste esta cuenta, ignora este mensaje</p> 
    `
  });

  console.log("Mensaje enviado: %s", info.messageId);

};


export default emailOlvidePassword;