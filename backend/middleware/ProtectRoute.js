import admin from 'firebase-admin';
import { readFileSync } from 'fs'; // Import readFileSync
import User from '../Models/UserModel.js';
// import serviceAccount from '../serviceAccountKey.json' assert { type: 'json' };
import * as fs from 'fs';
import { log } from 'console';

const serviceAccountPath = 'E:/Rb/backend/serviceAccountKey.json'; // Adjust the path as needed
const serviceAccountData = fs.readFileSync(serviceAccountPath, 'utf-8');
const serviceAccount = JSON.parse(serviceAccountData);

try {
  // Load service account credentials from the JSON file
  

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  // Handle initialization error appropriately (e.g., stop server)
}

const ProtectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Token:", token); // Log the token received from the client
  try {
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    // console.log("Decoded token:", decoded);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);

    // Handle token expiration error separately
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }

    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default ProtectRoute;