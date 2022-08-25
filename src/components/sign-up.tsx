import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useSignup} from "../hooks/useSignup";


export default function SignUp() {
	const {signup} = useSignup();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [fullName, setFullName] = useState<string>('');
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		signup(email, password, fullName);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
				<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="given-name"
							           name="fullName" required fullWidth id="fullName" label="FullName"
							           autoFocus/>
						</Grid>
						<Grid item xs={12}>
							<TextField value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth id="email"
							           label="Email Address" name="email" autoComplete="email"/>
						</Grid>
						<Grid item xs={12}>
							<TextField value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth
							           name="password" label="Password" type="password" id="password"
							           autoComplete="new-password"/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Sign Up</Button>
					<Grid container justifyContent="flex-start">
						<Grid item>
							<Link component={RouterLink} to="/sign-in" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}