const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/quizapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", scoreSchema);

// 🟢 User Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "⚠️ Username and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "⚠️ Username already exists" });
    } else {
      res.status(500).json({ message: "❌ Error registering user" });
    }
  }
});

// 🟢 User Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "⚠️ Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    res.status(200).json({ message: "✅ Login successful", username });
  } catch (error) {
    res.status(500).json({ message: "❌ Error logging in" });
  }
});

// 🟢 Save User Score
app.post("/save-score", async (req, res) => {
  const { username, score } = req.body;

  // Validate Input
  if (!username || typeof score !== "number") {
    return res.status(400).json({ message: "⚠️ Username and valid score are required" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ username });

    if (!userExists) {
      return res.status(404).json({ message: "❌ User not found. Please register first." });
    }

    // Save score
    const newScore = new Score({ username, score });
    await newScore.save();

    res.status(201).json({ message: "🎉 Score saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving score:", error);
    res.status(500).json({ message: "❌ Error saving score" });
  }
});

// 🟢 Get User Scores
app.get("/scores/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const userScores = await Score.find({ username }).sort({ date: -1 });

    if (userScores.length === 0) {
      return res.status(404).json({ message: "❌ No scores found for this user" });
    }

    res.status(200).json(userScores);
  } catch (error) {
    console.error("❌ Error fetching scores:", error);
    res.status(500).json({ message: "❌ Error fetching scores" });
  }
});

// 🟢 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
