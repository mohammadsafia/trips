import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Container
	// IconButton
} from "@mui/material";
import {Trip} from "../types.module";
// import {db} from '../firebase/config';
// import {deleteDoc, doc} from 'firebase/firestore';
// import DeleteIcon from '@mui/icons-material/Delete';

interface IEnhancedTableProps {
	trips: Trip[]
}

const EnhancedTable: React.FC<IEnhancedTableProps> = ({trips}) => {
	// const handleDelete = async (id: string) => {
	// 	const ref = doc(db, 'trips', id);
	// 	await deleteDoc(ref)
	// }
	return (
		<Box sx={{width: '100%'}}>
			<Paper sx={{width: '100%', mb: 2}}>
				<Container component="main" maxWidth="xl">
					<TableContainer sx={{maxHeight: 600}}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell align="right">Username</TableCell>
									<TableCell align="right">Price</TableCell>
									<TableCell align="right">Date</TableCell>
									<TableCell align="right">Description</TableCell>
									{/*<TableCell align="right">Actions</TableCell>*/}
								</TableRow>
							</TableHead>
							{trips?.map((row) => {
									return (
										<TableRow
											key={row.id}
											sx={{'&:last-child td, &:last-child th': {border: 0}}}

										>
											<TableCell component="th" scope="row">
												{row.id}
											</TableCell>
											<TableCell align="right">{row.displayName}</TableCell>
											<TableCell align="right">{row.price}</TableCell>
											<TableCell align="right">{row.date}</TableCell>
											<TableCell align="right">{row.description}</TableCell>
											{/*<TableCell align="right">*/}
											{/*	<IconButton onClick={() => handleDelete(row.id)} aria-label="delete" size="large">*/}
											{/*		<DeleteIcon/>*/}
											{/*	</IconButton>*/}
											{/*</TableCell>*/}
										</TableRow>
									)
								}
							)}
							<TableBody>
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			</Paper>
		</Box>
	);
}

export default EnhancedTable;
