import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CODE_RE = /^[A-Za-z0-9]{6,8}$/;

function randomCode(len = 7) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length: len },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(links);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { target_url, code } = body;

  if (!isValidUrl(target_url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  let finalCode = code || randomCode(7);

  if (code && !CODE_RE.test(code)) {
    return NextResponse.json(
      { error: "Code must be 6-8 alphanumeric characters" },
      { status: 400 }
    );
  }

  try {
    const link = await prisma.link.create({
      data: { code: finalCode, targetUrl: target_url },
    });
    return NextResponse.json(link, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
