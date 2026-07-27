import Stripe from "stripe";
import { HttpsProxyAgent } from "https-proxy-agent";

// Server-side Stripe client. NEVER import this into a client component —
// STRIPE_SECRET_KEY must never reach the browser.

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  // Fail loudly at import time on the server rather than producing a cryptic
  // runtime error deep inside a request handler.
  throw new Error(
    "STRIPE_SECRET_KEY is not set. Add it to abc-website/.env.local"
  );
}

// Dev-only: route Stripe API calls through a local HTTP proxy when one is set
// in the environment. The Stripe SDK does NOT read HTTPS_PROXY on its own, so
// we build an agent explicitly. In production (Vercel) no proxy env var is set,
// so this is a no-op and Stripe connects directly.
const proxyUrl =
  process.env.HTTPS_PROXY ||
  process.env.https_proxy ||
  process.env.HTTP_PROXY ||
  process.env.http_proxy;

export const stripe = new Stripe(secretKey, {
  // Pin the API version for reproducible behaviour across Stripe upgrades.
  apiVersion: "2026-06-24.dahlia",
  appInfo: {
    name: "anythingbutclimbing.com",
  },
  ...(proxyUrl
    ? { httpAgent: new HttpsProxyAgent(proxyUrl) }
    : {}),
});
