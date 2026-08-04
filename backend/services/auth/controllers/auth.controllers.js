import { getAuth } from "firebase-admin/auth";
import "../config/firebase.js"; // ensure firebase is initialized
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";
import crypto from "crypto";

export const login = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "idToken is required" });
    }

    // Verify Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const { uid, name, email, picture } = decodedToken;

    // Upsert user in MongoDB
    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      {
        firebaseUid: uid,
        name: name || "",
        email: email || "",
        avatar: picture || "",
      },
      { upsert: true, new: true }
    );
    const sessionId=crypto.randomUUID()
    await redis.set(`session:${sessionId}`,JSON.stringify(user))
    await redis.expire(`session:${sessionId}`,7*24*60*60)

      res.cookie("session",sessionId,{
        httpOnly:true,
        secure:false,
        samesite:"strict",
        maxAge:7*24*60*60*1000
      })

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};