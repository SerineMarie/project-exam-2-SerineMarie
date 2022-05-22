import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/Home.module.scss";
import { saveToken, saveUser } from "../../utils/storage";
import { BASE_URL, TOKEN_PATH } from "../../constans/api";

const schema = yup.object().shape({
    username: yup.string().required("Please enter a username").min(3, "Are you sure you entered correct username?"),
    password: yup.string().required("Please enter a password").min(8, "Password incorrect"),
});

export default function LoginForm(){
    const url = BASE_URL + TOKEN_PATH;

    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);


    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data){
        setSubmitting(true);
        setLoginError(null);
        console.log(data);

        axios.post(url, {
            identifier: data.username,
            password: data.password
        })

        .then(response => {
            saveToken(response.data.jwt);
            saveUser(response.data.user);
            location.href = "/adminPage";
        })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm} disabled={submitting}>
            <div className={styles.username}>
                <p>Username</p>
                <input {...register("username")} placeholder="Username/email" className={styles.formInput}/>
                {errors.username && <span className={styles.formError}>{errors.username.message}</span>}
            </div>
            <div className={styles.password}>
                <p>Password</p>
                <input {...register("password")} placeholder="Password" type="password" className={styles.formInput}/>
                {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
            </div>
            <button className={styles.loginBtn}>{submitting ? "Logging in.." : "Log in"}</button>
        </form>
    )
}