const Asset = require('../models/Asset');

// GET all assets
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new asset
exports.addAsset = async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    const saved = await newAsset.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE asset
exports.deleteAsset = async (req, res) => {
  try {
    const removed = await Asset.findByIdAndDelete(req.params.id);
    res.json(removed);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
