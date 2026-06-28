import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { toEmail, recipientName, subject, body } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "hello@paperpie.io",
        pass: "Alimirsa@123",
      },
    });

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background-color: #ffffff; margin: 0; padding: 0; }
  </style>
</head>
<body style="background-color: #ffffff; margin: 0; padding: 40px 24px; font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #111827;">
  
  <!-- Raw Text & Name Section -->
  <div style="margin-bottom: 60px; max-width: 1152px; text-align: left;">
    <p style="font-size: 16px; font-weight: 400; color: #111827; margin-bottom: 12px;">Hi ${recipientName},</p>
    <div style="font-size: 16px; color: #374151; white-space: pre-wrap; line-height: 1.6; text-align: left;">${body}</div>
  </div>

  <a href="https://verbalex.paperpie.io/" style="text-decoration: none; color: inherit; display: block;">
    <div style="border-top: 1px solid #e5e7eb; padding-top: 60px; background-color: #f9fafb; margin: 0 -24px;">
      <div style="max-width: 1152px; margin: 0 auto;">
        
        <!-- Navbar -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px; max-width: 1152px; border: 1px solid rgba(229, 231, 235, 0.5); background-color: rgba(255, 255, 255, 0.8); border-radius: 8px; padding: 12px;">
          <tr>
            <td width="30%" align="left" style="padding-left: 12px;">
              <svg viewBox="0 0 160 40" width="112" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="#111827">Verba</text>
                <text x="72" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="400" fill="#374151">Lex</text>
                <text x="118" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" fill="#f97316">AI</text>
                <circle cx="154" cy="20" r="4" fill="#f97316" />
              </svg>
            </td>
            <td width="40%" align="center" style="font-weight: 500; font-size: 16px; color: #111827;">
              <span style="text-decoration: none; color: #111827; margin: 0 16px;">How It Works</span>
              <span style="text-decoration: none; color: #111827; margin: 0 16px;">Features</span>
              <span style="text-decoration: none; color: #111827; margin: 0 16px;">Demo</span>
            </td>
            <td width="30%" align="right" style="padding-right: 12px;">
              <span style="display: inline-block; background-color: #f3f4f6; color: #111827; font-weight: 600; font-size: 14px; padding: 10px 16px; border-radius: 8px; text-decoration: none;">Try Now</span>
            </td>
          </tr>
        </table>

        <!-- Hero Section -->
        <div style="padding: 80px 20px 60px; text-align: center;">
          <div style="margin: 0 auto 32px;">
            <span style="display: inline-block; background-color: rgba(255,255,255,0.05); border: 1px solid rgba(0,0,0,0.1); border-radius: 9999px; padding: 2px 12px 2px 2px; font-weight: 500; color: #111827; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
              <span style="display: inline-block; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 9999px; padding: 4px 10px; font-size: 14px; color: #4b5563; margin-right: 8px;">News</span>
              <span style="font-size: 14px;">VerbaLex AI Launch</span>
            </span>
          </div>

          <h1 style="margin: 0 0 20px; font-size: 64px; line-height: 1.1; font-weight: 600; letter-spacing: -0.025em; color: #111827;">
            From Stenographic reports<br />
            to court-ready documents
          </h1>

          <p style="margin: 20px auto 32px; max-width: 576px; font-size: 20px; color: #374151; line-height: 1.5;">
            Convert Stenographic reports and audio into structured, accurate, and verified legal documents using advanced AI.
          </p>

          <div>
            <span style="display: inline-block; background: #f97316; background-image: linear-gradient(to bottom, #fb923c, #f97316); border-bottom: 2px solid #c2410c; color: #ffffff; font-weight: 500; font-size: 16px; padding: 12px 20px; border-radius: 6px; text-decoration: none; box-shadow: 0 0 14px 0 rgba(255,255,255,0.19);">
              Try Now
            </span>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px 0 60px; font-size: 13px; color: #6b7280;">
          &copy; ${new Date().getFullYear()} VerbaLex AI. All rights reserved.
        </div>
      </div>
    </div>
  </a>
</body>
</html>
`;

    const info = await transporter.sendMail({
      from: '"Tracker" <hello@paperpie.io>',
      to: toEmail,
      subject: subject,
      text: body,
      html: htmlBody,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
