import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send admin notification email
// Send admin notification email
export async function sendAdminNotification(booking: any) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aacinnovations.com';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0066FF;">🔔 New Consultation Booking!</h2>
      <p>A new consultation request has been submitted.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.email}</td>
        </tr>
        <tr style="background: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.service}</td>
        </tr>
        <tr style="background: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Preferred Date:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${new Date(booking.preferredDate).toLocaleDateString()}</td>
        </tr>
        <tr style="background: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>📅 Booked On:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${new Date(booking.createdAt).toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.message || 'No message'}</td>
        </tr>
      </table>
      
        <p style="margin-top: 20px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin" 
           style="background: #0066FF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          View in Admin Dashboard
        </a>
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"AAC Innovations" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🔔 New Booking: ${booking.fullName} - ${booking.service}`,
      html,
    });
    console.log('Admin notification email sent to:', adminEmail);
  } catch (error) {
    console.error('Error sending admin email:', error);
  }
}

// Send confirmation email to client
export async function sendClientConfirmation(booking: any) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0066FF;">Thank You for Your Consultation Request!</h2>
      <p>Dear ${booking.fullName},</p>
      <p>Thank you for reaching out to <strong>AAC Innovations</strong>. We have received your consultation request and will get back to you within 24 hours.</p>
      
      <h3 style="color: #333; margin-top: 25px;">Your Request Details:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${booking.service}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Preferred Date:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${new Date(booking.preferredDate).toLocaleDateString()}</td>
        </tr>
      </table>
      
      <h3 style="color: #333;">What's Next?</h3>
      <ol style="line-height: 1.8;">
        <li>We'll review your request</li>
        <li>We'll contact you via email or phone</li>
        <li>We'll schedule a convenient time for consultation</li>
      </ol>
      
      <p style="margin-top: 25px;">If you have any questions, feel free to reply to this email.</p>
      
      <p>Best regards,<br>
      <strong>AAC Innovations Team</strong></p>
      
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        This is an automated confirmation. Please do not reply directly to this email.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"AAC Innovations" <${process.env.SMTP_USER}>`,
      to: booking.email,
      subject: `Consultation Request Received - ${booking.service}`,
      html,
    });
    console.log('Client confirmation email sent');
  } catch (error) {
    console.error('Error sending client email:', error);
  }
}