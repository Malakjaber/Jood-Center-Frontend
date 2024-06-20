import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import useApi from "../../hooks/useApi";
import { signUpSchema } from "../../validation/Validation";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MySnackbar from "../../global/MySnackbar";
import useRoleRedirect from "../../hooks/useRoleRedirect";
import useGetRoles from "../../queries/useGetRoles";
import CustomLoader from "../../global/CustomLoader";
import { titleCase } from "../../utils/stringUtils";

export default function SignUp() {
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { roles, loading } = useGetRoles();

  const { post, data, error } = useApi();

  useRoleRedirect(["manager"]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      id: "",
      password: "",
      role: "parent",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const body = {
        username: values.firstName + " " + values.lastName,
        email: values.email,
        address: values.address,
        phone: values.phone,
        userId: values.id,
        password: values.password,
        role: values.role,
      };
      post(`/auth/signup`, body);
    },
  });

  useEffect(() => {
    if (data?.message === "success") {
      setSnackbarProps({
        severity: "success",
        content: "User Created Successfully",
      });
      setOpenSnackbar(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSnackbarProps({
        severity: "error",
        content: error,
      });
      setOpenSnackbar(true);
    }
  }, [error]);

  if (loading) {
    <CustomLoader />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <MySnackbar
        {...snackbarProps}
        open={openSnackbar}
        handleClose={() => {
          setOpenSnackbar(false);
        }}
      />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Account
        </Typography>
        <Box
          component={"form"}
          noValidate
          onSubmit={formik.handleSubmit}
          className="w-full mt-3"
          my={5}
        >
          <Grid container spacing={2} className="mb-4">
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <FormControl sx={{ mt: "1rem", pl: "1rem" }} fullWidth>
              <InputLabel
                sx={{ fontSize: "1.2rem", pl: "1.2rem" }}
                variant="standard"
                htmlFor="role-select"
              >
                Sign up as
              </InputLabel>
              <NativeSelect
                onChange={(event) => {
                  formik.handleChange(event);
                }}
                value={formik.values.role}
                inputProps={{
                  name: "role",
                  id: "role-select",
                }}
              >
                {roles?.map((role) => (
                  <option value={role?.id}>{titleCase(role?.name)}</option>
                ))}
              </NativeSelect>
            </FormControl>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="id"
                onChange={formik.handleChange}
                value={formik.values.id}
                onBlur={formik.handleBlur}
                error={formik.touched.id && formik.errors.id}
                helperText={formik.touched.id && formik.errors.id}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                onBlur={formik.handleBlur}
                error={formik.touched.address && formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Create Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
