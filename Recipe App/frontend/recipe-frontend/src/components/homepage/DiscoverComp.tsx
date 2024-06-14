import { MdOutlineWatchLater } from "react-icons/md";
import { LuChefHat } from "react-icons/lu";

export default function DiscoverComp() {
  return (
    <>
      <h2 className="text-lg my-2 font-semibold text-cyan-900">Discover</h2>
      <div className="carousel rounded-box">
        <div className="carousel-item">
          <div className="card w-96 shadow-2xl bg-stone-100 hover:bg-stone-200 duration-100">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>Card description</p>
              <div className="flex justify-between">
                <div className="flex text-cyan-900 content-center">
                  <MdOutlineWatchLater />
                  <p className="ms-2">xmin</p>
                </div>
                <div className="flex text-cyan-900 content-center">
                  <LuChefHat />
                  <p className="ms-2">difficoltà</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
