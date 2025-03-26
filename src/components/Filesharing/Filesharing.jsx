import { createSignal, Show, For } from "solid-js"; //createsignal helps to store and update values show displays the things only if it is needed and for is a loop
import logo from "../../assets/logo.png";

function FileSharing() { //this function is for our file sharing app
  const [files, setFiles] = createSignal([]); //keeps track of the uploaded file and starts with empty
  const [progress, setProgress] = createSignal(0); //Tracks the upload progress (starts at 0%)
  const [uploading, setUploading] = createSignal(false); //Checks if something is currently uploading (starts as false)
  const [showPrompt, setShowPrompt] = createSignal(false); //Controls if the "Share File" options should be shown.
  const [showEmailPrompt, setShowEmailPrompt] = createSignal(false); //Controls if the "Enter Email" box should be shown.
  const [email, setEmail] = createSignal(""); //Stores the email entered by the user (starts empty).

  const simulateUpload = () => { //This function "pretends" to upload a file. FAKE UPLOADER 
    setUploading(true); //Marks upload as "started".
    setProgress(0);    //Resets the progress bar to 0%.
    let uploadInterval = setInterval(() => { //Starts a timer that runs every 200ms and Slowly increases the upload percentage.
      setProgress((prev) => {
        if (prev >= 100) { //If progress reaches 100%, stop the timer.
          clearInterval(uploadInterval);
          setTimeout(() => { //After a short delay, hide "Uploading..." and show sharing options.
            setUploading(false);
            setShowPrompt(true);
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

    const fileData = {   
      file: selected,   // file → Stores the file itself
      url: URL.createObjectURL(selected), //url → Creates a temporary link to preview the file
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, //expiresAt → Sets an expiration time (24 hours later).
    };

    setFiles([...files(), fileData]); //Adds the file to the list.
    simulateUpload(); //Starts the upload process.
  };

  const sendEmail = () => { //Function to "send" the file via email.
    if (!email()) {   //If the email box is empty, show an alert
      alert("Please enter an email!");
      return;
    }
    alert(`File sent to ${email()}`); //Shows a message saying the file was "sent"
    setShowEmailPrompt(false); //closes the emailprompt popup
    setShowPrompt(false); //Closes the showprompt popup.
  };

  return (
    <div class="bg-[#0b1121] hidden lg:flex min-h-[110vh] w-full flex-col items-center">
      <nav class="flex items-center justify-between px-10 py-7 w-full">
        <div class="flex items-center">
          <img class="h-8 sm:h-8 md:h-15" src={logo} alt="Logo" />
          <h3 class="ml-1 text-2xl sm:text-xl md:text-2xl text-gray-300 font-bold tracking-wider">
            FLOWFILE
          </h3>
        </div>
      </nav>
      <div class="tabs tabs-box ">
  <input type="radio" name="my_tabs_1" class="tab" aria-label="Tab 1" />
  <input type="radio" name="my_tabs_1" class="tab" aria-label="Tab 2" checked="checked" />
</div>

      <div class="w-2/3 max-w-lg bg-gray-900 p-4 rounded-lg transition-all -ml-173"
        style={{ height: uploading() || files().length > 0 || showPrompt() || showEmailPrompt() ? 'auto' : '12rem' }}> {/* dynamically extends the height of the box  */}
        <div class="w-full h-40 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center text-gray-300 hover:border-blue-400 transition-all cursor-pointer">
          <p class="text-2xl pb-2">Drop your files here.</p>
          <label for="fileInput" class="cursor-pointer mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Click to Upload
          </label>
          <input id="fileInput" type="file" class="hidden" onChange={handleFileSelect} /> {/* here the type is file and whatever we upload it will remain hidden to the user then the handlefileselect() is called */}
        </div>
        {/* stores the current upload progress (from 0 to 100). inside ${} → Inserts the value of progress() into a string. ${progress()}% → Converts the numeric value into a percentage progress() → Retrieves the current upload progress {progress()}% → Converts it into a readable percentage
        now the uploading() is called  */}
        {uploading() && (
          <div class="mt-5 text-center">
            <div class="status text-gray-300 text-lg font-semibold">Uploading...</div>
            <div class="percent-container bg-gray-700 w-64 h-6 rounded-full mt-2 ml-28">
              <div class="progress-bar bg-blue-500 h-6 rounded-full transition-all" style={{ width: `${progress()}%` }}></div>
              <span class="percentage text-white font-bold absolute inset-0 flex items-center justify-center -ml-173 mt-10">{progress()}%</span>
            </div>
          </div>
        )}

        <div class="mt-5">
          <For each={files()}>
            {(file) => (
              <div class="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 rounded-lg mt-2">
                {/* file.file.name → Displays the file's name, file.file.size / 1024 → Converts the file size from bytes to KB, .toFixed(2) converts a number to a string with exactly 2 decimal places, truncate →prevents long text (file names) from overflowing by cutting off extra characters and adding (...). */}
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
            <p class="text-white text-lg mb-4">Share this file via:</p>(...)
            <button class="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-2">
              Generate Link 🔗
            </button>
            <button onClick={() => setShowEmailPrompt(true)} class="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send via Email 📧
            </button>
          </div>
        )}

        {showEmailPrompt() && (
          <div class="mt-5 text-center">
            <p class="text-white text-lg mb-4">Enter recipient email:</p>
            <input
              type="email"
              placeholder="example@email.com"
              class="p-2 w-full rounded-lg border border-gray-500 text-white"
              // onInput={(e) => setEmail(e.target.value)} → This runs when the user types in the input field, (e) => setEmail(e.target.value) → Takes the event (e), gets the input’s value (e.target.value), and updates email, setEmail(e.target.value) → Stores the typed email in the email signal.
              onInput={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendEmail} class="w-full p-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send Email 📤
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileSharing;
