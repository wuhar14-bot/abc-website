import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const FULFILLMENT_STATUSES = [
  "unfulfilled",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type FulfillmentStatus = (typeof FULFILLMENT_STATUSES)[number];

function tokensMatch(provided: string, expected: string) {
  const providedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);
  return (
    providedBytes.length === expectedBytes.length &&
    timingSafeEqual(providedBytes, expectedBytes)
  );
}

/**
 * Protects admin API routes with a Vercel environment variable.
 * The token is never returned to the browser or logged.
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const expected = process.env.ADMIN_DASHBOARD_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: "Admin dashboard is not configured" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const auth = req.headers.get("authorization") ?? "";
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!provided || !tokensMatch(provided, expected)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
        headers: { "WWW-Authenticate": "Bearer", "Cache-Control": "no-store" },
      }
    );
  }

  return null;
}

export function isFulfillmentStatus(value: unknown): value is FulfillmentStatus {
  return typeof value === "string" && FULFILLMENT_STATUSES.includes(value as FulfillmentStatus);
}
