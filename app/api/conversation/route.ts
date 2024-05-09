// import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limits";
import axios from "axios";
import { checkSubscription } from "@/lib/subscription";


export async function POST(
    req: Request
  ) {

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
      messages: 
        messages
      
    }
  };

    try {
      const { userId } = auth();
      
      
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!messages) {
        return new NextResponse("Prompt is required", { status: 400 });
      }
      const isPro =await checkSubscription()
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
      console.log('[MUSIC_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };

// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";



// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configuration);

// export async function POST(
//   req: Request
// ) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages  } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!configuration.apiKey) {
//       return new NextResponse("OpenAI API Key not configured.", { status: 500 });
//     }

//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }
        
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages:messages,
      
//     });
//         return NextResponse.json(response.data.choices[0].message);

//     } catch (error) {
//         console.log("conversation_Error",error);
//         return new NextResponse("Internal error", {status:500});
//     }
// };