import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux'
import FlexBetween from './FlexBetween';
import { GridMenuIcon } from '@mui/x-data-grid';
import { DarkModeOutlined, LightModeOutlined, Search, SettingsOutlined } from '@mui/icons-material';
import { setMode } from 'state';

const Navbar = () => {

	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<AppBar sx={{position: "static", background: "none", boxShadow: "none" }}>
			<Toolbar sx={{justifyContent: "space-between"}}>
				{/* Left side */}
			<FlexBetween>
				<IconButton onClick={() => console.log('open/close sidebar')}>
					<GridMenuIcon/>
				</IconButton>
				<FlexBetween backgroundColor={theme.palette.background.alt} borderRadious="9px" gap="3rem" p="0.1rem 1.5rem">
					<InputBase placeholder='Search...'/>
					<IconButton>
						<Search/>
					</IconButton>
				</FlexBetween>
				</FlexBetween>

				{/* Right side */} 
				<FlexBetween gap="1.5rem">
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkModeOutlined sx={{fontSize: "25px"}} />
						) : (
							<LightModeOutlined sx={{fontSize: "25px"}} />
						)}
					</IconButton>
					<IconButton>
						<SettingsOutlined sx={{fontSize: "25px"}}/>
					</IconButton>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
