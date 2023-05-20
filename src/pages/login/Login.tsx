import React, {FC, useEffect} from 'react';
import styles from './login.module.scss'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setMyData} from "../../redux/auth/authSlice";
import {useNavigate} from "react-router";
import {meAuth} from "../../redux/auth/asyncActions";


type signInType = {
    instanceId: string
    apiToken: string
}
const Login: FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const isLoading = useAppSelector(state => state.auth.isLoading)
    const errorSignIn = useAppSelector(state => state.auth.errorSignIn)

    useEffect(() => {
        if (isAuth) {
            navigate('home')
        }
    }, [isAuth])

    const {
        control,
        handleSubmit,
        clearErrors,
        formState: {
            errors,
        },
    } = useForm<signInType>({mode: 'onSubmit'})

    const onSubmit: SubmitHandler<signInType> = (data: signInType) => {
        dispatch(meAuth({instanceId: data.instanceId, apiToken: data.apiToken}))
        dispatch(setMyData({waInstance: data.instanceId, apiToken: data.apiToken}))
        clearErrors()
        console.log(data)
    }


    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container}>
                    <span className={styles.loginTitle}>Login</span>
                    <Controller
                        control={control}
                        name={'instanceId'}
                        defaultValue=""
                        rules={{
                            required: "Id is required",
                            pattern: {
                                value: /^\d{10}$/,
                                message: 'Id must be 10 characters!'
                            }
                        }}
                        render={({field: {onChange}, fieldState: {error}}) => <>
                            <input disabled={isLoading}
                                   placeholder={'Your instance Id'}
                                   onChange={(e) => {
                                       onChange(e.currentTarget.value)
                                   }}/>
                            {errors && <div style={{color: '#DC143C'}}>{errors.instanceId?.message}</div>}
                        </>}
                    />
                    <Controller
                        control={control}
                        name={'apiToken'}
                        defaultValue=""
                        rules={{
                            required: "API token is required",

                        }}
                        render={({field: {onChange}, fieldState: {error}}) => <>
                            <input
                                placeholder={'API token'}
                                disabled={isLoading}
                                onChange={(e) => {
                                    onChange(e.currentTarget.value)
                                }}/>
                            {errors && <div style={{color: '#DC143C'}}>{errors.apiToken?.message}</div>}
                            {errorSignIn && <div style={{color: '#DC143C'}}>{errorSignIn}</div>}
                        </>}
                    />
                    <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
