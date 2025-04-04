import { createSignal, onMount, onCleanup, createEffect } from "solid-js";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const [content, setContent] = createSignal("");
const [responseMsg, setResponseMsg] = createSignal("");
const [shareLink, setShareLink] = createSignal("");

const Syntaxia = () => {
  /** @type {HTMLDivElement | null} */
  let editorContainer = null;
  /** @type {Quill | null} */
  let quillInstance = null;

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  onMount(() => {
    createEffect(() => {
      console.log(content());
    });
    if (editorContainer) {
      quillInstance = new Quill(editorContainer, {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
      });

      quillInstance.root.style.height = "350px";

      quillInstance.on("text-change", () => {
        if (quillInstance) {
          setContent(quillInstance.root.innerHTML);
        }
      });
    }
  });

  onCleanup(() => {
    quillInstance = null;
  });

  const handleUpload = async () => {
    if (!content().trim()) {
      setResponseMsg("Please write some content");
      return;
    }
    try {
      const response = await fetch("http://192.168.29.84:8080/syntaxia", {
        method: "POST",
        headers: { "content-Type": "text/html" },
        body: content(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || " Failed to upload file");
      }
      setShareLink(data.shareLink);
      setResponseMsg(data.message);
    } catch (err) {
      setResponseMsg(err.message);
    }
  };

  return (
    <div class="bg-[#040917] min-h-screen flex flex-col">
      <div
        class="absolute w-full h-full bg-[radial-gradient(circle,_rgba(80,194,204,0.6)_10%,_rgba(0,14,51,0)_90%)] blur-5xl opacity-30 pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      ></div>

      <div class="flex justify-center mt-9 px-4 md:px-10 flex-row gap-10">
        <div class="relative w-full max-w-2xl">
          <div class="absolute inset-0 border-4 border-cyan-400 opacity-50 blur-md rounded-3xl"></div>

          <div class="relative z-10 card bg-neutral-200 shadow-xl p-4 border-4 border-cyan-700 rounded-2xl">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-4 text-center">
              Syntaxia
            </h2>

            <div
              ref={(el) => (editorContainer = el)}
              class="border border-gray-300 rounded-lg overflow-auto h-[350px]"
            ></div>

            <div class="card-actions justify-end mt-4">
              <button
                class="bg-gradient-to-r from-[#183742] to-[#1a2038] text-white font-bold text-md px-3 py-2 rounded-[20px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-[#3c5f6b] hover:to-[#21295b] active:scale-95"
                onClick={handleUpload}
              >
                Save & Share
              </button>
            </div>

            {responseMsg() && <p class="text-sm text-black mt-2">{responseMsg()}</p>}
            {shareLink() && (
              <p
                class="text-blue-500 cursor-pointer hover:underline mt-2"
                onClick={() => navigator.clipboard.writeText(shareLink())}
              >
                {shareLink()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div class="absolute inset-0 flex border-4 border-cyan-400 opacity-50 blur-lg rounded-lg z-10 pointer-events-none"></div>
    </div>
  );
};

export default Syntaxia;
