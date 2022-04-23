import { BASE_URL } from '../constans/api';
import axios from "axios";
import Navigation from '../components/navigation/navigation';


export default function Home(props) {
  console.log(props)
  return (
    <Navigation>
      <div className='wrapper'></div>
    </Navigation>
  )
}


export async function getStaticProps(){
  const homeApi = BASE_URL + "homepage?populate=*";
  let home = []

  try {
    const response = await axios.get(homeApi)
    console.log(response.data);
    home = response.data
  } catch(error){
    console.log(error)
  }
  return {
    props: {
      home: home,
    }
  }
}