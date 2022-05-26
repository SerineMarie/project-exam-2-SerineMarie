import { useState } from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { BASE_URL} from "../../constans/api";
import styles from "../../styles/Home.module.scss";
import axios from "axios"


const schema = yup.object().shape({
    fullname: yup.string().required("Please enter your full name").min(3, "There must be at least three characters"),
    email: yup.string().required("Please enter your email address").email("Email address not valid"),
    subject: yup.string().required("Please choose subject"),
    message: yup.string().required("Please fill out message form").min(10, "The message must have at least 10 characters")
});

function ContactForm (){
    const contactUrl = BASE_URL + "/contactpages?populate=*";
    const [submitting, setSubmitting] = useState(false);

    const {
        register, 
        handleSubmit,  
        formState: {errors} 
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data, e){
        console.log(data);
        setSubmitting(true)
        axios.post(contactUrl, {
            "data": {
                "fullname": data.fullname,
                "email": data.email,
                "subject": data.subject,
                "message": data.contactMessage
            }
        }
        )
        .then(response => {
            setSubmitting(true);
            e.target.reset();
        })
    }
    console.log(errors);

    return (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
                <div className={styles.fullname}>
                    <p>Full name</p>
                    <input {...register("fullname")} placeholder="Full name" className={styles.formInput}/>
                    {errors.fullname && <span className={styles.formError}>{errors.fullname.message}</span>}
                </div>

                <div className={styles.email}>
                    <p>Email</p>
                    <input {...register("email")} placeholder="Email" className={styles.formInput}/>
                    {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
                </div>

                <div className={styles.subject}>
                    <p>Subject</p>
                    <select {...register("subject")} className={styles.select}>
                        <option disabled selected>Select subject</option>
                        <option>Booking</option>
                        <option>Question about hotel</option>
                        <option>Other</option>
                    </select>
                    {errors.subject && <span className={styles.formError}>{errors.subject.message}</span>}
                </div>

                <div className={styles.textarea}>
                    <p>Message</p>
                    <textarea {...register("message")} placeholder="Message" className={styles.formMessage}/>
                    {errors.contactMessage && <span className={styles.formError}>{errors.message.message}</span>}
                </div>
                <button className={styles.submitBtn}>{submitting ? "Sending.." : "Send"}</button>
            </form>
    )
}

export default ContactForm;