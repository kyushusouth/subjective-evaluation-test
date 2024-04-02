/* eslint-disable import/prefer-default-export */
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    await prisma.answers.createMany({
      data: data,
      skipDuplicates: true,
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
