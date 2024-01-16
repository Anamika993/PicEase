import express, { response } from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";
// import Configuration from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("hello");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data[0].b64_json;
    return res.status(200).json({ photo: image });
    // res.status(200).json({
    //   success: true,
    //   data: aiResponse.data,
    // });
  } catch (error) {
    if (error.aiResponse) {
      // console.log(error.airesponse.status);
      // console.log(error.aiResponse.data);
      console.log("fghjk");
    } else {
      console.log("ASZDCV");
    }
    res.status(400).json({
      succes: false,
      error: "not generated",
    });
  }
});

export default router;
