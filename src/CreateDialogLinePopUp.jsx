import React from 'react'
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
const CreateDialogLinePopUp = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Creation</DialogTitle>
            <DialogContent>
                <Stack direction={"row"} gap={1} pt={2}>
                    <FormControl sx={{ width: "100px" }}>
                        <InputLabel>Genre</InputLabel>
                        <Select label="Genre">
                            <MenuItem value={"Name"}>Name</MenuItem>
                            <MenuItem value={"Genre"}>Genre</MenuItem>
                            <MenuItem value={"Id"}>Id</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Script name" />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" startIcon={<AddIcon />}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateDialogLinePopUp