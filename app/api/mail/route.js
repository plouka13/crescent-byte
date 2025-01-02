import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const type = body.supportType;
    const title = body.supportTitle;
    const content = body.supportContent;
    const email = body.email;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SUPPORT_MAIL,
        pass: process.env.SUPPORT_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SUPPORT_MAIL,
      to: "crescentbyte3011@outlook.com",
      subject: `${type} support request from user: ${email}, ${title}`,
      text: content,
    };
    const mail = await transporter.sendMail(mailOptions);
    return Response.json({ data: mail });
  } catch (error) {
    console.log(error);
    return error;
  }
}
