import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/Home.module.scss";

const schema = yup.object().shape({
    username: yup.string().required("Please enter a username").min(3, "Are you sure you entered correct username?"),
    password: yup.string().required("Please enter a password").min(8, "Password incorrect"),
});

function LoginForm(){

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data){
        console.log(data);
        //do a post request
        //reset values?????
    }
    console.log(errors);

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
            <div className={styles.username}>
                <p>Username</p>
                <input {...register("username")} placeholder="Username/email" className={styles.formInput}/>
                {errors.username && <span className={styles.formError}>{errors.username.message}</span>}
            </div>
            <div className={styles.password}>
                <p>Password</p>
                <input {...register("password")} placeholder="Password" className={styles.formInput}/>
                {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
            </div>
            <button className={styles.loginBtn}>Log in</button>
        </form>
    )
}

export default LoginForm;