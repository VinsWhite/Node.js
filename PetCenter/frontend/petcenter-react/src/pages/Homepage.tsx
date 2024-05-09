import HeroComp from "../components/home/HeroComp";
import ServicesComp from "../components/home/ServicesComp";
import { useEffect } from "react";
import axios from "axios";

export default function Homepage() {

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/pet');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  return (
    <>
        <HeroComp />
        <ServicesComp />
    </>
  )
}
