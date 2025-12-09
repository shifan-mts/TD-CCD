// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { plunk } from "@/lib/plunk";

export async function POST(request: Request) {
  try {
    const { email, name , phoneNo , yearAndDept , clgName , why} = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
  

    // Track signup event in Plunk
    const success = await plunk.events.track({
      event: "user_signed_up",
      email,
      subscribed: true,
      data: {
        name: name || "Anonymous",
        source: "website-form",
        timestamp: new Date().toISOString(),
        email: email,
        number: phoneNo,
        yearAndDept : yearAndDept,
        clgName: clgName,
        why: why,

      }
    });

    if (!success) {
      return NextResponse.json({ error: "Plunk notification failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Subscribed!" });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
