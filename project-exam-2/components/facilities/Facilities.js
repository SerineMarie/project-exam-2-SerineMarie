// import { BASE_URL } from "../../constans/api";
// import axios from "axios";
// // import { DisplayMessage} from "../displayMessage/DisplayMessage";



// export default function Facility(props){
//     return <h3>{props.facilities.data.map((something) => {
//                     return(
//                         <div>{something.attributes.facilities}</div>
//                     )
//                 })}
//             </h3>
// }



// export async function getStaticProps(){
//     const facilitiesUrl = BASE_URL + "/facilities?populate=*";
//     let facilities = [];
//     try{
//         const getFacility = await axios.get(facilitiesUrl);
//         console.log(getFacility.data);
//         facilities = getFacility.data;
//     }catch(error){
//         // DisplayMessage(`An error occured`, {error})
//         console.log(error)
//     }
//     return {
//         props: {
//             facilities: facilities
//         }
//     }
// }
