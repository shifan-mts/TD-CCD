// src/lib/plunk.ts
import Plunk from "@plunk/node";

if (!process.env.PLUNK_SECRET_KEY) {
  throw new Error("PLUNK_SECRET_KEY missing from .env.local");
}

export const plunk = new Plunk(process.env.PLUNK_SECRET_KEY);
