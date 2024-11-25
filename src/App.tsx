import Header from "./components/common/header/Header"
import MySideBar from "./components/common/sidebar/MySideBar"
import MyFooter from "./components/common/footer/MyFooter"

function App() {
 
  return (
    <>
      <div className=" ">
        <div className="flex flex-col border-2 border-red-400 lg:h-screen relative">
          
          <div className="absolute top-0 w-full border-2 border-purple-500">
            <Header/>
          </div>
          
          <div className="flex flex-grow mt-16 overflow-hidden">
            <div className="">
                <MySideBar />
            </div>
            <div className="border-2 border-orange-500 w-full">
              Content
            </div>
          </div>
          
          <div className="w-full">
            <MyFooter/>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
