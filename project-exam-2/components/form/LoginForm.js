import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/Home.module.scss";
import { saveToken, saveUser } from "../../utils/storage";
import { BASE_URL, TOKEN_PATH } from "../../constans/api";

const schema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    password: yup.string().required("Please enter a password"),
});

export default function LoginForm(){
    const url = BASE_URL + TOKEN_PATH;

    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const router = useRouter();

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data, e){
        setSubmitting(true);
        setLoginError(null);

        const credentials = {   
            identifier: data.username,
            password: data.password
        }
        try{
            const response = await axios.post(url, credentials);
            saveToken(response.data.jwt);
            saveUser(response.data.user);
            router.push("/adminPage");
        } catch(error){
            setLoginError("Incorrect username and password");
            e.target.reset();
        } finally{
            setSubmitting(false)
        }
    }

    return(
        <>
            {loginError && <div className={styles.formError}>{loginError}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm} disabled={submitting}>
                <div className={styles.username}>
                    <p>Username</p>
                    <input {...register("username")} placeholder="Username/email" className={styles.formInput}/>
                    {errors.username && <span className={styles.inputError}>{errors.username.message}</span>}
                </div>
                <div className={styles.password}>
                    <p>Password</p>
                    <input {...register("password")} placeholder="Password" type="password" className={styles.formInput}/>
                    {errors.password && <span className={styles.inputError}>{errors.password.message}</span>}
                </div>
                <button className={styles.loginBtn}>{submitting ? "Logging in.." : "Log in"}</button>
            </form>
        </>
    )
}