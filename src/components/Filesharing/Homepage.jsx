import { createSignal } from "solid-js";
import folderIcon from "../../assets/folder.png";
import file1 from "../../assets/anime1.jpeg";
import file2 from "../../assets/anime2.jpeg";
import file3 from "../../assets/anime3.jpeg";
import file4 from "../../assets/novel.jpeg";
import file5 from "../../assets/photo1.jpeg";
import logo from "../../assets/logo.png";
import "../../styles/typewriter.css";
import share from "../../assets/share.png";

function HomePage() {
  const [isOpened, setIsOpened] = createSignal(false);
  const fileImages = [file1, file2, file3, file4, file5];

  return (
    <>

    {/* LAPTOP */}

    <div className="bg-[#040917] text-white min-h-[110vh] hidden lg:flex flex-col">
      <nav className="w-full flex items-center px-10 py-6">
        <img className="h-10" src={logo} alt="logo" />
        <h1 className="ml-3 text-2xl font-bold tracking-wider text-cyan-100">Snipit</h1>
        <ul className="ml-auto flex space-x-8 text-lg text-cyan-100">
          <li><a href="/" className="hover:text-cyan-400">Home</a></li>
          <li><a href="/about" className="hover:text-cyan-400">About</a></li>
        </ul>
      </nav>
      <div className="flex items-center justify-center flex-1 px-20 gap-16">
        <div className="relative flex flex-col items-center ml-4 mt-17 justify-center w-1/2">
          <img
            src={folderIcon}
            alt="Folder"
            className="w-52 h-44 cursor-pointer transition-transform duration-500"
            onClick={() => setIsOpened(!isOpened())}
          />
          {fileImages.map((file, index) => {
            const angle = (index - 4) * 45;
            const radius = 185;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            const closedStyle = {
              transform: `translateY(-53px) scale(0.7)`,
              opacity: 0.6,
              zIndex: 5 - index,
              clipPath: "inset(40% 10% 10% 10%)",
            };
            const openedStyle = {
              transform: `translate(${x}px, ${y}px) scale(1.3)`,
              opacity: 1,
              zIndex: index + 1,
              clipPath: "none",
            };
            return (
              <img
                key={index}
                src={file}
                alt={`File ${index + 1}`}
                className="absolute w-24 h-24 rounded-md shadow-lg transition-all duration-700 ease-in-out"
                style={isOpened() ? openedStyle : closedStyle}
              />
            );
          })}
        </div>
        <div className="text-center w-[700px] -ml-25">
          <h1 className="text-4xl font-bold text-cyan-300 tracking-wider mb-2">Clip it, Share it</h1>
          <div className=" flex flex-col items-center">
            <span className="typewriter text-yellow-500 mt-3 text-9xl font-bold"></span>
          </div>
        </div>
      </div>
      <div className="absolute w-199 h-100 bg-[radial-gradient(circle,_rgba(80,194,204,0.6)_10%,_rgba(0,14,51,0)_90%)] blur-xl opacity-40 pointer-events-none hidden lg:flex"
           style={{ top: "40%", left: "70%", transform: "translate(-50%, -50%)" }}>
      </div>
      <div className="flex justify-center gap-20 ">
        <div className="bg-[#040d24] flex flex-col items-center w-[26%] h-[250px] border-2 border-[#50c2ccaf] rounded-lg shadow-lg text-center text-white p-10">
          <h1 className="mt-2 text-4xl font-bold text-cyan-300 mb-3">Share Files</h1>
          <p className="text-3xl text-yellow-200 mt-2 mb-5">Upload, Share, Done !</p>
          <a className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] text-black font-bold text-xl px-4 py-2 rounded-[20px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] active:scale-95" href="/filesharing">Start Sharing</a>
        </div>

        <div className="bg-[#040d24] flex flex-col items-center w-[26%] h-[250px] border-2 border-[#50c2ccaf] rounded-lg shadow-lg text-center text-white p-10">
          <h1 className="mt-2 text-4xl font-bold text-cyan-300 mb-4">URL Shortner</h1>
          <p className="text-3xl text-yellow-200 mt-2 mb-5">Shrink, Share, Simplify!</p>
          <a className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] text-black font-bold text-xl px-4 py-2 rounded-[20px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] active:scale-95" href="/filesharing">Shortify</a>
        </div>
        <div className="bg-[#040d24] flex flex-col items-center w-[26%] h-[250px] border-2 border-[#50c2ccaf] rounded-lg shadow-lg text-center text-white p-10">
          <h1 className="mt-2 text-4xl font-bold text-cyan-300 mb-4">NoteShare</h1>
          <p className="text-3xl text-yellow-200 mt-2 mb-5">Write, Share, Keep !</p>
          <a className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] text-black font-bold text-xl px-4 py-2 rounded-[20px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] active:scale-95" href="#">Create Notes</a>
        </div>
      </div>
    </div>

    {/* MOBILE */}

    <div className="bg-[#040917] text-white min-h-[120vh] flex lg:hidden flex-col">
      <nav className="w-full flex items-center px-9 py-6">
        <img className="h-8" src={logo} alt="logo" />
        <h1 className="ml-3 text-xl font-bold tracking-wider text-cyan-100">Snipit</h1>
        <ul className="ml-auto flex space-x-3 text-lg text-cyan-100">
          <li><a href="/" className="hover:text-cyan-400">Home</a></li>
          <li><a href="/about" className="hover:text-cyan-400">About</a></li>
        </ul>
      </nav>
      <img className="h-auto w-auto pb-3" src={share} alt="Background Animation" />
      <div className="flex items-center justify-center px-20 ml-23">
        <div className="text-center w-[700px] -ml-25">
          <h1 className="text-2xl font-bold text-cyan-300 tracking-wider mb-2">Clip it, Share it</h1>
          <div className=" flex flex-col items-center">
            <span className="typewriter text-yellow-500 mt-3 text-4xl font-bold mb-4"></span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-5  ">
        <div className="bg-[#040d24] flex flex-col items-center border-2 w-80 h-48 ml-7 border-[#50c2ccaf] rounded-lg shadow-lg text-center text-white p-10">
          <h1 className="-mt-5 text-3xl font-bold text-cyan-300 mb-1">Share Files</h1>
          <p className="text-2xl text-yellow-200 mt-2 mb-3">Upload, Share, Done !</p>
          <a className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] text-black font-bold text-xl px-4 py-2 rounded-[20px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] active:scale-95" href="/filesharing">Start Sharing</a>
        </div>

        <div className="bg-[#040d24] flex flex-col items-center border-2 w-80 h-48 ml-7 border-[#50c2ccaf] rounded-lg shadow-lg text-center text-white p-10">
          <h1 className="-mt-5 text-3xl font-bold text-cyan-300 mb-1">URL Shortner</h1>
          <p className="text-2xl text-yellow-200 mt-2 mb-3">Snap, Share, Simple !</p>
          <a className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] text-black font-bold text-xl px-4 py-2 rounded-[20px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] active:scale-95" href="/filesharing">Shortify</a>
        </div>

        <div className="bg-[#040d24] flex flex-col items-center border-2 w-80 h-48 ml-7 border-[#50c2ccaf] rounded-lg shadow-lg text-center text-white p-10">
          <h1 className="-mt-5 text-3xl font-bold text-cyan-300 mb-1">NoteShare</h1>
          <p className="text-2xl text-yellow-200 mt-2 mb-3">Write, Share, Keep !</p>
          <a className="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] text-black font-bold text-xl px-4 py-2 rounded-[20px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] active:scale-95" href="#">Create notes</a>
        </div>

      </div>
      </div>
    </>
  );
}

export default HomePage;
