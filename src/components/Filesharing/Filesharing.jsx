import { createSignal, Show } from "solid-js";
import logo from "../../assets/logo.png";

function FileSharing() {
  const [files, setFiles] = createSignal([]);
  const [progress, setProgress] = createSignal(0);
  const [uploading, setUploading] = createSignal(false);
  const [showPrompt, setShowPrompt] = createSignal(false);
  const [showEmailPrompt, setShowEmailPrompt] = createSignal(false);
  const [selectedFile, setSelectedFile] = createSignal(null);
  const [email, setEmail] = createSignal("");

  // Simulate file upload progress
  const simulateUpload = () => {
    setUploading(true);
    setProgress(0);

    let uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setTimeout(() => {
            setUploading(false);
            setShowPrompt(true); // Show sharing options
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const selected = event.target.files[0];
    if (!selected) return;

    const fileData = {
      file: selected,
      url: URL.createObjectURL(selected),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
    };

    setFiles([...files(), fileData]);
    setSelectedFile(fileData);
    simulateUpload();
  };

  // Handle Email Submission
  const sendEmail = () => {
    if (!email()) {
      alert("Please enter an email!");
      return;
    }
    alert(`File sent to ${email()}`);
    setShowEmailPrompt(false);
    setShowPrompt(false);
  };

  return (
    <div class="bg-[#0b1121] hidden lg:flex min-h-screen w-full flex-col items-center">
      {/* Navbar */}
      <nav class="flex items-center justify-between px-10 py-7 w-full">
        <div class="flex items-center">
          <img class="h-8 sm:h-8 md:h-15" src={logo} alt="Logo" />
          <h3 class="ml-1 text-2xl sm:text-xl md:text-2xl text-gray-300 font-bold tracking-wider">
            FLOWFILE
          </h3>
        </div>
      </nav>
      

      {/* Dynamic Expanding Box */}
<div class="w-2/3 max-w-lg bg-gray-900 p-4 rounded-lg transition-all"
     style={{ height: uploading() || files().length > 0 ? 'auto' : '12rem' }}>
  {/* File Upload Box */}
  <div class="w-full h-40 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center text-gray-300 hover:border-blue-400 transition-all cursor-pointer">
    <p class="text-2xl pb-2">Drop your files here.</p>
    <label for="fileInput" class="cursor-pointer mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
      Click to Upload
    </label>
    <input id="fileInput" type="file" class="hidden" onChange={handleFileSelect} />
  </div>
  
  {/* Uploading Progress Indicator */}
  {uploading() && (
    <div class="mt-5 text-center">
      <div class="status text-gray-300 text-lg font-semibold">Uploading...</div>
      <div class="percent-container bg-gray-700 w-64 h-6 rounded-full mt-2 relative ml-30">
        <div class="progress-bar bg-blue-500 h-6 rounded-full absolute transition-all" style={{ width: `${progress()}%` }}></div>
        <span class="percentage text-white font-bold absolute inset-0 flex items-center justify-center">{progress()}%</span>
      </div>
    </div>
  )}

  {/* Uploaded Files List */}
  <div class="mt-5">
    <For each={files()}>
      {(file) => (
        <div class="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 rounded-lg mt-2">
          <p class="truncate">{file.file.name} ({(file.file.size / 1024).toFixed(2)} KB)</p>
          <div class="flex space-x-2">
            <button class="text-gray-400 hover:text-white" onClick={() => window.open(file.url, "_blank")}>📄</button>
            <button class="text-gray-400 hover:text-white" onClick={() => navigator.clipboard.writeText(file.url)}>🔗</button>
            <button class="text-red-400 hover:text-red-600" onClick={() => setFiles(files().filter((f) => f.url !== file.url))}>🗑️</button>
          </div>
        </div>
      )}
    </For>
  </div>
</div>

      {/* Share Prompt */}
      <Show when={showPrompt()}>
        <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
            <p class="text-white text-lg mb-4">Share this file via:</p>
            <button class="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-2">
              Generate Link 🔗
            </button>
            <button onClick={() => setShowEmailPrompt(true)} class="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send via Email 📧
            </button>
            <button onClick={() => setShowPrompt(false)} class="w-full p-2 mt-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      </Show>

      {/* Email Input Prompt */}
      <Show when={showEmailPrompt()}>
        <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
            <p class="text-white text-lg mb-4">Enter recipient email:</p>
            <input
              type="email"
              placeholder="example@email.com"
              class="p-2 w-full rounded-lg border border-gray-500 text-black"
              onInput={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendEmail} class="w-full p-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send Email 📤
            </button>
            <button onClick={() => setShowEmailPrompt(false)} class="w-full p-2 mt-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default FileSharing;           