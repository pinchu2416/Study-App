import logo from "../../assets/logo.jpg"; // Adjust path if needed
import anime1 from "../../assets/anime1.jpeg";
import anime2 from "../../assets/anime2.jpeg";
import novel from "../../assets/novel.jpeg";
import bollywood from "../../assets/bollywood.jpeg";
import anime3 from "../../assets/anime3.jpeg";

function HomePage1() {
  return (
    <div className="bg-[#040d24] text-white min-h-screen w-full">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7">
        <div className="flex items-center -ml-3 sm:ml-0">
          <img className="h-7 sm:h-9" src={logo} alt="Logo" />
          <h3 className="ml-2 text-xl sm:text-2xl text-white">FAVECLAN</h3>
        </div>
        <ul className="hidden md:flex space-x-10 text-xl">
          <li><a href="#" className="text-white hover:text-gray-300">HOME</a></li>
          <li><a href="#" className="text-white hover:text-gray-300">ABOUT</a></li>
          <li><a href="#" className="text-white hover:text-gray-300">SIGN UP</a></li>
        </ul>
        <button className="md:hidden block text-xl text-white focus:outline-none">
          ☰
        </button>
      </nav>

      {/* Image Gallery - Desktop Only */}
      <div className="hidden lg:flex justify-center mt-10">
        <div className="w-[75%] h-[350px] flex ml-[-183px]">
          <img src={anime1} alt="Anime 1" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
          <img src={anime2} alt="Anime 2" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
          <img src={novel} alt="Novel" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
          <img src={bollywood} alt="Bollywood" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
          <img src={anime3} alt="Anime 3" className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]" />
        </div>
      </div>

      {/* Desktop-Only Section */}
      <div id="faveclanbtn" className="hidden lg:block -mt-[290px] text-center">
        <h1 className="text-8xl font-bold [text-shadow:0px_0px_2px_rgb(98,228,255),0px_0px_5px_rgb(98,228,255)] tracking-wider">
          FAVECLAN
        </h1>
        <p className="text-[2.5rem] mt-2 tracking-wide text-yellow-200 [text-shadow:0px_0px_4px_rgb(98,228,255),0px_0px_7px_rgb(98,228,255)]">
          The battle begins with your vote!
        </p>
        <button className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
          text-black font-bold text-lg uppercase px-6 py-3 
          rounded-[20px] shadow-lg transition-all duration-300 
          hover:scale-105 hover:shadow-xl 
          hover:from-[#4198b7] hover:to-[#21295b] 
          active:scale-95 mt-7">
          LOGIN
        </button>
      </div>

      {/* Radial Gradient - Desktop Only */}
      <div className="hidden lg:block absolute w-200 h-130 bg-[radial-gradient(circle,_rgba(80,194,204,0.6)_10%,_rgba(0,14,51,0)_80%)] blur-2xl opacity-40 pointer-events-none"
        style={{ top: "46%", left: "72%", transform: "translate(-50%, -50%)" }}>
      </div>

      {/* Mobile Image Slider (Auto-Play) */}
      <div className="lg:hidden mt-10 px-4">
        <div className="relative w-full overflow-hidden rounded-lg">
          <div className="flex animate-slide w-[500%]">
            <img src={anime1} className="w-full object-cover rounded-lg" alt="Anime 1" />
            <img src={anime2} className="w-full object-cover rounded-lg" alt="Anime 2" />
            <img src={novel} className="w-full object-cover rounded-lg" alt="Novel" />
            <img src={bollywood} className="w-full object-cover rounded-lg" alt="Bollywood" />
            <img src={anime3} className="w-full object-cover rounded-lg" alt="Anime 3" />
          </div>
        </div>
      </div>

      {/* Mobile CSS for Auto Image Slider */}
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            20% { transform: translateX(-100%); }
            40% { transform: translateX(-200%); }
            60% { transform: translateX(-300%); }
            80% { transform: translateX(-400%); }
            100% { transform: translateX(0); }
          }
          .animate-slide {
            animation: slide 10s infinite linear;
          }
        `}
      </style>
    </div>
  );
}

export default HomePage1;