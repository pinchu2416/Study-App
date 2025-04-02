function About(){
  return(
    <>
    <div class="bg-[#040917] w-full hidden lg:flex flex-col justify-center items-center pl-20 py-20 min-h-screen ">
  <h1 class="text-7xl font-bold text-center -mt-4 -ml-40 text-cyan-500 [text-shadow:0px_0px_2px_rgb(98,228,255),0px_0px_3px_rgb(98,228,255)]">ABOUT US</h1>
  <p class="text-yellow-100 max-w-3xl text-center text-xl mt-10 -ml-23 leading-normal">
  Snipit is a versatile platform designed to make content sharing seamless and efficient. With Snipit, you can create rich text notes and share them instantly via a unique link, making collaboration effortless. The URL shortener feature allows you to convert long links into concise, easy-to-share URLs. Additionally, the file-sharing functionality enables you to upload files and share them securely, either by generating a link or sending them directly via email. Whether you're managing notes, sharing important documents, or simplifying links, Snipit provides a fast and user-friendly solution for all your sharing needs.
  </p>
         <div className="absolute w-195 h-160 bg-[radial-gradient(circle,_rgba(80,194,204,0.6)_10%,_rgba(0,14,51,0)_90%)] blur-xl opacity-30 pointer-events-none hidden lg:flex"
           style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      </div>
</div>
<div class="bg-[#040917] w-full flex lg:hidden flex-col justify-center items-center px-6 py-16 min-h-screen">
  <h1 class="text-4xl flex font-bold text-cyan-300 -mt-5 mb-4 text-center [text-shadow:0px_0px_2px_rgb(98,228,255),0px_0px_3px_rgb(98,228,255)]">
    ABOUT US
  </h1>
  <p class="text-yellow-100 text-lg text-center leading-relaxed mt-1 flex">
  Snipit is a versatile platform designed to make content sharing seamless and efficient. With Snipit, you can create rich text notes and share them instantly via a unique link, making collaboration effortless. The URL shortener feature allows you to convert long links into concise, easy-to-share URLs. Additionally, the file-sharing functionality enables you to upload files and share them securely, either by generating a link or sending them directly via email. Whether you're managing notes, sharing important documents, or simplifying links, Snipit provides a fast and user-friendly solution for all your sharing needs.
  </p>
</div>

</>
  );
}
export default About;