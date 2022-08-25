import {useState} from "react";

import {auth} from '../firebase/config';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {useAuthContext} from "./useAuthContext";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const {dispatch} = useAuthContext() as any;
	const signup = (email: string, password: string, fullName: string) => {
		setError(null);
		createUserWithEmailAndPassword(auth, email, password).then(res => {
			updateProfile(res.user, {
				displayName: fullName
			}).then(()=>{
				console.log('set full name')
			})
			dispatch({type: 'LOGIN', payload: res.user})
		}).catch((err) => {
			setError(err.message)
		})
	}

	return {error, signup}
}