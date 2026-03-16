import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true para 465, false para otros
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email: string, token:string) => {
  const url = `http://${process.env.FRONTEND_URL}/verify?token=${token}`
  
  await transporter.sendMail({
    from: '"Sistema Inventario" <no-reply@example.sa>',
    to: email,
    subject: "Verifica tu cuenta",
    html: `<b>Haz click aquí para verificar:</b> <a href="${url}">${url}</a>`,
  });
};
