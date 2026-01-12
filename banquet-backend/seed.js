const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Banquet = require("./models/Banquet");
const Owner = require("./models/Owner");
const User = require("./models/User");

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Clear old data
        await Banquet.deleteMany({});
        await Owner.deleteMany({});
        await User.deleteMany({});
        console.log("Cleared old data.");

        // 2. Create a test owner
        const owner = await Owner.create({
            businessName: "Royal Events Ltd",
            email: "owner@example.com",
            password: "password123", // In real app, hash this
            phone: "03001234567"
        });
        console.log("Created test owner: owner@example.com");

        // 3. Create a test user
        const user = await User.create({
            name: "Test User",
            email: "user@example.com",
            password: "password123" // In real app, hash this
        });
        console.log("Created test user: user@example.com");

        // 4. Add real banquets linked to owner
        const banquets = [
            {
                ownerId: owner._id,
                name: "Royal Palm Marquee",
                location: "Gulberg III, Lahore",
                capacity: 1000,
                pricePerPlate: 2500,
                type: "Outdoor",
                description: "A luxurious marquee with state-of-the-art facilities.",
                amenities: ["AC", "WiFi", "Parking", "Catering"],
                images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"],
                rating: 4.8
            },
            {
                ownerId: owner._id,
                name: "Crystal Ballroom",
                location: "DHA Phase 5, Lahore",
                capacity: 500,
                pricePerPlate: 3500,
                type: "Indoor",
                description: "Perfect for intimate weddings and corporate gala dinners.",
                amenities: ["AC", "Valet", "Stage Decor"],
                images: ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"],
                rating: 4.5
            },
            {
                ownerId: owner._id,
                name: "The Grand Lawn",
                location: "Bahria Town, Lahore",
                capacity: 1500,
                pricePerPlate: 1200,
                type: "Outdoor",
                description: "Massive outdoor space for large gatherings.",
                amenities: ["Parking", "Security", "Generator"],
                images: ["https://images.unsplash.com/photo-1544124499-58d341999710?w=800"],
                rating: 4.2
            },
            {
                ownerId: owner._id,
                name: "Elite Club Hall",
                location: "Cantt, Lahore",
                capacity: 250,
                pricePerPlate: 1800,
                type: "Indoor",
                description: "A cozy hall for birthdays and private parties.",
                amenities: ["AC", "Music System", "Catering"],
                images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=800"],
                rating: 4.4
            },
            {
                ownerId: owner._id,
                name: "Ocean View Garden",
                location: "Clifton, Karachi",
                capacity: 800,
                pricePerPlate: 2200,
                type: "Outdoor",
                description: "Beautiful rooftop garden with a view of the Arabian Sea.",
                amenities: ["Sea View", "Security", "Valet"],
                images: ["https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800"],
                rating: 4.9
            }
        ];

        await Banquet.insertMany(banquets);
        console.log("Seeded " + banquets.length + " banquets successfully!");

        console.log("\n--- TEST CREDENTIALS ---");
        console.log("User Login: user@example.com / password123");
        console.log("Owner Login: owner@example.com / password123");
        console.log("------------------------\n");

        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
