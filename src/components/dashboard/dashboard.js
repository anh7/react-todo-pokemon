import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ToDoList from '../to-do-list/to-do-list.lazy';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material';
import { initThunk } from '../../slices/to-do-slice';
import ToDoListStatus from '../to-do-list/to-do-list.status';

const mdTheme = createTheme();

const Dashboard = () => {
  const toDoListStatus = useSelector((state) => state.toDo.status)
  const dispatch = useDispatch()
  useEffect(() => {
    // This is being called twice because of a known issue from React.StrictMode in development mode
    dispatch(initThunk())
  },[dispatch])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MuiAppBar position="absolute">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              textAlign="center"
              sx={{ flexGrow: 1 }}
            >
              Let's Catch Some Pokemons
            </Typography>
          </Toolbar>
        </MuiAppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
            <Grid container spacing={2} 
              direction="column"
              alignItems="center"
              justifyContent="center">
                { toDoListStatus === ToDoListStatus.Loading && <CircularProgress />}
                { toDoListStatus === ToDoListStatus.HasErrors &&
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <Typography variant="body1" gutterBottom>
                      The application could not initialized.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Please check your internet connection or try again later.
                    </Typography>
                    <Button onClick={() => dispatch(initThunk())}>Retry</Button>
                  </Alert>
                }
                { toDoListStatus === ToDoListStatus.Initialized &&
                  <Grid item xs={8}>
                    <ToDoList />
                  </Grid>
                }
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
