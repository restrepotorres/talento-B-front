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
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';






const CreateDialogLinePopUp = ({ open, handleClose, idScript, fetchDialogs }) => {
    const [selectGenre, setSelectGenre] = useState();
    const fetchPoses = async () => {
        var result = await fetch('http://localhost:8080/pose/getall')
        var data = await result.json()
        console.log(data)
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
            <DialogContent>
                <Stack direction={"column"} gap={1} pt={2}>
                    <FormControl sx={{ width: "100px" }}>
                        <InputLabel>Pose</InputLabel>
                        <Select label="Pose" onChange={(e) => updateProperty("idPose", e.target.value)}>
                            {poses?.map((pose) => {
                                return (<MenuItem key={pose.idPose} value={pose.idPose} >{pose.poseName}</MenuItem>)
                            })
                            }
                        </Select>
                    </FormControl>
                    <TextField label="Actor" onChange={(e) => {
                        updateProperty('actor', e.target.value);
                    }} />
                    <TextField label="Text" onChange={(e) => {
                        updateProperty('text', e.target.value);
                    }} />

                    <TextField label="X" onChange={(e) => {
                        updateProperty('x', e.target.value);
                    }} />
                    <TextField label="Y" onChange={(e) => {
                        updateProperty('y', e.target.value);
                    }} />
                    <TextField label="Z" onChange={(e) => {
                        updateProperty('z', e.target.value);
                    }} />
                    <TextField label="X rotation" onChange={(e) => {
                        updateProperty('xr', e.target.value);
                    }} />
                    <TextField label="Y rotation" onChange={(e) => {
                        updateProperty('yr', e.target.value);
                    }} />
                    <TextField label="Z rotation" onChange={(e) => {
                        updateProperty('zr', e.target.value);
                    }} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleSubmit} > Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateDialogLinePopUp