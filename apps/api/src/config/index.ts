import dotenv from "dotenv";

dotenv.config();
export default {
    "PORT": process.env.PORT || 8000,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
}