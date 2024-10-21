require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const data = require("./seed.json"); // file seed.json yang berisi data

const mongoURI = process.env.MONGODB_URI;
const collectionName = process.env.MONGODB_COLLECTION;

// Model untuk collection
const movieSchema = new mongoose.Schema({}, { strict: false });
const Movie = mongoose.model(collectionName, movieSchema);

// Fungsi untuk memeriksa koneksi database
async function checkDbConnection() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Database connected successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
}

// Fungsi untuk reset database (menghapus semua data dalam collection)
async function resetDb() {
  try {
    await mongoose.connect(mongoURI);
    await Movie.deleteMany({});
    console.log("Database reset successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to reset database", error);
    process.exit(1);
  }
}

// Fungsi untuk bulk insert data dari seed.json
async function bulkInsert() {
  try {
    await mongoose.connect(mongoURI);
    await Movie.insertMany(data);
    console.log("Bulk insert successful");
    process.exit(0);
  } catch (error) {
    console.error("Failed to bulk insert data", error);
    process.exit(1);
  }
}

// Fungsi untuk mendapatkan semua data dari collection
async function getAll() {
  try {
    await mongoose.connect(mongoURI);
    const movies = await Movie.find({});
    console.log("Data retrieved successfully", movies);
    process.exit(0);
  } catch (error) {
    console.error("Failed to retrieve data", error);
    process.exit(1);
  }
}

// Menjalankan fungsi sesuai dengan command line argument
const command = process.argv[2];
switch (command) {
  case "check-db-connection":
    checkDbConnection();
    break;
  case "reset-db":
    resetDb();
    break;
  case "bulk-insert":
    bulkInsert();
    break;
  case "get-all":
    getAll();
    break;
  default:
    console.log("Invalid command");
    process.exit(1);
}
