import nodemailer from 'nodemailer';

export default async function(req, res) {
    const { name, email, phone, message } = req.body;
    // console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_USER,
            pass: process.env.NEXT_PUBLIC_PASSWORD,
        }
    });

    try {
        const emailResponse = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_USER,
            to: 'mwangiignatius61@gmail.com',
            subject: `Contact form from ${name}`,
            html: `<p>You have received a new contact form submission</p><br>
                    <p><strong>Name: </strong> ${name}</p><br>
                    <p><strong>Email: </strong> ${email}</p><br>
                    <p><strong>Phone: </strong> ${phone}</p><br>
                    <p><strong>Message: </strong> ${message}</p><br>
                    `
        });
        
        console.log('Message sent', emailResponse.messageId)
    } catch(err) {
        console.log(err)
    }
    res.status(200).json(req.body);
}