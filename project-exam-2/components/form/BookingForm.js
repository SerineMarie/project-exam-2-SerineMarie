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
    checkIn: yup.date().required("Please choose a check in date"),
    checkOut: yup.date().test("Please choose a check out date", "Check in and check out cannot be on the same date",function(value){
        const {checkIn} = this.parent;
        return value.getTime() !== checkIn.getTime();
    }),
    howMany: yup.number().required("Please choose how many people"),
    hotelMessage: yup.string(),
});

function BookingForm(){
    const bookingUrl = BASE_URL + "/booking?populate=*";

    const [submitting, setSubmitting] = useState(false);

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())

    function onSubmit(data, e){
        console.log(data);
        setSubmitting(true);
        axios.get(url, {
            "data": {
                "checkIn": data.checkIn,
                "checkOut": data.checkOut,
                "howMany": data.howMany,
                "hotelMessage": data.hotelMessage,
            }
        })
        .then(response => {
            setSubmitting(true);
            e.target.reset();
        })

    }
    console.log(errors);

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm}>
            <div className={styles.checkIn}>
                <p>Check In</p>
                <div>
                    <DatePicker wrapperClassName={styles.datePicker}
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
                        selected= {endDate} 
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        onChange={date => setEndDate(date)}
                    />
                </div>
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
                {errors.howMany && <span className={styles.formError}>{errors.howMany.message}</span>}
            </div>
            <div className={styles.textarea}>
                <p>Message for the hotel (optional)</p>
                <textarea {...register("hotelMessage")} placeholder="Message for hotel (optional)" className={styles.formMessage}/>
            </div>
            <button className={styles.submitBtn}>{submitting ? "Submitting.." : "Submit"}</button>
        </form>
    )
}

export default BookingForm;