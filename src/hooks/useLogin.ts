import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const {dispatch} = useAuthContext() as any;
	const login = (email: string, password: string) => {
		setError(null);
		signInWithEmailAndPassword(auth, email, password).then(res => {
			dispatch({type: 'LOGIN', payload: res.user})
		}).catch((err) => {
			setError(err.message)
		})
	}


	return {error, login}
}