import React from 'react';
import {useCollection} from "../hooks/useCollection";
import {Trip} from "../types.module";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PropsTotalTrips {
}

const TotalTrips: React.FC<PropsTotalTrips> = (props) => {
	const {documents} = useCollection('trips');

	const convertDocsToObject = (): { [key: string]: number } => {
		const newRecords: { [key: string]: Trip[] } | any = {};
		(documents as Trip[])?.forEach((trip: Trip) => {
			if (!newRecords[trip.displayName]) {
				newRecords[trip.displayName] = +trip.price
			} else {
				newRecords[trip.displayName] = +newRecords[trip.displayName] + +trip.price
			}
		});
		return newRecords
	}

	const keys = Object.keys(convertDocsToObject());

	const lender = Object.keys(convertDocsToObject()).reduce((r: any, a, i) => {
		return !i || +convertDocsToObject()[a] > +convertDocsToObject()[r] ? a : r;
	}, undefined);

	const borrower = Object.keys(convertDocsToObject()).reduce((r: any, a, i) => {
		return !i || +convertDocsToObject()[a] < +convertDocsToObject()[r] ? a : r;
	}, undefined);

	return (<>
			<div>
				{keys.map((key) => (<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon/>}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>{key} - {key === lender ? 'Lender' : 'Borrower'} {key === lender && (convertDocsToObject()[lender] - convertDocsToObject()[borrower])} </Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								{convertDocsToObject()[key]}
							</Typography>
						</AccordionDetails>
					</Accordion>))}
			</div>
		</>);
};

export default TotalTrips;