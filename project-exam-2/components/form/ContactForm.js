import { useState } from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import styles from "../../styles/Home.module.scss";


const schema = yup.object().shape({
    fullname: yup.string().required("Please enter your full name").min(3, "There must be at least three characters"),
    email: yup.string().required("Please enter your email address").email("Email address not valid"),
    subject: yup.string().required("Please choose subject"),
    message: yup.string().required("Please fill out message form").min(10, "The message must have at least 10 characters")
});

function ContactForm (){
    const [submitted, setSubmitted] = useState(false);

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

    return (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
                <div className={styles.fullname}>
                    <input {...register("fullname")} placeholder="Full name" className={styles.formInput}/>
                    {errors.fullname && <span className={styles.formError}>{errors.fullname.message}</span>}
                </div>

                <div className={styles.email}>
                    <input {...register("email")} placeholder="Email" className={styles.formInput}/>
                    {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
                </div>

                <div className={styles.subject}>
                    <select {...register("subject")} className={styles.select}>
                        <option disabled selected>Select subject</option>
                        <option>Booking</option>
                        <option>Question about hotel</option>
                        <option>Other</option>
                    </select>
                    {errors.subject && <span className={styles.formError}>{errors.subject.message}</span>}
                </div>

                <div className={styles.textarea}>
                    <textarea {...register("message")} placeholder="Message" className={styles.formMessage}/>
                    {errors.message && <span className={styles.formError}>{errors.message.message}</span>}
                </div>
                
                <button className={styles.submitBtn}>Submit</button>
            </form>
    )
}

export default ContactForm;