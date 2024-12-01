import Header from "../common/header/Header"
import MySideBar from "../common/sidebar/MySideBar"
import MyFooter from "../common/footer/MyFooter"
import { Outlet } from "react-router-dom"

function Main() {
 
  return (
    <>
      <div className=" ">
        <div className="flex flex-col lg:h-screen relative">
          
          <div className=" w-full shadow-md">
            <Header/>
          </div>
 
          <div className="flex flex-grow overflow-hidden">
            <div className="border-r-2 border-t-2 border-gray-200">
                <MySideBar />
            </div>
            <div className="w-full overflow-hidden">
              <Outlet/>
            </div>
          </div>
          
          <div className="w-full border-2 border-gray-300">
            <MyFooter/>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Main
