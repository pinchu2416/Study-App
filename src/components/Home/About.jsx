import avtar from "../../assets/avtar.png";
function About(){
  return(
    <>
    <div class="bg-[#040d24] w-full hidden lg:flex flex-col items-start pl-20 py-20 min-h-screen ">
  <h1 class="text-7xl font-bold mt-15 ml-50 text-cyan-300 [text-shadow:0px_0px_2px_rgb(98,228,255),0px_0px_3px_rgb(98,228,255)]">ABOUT US</h1>
  <p class="text-yellow-100 max-w-2xl text-xl mt-10 ml-13 leading-normal">
  Welcome to FaveClan, a dynamic voting app where the fans can support and vote for their favorite characters from anime, novels, and movies. Our platform provides a seamless and interactive experience, allowing users to participate in exciting polls and see real-time results.
  At FaveClan, we believe in the power of fandom and community-driven rankings. Whether you're rooting for legendary anime heroes, iconic novel protagonists, or blockbuster movie characters, your votes help shaping the ultimate leaderboard. Join us and be part of the excitement—because every vote counts ! 
  </p>
  <img 
          src={avtar} 
          alt="Avatar" 
          className="absolute top-10 left-223 w-132 h-142 rounded-full"
        />
</div>
<div class="bg-[#040d24] w-full flex lg:hidden flex-col justify-center items-center px-6 py-16 min-h-screen">
<img 
          src={avtar} 
          alt="Avatar" 
          className="flex flex-col top-10 w-35 h-35 rounded-full -mt-10"
        />
  <h1 class="text-4xl flex font-bold text-cyan-300 mt-1 text-center [text-shadow:0px_0px_2px_rgb(98,228,255),0px_0px_3px_rgb(98,228,255)]">
    ABOUT US
  </h1>
  <p class="text-yellow-100 text-lg text-center leading-relaxed mt-1 flex">
    Welcome to FaveClan, a dynamic voting app where fans can support and vote for their favorite characters from anime, novels, and movies. Our platform provides a seamless and interactive experience, allowing users to participate in exciting polls and see real-time results.
    At FaveClan, we believe in the power of fandom and community-driven rankings. Whether you're rooting for legendary anime heroes, iconic novel protagonists, or blockbuster movie characters, your votes help shape the ultimate leaderboard. Join us and be part of the excitement—because every vote counts!
  </p>
</div>

</>
  );
}
export default About;
