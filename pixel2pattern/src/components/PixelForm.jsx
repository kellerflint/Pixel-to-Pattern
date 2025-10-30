"use client";
import {ToggleButtonGroup, ToggleButton, IconButton, TextField, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Card} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import GridOnIcon from '@mui/icons-material/GridOn';
import DrawIcon from '@mui/icons-material/Draw';
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';

export default function PixelForm() {
    // form detail states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");

    // states for tools
    const [tool, setTool] = useState('pencil');
    const [ color, setColor] = useState("#000000");
    const [ clearDrawingAlert, setClearDrawingAlert] = useState(false);
    const [showGrid, setShowGrid] = useState(true);

    // states for pixel canvas 
    const [ canvasHeight, setCanvasHeight] = useState(10);
    const [canvasWidth, setCanvasWidth] = useState(10);
    const [ pixelFill, setPixelFill] = useState([]);

    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const startPixels = Array(canvasHeight * canvasWidth).fill("#fff");
        setPixelFill(startPixels);
    }, [canvasHeight, canvasWidth]);


    const handlePixelEvent = (index) => {
        if (tool == 'pencil'){
            setPixelFill((prev) => prev.map((currentColor, i) => (i === index ? color : currentColor)));
        } else if (tool == 'eraser') {
            setPixelFill((prev) => prev.map((currentColor, i) => (i === index ? "#fff" : currentColor)));
        } else if (tool == 'fillBucket'){
            setPixelFill((prev) => Array(prev.length).fill(color));
        }
    }

    const handleCloseClearAlert = () => {
        setClearDrawingAlert(false);
    }

    const openClearAlert = () => {
        setClearDrawingAlert(true);
    }

    const clearDrawing = () => {
        setPixelFill((prev) => prev.fill("#fff"));
        handleCloseClearAlert();
    }

    const submitPixelForm = async() =>{
        const patternInfo = {
            width: canvasWidth,
            height: canvasHeight,
            colorConfig: pixelFill
        }

        const formSubmissionInfo = {
            pattern_name: name,
            pattern_info: patternInfo,
            author: author,
            description: description
        }

        try{
            const res = await fetch(`${API_URL}/patterns`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formSubmissionInfo)
                }
            )
            const postID = await res.json();

            if(!res.ok){
                throw new Error(`PostID: ${postID} is not ok.`);
            } else {
                router.push(`/view/${postID}`);
            }
        } catch (err) {
            console.log("Error submitting pixel art info ", err);
        }
    }

    const ClearDrawingDialog = () =>{
        return (
            <Dialog
                open={clearDrawingAlert}
                onClose={handleCloseClearAlert}
                aria-labelledby="Erase current drawing?"
            >
                <DialogContent>
                    <DialogContentText >
                        Clear entire drawing?
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <Button size='small' onClick={handleCloseClearAlert}>Disagree</Button>
                    <Button size='small' onClick={clearDrawing} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        // main body box
        <Card sx={{ margin: '1em', backgroundColor: 'white', padding: '2em'}}>

            <ClearDrawingDialog />

            {/* Width and height */}
            <Box>

                <TextField sx={{width: '100px', marginRight: '1em'}} onChange={(e) => setCanvasWidth(e.target.value)} value={canvasWidth} label="Width"></TextField>
                <TextField sx={{width: '100px'}} onChange={(e) => setCanvasHeight(e.target.value)} value={canvasHeight} label="Height"></TextField>

            </Box>

            {/* drawing tool bar */}
            <Card sx={{ borderRadius: '3em',padding: '1em', margin: '1em auto', width: 'fit-content', display: 'flex', justifyContent: 'space-around', gap: '1em'}}>
                
                {/* color input */}
                <input style={{ height: '45px' }} type='color' value={color} onChange={(e) => setColor(e.target.value)} />

                {/* tool select */}
                <ToggleButtonGroup 
                exclusive
                value={tool}
                onChange={(e, newTool) => setTool(newTool)}
                aria-label='drawing tools'
                >
                    
                    <ToggleButton value="pencil" aria-label='select pencil'>
                        <DrawIcon />
                    </ToggleButton>
                    <ToggleButton value="fillBucket" aria-label='select fill bucket'> 
                        <FormatColorFillIcon />
                    </ToggleButton>
                    <ToggleButton value="eraser" aria-label='select eraser'>
                        <CreateOutlinedIcon sx={{transform: 'scaleY(-1) scaleX(-1)'}}/>
                    </ToggleButton>
                </ToggleButtonGroup>

                {/* show grid toggle */}
                <ToggleButton 
                value="grid"
                selected={showGrid}
                onChange={() => setShowGrid((prev) => !prev)}
                >
                    <GridOnIcon />
                </ToggleButton>

                {/* clear canvas button */}
                <IconButton onClick={() => openClearAlert()}>
                    <ClearIcon />
                </IconButton>

            </Card>

            {/* Canvas Grid and pixels */}
            <Box sx={{backgroundColor: 'whitesmoke', width: '100%', padding: '2em'}}>
                <Box sx={{
                    display: 'grid',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    width: 'fit-content',
                    margin: ' auto',
                    border: '1px solid #ccc',
                    gridTemplateColumns: `repeat(${canvasWidth}, 25px)`,
                    gridTemplateRows: `repeat(${canvasHeight}, 25px)`,
                    maxWidth: '626px',
                    maxHeight: '626px',
                    overflow: 'auto'
                }}>
                    {pixelFill.map((currentColor, i) => (
                        showGrid ?
                            <div
                                key={i}
                                onClick={() => handlePixelEvent(i)}
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    border: '1px solid #ddd',
                                    backgroundColor: currentColor
                                }}>

                            </div>
                            :
                            <div
                                key={i}
                                onClick={() => handlePixelEvent(i)}
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    border: 'none',
                                    backgroundColor: currentColor
                                }}>

                            </div>
                    ))}
                </Box>
            </Box>

            {/* Name and description*/}
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em', margin: '1em 2em 2em'}}>
                <TextField onChange={(e) => setName(e.target.value)} value={name} label="Name Your Pattern"></TextField>
                <TextField onChange={(e) => setAuthor(e.target.value)} value={author} label="Author"></TextField>
                <TextField onChange={(e) => setDescription(e.target.value)} value={description} multiline rows={3} sx={{width: '50%', minWidth: '250px'}} label="Description"></TextField>
                


                <Button size='large' variant='contained' sx={{ alignSelf: 'end' }} endIcon={<SendIcon />} onClick={submitPixelForm}>Generate Pattern</Button>
            </Box>

            
        </Card>
    )
}