
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";


export async function POST(
  req: Request
) {
const instructionMessage: ChatCompletionRequestMessage = {
        role: "system",
        content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
      };
  const body = await req.json();
  const { messages  } = body;
  const options = {
    method: 'POST',
    url: 'https://chat-gpt26.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'b4cfb4dcf4mshce983ed176d5fd8p152420jsn49d73cda70b9',
      'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com'
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    }
  };
  
  try {
    const { userId } = auth();
    

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

      const isPro =await checkSubscription();
      const freeTrial = await checkApiLimit();
      if(!freeTrial && !isPro) {
        return new NextResponse("Free trial has expired.", { status: 403})
      }
  
      const response = await axios.request(options);

      if (!isPro){
        await incrementApiLimit();
      
      }
    
      return NextResponse.json(response.data.choices[0].message);
    } catch (error) {
        console.log("conversation_Error",error);
        return new NextResponse("Internal error", {status:500});
    }
};