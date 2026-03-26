import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
	try {
		const { prompt } = await req.json();

		if (!prompt) {
			return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
		}

		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		//! Web Search call(the API Key does not support the models that can do web search default), web search takes 20-40 seconds more than training data model
		// Combine system instructions + user prompt
    	const fullPrompt = `Analyze AI visibility of this business: ${prompt}. Give the AI Visibility score 0-10 and 3-5 tips to improve visibility with a title, each tip on a separate line. Do not include extra commentary.`;
		const response = await openai.responses.create({
			model: "gpt-5",
			tools: [{ type: "web_search" }],
			input: fullPrompt
		});
		const result = response.output_text;


		//! Alternative without web search, with training data only(Disabled)
		// const response = await openai.chat.completions.create({
		// 	model: "gpt-40-mini",
		// 	messages: [ {
		// 		role: "system",
		// 			content: `You are a helpful assistant analyzing the AI visibility of local businesses. Give a score out of 10 for the business. Provide tips as bullet points to improve visibility, each tip on a new line. Only give the score and the tips, no extra text. If you cannot find any information about the business, give a score of 0/10 and write that you cannot find any information about it.`
		// 		},
		// 		{ role: "user", content: prompt }
		// 	],
		// });
		// const result = response.choices[0].message.content;

		return NextResponse.json({ result });
	} catch (error) {
		console.error("Error calling OpenAI:", error);
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
	}
}
