import { BASE_URL } from "../../constans/api";
import axios from "axios";
import { useState } from "react";
import { get, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/Home.module.scss";
import { getToken } from "../../utils/storage";

const schema = yup.object().shape({
    hotelname: yup.string().required("Please enter name of hotel").min(3, "Please enter at least 3 characters"),
    location: yup.string().required("Please enter hotel address").min(5, "Please enter at least 5 characters"),
    // images: yup.string().required("Please enter image url").min(5,"Please enter at least 5 characters"),
    // images: yup.mixed().test("required", "Please enter image (File Type: jpeg and jpg", (value) => value.length > 0)
    //         .test("fileType", "Please enter correct filetype (jpeg or jpg)", (value) => ),
    excerpt: yup.string().required("Please enter exerpt of hotel").min(10, "Please enter at least 10 characters"),
    description: yup.string().required("Please enter description of hotel").min(15, "Please enter at least 15 characters"),
    price: yup.number().required("Please enter price for hotel").min(1, "Please enter at least 1 characters"),
    slug: yup.string().required("Enter name of hotel with no captial letters and no space").min(3, "Please enter at least 3 characters"),
});

export default function NewEstForm(){
    const url = BASE_URL + "/hotels?populate=*";

    const [submitting, setSubmitting] = useState(false);
   const token = getToken();


    const {
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
    });
    
    async function onSubmit(data){
        setSubmitting(true);
        console.log(data);
        axios.post(url, {
            "data":{
                "name": data.hotelname,
                "location": data.address,
                "price": data.price,
                "excerpt": data.excerpt,
                "slug": data.slug,
                "description": data.description,
                // "images": data.images
            }
        }, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        )
            .then(response => {
                setSubmitting(true)
            })
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={styles.newEstForm} disabled={submitting}>
            <div className={styles.hotelName}>
                <p>Hotel name</p>
                <input {...register("hotelname")} placeholder="Hotelname" className={styles.formInput}/>
                {errors.hotelname && <span className={styles.formError}>{errors.hotelname.message}</span>}
            </div>
            <div className={styles.location}>
                <p>Location/ address</p>
                <input {...register("location")} placeholder="Location/ address" className={styles.formInput}/>
                {errors.location && <span className={styles.formError}>{errors.location.message}</span>}
            </div>
            <div className={styles.addImage}>
                <p>Image url</p>
                <input {...register("images")} placeholder="Image url" className={styles.formInput}/>
                {errors.images && <span className={styles.formError}>{errors.images.message}</span>}
            </div>
            <div className={styles.excerpt}>
                <p>Hotel excerpt</p>
                <input {...register("excerpt")} placeholder="Hotel excerpt" className={styles.formInput}/>
                {errors.excerpt && <span className={styles.formError}>{errors.excerpt.message}</span>}
            </div>
            <div className={styles.description}>
                <p>Hotel description</p>
                <textarea {...register("description")} placeholder="Hotel description" className={styles.formMessage}/>
                {errors.excerpt && <span className={styles.formError}>{errors.description.message}</span>}
            </div>
            <div className={styles.price}>
                <p>Hotel price</p>
                <input {...register("price")} placeholder="Hotel price" className={styles.formInput}/>
                {errors.price && <span className={styles.formError}>{errors.price.message}</span>}
            </div>
            <div className={styles.slug}>
                <p>Hotel slug</p>
                <input {...register("slug")} placeholder="Hotel slug" className={styles.formInput}/>
                {errors.slug && <span className={styles.formError}>{errors.slug.message}</span>}
            </div>
            <button className={styles.addBtn}>{submitting ? "Adding.." : "Add"}</button>
        </form>
    )
   
}
