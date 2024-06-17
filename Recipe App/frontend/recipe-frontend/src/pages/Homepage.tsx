import CategoriesComp from "../components/homepage/CategoriesComp";
import DiscoverComp from "../components/homepage/DiscoverComp";

export default function Homepage() {
  return (
    <>
      <div className="mx-4">
        <DiscoverComp />
        <CategoriesComp />
      </div>
    </>
  )
}
