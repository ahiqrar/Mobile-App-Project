const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/banquets", require("./routes/banquetRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong on the server",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
