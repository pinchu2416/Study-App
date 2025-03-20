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
          <nav className="flex items-center justify-between px-6 sm:px-10 py-5">
            <div className="flex items-center">
              <img className="h-7 sm:h-9" src={logo} alt="Logo" />
              <h3 className="ml-2 text-lg sm:text-2xl text-white">FAVECLAN</h3>
            </div>
            <ul className="hidden lg:flex space-x-10 text-xl">
              <li><a href="#" className="text-white hover:text-gray-300">HOME</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">ABOUT</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">SIGN UP</a></li>
            </ul>
            <button className="lg:hidden text-xl text-white focus:outline-none">
              ☰
            </button>
          </nav>
    
          {/* Desktop Image Gallery */}
          <div className="hidden lg:flex justify-center mt-10">
            <div className="w-[75%] h-[350px] flex">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-[10%] object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500 ease-in-out hover:w-[25%]"
                />
              ))}
            </div>
          </div>
    
          {/* Mobile Image Slider */}
          <div className="lg:hidden flex justify-center mt-10">
            <div className="w-[90%] h-[300px] relative">
              <img
                src={images[currentIndex()]}
                alt="Slider"
                className="w-full h-full object-cover rounded-lg border-2 border-[#50c2ccaf] transition-all duration-500"
              />
            </div>
          </div>
    
          {/* Section */}
          <div className="text-center mt-10 lg:mt-20">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-wide text-[#62e4ff]">
              FAVECLAN
            </h1>
            <p className="text-lg sm:text-2xl mt-2 text-yellow-200">
              The battle begins with your vote!
            </p>
            <button className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
            text-black font-bold text-lg uppercase px-6 py-3 
            rounded-[20px] shadow-lg transition-all duration-300 
            hover:scale-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] 
            active:scale-95 mt-6">
              LOGIN
            </button>
          </div>
    
          {/* Radial Gradient Effect */}
          <div className="absolute w-[200px] h-[130px] bg-[radial-gradient(circle,rgba(80,194,204,0.6)_10%,rgba(0,14,51,0)_80%)] blur-2xl opacity-40 pointer-events-none"
            style={{ top: "50%", left: "72%", transform: "translate(-50%, -50%)" }}></div>
        </div>
      );
    }