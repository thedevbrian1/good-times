import nodemailer from 'nodemailer'

export default async function book(req, res) {
    const { name, phone, date, capacity, currentPackage } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_USER,
            pass: process.env.NEXT_PUBLIC_PASSWORD,
        },
    });

    try {
        const emailResponse = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_USER,
            to: 'brayomwas95@gmail.com',
            subject: `Book package`,
            html: `
                <p>I would like to book this package: ${currentPackage} </p><br>
                <p><strong> Name: </strong> ${name} </p><br>
                <p><strong> Phone: </strong> ${phone} </p><br>
                <p><strong> Capacity: </strong> ${capacity} </p><br>
                <p><strong> Preferred date: </strong> ${date} </p><br>
            `
        });

        console.log('Message sent', emailResponse.messageId);
    }catch(err) {
        console.error(err);
    }

    res.status(200).json(req.body);
}