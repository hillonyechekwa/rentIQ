import { BACKEND_URL } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";







export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        //handle error if fields are empty
        if (!body.username || !body.email || !body) {
            return NextResponse.json(
              { error: "Missing required field data"},
              { status: 400 }
            );
        }

        const backendResponse = await fetch(`${BACKEND_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        // console.log(backendResponse.json())

        // console.log("Backend Response Status:", backendResponse.status);
        const responseText = await backendResponse.text();
        // console.log("Backend Response Text:", responseText);


        //handle errors from backendapi response
        if (!backendResponse.ok) {
            return NextResponse.json(
              {
                error: "Backend submission failed",
                status: backendResponse.status,
                details: responseText,
              },
              { status: backendResponse.status }
            );
        }
        let responseData
        try {
            responseData = JSON.parse(responseText);           
        } catch (parseError) {
            console.error("Failed to parse backend response", parseError)
            return NextResponse.json(
              {
                error: "failed to parse backend response",
              },
              { status: 500 }
            );
        }

        //return a success response
        return NextResponse.json(
            { message: "Submission successful", data: responseData },
            {status: 200}
        )
    } catch (error) {
        console.error("Submission Error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            {status: 500}
        )
    }
}