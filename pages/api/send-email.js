// import { sendEmail } from "../../utils/sendEmail";
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_EMAIL_API_KEY);




export default async function sendEmail(req, res) {
    const { name, email, phone, message } = req.body;

    console.log(req.body);
    const msg = `
        Name: ${name}\r\n
        Email: ${email}\r\n
        Phone: ${phone}\r\n
        Message: ${message}
    `;

    const data = {
        to: 'brayomwas95@gmail.com',
        from: 'goodtimestoursandtravel@gmail.com',
        subject: 'Contact form',
        text: msg,
        html: msg.replace(/\r\n/g, '<br>')
    }
    try {
        await sgMail.send(data);
    } catch(error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
    res.status(200).json(req.body);
}
// export default async (req, res) => {
//     if (req.method === 'POST') {
//         const { name, email } = req.body;
//         await sendEmail({ name, email });
//         return res.status(200).end();
//     }
//     return res.status(404).json({
//         error: {
//             code: 'not_found',
//             message: "The requested endpoint was not found or doesn't support this method"
//         }
//     })
// }