import {getAllPatterns, getPattern, postPattern, updatePattern, deletePattern} from '../models/model.js'


export const updatePatternController = async(req, res) => {
    const patternInfo = req.body;
    const ID = patternInfo.pattern_ID;
    const pattern = {
        pattern_name: patternInfo.pattern_name,
        pattern_author: patternInfo.author,
        description: patternInfo.description
    }
    try{
        await updatePattern(ID, pattern);
        res.status(204);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
    
}

export const getAll = async(req, res) => {
    try{
        const patterns = await getAllPatterns();
        res.status(200).json(patterns);
    } catch(err){
        res.status(500).json({error: err.message});
    }
}
export const getSpecificPattern = async(req, res) => {
    const patternID = req.params.id;
    try{
        const pattern = await getPattern(patternID);
        res.status(200).json(pattern);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

// CREATE

export const uploadPattern = async (req, res) => {
    // expect JSON object from req body with this format:
    // { pattern_name: "", pattern_info: {}, description: ""}
    const pattern = req.body;

    // ! TODO: add validation for name and description
    try {
        const patternID = await postPattern(pattern);
        res.status(201).json(patternID);
    } catch (err) {
        return res.status(500).json({ error: err.message});
    }
}

// DELETE Pattern

export const deletePatternById = async (req, res) => {

    const patternID = req.params.id;
    
    try{
        await deletePattern(patternID);
        res.status(200).json({ message: 'Pattern deleted successfully', pattern_id: patternID });
    } catch (err){
        return res.status(500).json({ error : err.message });
    }
}