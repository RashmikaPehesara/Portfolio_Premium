import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      replyTo: email,

      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

            <div style="background:#4f46e5; color:white; padding:20px; text-align:center;">
              <h2 style="margin:0;">📩 New Portfolio Message</h2>
            </div>

            <div style="padding:20px; color:#333;">
              <p style="font-size:16px;">You received a new message from your website:</p>

              <div style="margin-top:20px;">
                <p><strong>👤 Name:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
              </div>

              <div style="margin-top:20px; padding:15px; background:#f9fafb; border-left:4px solid #4f46e5; border-radius:5px;">
                <p style="margin:0;"><strong>💬 Message:</strong></p>
                <p style="margin-top:10px;">${message}</p>
              </div>
            </div>

            <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#666;">
              <p style="margin:0;">Sent from your portfolio website</p>
            </div>

          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false });
  }
}