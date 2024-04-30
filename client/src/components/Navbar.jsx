import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import FlexBetween from './FlexBetween';
import { GridMenuIcon } from '@mui/x-data-grid';
import { ArrowDropDownOutlined, DarkModeOutlined, LightModeOutlined, Search, SettingsOutlined } from '@mui/icons-material';
import { setMode } from 'state';
import profileImage from 'assets/20231206_121047.jpg';

const Navbar = ({user, isSidebarOpen, setIsSidebarOpen} ) => {
	const dispatch = useDispatch();
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState(null);
	const isOpen = Boolean(anchorEl);

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<AppBar 
			sx={{
			position: "static", 
			background: "none", 
			boxShadow: "none" 
			}}>
			<Toolbar sx={{justifyContent: "space-between"}}>
				
				{/* Left side */}
				<FlexBetween>
				<IconButton onClick = {() => setIsSidebarOpen(!isSidebarOpen)}>
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

					<FlexBetween>
						<Button onClick={handleClick}
							sx={{display:"flex", justifyContent:"space-between", alignItems: "center", textTransform:"none", gap:"1rem"}}
						>
							<Box
								component="img"
								alt='profile'
								src={profileImage}
								height="32px"
								width="32px"
								sx={{ objectFit: "cover",
								borderRadius: "50%",
									objectFit:"cover"
								}}
							/>
							<Box textAlign="left"> 
								<Typography fontWeight="bold" fontSize="0.8rem" sx={{color: theme.palette.secondary[100]}}>{user.name}</Typography>
								<Typography fontSize="0.7rem" sx={{color: theme.palette.secondary[200]}}>{user.occupation}</Typography>
							</Box>
							<ArrowDropDownOutlined
								sx={{color: theme.palette.secondary[100] , fontSize:"25px"}} 
							/>
						</Button>
						<Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical: 'bottom' , horizontal: "center"}}>
							<MenuItem onClick={handleClose}>Log Out</MenuItem>
						</Menu>
					</FlexBetween>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
