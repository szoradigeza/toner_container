import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '@/api';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';

const Login = () => {
    const loginMutation = useLogin();
    const navigate = useNavigate();
    const location = useLocation();
    const formik = useFormik({
        initialValues: {
            username: 'demo@devias.io',
            password: 'Password123'
        },
        validationSchema: Yup.object({
            username: Yup.string(),
            password: Yup.string().max(255).required('Password is required')
        }),
        onSubmit: async ({ username, password }) => {
            console.log(password);
            const result = await loginMutation.mutateAsync({ username, password });
            console.log(result.token);

            if (result) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', result.username);

                const from = location.state?.from || { pathname: '/dashboard' };
                navigate(from);
            }
        }
    });

    return (
        <>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}>
                <Container maxWidth="sm">
                    <Button component="a">Dashboard</Button>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4">
                                Sign in
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Sign in on the internal platform
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Button>Login with Facebook</Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button>Login with Google</Button>
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                pb: 1,
                                pt: 3
                            }}>
                            <Typography align="center" color="textSecondary" variant="body1">
                                or login with email address
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.username && formik.errors.username)}
                            fullWidth
                            helperText={formik.touched.username && formik.errors.username}
                            label="User name"
                            margin="normal"
                            name="username"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained">
                                Sign In Now
                            </Button>
                        </Box>
                        <Typography color="textSecondary" variant="body2">
                            Don&apos;t have an account? <Button>Sign Up</Button>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Login;
