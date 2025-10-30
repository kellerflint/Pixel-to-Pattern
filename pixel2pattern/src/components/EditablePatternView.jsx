import { Card, CardContent, Box, Typography, TextField, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { useParams } from "next/navigation";
import PixelDisplay from "@/components/PixelDisplay";

export default function EditablePatternView({ post, onCancel, params}) {
    const { id } = useParams();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState({
    pattern_ID: id,
    pattern_name: post.pattern_name,
    description: post.description,
    date: post.date,
    author: post.author || "Unknown",
    pattern_info: post.pattern_info,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    try{
        const res = await fetch(`${API_URL}/update/${id}`,
            {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            }
        )

        if(!res.ok){
            throw new Error (`PostID: ${id} was not able to be updated.`);
        }
    } catch(err) {
        console.error("Error updating pixel art info with ID: ", id);
    }

    onCancel();
  };

  return (
    <Card sx={{ flex: 1, minWidth: 350, maxWidth: 550, boxShadow: 3, borderRadius: 3, backgroundColor: "#fff", }} >
      <CardContent component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", 
        alignItems: "center", textAlign: "center", p: { xs: 2, md: 3 }, }} >
        <PixelDisplay patternInfo={formData.pattern_info} displayHeight={250} displayWidth={250} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <TextField  label="Pattern Name" name="pattern_name" variant="outlined" 
          value={formData.pattern_name} onChange={handleChange} sx={{ flex: 1 }} /> </Box>

        <TextField label="Author" name="author" variant="outlined" value={formData.author} 
        onChange={handleChange} sx={{ mt: 2, width: "80%" }} />

        <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} 
        sx={{ mt: 2, width: "80%" }} />

        <Divider sx={{ width: "80%", my: 2 }} />

        <TextField label="Description" name="description" multiline minRows={4} value={formData.description} 
        onChange={handleChange} variant="outlined" sx={{ width: "90%" }} />

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} > 
            Save
          </Button>

          <Button variant="outlined" color="secondary" startIcon={<CancelIcon />} onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
