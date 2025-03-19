import { createSignal, onCleanup } from "solid-js";
import logo from "../../assets/logo.jpg";
import anime1 from "../../assets/anime1.jpeg";
import anime2 from "../../assets/anime2.jpeg";
import novel from "../../assets/novel.jpeg";
import bollywood from "../../assets/bollywood.jpeg";
import anime3 from "../../assets/anime3.jpeg";

// Mobile Auto-Play Slider Component (One image at a time)
function MobileSlider() {
  const images = [anime1, anime2, novel, bollywood, anime3];
  const [currentIndex, setCurrentIndex] = createSignal(0);

  // Auto-slide logic (Change every 3 seconds)8
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 3000);

  // Cleanup on unmount
  onCleanup(() => clearInterval(interval));

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">
      {/* Single Image Display */}
      <img src={images[currentIndex()]} className="md:hidden w-80 h-100 ml-11 -mt-7 blur-xxs opacity-30 object-cover rounded-lg transition-opacity duration-700 ease-in-out" alt="slide" />

      {/* Navigation Dots */}
      <div className=" md:hidden flex justify-center mt-4 space-x-2">
        {images.map((_, idx) => (
          <button
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentIndex() === idx ? "bg-white w-4" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


function HomePage() {
  return (
    <>
    {/* for laptops */}
    <div className="bg-[#040d24] text-white min-h-screen" style={{ height: "120vh", width: "100%" }}>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-7 ">
        <div className="flex items-center">
          <img className="h-8 sm:ml-0 -ml-2 sm:h-8 md:h-9" src= {logo} alt="Logo" />
          <h3 className="sm:ml-2 ml-1 text-2xl sm:text-xl md:text-2xl text-white">FAVECLAN</h3>
        </div>
        <ul className="hidden md:flex space-x-10 text-xl">
          <li><a href="#" className="text-white hover:text-gray-300">HOME</a></li>
          <li><a href="#" className="text-white hover:text-gray-300">ABOUT</a></li>
          <li><a href="#" className="text-white hover:text-gray-300">SIGN UP</a></li>
        </ul>
        <button className="md:hidden block text-2xl  text-white focus:outline-none" id="menu-btn">
          ☰
        </button>
      </nav>

      {/* Mobile Menu (IGNORE THIS NOW)
      <ul id="mobile-menu" className="md:hidden flex flex-col items-center space-y-4 text-xl mt-4">
        <li><a href="#" className="text-white hover:text-gray-300">HOME</a></li>
        <li><a href="#" className="text-white hover:text-gray-300">ABOUT</a></li>
        <li><a href="#" className="text-white hover:text-gray-300">SIGN UP</a></li>
      </ul> */}

      {/* Image Gallery */}
      <div className="mt-[40px] justify-center hidden lg:block">
        <div className="w-[75%] h-[350px] flex ml-[73px]">
          <img src={anime1} alt="Anime 1" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
          <img src={anime2} alt="Anime 2" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
          <img src={novel} alt="Novel" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
          <img src={bollywood} alt="Bollywood" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
          <img src={anime3} alt="Anime 3" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
        </div>
      </div>

      {/* Section */}
      <div id="faveclanbtn" className="-mt-[290px]  ml-270 hidden lg:block">
      <h1 className="text-8xl font-bold [text-shadow:0px_0px_2px_rgb(98,228,255),0px_0px_5px_rgb(98,228,255)] tracking-wider -ml-33">FAVECLAN</h1>
        <p className="text-[2.5rem] mt-2 -ml-55 tracking-wide text-yellow-200 [text-shadow:0px_0px_4px_rgb(98,228,255),0px_0px_7px_rgb(98,228,255)]">The battle begins with your vote !</p>
        <button className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-lg uppercase px-6 py-3 
        rounded-[20px] shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95 mt-5 ml-[43px]">LOGIN</button>
      </div>

      {/* Mobile Auto-Play Slider (One Image at a Time) */}
      <MobileSlider />


      {/* Mobile View (Hidden on Laptops) */}
     <div id="faveclanbtn-mobile" className="block lg:hidden  flex-col items-center text-center px-4 mt-10">
     <h1 className="text-6xl sm:text-6xl font-bold text-cyan-300 tracking-wide">
    FAVECLAN
     </h1>
     <p className="text-2xl sm:text-2xl mt-2 text-yellow-200">
    The battle begins with your vote!
     </p>
     <button className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
    text-black font-bold text-xl uppercase px-6 py-3 
    rounded-[20px] shadow-lg transition-all duration-300 
    hover:scale-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] 
    active:scale-95 mt-5">
    LOGIN
     </button>
   </div>

       {/* Radial gradient */}
       <div className="absolute w-199 h-120 bg-[radial-gradient(circle,_rgba(80,194,204,0.6)_10%,_rgba(0,14,51,0)_90%)] blur-xl opacity-30 pointer-events-none hidden lg:block"
       style={{ top: "45%", left: "70%", transform: "translate(-50%, -50%)" }}></div>
    </div>
    </>
  );
}

export default HomePage;
