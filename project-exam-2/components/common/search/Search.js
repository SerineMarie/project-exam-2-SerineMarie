import axios from "axios";
import styles from "../../../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../../constans/api";
// import { useRouter } from "next/router";

const searchAPI = BASE_URL + "/hotels?populate=*";
// const router = useRouter();

export default function SearchBar(){
    const [searchHotel, setSearchHotel] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [alternative, setAlternative] = useState([]);

    useEffect(() => {
      const loadHotels = async()=>{
          const response = await axios.get(searchAPI);
          setSearchHotel(response.data.data)
      }
      loadHotels();
    }, [])
    const onAlternativeEvent = (inputValue) => {
        setInputValue(inputValue);
        setAlternative([]);
    }
    const onChangeEvent = (inputValue) => {
        let matches = []
        if(inputValue.length > 0){
            matches = searchHotel.filter(hotels => {
                const regex = new RegExp(`${inputValue}`, "gi");
                return hotels.attributes.name.match(regex)
            })
        }
        setAlternative(matches)
        setInputValue(inputValue)
    }
    return (
        <>
            <input type="text" placeholder="Search..." 
                className={styles.search} 
                onChange={e=>onChangeEvent(e.target.value)} 
                value={inputValue}>
            </input>
            <a className={styles.alternativeContainer}>
                {alternative && alternative.map((alternative, i) => 
                <div key={alternative.id}>
                    <a href={`accomodation/${alternative.attributes.slug}`} 
                    className={styles.searchResults} 
                    key={i} 
                    onClick={()=>onAlternativeEvent(alternative.attributes.name)}
                    >
                        {alternative.attributes.name}
                    </a>
                </div>
                )}
            </a>
        </>
    )
}