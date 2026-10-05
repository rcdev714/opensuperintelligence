import { NextResponse } from "next/server";
import { getApiKeys, createApiKey } from "@/lib/data/repository";

export async function GET() {
  const keys = await getApiKeys();
  return NextResponse.json({
    object: "list",
    data: keys,
    total: keys.length,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name || `API Key ${new Date().toLocaleDateString()}`;
    const result = await createApiKey(name);

    return NextResponse.json({
      apiKey: result.apiKey,
      secretKey: result.secretKey,
      warning: "Copy this key now. You will not be able to see it again.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Key generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
