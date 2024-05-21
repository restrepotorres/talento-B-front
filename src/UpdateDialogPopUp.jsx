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
import EditIcon from '@mui/icons-material/Edit';

const UpdateDialogPopUp = ({ open, handleClose, idScript, fetchDialogs, selectrow }) => {
    const fetchPoses = async () => {
        var result = await fetch('http://localhost:8080/pose/getall')
        var data = await result.json()
        setPoses(data);
    }
    useEffect(() => {
        fetchPoses();
    }, []);
    const [poses, setPoses] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        setData({ ...selectrow, idScript: idScript })
        console.log(data)
    }, [selectrow]);
    console.log()
    const updateProperty = async (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value
        })

        );
    };
    const handleSubmit = async () => {
        console.log(data)
        delete data['pose']

        try {
            const response = await fetch(`http://localhost:8080/dialog/update/${data.idDialogLine}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }); fetchDialogs();
            console.log('Success:', await response.json());
            handleClose()
            //navigate("/edit")
        } catch (error) {
            console.error('Error:', error);
        }
        handleClose()
    }




    return (

        <Dialog open={open} onClose={handleClose} maxWidth={"xl"}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
                <Stack direction={"column"} gap={1} pt={2}>
                    <Stack direction={"row"} gap={2}>
                        <TextField label="Actor" value={data?.actor ? data.actor : ''} onChange={(e) => {
                            updateProperty('actor', e.target.value);
                        }} />
                        <FormControl sx={{ width: "50%" }}>
                            <InputLabel>Pose</InputLabel>
                            <Select label="Pose" onChange={(e) => {
                                updateProperty("idPose", e.target.value)
                            }} defaultValue={data?.idPose}>
                                {poses?.map((pose) => {
                                    return (<MenuItem key={pose.idPose} value={pose.idPose} >{pose.poseName}</MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                    <TextField minRows={4} multiline label="Text" value={data?.text ? data.text : ''} onChange={(e) => {
                        updateProperty('text', e.target.value);
                    }} />
                    <Stack direction={"row"} gap={2}>
                        <TextField label="X" value={data?.x ? data.x : ''} onChange={(e) => {
                            updateProperty('x', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                        <TextField label="X rotation" value={data?.xr ? data.xr : ''} onChange={(e) => {
                            updateProperty('xr', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                    </Stack>
                    <Stack direction={"row"} gap={2}>
                        <TextField label="Y" value={data?.y ? data.y : ''} onChange={(e) => {
                            updateProperty('y', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                        <TextField label="Y rotation" value={data?.yr ? data.yr : ''} onChange={(e) => {
                            updateProperty('yr', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                    </Stack>
                    <Stack direction={"row"} gap={2}>
                        <TextField label="Z" value={data?.z ? data.z : ''} onChange={(e) => {
                            updateProperty('z', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                        <TextField label="Z rotation" value={data?.zr ? data.zr : ''} onChange={(e) => {
                            updateProperty('zr', e.target.value);
                        }} type='number' InputProps={{ inputProps: { min: 0 } }} />
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" startIcon={<EditIcon />} onClick={handleSubmit} > Save changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateDialogPopUp