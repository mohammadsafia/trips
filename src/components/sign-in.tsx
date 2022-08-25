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
import {useLogin} from "../hooks/useLogin";

export default function SignIn() {
	const {login} = useLogin();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login(email, password);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
					<TextField value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required fullWidth
					           id="email" label="Email Address" name="email"
					           autoComplete="email" autoFocus/>
					<TextField value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required fullWidth
					           name="password" label="Password" type="password" id="password"
					           autoComplete="current-password"/>
					<Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Sign In</Button>
					<Grid container justifyContent="flex-start">
						<Grid item>
							<Link component={RouterLink} to="/sign-up" variant="body2">
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}