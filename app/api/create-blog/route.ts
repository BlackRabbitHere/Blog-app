import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST(){
    console.log("API route called to create blog");

    return NextResponse.json({success:true});
}