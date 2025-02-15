import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Novel" })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const comicSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  viewCount: { type: Number, default: 0 },
  content: String
});

const Comic = mongoose.model("Comic", comicSchema);

// Get all comics
app.get("/comics", async (req, res) => {
  const comics = await Comic.find();
  res.json(comics);
});

// Get single comic
app.get("/comics/:id", async (req, res) => {
  const comic = await Comic.findById(req.params.id);
  res.json(comic);
});

// Update view count
app.post("/comics/:id/view", async (req, res) => {
  await Comic.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });
  res.json({ success: true });
});

// Add Chapter
app.patch("/comics/chapters/:id", async (req, res) => {
  try {
    const comic = await Comic.findByIdAndUpdate(req.params.id, { $set: { content: req.body.content } }, { new: true });
    if (!comic) {
      return res.status(404).json({ error: 'Comic not found' });
    }
    res.json(comic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
