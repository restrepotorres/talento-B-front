import React from 'react'
import { useState, useEffect } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    TextareaAutosize,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const CreateDialogLinePopUp = ({ open, handleClose, idScript, fetchDialogs }) => {
    const fetchPoses = async () => {
        var result = await fetch('http://localhost:8080/pose/getall')
        var data = await result.json()
        setPoses(data);
    }
    useEffect(() => {
        fetchPoses();
    }, []);
    const [poses, setPoses] = useState();
    const [data, setData] = useState({ idScript: idScript });


    const updateProperty = async (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        })

        );
    };
    const handleSubmit = async () => {

        try {
            const response = await fetch('http://localhost:8080/dialog/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }); fetchDialogs();
            console.log('Success:', await response.json());
            handleClose()
            navigate("/edit")
        } catch (error) {
            console.error('Error:', error);
        }
        handleClose()
    }
    return (

        <Dialog open={open} onClose={handleClose} maxWidth={"xl"}>
            <DialogTitle>Creation</DialogTitle>
            <DialogContent sx={{ minWidth: '30vw' }}>
                <Stack direction={"column"} gap={1} pt={2}>
                    <Stack direction={"row"} gap={2}>
                        <TextField label="Actor" onChange={(e) => {
                            updateProperty('actor', e.target.value);
                        }} />
                        <FormControl sx={{ width: "50%" }}>
                            <InputLabel>Pose</InputLabel>
                            <Select label="Pose" onChange={(e) => updateProperty("idPose", e.target.value)}   >
                                {poses?.map((pose) => {
                                    return (<MenuItem key={pose.idPose} value={pose.idPose} >{pose.poseName}</MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>

                    </Stack>
                    <TextField minRows={4} multiline label="Text" onChange={(e) => {
                        updateProperty('text', e.target.value);
                    }} />

                    <Stack direction={"row"} gap={2}>
                        <TextField label="X coordinate" onChange={(e) => {
                            updateProperty('x', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                        <TextField label="X rotation" onChange={(e) => {
                            updateProperty('xr', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} /></Stack>
                    <Stack direction={"row"} gap={2}>
                        <TextField label="Y coordinate" onChange={(e) => {
                            updateProperty('y', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                        <TextField label="Y rotation" onChange={(e) => {
                            updateProperty('yr', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                    </Stack>
                    <Stack direction={"row"} gap={2}>
                        <TextField label="Z coordinate" onChange={(e) => {
                            updateProperty('z', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                        <TextField label="Z rotation" onChange={(e) => {
                            updateProperty('zr', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleSubmit} > Add</Button>
            </DialogActions>
        </Dialog >
    );
};

export default CreateDialogLinePopUp