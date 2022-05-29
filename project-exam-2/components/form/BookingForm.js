import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Home.module.scss";
import { BASE_URL } from "../../constans/api";
import axios from "axios";

const schema = yup.object().shape({
    fullname: yup.string().required("Please enter your full name"),
    howMany: yup.string().required("Please choose how many people"),
    // checkIn: yup.date().required("Please enter check in date"),
    // checkOut: yup.date().required("Please enter check out date"),
    message: yup.string(),
});

export default function BookingForm(){
    const bookingUrl = BASE_URL + "/bookings";

    const [submitting, setSubmitting] = useState(false);
    const [formSendt, setFormSendt] = useState(false);
    const [formError, setFormError] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())

    endDate.setDate(endDate.getDate() +1);

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data, e){
        setSubmitting(true);

        const bookingDetails = {
            "data": {
                "fullname": data.fullname,
                "checkIn": data.checkIn,
                "checkOut": data.checkOut,
                "howMany": data.howMany,
                "message": data.message,
            }
        }
        const header = {
            headers: {
                "Content-Type": `application/json`,
            }
        }
        try{
            const response = await axios.post(bookingUrl, bookingDetails, header)
            setFormSendt("Booking sendt")
            console.log(response)
        }catch(error){
            console.log(error);
            setFormError("Incorrect credentials");
            e.target.reset();
        } finally{
            e.target.reset();
            setSubmitting(false)
        }
    }
    
    return(
        <>
            {formError && <div className={styles.formError}>{formError}</div>}
            {formSendt && <div className={styles.formValidated}>{formSendt}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm}>
                <div className={styles.fullname}>
                    <p>Fullname</p>
                    <input {...register("fullname")} placeholder="Full name" className={styles.formInput}/>
                    {errors.fullname && <span className={styles.inputError}>{errors.fullname.message}</span>}
                </div>
                <div className={styles.howMany}>
                    <p>Guest(s)</p>
                    <select {...register("howMany")}>
                        <option>1 person</option>
                        <option>2 people</option>
                        <option>3 people</option>
                        <option>4 people</option>
                        <option>5 people</option>
                        <option>5+ people</option>
                    </select>
                    {errors.howMany && <span className={styles.inputError}>{errors.howMany.message}</span>}
                </div>
                <div className={styles.checkIn}>
                    <p>Check In</p>
                    <div>
                        <DatePicker wrapperClassName={styles.datePicker}
                        {...register("checkIn")}
                            selected= {startDate} 
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            onChange={date => setStartDate(date)}
                        />
                    </div>
                </div>
                <div className={styles.checkOut}>
                    <p>Check Out</p>
                    <div>
                        <DatePicker wrapperClassName={styles.datePicker}
                        {...register("checkOut")}
                            selected= {endDate} 
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            onChange={date => setEndDate(date)}
                        />
                    </div>
                </div>
                <div className={styles.textarea}>
                    <p>Message for the hotel (optional)</p>
                    <textarea {...register("message")} placeholder="Message for hotel (optional)" className={styles.formMessage}/>
                </div>
                <button className={styles.submitBtn}>{submitting ? "Submitting.." : "Submit"}</button>
            </form>
        </>
    )
}