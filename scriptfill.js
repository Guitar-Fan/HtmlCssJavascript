function runCode() {
    const code = document.getElementById("editor").value;
    const iframe = document.getElementById("resultFrame");
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
    showFrameSize();
}

function toggleTheme() {
    document.body.classList.toggle("darktheme");
}

function showFrameSize() {
    const iframe = document.getElementById("resultFrame");
    const width = iframe.clientWidth;
    const height = iframe.clientHeight;
    document.getElementById("framesize").textContent = `Size: ${width}px x ${height}px`;
}

let isDragging = false;
let animationFrameId;

function dragStart(e) {
    isDragging = true;
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragEnd);
}

function dragMove(e) {
    if (isDragging) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(() => {
            const container = document.getElementById("container");
            const editor = document.getElementById("editor");
            const result = document.getElementById("result");
            const dragbar = document.getElementById("dragbar");
            const percentage = (e.clientX / window.innerWidth) * 100;
            editor.style.width = `${percentage}%`;
            result.style.width = `calc(100% - ${percentage}%)`;
            dragbar.style.left = `${percentage}%`;
            showFrameSize();
        });
    }
}

function dragEnd() {
    isDragging = false;
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", dragEnd);
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

document.getElementById("dragbar").addEventListener("mousedown", dragStart);
window.addEventListener("load", showFrameSize);
window.addEventListener("resize", () => {
    const result = document.getElementById("result");
    const dragbar = document.getElementById("dragbar");
    result.style.width = "50%";
    dragbar.style.left = "50%";
    showFrameSize();
});
