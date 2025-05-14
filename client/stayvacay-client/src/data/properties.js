import user1 from "../assets/images/user1.png";
import user2 from "../assets/images/user2.png";
import property1 from "../assets/images/property1.jpg";
import property2 from "../assets/images/property2.jpg";
const properties = [
  {
    price: 150,
    name: "Mountain Retreat",
    location: "Aspen, Colorado",
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    ownerPicture: user1,
    ownerName: "Alice",
    propertyImages: [ property1, "/images/p1-2.jpg"]
  },
  {
    price: 200,
    name: "Beachside Villa",
    location: "Malibu, California",
    bedrooms: 3,
    bathrooms: 2,
    size: 180,
    ownerPicture: user2,
    ownerName: "John",
    propertyImages: [property2, "/images/p2-2.jpg"]
  },
  {
    price: 300,
    name: "Mountain Retreat",
    location: "Aspen, Colorado",
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    ownerPicture: user1,
    ownerName: "Alice",
    propertyImages: [ property1, "/images/p1-2.jpg"]
  },
  {
    price: 400,
    name: "Beachside Villa",
    location: "Malibu, California",
    bedrooms: 3,
    bathrooms: 2,
    size: 180,
    ownerPicture: user2,
    ownerName: "John",
    propertyImages: [property2, "/images/p2-2.jpg"]
  },
  // 2 more property objects
];

export default properties;
