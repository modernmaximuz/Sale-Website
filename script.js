// 🔐 PUT YOUR API KEY HERE
const API_KEY = "PASTEFY_API_KEY_HERE";
const API_BASE = "https://api.pastefy.app";

const pasteIdInput = document.getElementById("pasteId");
const contentArea = document.getElementById("content");
const statusDiv = document.getElementById("status");

document.getElementById("loadBtn").addEventListener("click", loadPaste);
document.getElementById("saveBtn").addEventListener("click", patchPaste);

async function loadPaste() {
    const pasteId = pasteIdInput.value.trim();
    if (!pasteId) {
        setStatus("Enter a Paste ID", "red");
        return;
    }

    setStatus("Loading paste...", "black");

    try {
        const res = await fetch(`${API_BASE}/paste/${pasteId}`, {
            headers: {
                "Authorization": API_KEY
            }
        });

        if (!res.ok) throw new Error("Failed to fetch paste");

        const data = await res.json();
        contentArea.value = data.paste.content || "";
        setStatus("Paste loaded!", "green");
    } catch (err) {
        console.error(err);
        setStatus("Error loading paste", "red");
    }
}

async function patchPaste() {
    const pasteId = pasteIdInput.value.trim();
    if (!pasteId) {
        setStatus("Enter a Paste ID", "red");
        return;
    }

    setStatus("Saving changes...", "black");

    try {
        const res = await fetch(`${API_BASE}/paste/${pasteId}`, {
            method: "PATCH",
            headers: {
                "Authorization": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: contentArea.value
            })
        });

        if (!res.ok) throw new Error("Failed to update paste");

        setStatus("Paste updated successfully!", "green");
    } catch (err) {
        console.error(err);
        setStatus("Error updating paste", "red");
    }
}

function setStatus(message, color) {
    statusDiv.textContent = message;
    statusDiv.style.color = color;
}
