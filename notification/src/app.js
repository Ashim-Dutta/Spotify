import express from "express";
import sendEmail from "./utils/email.js";

const app = express()


sendEmail("ashimdutta357@gmail.com", "noreply", "This is a test email from spotify pipers","<h1>This is a test email from spotify pipers</h1>")

export default app
