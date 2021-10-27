const MailGen = require('mailgen');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

const mailGenerator = new MailGen({
  theme: 'salted',
  product: {
    name: 'Awesome App',
    link: 'http://example.com',
  }
});

const email = {
  body: {
    name: 'Jon Doe',
    intro: 'Welcome to email verification',
    action: {
      instructions: 'Please click the button below to verify your account',
      button: {
        color: '#33b5e5',
        text: 'Verify account',
        link: 'http://example.com/verify_account'
      }
    }
  }
};

const emailTemplate = mailGenerator.generate(email);
require('fs').writeFileSync('preview.html', emailTemplate, 'utf8');

const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Test verification email',
  html: emailTemplate,
};

const sendMail = async () => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return sgMail.send(msg);
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = sendMail;
