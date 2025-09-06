
import { fetchFromOpneRouter } from "@/lib/openrouter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){  
    try{
        console.log("goes till route")
        const {text} = await req.json();

        const response = await fetchFromOpneRouter(text)
        console.log(response);

        if(!response){ 
            return NextResponse.json({sucess: false , message: "failed to fetch from ai route"})
        }
        
        return NextResponse.json({
            success: true,
            message: response || "No response from AI"
        })
        
    }catch(error){ 
        return NextResponse.json({ 
            success: false,
            message: error
        })
    }
}

