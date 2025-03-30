import { createSignal, Show, For } from "solid-js"; //createsignal helps to store and update values show displays the things only if it is needed and for is a loop
import logo from "../../assets/logo.png";
import url from "../../assets/url.jpeg";
import file from "../../assets/file.png";

function FileSharing() { //this function is for our file sharing app
  const [files, setFiles] = createSignal([]); //keeps track of the uploaded file and starts with empty
  const [progress, setProgress] = createSignal(0); //Tracks the upload progress (starts at 0%)
  const [uploading, setUploading] = createSignal(false); //Checks if something is currently uploading (starts as false)
  const [showPrompt, setShowPrompt] = createSignal(false); //Controls if the "Share File" options should be shown.
  const [showEmailPrompt, setShowEmailPrompt] = createSignal(false); //Controls if the "Enter Email" box should be shown.
  const [email, setEmail] = createSignal(""); //Stores the email entered by the user (starts empty).
  const [selectedTab, setSelectedTab] = createSignal("URL Shortner"); //controls the tab switching part.
  const [urlInput, seturlInput] = createSignal(""); // stores the url input and the seturlInput updates the ui whenever a value changes(reactive signal)
  const [urlShorten, seturlShorten] = createSignal(""); //controls the url shortner part

  const simulateUpload = () => { //This function "pretends" to upload a file. FAKE UPLOADER 
    setUploading(true); //Marks upload as "started".
    setProgress(0);  //Resets the progress bar to 0%.
    let uploadInterval = setInterval(() => { //Starts a timer that runs every 200ms and Slowly increases the upload percentage.
      setProgress((prev) => {
        if (prev >= 100) { //If progress reaches 100%, stop the timer.
          clearInterval(uploadInterval);
          setTimeout(() => { //After a short delay, hide "Uploading..." and show sharing options.
            setUploading(false); //hides the uploading part
            setShowPrompt(true); //the prompt is shown
          }, 500);
          return 100;
        }
        return prev + 5; //Increase the progress by 5% every 200ms.
      });
    }, 200);
  };

  const handleFileSelect = (event) => { //This function runs when a user picks a file.
    const selected = event.target.files[0]; //Gets the first file.
    if (!selected) return; //If no file is selected, do nothing.

    if (files().length>=1){ //can take upto 1 files at a time
      alert("You can take 1 file at a time to share");
      return;
    }

    const fileData = {
      file: selected, // file → Stores the file itself
      url: URL.createObjectURL(selected),  //url → Creates a temporary link to preview the file
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, //expiresAt → Sets an expiration time (24 hours later).
    };

    setFiles([...files(), fileData]); //Adds the file to the list.
    simulateUpload(); //Starts the upload process.
  };

  const sendEmail = () => { //Function to "send" the file via email.
    if (!email()) { //If the email box is empty, show an alert
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
          <img class="h-8 sm:h-8 md:h-15" src={logo} alt="Logo" />
          <h3 class="ml-1 text-2xl sm:text-xl md:text-2xl text-cyan-100 font-bold tracking-wider">
            DOCFLOW
          </h3>
        </div>
        <div class="dropdown">
  <div tabindex="0" role="button" class="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-md uppercase px-5 py-2
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
 {/* Tabs */}

 <div class="flex space-x-4 -mt-1 -ml-185">
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

      {/* URL SHORTNER TAB */}

      <Show when={selectedTab() === "URL Shortner"}>
  <div 
    class="text-white 5 mt-4 flex flex-col items-center -ml-176 bg-[#0a0f1f] rounded-4xl w-2/3 max-w-lg transition-all p-4 "
    style={{ height: urlShorten() ? 'auto' : '25rem' }} // Expands dynamically
  >
    <img class="w-auto h-auto -mt-2 ml-2 rounded-2xl" loading="lazy" src={url} alt="url" />
    <span class="text-cyan-200 pb-5 -mt-9 -ml-1 text-3xl [text-shadow:0px_0px_1px_rgb(98,228,255),0px_0px_2px_rgb(98,228,255)]">Cut the Clutter, Keep the Clicks ! </span>
    {/* <h1 class="text-3xl font-bold mb-3 mt-2 text-yellow-100 [text-shadow:0px_0px_1px_rgb(98,228,255),0px_0px_3px_rgb(98,228,255)] ">URL Shortener</h1>
     */}
    <input 
      type="text" 
      placeholder="Enter your URL..." 
      class="px-4 py-2 mb-3 w-80 rounded-lg bg-gray-800 text-white border border-gray-600" 
      value={urlInput()} /*binds the SolidJS signal urlInput() to the input field so that it reflects the latest state.*/
      onInput={(e) => seturlInput(e.target.value)} //Updates the urlInput state whenever the user types something.
    />

    <button 
      class="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-lg px-4 py-2 
        rounded-[20px] shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95  mt-3 -ml-[10px] "
      onClick={() => {
        if (!urlInput()) {
          alert("Please enter a URL");
          return;
        }
        // Mock short URL (replace with actual API logic later)
        seturlShorten(`https://short.ly/${Math.random().toString(36).substring(7)}`); // Math.random() - This function generates a random decimal number between 0 and 1, .toString(36)Converts the random number into a base-36 string, which includes numbers (0-9) and letters (a-z), .substring(7)Removes the "0." at the beginning and keeps only the random characters after that, Template Literal (\`` ``) - Embeds the random string into a shortened URL format:
      }}
    >
      Shorten URL
    </button>

    <Show when={urlShorten()}>
      <div class="mt-1"> {/* Added spacing below */}
        {/* <span class="text-gray-300 -ml-19">Short URL : </span> */}
        <input 
          type="text" 
          class="px-4 py-2 w-80 rounded-lg bg-gray-800 text-white border border-gray-600 mt-2" 
          value={urlShorten()} 
          readonly //This prevents users from modifying the value in the input field.The user can copy the text, but not type in it. If readonly were removed, users could manually change the URL.
        />
      </div>
    </Show>
  </div>
</Show>
      {/* Show File Upload Section Only for Tab 2 */}


      <Show when={selectedTab() === "File Sharing"}>
        <div class="w-2/3 max-w-lg bg-[#0a0f1f] p-4 rounded-4xl transition-all -ml-173 mt-4 pointer-events-auto"
          style={{ height: uploading() || files().length > 0 || showPrompt() || showEmailPrompt() ? 'auto' : '12rem' }}> {/* dynamically extends the height of the box  */}    
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
            <input id="fileInput" type="file" class="hidden" onChange={handleFileSelect} /> {/* here the type is file and whatever we upload it will remain hidden to the user then the handlefileselect() is called */}
          </div>
          {/* stores the current upload progress (from 0 to 100). inside ${} → Inserts the value of progress() into a string. ${progress()}% → Converts the numeric value into a percentage progress() → Retrieves the current upload progress {progress()}% → Converts it into a readable percentage
          now the uploading() is called  */}
          {uploading() && (
            <div class="mt-5 text-center">
              <div class="text-gray-300 text-lg font-semibold">Uploading...</div>
              <div class="percent-container bg-gray-700 w-64 h-6 rounded-full mt-2 ml-28">
                <div class="progress-bar bg-blue-500 h-6 rounded-full transition-all" style={{ width: `${progress()}%` }}></div>
                <span class="percentage text-white font-bold absolute inset-0 flex items-center justify-center -ml-173 mt-43">{progress()}%</span>
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
       style={{ top: "40%", left: "75%", transform: "translate(-50%, -50%)" }}>
        
       </div>
       <div class=" absolute hidden lg:flex flex-col items-center z-0" style={{ top: "35%", left: "70%", transform: "translate(-50%, -50%)" }}>
    <img class="h-[auto] w-full flex" src={file} alt="file"/>
    <h1 class="flex text-center absolute top-full mt-[-200px] text-8xl font-bold text-cyan-300 [text-shadow:0px_0px_3px_rgb(98,228,255),0px_0px_6px_rgb(98,228,255)] tracking-wider -ml-33">SNIPIT</h1>
         {/* URL SHORTNER TAB */}

         <Show when={selectedTab() === "URL Shortner"}>
  <div 
    class="text-white 5 mt-4 flex flex-col items-center -ml-176 bg-[#0a0f1f] rounded-4xl w-2/3 max-w-lg transition-all p-4 "
    style={{ height: urlShorten() ? 'auto' : '25rem' }} // Expands dynamically
  >
    <img class="w-auto h-auto -mt-2 ml-2 rounded-2xl" loading="lazy" src={url} alt="url" />
    <span class="text-cyan-200 pb-5 -mt-9 -ml-1 text-3xl [text-shadow:0px_0px_1px_rgb(98,228,255),0px_0px_2px_rgb(98,228,255)]">Cut the Clutter, Keep the Clicks ! </span>
    {/* <h1 class="text-3xl font-bold mb-3 mt-2 text-yellow-100 [text-shadow:0px_0px_1px_rgb(98,228,255),0px_0px_3px_rgb(98,228,255)] ">URL Shortener</h1>
     */}
    <input 
      type="text" 
      placeholder="Enter your URL..." 
      class="px-4 py-2 mb-3 w-80 rounded-lg bg-gray-800 text-white border border-gray-600" 
      value={urlInput()} /*binds the SolidJS signal urlInput() to the input field so that it reflects the latest state.*/
      onInput={(e) => seturlInput(e.target.value)} //Updates the urlInput state whenever the user types something.
    />

    <button 
      class="bg-gradient-to-r from-[#3a675d] to-[#9ba4c8] 
        text-black font-bold text-lg px-4 py-2 
        rounded-[20px] shadow-lg transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
      hover:from-[#4198b7] hover:to-[#21295b] 
        active:scale-95  mt-3 -ml-[10px] "
      onClick={() => {
        if (!urlInput()) {
          alert("Please enter a URL");
          return;
        }
        // Mock short URL (replace with actual API logic later)
        seturlShorten(`https://short.ly/${Math.random().toString(36).substring(7)}`); // Math.random() - This function generates a random decimal number between 0 and 1, .toString(36)Converts the random number into a base-36 string, which includes numbers (0-9) and letters (a-z), .substring(7)Removes the "0." at the beginning and keeps only the random characters after that, Template Literal (\`` ``) - Embeds the random string into a shortened URL format:
      }}
    >
      Shorten URL
    </button>

    <Show when={urlShorten()}>
      <div class="mt-1"> {/* Added spacing below */}
        {/* <span class="text-gray-300 -ml-19">Short URL : </span> */}
        <input 
          type="text" 
          class="px-4 py-2 w-80 rounded-lg bg-gray-800 text-white border border-gray-600 mt-2" 
          value={urlShorten()} 
          readonly //This prevents users from modifying the value in the input field.The user can copy the text, but not type in it. If readonly were removed, users could manually change the URL.
        />
      </div>
    </Show>
  </div>
</Show>
</div>
    </div>
    </>
  );
}
export default FileSharing;