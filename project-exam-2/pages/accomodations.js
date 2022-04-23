// import { BASE_URL } from '../constans/api';
// import axios from "axios";
import Navigation from '../components/navigation/navigation';
import Heading from '../components/heading/Heading';


export default function Accomodations(props) {
  console.log(props)
  return (
    <Navigation>
      <div className='wrapper'>
        <Heading title="Accomodations"/>
        <h2>HELLO</h2>
      </div>
    </Navigation>
  )
}


// export async function getStaticProps(){
//   const accomodationsApi = BASE_URL + "hotels?populate=*";
//   let accomodations = []

//   try {
//     const response = await axios.get(accomodationsApi)
//     console.log(response.data);
//     accomodations = response.data
//   } catch(error){
//     console.log(error)
//   }
//   return {
//     props: {
//         accomodations: accomodations,
//     }
//   }
// }