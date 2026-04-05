const API_BASE = "https://api.pastefy.app";
const PASTE_ID = "PKzNiJG1";

const apiInput = document.getElementById("apiKeyInput");
const contentArea = document.getElementById("content");
const statusDiv = document.getElementById("status");

document.getElementById("saveKeyBtn").onclick = () => {
    localStorage.setItem("pastefy_api_key", apiInput.value.trim());
    setStatus("API key saved locally", "green");
};

document.getElementById("removeKeyBtn").onclick = () => {
    localStorage.removeItem("pastefy_api_key");
    apiInput.value = "";
    setStatus("API key removed", "orange");
};

document.getElementById("loadBtn").onclick = loadPaste;
document.getElementById("saveBtn").onclick = patchPaste;

function getKey() {
    return localStorage.getItem("pastefy_api_key");
}

async function loadPaste() {
    const key = getKey();
    if (!key) return setStatus("No API key saved", "red");

    setStatus("Loading paste...", "black");

    try {
        const res = await fetch(`${API_BASE}/paste/${PASTE_ID}`, {
            headers: { Authorization: key }
        });

        const data = await res.json();
        contentArea.value = data.paste.content || "";
        setStatus("Paste loaded!", "green");
    } catch (e) {
        setStatus("Error loading paste", "red");
    }
}

async function patchPaste() {
    const key = getKey();
    if (!key) return setStatus("No API key saved", "red");

    setStatus("Saving changes...", "black");

    try {
        await fetch(`${API_BASE}/paste/${PASTE_ID}`, {
            method: "PATCH",
            headers: {
                Authorization: key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: contentArea.value
            })
        });

        setStatus("Paste updated!", "green");
    } catch (e) {
        setStatus("Error saving paste", "red");
    }
}

function setStatus(msg, color) {
    statusDiv.textContent = msg;
    statusDiv.style.color = color;
}
