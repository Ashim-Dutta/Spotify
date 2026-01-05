import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";

function startListner() {
    subscribeToQueue('user_created', async(msg) => {
        const { email, role, fullName: { firstNAme, lastName } } = msg
        
        const template = `
        <h1>Welcome to Spotify Piper </h1>
        <p>Dear ${firstNAme} ${lastName},</p>
        <p>Thank you for signing up to Spotify Piper. We are excited to have you on board.</p>
        <p>Your role is: ${role}</p>
        <p>we hope you enjoy your time with us.</p>
        <p>Thank you</p>
        `
        
        await sendEmail(email, 'Welcome to Spotify Piper', 'Thank you for signing up to Spotify Piper',template)
    })
}

export default startListner
