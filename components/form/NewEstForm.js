import { BASE_URL } from "../../constans/api";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/Home.module.scss";
import { getToken } from "../../utils/storage";

const schema = yup.object().shape({
    name: yup.string().required("Please enter name of hotel").min(3, "Please enter at least 3 characters"),
    location: yup.string().required("Please enter hotel address").min(5, "Please enter at least 5 characters"),
    images: yup.mixed().required("Please provide a file"),
    excerpt: yup.string().required("Please enter exerpt of hotel").min(10, "Please enter at least 10 characters"),
    description: yup.string().required("Please enter description of hotel").min(15, "Please enter at least 15 characters"),
    price: yup.number().required("Please enter price for hotel").min(1, "Please enter at least 1 characters"),
    slug: yup.string().required("Enter name of hotel with no captial letters and no space").min(3, "Please enter at least 3 characters"),
});

export default function NewEstForm(){
    const newEstUrl = BASE_URL + "/hotels";
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(false);
    const [formSendt, setFormSendt] = useState(false);

    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });
   
    async function onSubmit(data, e){
        const token = getToken();
        setSubmitting(true);

        const formData = new FormData();
        const file = data.images[0];
        const newHotel = {
            name: data.name,
            location: data.location,
            price: data.price,
            excerpt: data.excerpt,
            slug: data.slug,
            description: data.description
        };

        formData.append("files.images", file, file.name);
        formData.append("data", JSON.stringify(newHotel))
    
        try{
            const response = await axios({
                url: newEstUrl,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFormSendt("New establishment created!")
        } catch(error){
            console.log(error)
            e.target.reset();
            setFormError("Incorrect credentials");
        } finally{
            e.target.reset();
            setSubmitting(false);
        }
    }

    return(
        <>
            {formError && <div className={styles.formError}>{formError}</div>}
            {formSendt && <div className={styles.formValidated}>{formSendt}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.newEstForm} disabled={submitting}>
                <div className={styles.hotelName}>
                    <p>Hotel name</p>
                    <input {...register("name")} placeholder="Hotelname" className={styles.formInput}/>
                    {errors.hotelname && <span className={styles.inputError}>{errors.hotelname.message}</span>}
                </div>
                <div className={styles.location}>
                    <p>Location/ address</p>
                    <input {...register("location")} placeholder="Location/ address" className={styles.formInput}/>
                    {errors.location && <span className={styles.inputError}>{errors.location.message}</span>}
                </div>
                <div className={styles.addImage}>
                    <p>Images</p>
                    <input {...register("images")} placeholder="Images" type="file" name="images" className={styles.formInput}/>
                    {errors.images && <span className={styles.inputError}>{errors.images.message}</span>}
                </div>
                <div className={styles.excerpt}>
                    <p>Hotel excerpt</p>
                    <textarea {...register("excerpt")} placeholder="Hotel excerpt" className={styles.formInput}/>
                    {errors.excerpt && <span className={styles.inputError}>{errors.excerpt.message}</span>}
                </div>
                <div className={styles.price}>
                    <p>Hotel price</p>
                    <input {...register("price")} placeholder="Hotel price" className={styles.formInput}/>
                    {errors.price && <span className={styles.inputError}>{errors.price.message}</span>}
                </div>
                <div className={styles.slug}>
                    <p>Hotel slug</p>
                    <input {...register("slug")} placeholder="Hotel slug" className={styles.formInput}/>
                    {errors.slug && <span className={styles.inputError}>{errors.slug.message}</span>}
                </div>
                <div className={styles.textarea}>
                    <p>Hotel description</p>
                    <textarea {...register("description")} placeholder="Hotel description" className={styles.formMessage}/>
                    {errors.excerpt && <span className={styles.inputError}>{errors.description.message}</span>}
                </div>
                <button className={styles.addBtn}>{submitting ? "Adding.." : "Add"}</button>
            </form>
        </>
    )
}
