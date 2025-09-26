import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Vercel provides VERCEL_ENV = "production" | "preview" | "development"
  const env = process.env.VERCEL_ENV;

  if (env !== "production") {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}
