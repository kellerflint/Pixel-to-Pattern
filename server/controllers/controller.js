import { getAllPatterns, getPattern, postPattern, updatePattern } from '../models/model.js';
import { Patterns } from '../models/patterns.js';

// CREATE
export const uploadPattern = async (req, res) => {
  try {
    const newPattern = await Patterns.create({
      pattern_name: req.body.pattern_name,
      pattern_info: req.body.pattern_info,
      author: req.body.author,
      description: req.body.description
    });

    return res.status(201).json({ pattern_ID: newPattern.pattern_ID });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// READ
export const getAll = async (req, res) => {
  try {
    const patterns = await getAllPatterns();
    res.status(200).json(patterns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSpecificPattern = async (req, res) => {
  const patternID = req.params.id;
  try {
    const pattern = await getPattern(patternID);
    res.status(200).json(pattern);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updatePatternController = async (req, res) => {
  const patternInfo = req.body;
  const ID = patternInfo.pattern_ID;

  const pattern = {
    pattern_name: patternInfo.pattern_name,
    author: patternInfo.author,
    description: patternInfo.description
  };

  try {
    await updatePattern(ID, pattern);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deletePattern = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patterns.destroy({ where: { pattern_ID: id } });

    if (!deleted) {
      return res.status(404).json({ message: "Pattern not found" });
    }

    return res.status(200).json({ message: "Pattern deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting pattern", error });
  }
};