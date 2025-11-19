import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
  let { subject, text, fullName, email } = body;

  if(!email || !fullName || !text){
    return new NextResponse("An error occured: email, message or full name not included", {status: 405})
  } else if(!subject){
    subject = "Message from portfolio website"
  }

  await sendEmail({ fullName, email }, "ayomideolaleye61@gmail.com", {
    subject,
    body: text,
  });

  return new NextResponse(JSON.stringify({message: "Email Sent successfully!"}));
  } catch (error) {
    return new NextResponse(`An error oiccured: ${error}`, {status: 500})
  }
}
