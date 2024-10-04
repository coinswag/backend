import { ConflictException } from '@nestjs/common';
import { Resend } from 'resend';
const resendApiKey = 're_3nNB6oRk_HrhxXVAgjiU6zPJGsb5gVtQX'; // Replace with your Resend API key

const client = new Resend(resendApiKey);

// Function to send email with template
export const sendDomainEmail = async (
  to,
  subject,
  template,
  from: string = 'noreply@useuptions.com'
) => {
  console.log(from, to)
  try {
    const email = await client.emails.send({
      from: from ?? 'noreply@useuptions.com', // Replace with your sender email
      to: to,
      subject: subject,
      html: template
    });

    console.log(`Email sent to ${to}`);
    console.log(email);
    return email;
  } catch (error) {
    throw new ConflictException(`Error sending mail to ${to}. Please try again later`);
  }
};
