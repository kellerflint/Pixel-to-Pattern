"use client"
import { Typography, Box, Card, CardContent, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import PixelDisplay from "@/components/PixelDisplay";
import EditIcon from '@mui/icons-material/Edit';
import PatternGenerator from "@/components/PatternGenerator";
import Button from "@mui/material/Button";
import EditablePatternView from "@/components/EditablePatternView";
import DeletePattern from "@/components/DeletePattern";

// importing jsPDF library to generate PDF files in the browser
import jsPDF from "jspdf";
// import PDF icon to display on the Export PDF button
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function PatternPage({params}) {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [patternConfig, setPatternConfig] = useState({});
    const [editView, setEditView] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const onCancel = () => {
      setEditView(false);
    }
    const clickEditButton = () => {
      setEditView(true);
    }

    // export pattern as PDF
    const exportPDF = () => {
      // safety check, making sure data is loaded
      if (!post || !patternConfig) return;

      // creating a new PDF document
      const doc = new jsPDF();
      
      // titile of the pattern
      doc.setFontSize(18);
      doc.text(post.pattern_name, 10, 10);

      // pattern details like (Author, Date, Description)
      doc.setFontSize(12);
      doc.text(`Author: ${post.author}`, 10, 20);
      doc.text(`Date: ${post.date?.slice(0,10)}`, 10, 28);
      doc.text("Description:", 10, 38);
      doc.text(post.description || "", 10, 46);

      // Stitch rows header
      doc.text("Pattern Stitch Rows:", 10, 60);
      let y = 70;

      const rows = patternConfig?.colorConfig || [];
      const width = patternConfig?.width || 0;

      // looping through color grid rows and printing it as text
      for (let i = 0; i < rows.length; i += width) {
        const rowColors = rows.slice(i, i + width);

        // example outpuit: Row 1: white, white, yellow
        doc.text(`Row ${i / width + 1}: ${rowColors.join(", ")}`, 10, y);
        y += 6;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      }

      // save the PDF with pattern name
      doc.save(`${post.pattern_name}.pdf`);
    };

    useEffect(()=> {
        const fetchPost = async () => {
            try{
                const res = await fetch(`${API_URL}/patterns/${id}`);
                if(!res.ok) throw new Error(`Failed to fetch post with ID: ${id}`);
                const post = await res.json();
                setPost(post);
                setPatternConfig(post.pattern_info);
            } catch(err){
                console.error('Failed to fetch post, ', err);
            }
        }

        fetchPost();
    }, []);

    if (!post) return <Typography>Loading...</Typography>

  return (
    <Box sx={{height:'100vh'}}>
      <NavBar />
      <Box sx={{ backgroundColor: "#fafafa", py: 6, display: "flex", flexDirection: "row",
        justifyContent: "center", alignItems: "flex-start", gap: 4, flexWrap: "wrap", }} > 
        
        {!editView ? (
          <Card sx={{ flex: 1, minWidth: 350, maxWidth: 550, boxShadow: 3, borderRadius: 3, backgroundColor: "#fff" }} >
          <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", p: { xs: 2, md: 3 }, }} >
            <PixelDisplay patternInfo={post.pattern_info} displayHeight={250} displayWidth={250} />

            <Box sx={{display:'flex'}}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, mb: 1, color: "primary.main", }} >
                {post.pattern_name}
              </Typography>
              <Button onClick={clickEditButton}> <EditIcon /> </Button>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              Author: <strong>{post?.author || "Unknown"}</strong>
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              {post.date ? post.date.slice(0, 10) : ""}
            </Typography>

            <Divider sx={{ width: "80%", mb: 2 }} />

            {/*Export PDF Button */}
            <Button 
              variant="contained"
              color="primary"
              startIcon={<PictureAsPdfIcon />}
              onClick={exportPDF}
              sx={{ mb: 2 }}
            >
              Export PDF
            </Button>

            {/* Delete Button */}
            <DeletePattern id={id} />
            
            <Typography variant="body1" sx={{ lineHeight: 1.7, textAlign: "justify", color: "text.primary", maxWidth: "90%", }} >
              {post.description}
            </Typography>
          </CardContent>
        </Card>
        ) : (<EditablePatternView post={post} onCancel={onCancel} /> )}
        
        <Card sx={{ flex: 1, minWidth: 350, maxWidth: 550, maxHeight: '68vh', boxShadow: 2, 
          borderRadius: 3, backgroundColor: "#fff", p: { xs: 2, md: 3 }, overflowY: 'auto'}}>
          <PatternGenerator patternInfo={patternConfig} />
        </Card>
      </Box>
    </ Box>
  );




}