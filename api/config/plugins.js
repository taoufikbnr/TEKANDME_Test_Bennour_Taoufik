module.exports = ({env}) => ({
    email: {
    config: {
      provider:env("EMAIL_PROVIDER"),
      providerOptions: {
        apiKey: process.env.BRV_KEY,
      },
      settings: {
        defaultSenderEmail: process.env.EMAIL_SENDER,
        defaultSenderName: process.env.SENDER_NAME,
        defaultReplyTo: process.env.EMAIL_REPLY,
      },
    },
  }});
