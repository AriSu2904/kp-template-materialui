import { useState } from 'react';
import { useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import LoginRequest from 'src/graphql/LoginRequest';

import { Iconify } from 'src/components/iconify';

import { mappingError } from '../../utils/format-error';
import { ErrorAlert } from '../../components/sweet-alert';

export function SignInView() {
  const router = useRouter();
  const [isError, setIsError] = useState(false)

  const [signIn, { data, loading, error }] = useMutation(LoginRequest, {
    onCompleted: (response) => {
      if (response.loginToken) {
        localStorage.setItem('nik', response.loginToken.nik);
        localStorage.setItem('token', response.loginToken.token);
        router.push('/dashboard');
      }
    },
    onError: (e) => {
      setIsError(true);
    },
  });

  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    signIn({ variables: { nik, token: password } });
  }

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="NIK"
        label="Employee Id"
        placeholder="NIK12345"
        sx={{ mb: 3 }}
        value={nik}
        onChange={(e) => setNik(e.target.value)}
        autoComplete="off"
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        name="password"
        label="Token"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        disabled={loading || (nik === '' || password === '')}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>

      {error && (
        <ErrorAlert open={isError} message={mappingError(error)} onClose={() => {
          setIsError(false);
          setNik('');
          setPassword('');
        }} />
      )}
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
      </Box>
      {renderForm}
    </>
  );
}
