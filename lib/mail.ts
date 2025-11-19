import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // You can also use SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface Message {
  subject: string;
  body: string;
}

interface Sender {
  fullName: string;
  email: string;
}

export async function sendEmail(sender: Sender, to: string, message: Message) {
  const { subject, body } = message;
  const { fullName, email } = sender;

  const mailOptions = {
    from: `${fullName} - <${email}>`,
    to,
    subject,
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Email Template</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }
        .card {
          padding: 20px !important;
        }
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #e6f9fc;
      font-family: Arial, sans-serif;
    "
  >
    <!-- Main wrapper -->
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="background: #e6f9fc; padding: 30px 0"
    >
      <tr>
        <td align="center">
          <!-- Email container -->
          <table
            class="container"
            width="600"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              width: 600px;
              max-width: 100%;
              background: #ffffff;
              border-radius: 10px;
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td style="background: #06b6d4; padding: 24px">
                <h2
                  style="
                    margin: 0;
                    color: #fff;
                    font-size: 22px;
                    font-weight: 700;
                  "
                >
                  New Message From ${email}
                </h2>
              </td>
            </tr>

            <!-- Body card -->
            <tr>
              <td class="card" style="padding: 28px; background: #fff">
                <div style="font-size: 15px; color: #09090b; line-height: 1.6">
                  ${body}
                </div>

                <p style="margin-top: 20px; font-size: 13px; color: #6b7280">
                  — ${fullName}
                </p>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="width: 600px; max-width: 100%; margin-top: 20px"
          >
            <tr>
              <td
                style="
                  background: #09090b;
                  color: #fff;
                  text-align: center;
                  padding: 14px;
                  font-size: 12px;
                  border-radius: 8px;
                "
              >
                © 2025 Powered by <a href="https://ayscript.vercel.app"
   style="
     display:inline-block;
     padding: 8px 12px;
     background: #09090b;
     color:#FFF;
     text-decoration:none;
     font-weight:bold;
     font-size:14px;
     border-radius:6px;
     font-family:Arial, sans-serif;
   ">
  &lt;ayscript /&gt;
</a>
 — All Rights Reserved
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `,
  };

  const autoRespond = {
    from: "Ayomide Olaleye (ayscript)",
    to: `${email}`,
    subject: "Response to message sent to ayscript",
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Email Template</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }
        .card {
          padding: 20px !important;
        }
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #e6f9fc;
      font-family: Arial, sans-serif;
    "
  >
    <!-- Main wrapper -->
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="background: #e6f9fc; padding: 30px 0"
    >
      <tr>
        <td align="center">
          <!-- Email container -->
          <table
            class="container"
            width="600"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              width: 600px;
              max-width: 100%;
              background: #ffffff;
              border-radius: 10px;
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td style="background: #06b6d4; padding: 24px">
                <h2
                  style="
                    margin: 0;
                    color: #fff;
                    font-size: 22px;
                    font-weight: 700;
                  "
                >
                  New Message From ayscript - olaleye349@gmail.com
                </h2>
              </td>
            </tr>

            <!-- Body card -->
            <tr>
              <td class="card" style="padding: 28px; background: #fff">
                <div style="font-size: 15px; color: #09090b; line-height: 1.6">
                  Thank you ${fullName} for reaching out, I will reply to you shortly, in the mean time
                   you can send me a DM via WhatsApp <a href="https://wa.me/2347014329650">+2347014329650</a>
                </div>

                <p style="margin-top: 20px; font-size: 13px; color: #6b7280">
                  — Ayomide Olaleye (<a href="https://ayscript.vercel.app">ayscript</a>)
                </p>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="width: 600px; max-width: 100%; margin-top: 20px"
          >
            <tr>
              <td
                style="
                  background: #09090b;
                  color: #fff;
                  text-align: center;
                  padding: 14px;
                  font-size: 12px;
                  border-radius: 8px;
                "
              >
                © 2025 Powered by <a href="https://ayscript.vercel.app"
   style="
     display:inline-block;
     padding: 8px 12px;
     background: #09090b;
     color:#FFF;
     text-decoration:none;
     font-weight:bold;
     font-size:14px;
     border-radius:6px;
     font-family:Arial, sans-serif;
   ">
  &lt;ayscript /&gt;
</a>
 — All Rights Reserved
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `,
  };

  await transporter.sendMail(mailOptions);
  await transporter.sendMail(autoRespond);
}
