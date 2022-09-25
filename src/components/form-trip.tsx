import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {FormControl, InputAdornment, InputLabel, OutlinedInput, Paper} from "@mui/material";
import {db} from '../firebase/config';
import {addDoc, collection} from 'firebase/firestore'
import {useAuthContext} from "../hooks/useAuthContext";

interface FormTripProps {
	onSave(): void
}

export default function FormTrip(props: FormTripProps) {
	const {user} = useAuthContext() as any;
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
	const [price, setPrice] = React.useState<string | null>(null);
	const [date, setDate] = React.useState<string | null>(null);
	const [description, setDescription] = React.useState<string | null>(null);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if(!price || !description || !date){
			return alert('please fill all fields')
		}
		setIsSubmitting(true);

		await addDoc(collection(db, 'trips'), {
			price, date, description, uid: user.uid, displayName: user.displayName
		})
		props.onSave()
	};

	return (<Box sx={{width: '100%'}}>
		<Paper sx={{width: '100%', mb: 2}}>
			<Container component="main" maxWidth="xl">
				<Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
					<FormControl fullWidth sx={{m: 1}}>
						<InputLabel htmlFor="price">price</InputLabel>
						<OutlinedInput
							id="price"
							name="price"
							startAdornment={<InputAdornment position="start">$</InputAdornment>}
							label="Price"
							type="number"
							onChange={(e) => setPrice(e.target.value)}
							value={price}
							required
						/>
					</FormControl>
					<FormControl fullWidth sx={{m: 1}}>
						<TextField
							InputLabelProps={{shrink: true}}
							type="date" onChange={(e) => setDate(e.target.value)}
							value={date}
							margin="normal"
							required fullWidth
							name="date" label="Date"
							id="date"
						/>
					</FormControl>
					<FormControl fullWidth sx={{m: 1}}>
						<TextField
							InputLabelProps={{shrink: true}}
							onChange={(e) => setDescription(e.target.value)}
							value={description} rows={2}
							multiline margin="normal"
							required fullWidth
							name="description"
							label="Description"
							id="description"
						/>
					</FormControl>
					<FormControl fullWidth sx={{m: 1}}>
						<Button disabled={isSubmitting} type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Add</Button>
					</FormControl>
				</Box>
			</Container>
		</Paper>
	</Box>);
}