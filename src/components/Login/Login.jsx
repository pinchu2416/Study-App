import anime1 from "../../assets/anime1.jpeg";
function Login(){
    return(
             <div className="flex items-center justify-center min-h-screen bg-[#040d24]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center">
          <img
            src={anime1}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 transition-transform duration-500 hover:scale-110"
          />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-700 mt-4">Login</h2>
        <form className="mt-6">
          <div>
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 mt-6 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
        </div>
    );
}