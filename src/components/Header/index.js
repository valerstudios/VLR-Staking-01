import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../../images/VLR-logo.png';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    logo: {
        height: "5%",
        width: "5%"
    }
})
export default function Header() {
    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">

                <Toolbar>
                    <img src={logo} className={classes} />
                    <Button color="inherit">Connect MetaMask</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
