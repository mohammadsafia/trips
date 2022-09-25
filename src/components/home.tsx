import React, { useMemo } from 'react';
import DenseTable from "./table";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import FormTrip from "./form-trip";
import { useCollection } from "../hooks/useCollection";
import { Trip } from "../types.module";
import TotalTrips from "./total-trips";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface PropsHome {
}


const Home: React.FC<PropsHome> = () => {
  const { documents } = useCollection('trips');
  const [open, setOpen] = React.useState(false);
  
  const [filter, setFilter] = React.useState('');
  
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const sortedData = useMemo(() => {
    // @ts-ignore
    return (documents as Trip[])?.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [documents]);
  return (<>
    <Container component="main" maxWidth="lg">
      <CssBaseline/>
      <TotalTrips/>
			<Box sx={{ minWidth: 120, marginTop: 10 }}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Filter By User</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={filter}
						label="Filter By User"
						onChange={handleChange}
					>
						<MenuItem value="">All</MenuItem>
						<MenuItem value="p6ArG3hGrFXyYuqa3mCcz9JOryB2">Safia</MenuItem>
						<MenuItem value="KEcqFR2ZFTaCozxwmN8ySSwKIwR2">Kurdieh</MenuItem>
					</Select>
				</FormControl>
			</Box>
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Button style={{ marginBottom: 10 }} variant="contained" onClick={handleClickOpen}>Add new trip</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Create new trip"}</DialogTitle>
          <DialogContent>
            {open && <FormTrip onSave={handleClose}/>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <DenseTable trips={filter ? sortedData?.filter((trip) => trip.uid === filter) : sortedData}/>
      </Box>
    </Container>
  </>);
};

export default Home;