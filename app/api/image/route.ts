import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";



const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
    req: Request
  ) {
    try {
      const { userId } = auth();
      const body = await req.json();
      const { prompt  } = body;

      const { amount } =body;
      const value = body.resolution;
      if (value.length===7){
        var height= value.slice(0,3)
        var width = value.slice(4,7)
      }
      if (value.length===9){
        var height= value.slice(0,4)
        var width = value.slice(5,9)
      }
      
      const input = {
      width: parseInt(width),
      height: parseInt(height),
      prompt: prompt,
      num_outputs: parseInt(amount),
      guidance_scale: 7.5,
     };

      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!prompt) {
        return new NextResponse("Prompt is required", { status: 400 });
      }

      const isPro =await checkSubscription()
      const freeTrial = await checkApiLimit();
     
      if(!freeTrial && !isPro) {
        return new NextResponse("Free trial has expired.", { status: 403})
      }
  
      const response = await replicate.run("stability-ai/stable-diffusion-3.5-large", { input });;

      if (!isPro){
        await incrementApiLimit();
      }
       return NextResponse.json(response);
    } catch (error) {
      console.log('[IMAGE_ERROR]', error);
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
