import React, {FC, useEffect} from 'react';
import styles from './login.module.scss'
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {meAuth, setMyData} from "../../redux/auth/authSlice";
import {useNavigate} from "react-router";


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


    // instanceId - 1101821022
    // apiToken - d533bf6949c642219f18217a873c3368ae2d1321f707470a97

    const {
        control,
        handleSubmit,
        reset,
        clearErrors,
        formState: {
            errors,
            isValid
        },
    } = useForm<signInType>({mode: 'onSubmit'})
    
    const onSubmit: SubmitHandler<signInType> = (data: signInType) => {
        dispatch(meAuth({instanceId: data.instanceId, apiToken: data.apiToken}))
        dispatch(setMyData({id: data.instanceId, apiToken: data.apiToken}))
        clearErrors()
        console.log(data)
    }


    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={styles.container}>
                    <Controller
                        control={control}
                        name={'instanceId'}
                        defaultValue="1101821022"// FIX на пустую строку!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        rules={{
                            required: "Id is required",
                            pattern: {
                                value: /^\d{10}$/,
                                message: 'Id must be 10 characters!'
                            }
                        }}
                        render={({field: {onChange, value}, fieldState: {error}}) => <>
                            <input
                                placeholder={'your instance Id'}
                                style={{width: '70%'}}
                                onChange={(e) => {
                                    onChange(e.currentTarget.value)
                                }}/> <h1>fix empty field </h1>
                            {errors && <div style={{color: 'red'}}>{errors.instanceId?.message}</div>}
                        </>}
                    />

                    <Controller
                        control={control}
                        name={'apiToken'}
                        defaultValue="d533bf6949c642219f18217a873c3368ae2d1321f707470a97"// FIX на пустую строку!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        rules={{
                            required: "API token is required",

                        }}
                        render={({field: {onChange, value}, fieldState: {error}}) => <>
                            <input
                                placeholder={'API token'}
                                style={{width: '70%'}}
                                onChange={(e) => {
                                    onChange(e.currentTarget.value)
                                }}/>
                            {errors && <div style={{color: 'red'}}>{errors.apiToken?.message}</div>}
                            {errorSignIn && <div style={{color: 'red'}}>{errorSignIn}</div>}
                        </>}
                    />
                    <button disabled={isLoading}>Login</button>
                </div>

            </form>
        </div>
    );
};

export default Login;
