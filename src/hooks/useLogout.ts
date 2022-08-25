import {auth} from '../firebase/config';
import {signOut} from 'firebase/auth'
import {useAuthContext} from "./useAuthContext";

export const useLogout = () => {
	const {dispatch} = useAuthContext() as any;
	const logout = () => {
		signOut(auth).then(() => {
			dispatch({type: 'LOGOUT'})
		}).catch((err) => console.error(err.message))
	}

	return {logout}
}