import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../app/store";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useDispatch()
   const isLoggedIn= useSelector<AppRootStateType>((state) => state.auth.isLoggedIn)
       if (isLoggedIn) {
           return <Redirect to={'/'}/>
       }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password address';
            }
            return errors;
        },


        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(loginTC(values))
            formik.resetForm();
        },
    })


    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}/>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        /*name='email'*/
                        {...formik.getFieldProps('email')}
                        /*onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}*/
                    />
                    {formik.touched.email && formik.errors.email
                        ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                        : null}
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        /*name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}*/
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password
                        ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                        : null}
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox
                            name='rememberMe'
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}/>}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
            </FormControl>

        </Grid>
    </Grid>
}
