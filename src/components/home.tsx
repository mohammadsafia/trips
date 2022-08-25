import React, {useMemo} from 'react';
import DenseTable from "./table";
import CssBaseline from "@mui/material/CssBaseline";
import {Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import FormTrip from "./form-trip";
import {useCollection} from "../hooks/useCollection";
import {Trip} from "../types.module";
import TotalTrips from "./total-trips";

interface PropsHome {
}


const Home: React.FC<PropsHome> = (props) => {
	const {documents} = useCollection('trips');
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const sortedData = useMemo(() => {
		// @ts-ignore
		return (documents as Trip[])?.sort((a, b) => new Date(b.date) - new Date(a.date))
	}, [documents])
	return (<>
		<Container component="main" maxWidth="lg">
			<CssBaseline/>
			<TotalTrips/>
			<Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
				<Button style={{marginBottom: 10}} variant="contained" onClick={handleClickOpen}>Add new trip</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>{"Create new trip"}</DialogTitle>
					<DialogContent>
						{open && <FormTrip onSave={handleClose}/>}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Close</Button>
					</DialogActions>
				</Dialog>

				<DenseTable trips={sortedData}/>
			</Box>
		</Container>
	</>);
};

export default Home;