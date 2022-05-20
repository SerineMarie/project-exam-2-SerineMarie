import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/Home.module.scss";
import { BASE_URL, TOKEN_PATH } from "../../constans/api";
// import AuthContext from "../../context/AuthContext";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
    username: yup.string().required("Please enter a username").min(3, "Are you sure you entered correct username?"),
    password: yup.string().required("Please enter a password").min(8, "Password incorrect"),
});

export default function LoginForm(){
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);


    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const [auth, setAuth] = useContext(AuthContext);

    // async function onSubmit(username, password){
    //     setSubmitting(true);
    //     setLoginError(null);

    //     const data = JSON.stringify({identifier: username, password: password});
    //     console.log(data)
    //     const options = {
    //         method: "POST",
    //         body: data,
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     };
    //     try {
    //         const response = await fetch(url, options);
    //         const json = await response.json();

    //         if(json.user){
    //             console.log("user", user);
    //         }
    //         console.log(json)
    //     } catch(error){
    //         console.log(error)
    //     } finally {
    //         setSubmitting(false)
    //     }
        
    // }

    async function onSubmit(data){
        setSubmitting(true);
        setLoginError(null);
        console.log(data);

        axios.post(url, {
            identifier: data.email,
            password:  data.password
        })

        .then(response => {
            console.log("Logged in");
            console.log("User", response.data.user);
            console.log("Token", response.data.jwt)
        })

        // try{
        //     const response = await axios.post(url, data);
        //     console.log("response", response.data);
        //     // setAuth(response.data)
        // } catch(error){
        //     console.log("error", error);
        //     setLoginError(error.toString())
        // } finally {
        //     setSubmitting(false)
        // }
    }


    // console.log(errors);

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm} disabled={submitting}>
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
            <button className={styles.loginBtn}>{submitting ? "Logging in.." : "Log in"}</button>
        </form>
    )
}

// export default LoginForm;