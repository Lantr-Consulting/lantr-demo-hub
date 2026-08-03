import { createClient } from "@supabase/supabase-js";
import { cookieStorage, onLantrSite } from "./cookie-storage";

// Publishable values — safe to ship in the client by design.
const URL = "https://aqbcsmndjvxpjgblnsgv.supabase.co";
const KEY = "sb_publishable_NBGzipxejWQS5-Hb2UjKoA_6w0QdLHx";

export const supabase = createClient(
  URL,
  KEY,
  onLantrSite
    ? { auth: { storage: cookieStorage, storageKey: "lantr-auth" } }
    : undefined
);
