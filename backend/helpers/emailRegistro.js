import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
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
    subject: 'Confirmar cuenta en APV',
    text: 'Confrima la cuenta para poder iniciar sesión',
    html: `
        <p>Hola ${nombre} confirma tu cuenta en APV.</p>
        <p>Tu cuenta esta lista, pulsa el siguiente enlace para activarla:  <a href="${process.env.FRONTEND_URL}/confirmar/${token}">CONFIRMAR CUENTA</a> </p>
        <p>Si tu no creaste esta cuenta, ignora este mensaje</p> 
    `
  });

  console.log("Mensaje enviado: %s", info.messageId);

};


export default emailRegistro;
