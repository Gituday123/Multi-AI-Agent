import { initializeApp, getApps, cert } from "firebase-admin/app";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require("../serviceAccountKey.json");

// Prevent re-initialization during nodemon hot reloads
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}
