import { createSignal, Show, For } from "solid-js";
import logo from "../../assets/logo.png";

function FileSharing() {
  const [files, setFiles] = createSignal([]);
  const [progress, setProgress] = createSignal(0);
  const [uploading, setUploading] = createSignal(false);
  const [showPrompt, setShowPrompt] = createSignal(false);
  const [showEmailPrompt, setShowEmailPrompt] = createSignal(false);
  const [email, setEmail] = createSignal("");

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
        return prev + 5;
      });
    }, 200);
  };

  const handleFileSelect = (event) => {
    const selected = event.target.files[0];
    if (!selected) return;

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

  return (
    <div class="bg-[#0b1121] hidden lg:flex min-h-[120vh] w-full flex-col items-center">
      <nav class="flex items-center justify-between px-10 py-7 w-full">
        <div class="flex items-center">
          <img class="h-8 sm:h-8 md:h-15" src={logo} alt="Logo" />
          <h3 class="ml-1 text-2xl sm:text-xl md:text-2xl text-gray-300 font-bold tracking-wider">
            FLOWFILE
          </h3>
        </div>
      </nav>

      <div class="w-2/3 max-w-lg bg-gray-900 p-4 rounded-lg transition-all -ml-173"
        style={{ height: uploading() || files().length > 0 || showPrompt() || showEmailPrompt() ? 'auto' : '12rem' }}>
        <div class="w-full h-40 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center text-gray-300 hover:border-blue-400 transition-all cursor-pointer">
          <p class="text-2xl pb-2">Drop your files here.</p>
          <label for="fileInput" class="cursor-pointer mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Click to Upload
          </label>
          <input id="fileInput" type="file" class="hidden" onChange={handleFileSelect} />
        </div>

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

        {showPrompt() && (
          <div class="mt-5 text-center">
            <p class="text-white text-lg mb-4">Share this file via:</p>
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
