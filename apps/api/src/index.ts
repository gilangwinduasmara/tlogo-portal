// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "./config";
import multer from "multer";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = config.PORT;

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY,
});

app.use(express.json());
// cors
app.use(cors())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: multer.memoryStorage() });


app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.post("/ocr/members-name", upload.single("attachment"), async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        res.status(400).send("No file uploaded");
        return;
    }
    const base64 = Buffer.from(file.buffer).toString("base64");

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: [
                    {
                        "type": "text",
                        text: "Please extract the people names from the attached image"
                    },
                    {
                        type: "image_url",
                        image_url: { url: `data:image/png;base64,${base64}` }
                    }
                ]
            },
        ],
        tools: [
            {
                "type": "function",
                "function": {
                    "name": "extract_people_names",
                    "parameters": {
                        "type": "object", 
                        "properties": {
                            "names": {
                                "type": "array",
                                "items": {"type": "string"},
                                "description": "List of people names extracted from the image"
                            }
                        }
                    },
                },
            }
        ]

    });
    const extractPeopleNames = response.choices[0].message?.tool_calls?.find((tool) => tool.function.name === "extract_people_names");
    if (!extractPeopleNames) {
        res.send("No people names found");
        return;
    }
    const names = JSON.parse(extractPeopleNames.function.arguments || "{}")?.names;
    if (!names) {
        res.send("No people names found");
        return;
    }
    res.send({
        data: names
    });
});

app.get("/ocr/members-name", (req: Request, res: Response) => {
    // send html
    res.send(`
    <form action="/ocr/members-name" method="post" enctype="multipart/form-data">
        <input type="file" name="attachment" />
        <button type="submit">Submit</button>
    </form>
    `);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});