import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AppRegistration, Home, Login, Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {Container} from "@mui/material";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
	const navigate = useNavigate();
	const {user} = useAuthContext() as any;
	const {logout} = useLogout();
	const [state, setState] = React.useState({
		bottom: false,
	});

	const toggleDrawer = (anchor: Anchor, open: boolean) => {
		return (event: React.KeyboardEvent | React.MouseEvent) => {
			if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setState({...state, [anchor]: open});
		}
	}

	const list = (anchor: Anchor) => (
		<Box
			sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{!user && (
					<>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate('/sign-in')}>
								<ListItemIcon>
									<Login/>
								</ListItemIcon>
								<ListItemText>Sign In</ListItemText>
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate('/sign-up')}>
								<ListItemIcon>
									<AppRegistration/>
								</ListItemIcon>
								<ListItemText>Sign Up</ListItemText>
							</ListItemButton>
						</ListItem>

					</>
				)}
				{user && (
					<>
						<ListItem disablePadding>
							<ListItemButton onClick={() => logout()}>
								<ListItemIcon>
									<Logout/>
								</ListItemIcon>
								<ListItemText>Logout</ListItemText>
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => navigate('/')}>
								<ListItemIcon>
									<Home/>
								</ListItemIcon>
								<ListItemText>Home Page</ListItemText>
							</ListItemButton>
						</ListItem>
					</>
				)}
			</List>
		</Box>
	);

	return (
		<div>
			{(['bottom'] as const).map((anchor) => (
				<React.Fragment key={anchor}>
					<Container style={{marginTop: 10}} component="main" maxWidth="xl">
						<Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
					</Container>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
