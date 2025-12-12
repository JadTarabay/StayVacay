import Property from '../models/property.js';
import { supabase } from '../config/supabase.js';
import { v4 as uuidv4 } from "uuid";

// ---------------------------
// GET all properties (public)
// ---------------------------
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
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
    if (!property) return res.status(404).json({ message: "Property not found" });

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
    const { name, location, price, bedrooms, bathrooms, size, description } = req.body;

    let imageUrls = [];

    // Upload images to Supabase
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const ext = file.originalname.split(".").pop();
        const fileName = `${uuidv4()}.${ext}`; // unique file name

        const { error } = await supabase.storage
          .from("properties")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        // Get public URL
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
      description,
      images: imageUrls,
    });

    const savedProperty = await property.save();
    res.status(201).json(savedProperty);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ---------------------------
// UPDATE PROPERTY
// ---------------------------
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Update all regular fields
    Object.keys(req.body).forEach((key) => {
      property[key] = req.body[key];
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
          console.log(error);
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
    res.status(400).json({ message: err.message });
  }
};

// ---------------------------
// DELETE PROPERTY + IMAGES
// ---------------------------
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Delete Supabase images
    if (property.images?.length > 0) {
      for (const imgUrl of property.images) {
        let path = imgUrl.split("/properties/")[1]; // extract filename

        if (path) {
          await supabase.storage.from("properties").remove([path]);
        }
      }
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
