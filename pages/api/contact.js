import nodemailer from 'nodemailer';

export default async function contact(req, res) {
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

    await new Promise((resolve, reject) => {
        transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Server is ready to take our messages');
                resolve(success);
            }
        });
    });

    const mailData = {
        from: process.env.NEXT_PUBLIC_USER,
            to: 'brayomwas95@gmail.com',
            subject: `Contact form from ${name}`,
            html: `<p>You have received a new contact form submission</p><br>
                    <p><strong>Name: </strong> ${name}</p><br>
                    <p><strong>Email: </strong> ${email}</p><br>
                    <p><strong>Phone: </strong> ${phone}</p><br>
                    <p><strong>Message: </strong> ${message}</p><br>`
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    }); 
    // try {
    //     const emailResponse = await transporter.sendMail({
    //         from: process.env.NEXT_PUBLIC_USER,
    //         to: 'ignatius939@gmail.com',
    //         subject: `Contact form from ${name}`,
    //         html: `<p>You have received a new contact form submission</p><br>
    //                 <p><strong>Name: </strong> ${name}</p><br>
    //                 <p><strong>Email: </strong> ${email}</p><br>
    //                 <p><strong>Phone: </strong> ${phone}</p><br>
    //                 <p><strong>Message: </strong> ${message}</p><br>
    //                 `
    //     });
        
    //     console.log('Message sent', emailResponse.messageId)
    // } catch(err) {
    //     console.log(err)
    // }
    res.status(200).json(req.body);
}