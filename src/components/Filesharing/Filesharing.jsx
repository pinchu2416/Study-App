import { createSignal, Show, For } from "solid-js";
import logo from "../../assets/logo.png";
import url from "../../assets/url.jpeg";
import bg from "../../assets/bg.gif";
import "../../styles/global.css";

function File() { 
  const [files, setFiles] = createSignal([]); 
  const [progress, setProgress] = createSignal(0); 
  const [uploading, setUploading] = createSignal(false); 
  const [showPrompt, setShowPrompt] = createSignal(false); 
  const [showEmailPrompt, setShowEmailPrompt] = createSignal(false); 
  const [email, setEmail] = createSignal(""); 
  const [selectedTab, setSelectedTab] = createSignal("URL Shortner"); 
  const [urlInput, seturlInput] = createSignal(""); 
  const [urlShorten, seturlShorten] = createSignal(""); 

  const simulateUpload = () => {  
    setUploading(true); 
    setProgress(0);  
    let uploadInterval = setInterval(() => { 
      setProgress((prev) => {
        if (prev >= 100) { 
          clearInterval(uploadInterval);
          setTimeout(() => { 
            setUploading(false); 
            setShowPrompt(true); 
          }, 500);
          return 100;
        }
        return prev + 5; //Increase the progress by 5% every 200ms.
      });
    }, 200);
  };

  const handleFileSelect = (event) => { 
    const selected = event.target.files[0]; 
    if (!selected) return; 

    if (files().length>=1){ 
      alert("You can take 1 file at a time to share");
      return;
    }

    const fileData = {
      file: selected,
      url: URL.createObjectURL(selected),  
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, 
    };

    setFiles([...files(), fileData]); 
    simulateUpload(); 
  };

  const sendEmail = () => { 
    if (!email()) { 
      alert("Please enter an email!");
      return;
    }
    alert(`File sent to ${email()}`);
    setShowEmailPrompt(false);
    setShowPrompt(false);
  };

  return(
    <>
    <div class="bg-[#070a14] hidden lg:flex min-h-[120vh] w-full flex-col items-center ">
    <nav class="flex items-center justify-between px-10 py-7 w-full">
        <div class="flex items-center">
          <img class="h-8 sm:h-8 md:h-9" src={logo} alt="Logo" />
          <h3 class="ml-2 mt-1 text-2xl sm:text-xl md:text-2xl text-cyan-100 font-bold tracking-wider">
            Snipit
          </h3>
        </div>
        <div class="dropdown">
  <div tabindex="0" role="button" class="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-md px-5 py-2
        rounded-[20px] shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95 pointer-events-auto ">
    Theme
  </div>
  <ul tabindex="0" class="dropdown-content rounded-box z-1 w-52 p-2 shadow-2xl mt-3 -ml-28 bg-gray-400 text-md text-black">
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Default"
        value="default" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Retro"
        value="retro" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Cyberpunk"
        value="cyberpunk" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Valentine"
        value="valentine" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Aqua"
        value="aqua" />
    </li>
  </ul>
</div>
 </nav>
 <div class="flex space-x-4 mt-3 -ml-185">
        <button
          class={` "bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-xl px-6 py-3 
        rounded-[20px] shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95 " ${
            selectedTab() === "URL Shortner" ? "bg-[#3a675d] text-black" : "bg-[#9ba4c8] text-black font-bold transition-all duration-300 hover:sclae-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] active:scale-95 "
          }`}
          onClick={() => setSelectedTab("URL Shortner")}
        >
          URL Shortner
        </button>
        <button
          class={`px-6 py-3 rounded-[20px] text-xl font-bold shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95   ${
            selectedTab() === "File Sharing" ? "bg-[#3a675d] text-black" : "bg-[#9ba4c8] text-black font-bold transition-all duration-300 hover:sclae-105 hover:shadow-xl hover:from-[#4198b7] hover:to-[#21295b] active:scale-95 "
          }`}
          onClick={() => setSelectedTab("File Sharing")}
        >
         File Sharing
        </button>
      </div>
      <Show when={selectedTab() === "URL Shortner"}>
  <div 
    class="text-white 5 mt-4 flex flex-col items-center -ml-176 bg-[#0a0f1f] rounded-4xl w-2/3 max-w-lg transition-all p-4 "
    style={{ height: urlShorten() ? 'auto' : '25rem' }} 
  >
    <img class="w-auto h-auto -mt-2 ml-2 rounded-2xl" loading="lazy" src={url} alt="url" />
    <span class="text-cyan-200 pb-5 -mt-9 -ml-1 text-3xl [text-shadow:0px_0px_1px_rgb(98,228,255),0px_0px_2px_rgb(98,228,255)]">Cut the Clutter, Keep the Clicks ! </span>
    <input 
      type="text" 
      placeholder="Enter your URL..." 
      class="px-4 py-2 w-80 rounded-lg bg-gray-800 text-white border border-gray-600" 
      value={urlInput()} /*binds the SolidJS signal urlInput() to the input field so that it reflects the latest state.*/
      onInput={(e) => seturlInput(e.target.value)} //Updates the urlInput state whenever the user types something.
    />

    <button 
      class="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-lg px-4 py-2 
        rounded-[20px] shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95  mt-5 -ml-[10px] mb-2 "
      onClick={() => {
        if (!urlInput()) {
          alert("Please enter a URL");
          return;
        }
        seturlShorten(`https://short.ly/${Math.random().toString(36).substring(7)}`); // Math.random() - This function generates a random decimal number between 0 and 1, .toString(36)Converts the random number into a base-36 string, which includes numbers (0-9) and letters (a-z), .substring(7)Removes the "0." at the beginning and keeps only the random characters after that, Template Literal (\`` ``) - Embeds the random string into a shortened URL format:
      }}
    >
      Shorten URL
    </button>

    <Show when={urlShorten()}>
      <div class="mt-1"> 
        <input 
          type="text" 
          class="px-4 py-2 w-80 rounded-lg bg-gray-800 text-white border border-gray-600 mt-2" 
          value={urlShorten()} 
          readonly
        />
      </div>
    </Show>
  </div>
</Show>
      <Show when={selectedTab() === "File Sharing"}>
        <div class="w-2/3 max-w-lg bg-[#0a0f1f] p-4 rounded-4xl transition-all -ml-173 mt-4 pointer-events-auto"
          style={{ height: uploading() || files().length > 0 || showPrompt() || showEmailPrompt() ? 'auto' : '12rem' }}> 
          <div class="w-full h-40 border-2  border-dashed border-cyan-200 rounded-lg flex flex-col items-center justify-center text-gray-300 hover:border-blue-400 transition-all cursor-pointer">
            <p class="text-3xl pb-2 tracking-wide text-yellow-200 [text-shadow:0px_0px_1px_rgb(98,228,255),0px_0px_2px_rgb(98,228,255)] ">Drop your files here.</p>
            <label for="fileInput" class="cursor-pointer mt-2 p-2 bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-lg px-3 py-2
        rounded-[20px] shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95">
              Click to Upload
            </label>
            <input id="fileInput" type="file" class="hidden" onChange={handleFileSelect} /> 
          </div>
          {/* stores the current upload progress (from 0 to 100). inside ${} → Inserts the value of progress() into a string. ${progress()}% → Converts the numeric value into a percentage progress() → Retrieves the current upload progress {progress()}% → Converts it into a readable percentage
          now the uploading() is called  */}
          {uploading() && (
            <div class="mt-5 text-center">
              <div class="text-gray-300 text-lg font-semibold">Uploading...</div>
              <div class="percent-container bg-gray-700 w-64 h-6 rounded-full mt-2 ml-28">
                <div class="progress-bar bg-blue-500 h-6 rounded-full transition-all" style={{ width: `${progress()}%` }}></div>
                <span class="percentage text-white font-bold absolute inset-0 flex items-center justify-center -ml-173 mt-41">{progress()}%</span>
              </div>
            </div>
          )}

          <div class="mt-5">
            <For each={files()}>
              {(file) => (
                <div class="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 rounded-lg mt-2">{/* file.file.name → Displays the file's name, file.file.size / 1024 → Converts the file size from bytes to KB, .toFixed(2) converts a number to a string with exactly 2 decimal places, truncate →prevents long text (file names) from overflowing by cutting off extra characters and adding...*/}
                  <p class="truncate">{file.file.name} ({(file.file.size / 1024).toFixed(2)} KB)</p>
                  <div class="flex space-x-2">
                    {/* When clicked, it opens the uploaded file in a new browser tab using window.open(file.url, "_blank"), The file’s URL (file.url) is created when the file is selected. */}
                    <button class="text-gray-400 hover:text-white" onClick={() => window.open(file.url, "_blank")}>📄</button>
                    {/* When clicked, it removes the file from the files list, setFiles(files().filter((f) => f.url !== file.url)) creates a new file list without the deleted file. */}
                    <button class="text-red-400 hover:text-red-600" onClick={() => setFiles(files().filter((f) => f.url !== file.url))}>🗑️</button>
                  </div>
                </div>
              )}
            </For>
          </div>

          {showPrompt() && (
            <div class="mt-5 text-center">
              <p class="text-yellow-500 text-lg mb-4">Share this file via:</p>
              <button class="w-full p-2 bg-yellow-700 text-black font-bold rounded-lg hover:bg-yellow-500 mb-2">
                Generate Link 🔗
              </button>
              <button onClick={() => setShowEmailPrompt(true)} class="w-full p-2 bg-blue-900 text-black font-bold rounded-lg hover:bg-blue-600">
                Send via Email 📧
              </button>
            </div>
          )}

          {showEmailPrompt() && (
            <div class="mt-5 text-center">
              <p class="text-yellow-500 text-lg mb-4">Enter recipient email:</p>
              <input
                type="email"
                placeholder="example@email.com"
                class="p-2 w-full rounded-lg border border-gray-500 text-white"
                // onInput={(e) => setEmail(e.target.value)} → This runs when the user types in the input field, (e) => setEmail(e.target.value) → Takes the event (e), gets the input’s value (e.target.value), and updates email, setEmail(e.target.value) → Stores the typed email in the email signal.
                onInput={(e) => setEmail(e.target.value)}
              />
              <button onClick={sendEmail} class="w-full p-2 mt-2 bg-blue-900 text-black font-bold rounded-lg hover:bg-blue-600">
                Send Email 📤
              </button>
            </div>
          )}
        </div>
      </Show>
    <div class="absolute items-center w-190 h-130 bg-[radial-gradient(circle,_rgba(80,194,204,0.6)_10%,_rgba(0,14,51,0)_90%)] blur-2xl opacity-30 pointer-events-none hidden lg:flex"
       style={{ top: "50%", left: "73%", transform: "translate(-50%, -50%)" }}>
        
       </div>
       <div class="absolute lg:flex flex-col items-center z-50 -mt-9" style={{ top: "55%", left: "70%", transform: "translate(-50%, -50%)" }}>
       <img class="h-auto w-full pb-4 flex " src={bg} alt="Background Animation" />
       <div class="animated-text text-cyan-200 -mt-18 text-4xl w-full font-bold flex flex-col items-center">
    Share files & shorten links <br />
    <span class="block text-orange-400 mt-5 text-5xl relative w-full text-center 
        after:content-[''] after:absolute 
        after:right-[-8px]
        after:animate-typing before:content-['Fast'] before:text-orange-400 before:animate-words">
    </span>
</div>
</div>
    </div>

    {/* MOBILE PHONES */}

    <div class="bg-[#070a14] lg:hidden min-h-[135vh] w-full flex-col items-center ">
    <nav class="flex items-center justify-between px-8 py-7 w-full">
        <div class="flex items-center">
          <img class="h-7 sm:h-7 md:h-8" src={logo} alt="Logo" />
          <h3 class="ml-2 mt-1 text-xl sm:text-xl md:text-2xl text-cyan-100 font-bold tracking-wider">
            Snipit
          </h3>
        </div>
        <div class="dropdown">
  <div tabindex="0" role="button" class="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-sm px-5 py-2
        rounded-[20px] shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95 pointer-events-auto ">
    Theme
  </div>
  <ul tabindex="0" class="dropdown-content rounded-box z-1 w-52 p-2 shadow-2xl mt-3 -ml-28 bg-gray-400 text-md text-black">
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Default"
        value="default" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Retro"
        value="retro" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Cyberpunk"
        value="cyberpunk" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Valentine"
        value="valentine" />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-ghost justify-start"
        aria-label="Aqua"
        value="aqua" />
    </li>
  </ul>
</div>
 </nav>       
 <div className="flex flex-col items-center z-0 top-[20%] ml-45 translate-x-[-50%] w-full max-w-[90%]">
  <img className="h-auto w-full pb-3" src={bg} alt="Background Animation" />
  <div className="animated-text text-cyan-200 text-2xl ml-4 -mt-13 font-bold flex flex-col items-center text-center">
    Share files & shorten links
    <br />
    <span className="block text-orange-400 mt-3 text-3xl relative w-full text-center 
        after:content-[''] after:absolute 
        after:right-[-6px] after:animate-typing 
        before:content-['Fast'] before:text-orange-400 before:animate-words">
    </span>
  </div>
  <div className="flex flex-nowrap justify-center items-center gap-2 mt-6 overflow-x-auto ml-4">
    <button
      className={`min-w-[120px] text-base px-3 py-2 font-bold rounded-[15px] shadow-md transition-all duration-300 
      hover:scale-105 hover:shadow-xl ${
        selectedTab() === "URL Shortner"
          ? "bg-[#3a675d] text-black"
          : "bg-[#9ba4c8] text-black font-bold hover:from-[#4198b7] hover:to-[#21295b] active:scale-95"
      }`}
      onClick={() => setSelectedTab("URL Shortner")}
    >
      URL Shortner
    </button>

    <button
      className={`min-w-[120px] text-base px-3 py-2 font-bold rounded-[15px] shadow-md transition-all duration-300 
      hover:scale-105 hover:shadow-xl ${
        selectedTab() === "File Sharing"
          ? "bg-[#3a675d] text-black"
          : "bg-[#9ba4c8] text-black font-bold hover:from-[#4198b7] hover:to-[#21295b] active:scale-95"
      }`}
      onClick={() => setSelectedTab("File Sharing")}
    >
      File Sharing
    </button>
  </div>
  <Show when={selectedTab() === "URL Shortner"}>
  <div 
    class="text-white mt-4 ml-6 flex flex-col items-center bg-[#0a0f1f] rounded-2xl w-full max-w-[90%] transition-all p-4"
    style={{ height: urlShorten() ? 'auto' : '22rem' }} >
    <img class="w-auto h-auto mt-1 rounded-2xl" loading="lazy" src={url} alt="URL" /> 
    <span class="text-cyan-200 pb-4 text-xl sm:text-2xl text-center [text-shadow:0px_0px_1px_rgb(98,228,255),0px_0px_2px_rgb(98,228,255)]">
      Cut the Clutter, Keep the Clicks!
    </span> 
    <input 
      type="text" 
      placeholder="Enter your URL..." 
      class="px-3 py-2  w-full max-w-[85%] rounded-lg bg-gray-800 text-white border border-gray-600 text-center" 
      value={urlInput()} 
      onInput={(e) => seturlInput(e.target.value)} 
    />
    <button 
      class="bg-gradient-to-r from-[#3a675d] to-[#375545] 
      text-black font-bold text-md px-2 py-2 w-full max-w-[45%]
      rounded-xl shadow-lg transition-all duration-300 mt-5 mb-3"
      onClick={() => {
        if (!urlInput()) {
          alert("Please enter a URL");
          return;
        }
        seturlShorten(`https://short.ly/${Math.random().toString(36).substring(7)}`);
      }}
    >
      Shorten URL
    </button> 
    <Show when={urlShorten()}>
      <div class="mt-2 w-full max-w-[85%]">
        <input 
          type="text" 
          class="px-3 py-2 w-full rounded-lg bg-gray-800 text-white border border-gray-600 text-center" 
          value={urlShorten()} 
          readonly 
        />
      </div>
    </Show>
  </div>
</Show>
<Show when={selectedTab() === "File Sharing"}>
  <div 
    class="w-full max-w-[90%] bg-[#0a0f1f] p-4 rounded-2xl transition-all mt-4 pointer-events-auto ml-4"
    style={{ height: uploading() || files().length > 0 || showPrompt() || showEmailPrompt() ? 'auto' : '10rem' }} >    
    <div class="w-full h-32 border-2 border-dashed border-cyan-200 rounded-lg flex flex-col items-center justify-center text-gray-300 hover:border-blue-400 transition-all cursor-pointer">
      <p class="text-lg sm:text-xl pb-2 tracking-wide text-yellow-200 text-center">
        Drop your files here.
      </p>
      <label for="fileInput" class="cursor-pointer mt-2 p-2 bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
      text-black font-bold text-lg px-3 py-2 w-full max-w-[45%]
      rounded-xl shadow-lg transition-all duration-300 
      hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
      active:scale-95 text-center">
         Upload
      </label>
      <input id="fileInput" type="file" class="hidden" onChange={handleFileSelect} />
    </div>
    {uploading() && (
      <div class="mt-4 text-center w-full">
        <div class="text-gray-300 text-lg font-semibold">Uploading...</div>
        <div class="percent-container bg-gray-700 w-full max-w-[85%] h-6 rounded-full mt-2 mx-auto">
          <div class="progress-bar bg-blue-500 h-6 rounded-full transition-all" style={{ width: `${progress()}%` }}></div>
          <span class="percentage text-white font-bold absolute inset-0 flex mt-110 items-center justify-center">
            {progress()}%
          </span>
        </div>
      </div>
    )}
    <div class="mt-4">
      <For each={files()}>
        {(file) => (
          <div class="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 rounded-lg mt-2 w-full max-w-[85%] mx-auto">
            <p class="truncate text-sm">{file.file.name} ({(file.file.size / 1024).toFixed(2)} KB)</p>
            <div class="flex space-x-2">
              <button class="text-gray-400 hover:text-white" onClick={() => window.open(file.url, "_blank")}>📄</button>
              <button class="text-red-400 hover:text-red-600" onClick={() => setFiles(files().filter((f) => f.url !== file.url))}>🗑️</button>
            </div>
          </div>
        )}
      </For>
    </div>
    {showPrompt() && (
      <div class="mt-5 text-center">
        <p class="text-yellow-500 text-lg mb-3">Share this file via:</p>
        <button class="w-full max-w-[85%] p-2 bg-yellow-700 text-black font-bold rounded-lg hover:bg-yellow-500 mb-2">
          Generate Link 🔗
        </button>
        <button onClick={() => setShowEmailPrompt(true)} class="w-full max-w-[85%] p-2 bg-blue-900 text-black font-bold rounded-lg hover:bg-blue-600">
          Send via Email 📧
        </button>
      </div>
    )}
    {showEmailPrompt() && (
      <div class="mt-5 text-center">
        <p class="text-yellow-500 text-lg mb-3">Enter recipient email:</p>
        <input
          type="email"
          placeholder="example@email.com"
          class="p-2 w-full max-w-[85%] rounded-lg border border-gray-500 text-white text-center"
          onInput={(e) => setEmail(e.target.value)}
        />
        <button onClick={sendEmail} class="w-full max-w-[85%] p-2 mt-2 bg-blue-900 text-black font-bold rounded-lg hover:bg-blue-600">
          Send Email 📤
        </button>
      </div>
    )}
  </div>
</Show>
</div>
 </div>
    </>
  );
}
export default File;