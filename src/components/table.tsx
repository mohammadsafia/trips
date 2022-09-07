import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from "@mui/material";
import {Trip} from "../types.module";
import {db} from '../firebase/config';
import {deleteDoc, doc} from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';

interface IEnhancedTableProps {
	trips: Trip[]
}

const EnhancedTable: React.FC<IEnhancedTableProps> = ({trips}) => {
	const [confimDelete, setConfirmDelete] = useState<boolean>(false);
	const [tripId, setTripId] = useState< string>('');
	const handleDelete = async () => {
		const ref = doc(db, 'trips', tripId);
		await deleteDoc(ref)
	}
	const confirmDeleteHandler = (id: string)=> {
		setTripId(id);
		setConfirmDelete(true);
	}
	const onConfirmDeleteHandler = async ()=> {
		await handleDelete();
		setConfirmDelete(false);
	}
	return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Container component='main' maxWidth='xl'>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Username</TableCell>
                  <TableCell align='left'>Price</TableCell>
                  <TableCell align='left'>Date</TableCell>
                  <TableCell align='left'>Description</TableCell>
                  <TableCell align='left'>Actions</TableCell>
                </TableRow>
              </TableHead>
              {trips?.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align='left'>{row.displayName}</TableCell>
                    <TableCell align='left'>{row.price}</TableCell>
                    <TableCell align='left'>{row.date}</TableCell>
                    <TableCell align='left'>{row.description}</TableCell>
                    <TableCell align='left'>
                      <IconButton
                        onClick={() => confirmDeleteHandler(row.id)}
                        aria-label='delete'
                        size='large'
                      >
                        <DeleteIcon color='error' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Paper>
      <Dialog
        open={confimDelete}
        onClose={() => setConfirmDelete(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Are you sure you want to delete the trip?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
		  If you delete it, it will disappear forever. Think carefully before deleting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onConfirmDeleteHandler()}>Yes</Button>
          <Button onClick={() => setConfirmDelete(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EnhancedTable;
