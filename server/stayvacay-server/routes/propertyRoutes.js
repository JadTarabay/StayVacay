import express from "express";
import multer from "multer";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

// Multer memory storage (required for Supabase)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * PUBLIC ROUTES
 */
router.get("/public", getAllProperties);
router.get("/public/:id", getPropertyById);

/**
 * ADMIN ROUTES
 * (add protect middleware if you have auth)
 */
router.post("/", upload.array("images"), addProperty);
router.put("/:id", upload.array("images"), updateProperty);
router.delete("/:id", deleteProperty);

export default router;
