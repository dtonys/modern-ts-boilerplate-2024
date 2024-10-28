import React from 'react';

import {
  Avatar,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import onLinkClick from 'client/helpers/onLinkClick';

function LogIn() {
  function handleSubmit() {
    console.log('handleSubmit');
  }

  async function fireAPI(event: React.MouseEvent<HTMLElement>) {
    const endpoint = (event.target as Element).getAttribute('data-endpoint');
    const startTime = Date.now();
    const response: Response = await fetch(endpoint!);
    const json = (await response.json()) as unknown;
    console.log(json);
    console.log('Duration in seconds');
    const seconds = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(seconds);
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address!!!!"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2" onClick={onLinkClick}>
              Don't have an account? Sign Up!!!!
            </Link>
          </Grid>
        </Grid>
        <button type="button" onClick={fireAPI} data-endpoint="/api/dynamo/users">
          DynamoDB
        </button>
        <button type="button" onClick={fireAPI} data-endpoint="/api/dynamo/users?parallel=1">
          DynamoDB - Parallel
        </button>
        <button type="button" onClick={fireAPI} data-endpoint="/api/sql/users">
          MySQL
        </button>
        <button type="button" onClick={fireAPI} data-endpoint="/api/sql/users?aurora=1">
          Aurora
        </button>
        <button type="button" onClick={fireAPI} data-endpoint="/api/redis/users">
          Redis
        </button>
      </Box>
    </Box>
  );
}

export default LogIn;
