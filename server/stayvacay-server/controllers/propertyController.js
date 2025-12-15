import Property from '../models/property.js';
import { supabase } from '../config/supabase.js';
import { v4 as uuidv4 } from "uuid";

// ---------------------------
// GET all properties (public)
// ---------------------------
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isDeleted: false });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// GET property by ID (public)
// ---------------------------
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property || property.isDeleted)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// ADD NEW PROPERTY
// ---------------------------
export const addProperty = async (req, res) => {
  try {
    const {
      name,
      location,
      price,
      bedrooms,
      bathrooms,
      size,
      description
    } = req.body;

    // ✅ Parse structured description
    const parsedDescription =
      typeof description === "string"
        ? JSON.parse(description)
        : description;

    let imageUrls = [];

    // Upload images to Supabase
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const ext = file.originalname.split(".").pop();
        const fileName = `${uuidv4()}.${ext}`;

        const { error } = await supabase.storage
          .from("properties")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        const publicUrl = supabase
          .storage
          .from("properties")
          .getPublicUrl(fileName)
          .data.publicUrl;

        imageUrls.push(publicUrl);
      }
    }

    const property = new Property({
      name,
      location,
      price,
      bedrooms,
      bathrooms,
      size,
      description: {
        shortDescription: parsedDescription.shortDescription || "",
        amenities: parsedDescription.amenities || [],
        nearbyPlaces: parsedDescription.nearbyPlaces || [],
        notes: parsedDescription.notes || [],
      },
      images: imageUrls,
    });

    const savedProperty = await property.save();
    res.status(201).json(savedProperty);

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// ---------------------------
// UPDATE PROPERTY
// ---------------------------
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property || property.isDeleted)
      return res.status(404).json({ message: "Property not found" });

    // ✅ Parse description if present
    if (req.body.description) {
      const parsedDescription =
        typeof req.body.description === "string"
          ? JSON.parse(req.body.description)
          : req.body.description;

      property.description = {
        shortDescription: parsedDescription.shortDescription || "",
        amenities: parsedDescription.amenities || [],
        nearbyPlaces: parsedDescription.nearbyPlaces || [],
        notes: parsedDescription.notes || [],
      };
    }

    // Update other fields
    const updatableFields = [
      "name",
      "location",
      "price",
      "bedrooms",
      "bathrooms",
      "size"
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });

    // Upload new images if provided
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const ext = file.originalname.split(".").pop();
        const fileName = `${uuidv4()}.${ext}`;

        const { error } = await supabase.storage
          .from("properties")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        const publicUrl = supabase
          .storage
          .from("properties")
          .getPublicUrl(fileName)
          .data.publicUrl;

        property.images.push(publicUrl);
      }
    }

    const updatedProperty = await property.save();
    res.json(updatedProperty);

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// ---------------------------
// DELETE PROPERTY (SOFT DELETE)
// ---------------------------
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    property.isDeleted = true;
    await property.save();

    res.json({ message: "Property deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
