import {useEffect, useState} from "react";
import {db} from '../firebase/config';

import {collection, onSnapshot} from 'firebase/firestore'

export const useCollection = (col: string): any => {
	const [documents, setDocuments] = useState<any>(null);

	useEffect(() => {
		let ref = collection(db, col);

		const unsub = onSnapshot(ref, (snapshot) => {
			const results: any[] = []
			snapshot.docs.forEach((doc) => {
				results.push({id: doc.id, ...doc.data()})
			});
			setDocuments(results)
		})
		return () => unsub();
	}, [col])

	return {documents}
}