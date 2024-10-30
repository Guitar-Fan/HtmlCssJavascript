function submitTryit() {
    var text = document.getElementById("textareaCode").value;

    var ifr = document.createElement("iframe");
    ifr.setAttribute("frameborder", "0");
    ifr.setAttribute("id", "iframeResult");
    ifr.setAttribute("name", "iframeResult");
    ifr.setAttribute("allowfullscreen", "true");

    document.getElementById("iframewrapper").innerHTML = "";
    document.getElementById("iframewrapper").appendChild(ifr);

    var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
    ifrw.document.open();
    ifrw.document.write(text);
    ifrw.document.close();
    showFrameSize();
}

function toggleTheme() {
    document.body.classList.toggle("darktheme");
}

function showFrameSize() {
    var width = Number(getComputedStyle(document.getElementById("iframeResult")).width.replace("px", "")).toFixed();
    var height = Number(getComputedStyle(document.getElementById("iframeResult")).height.replace("px", "")).toFixed();
    document.getElementById("framesize").innerHTML = "Result Size: <span>" + width + " x " + height + "</span>";
}

var dragging = false;

function dragstart(e) {
    e.preventDefault();
    dragging = true;
}

function dragmove(e) {
    if (dragging) {
        document.getElementById("shield").style.display = "block";
        var percentage = (e.pageX / window.innerWidth) * 100;
        if (percentage > 5 && percentage < 98) {
            var mainPercentage = 100 - percentage;
            document.getElementById("textareacontainer").style.width = percentage + "%";
            document.getElementById("iframecontainer").style.width = mainPercentage + "%";
        }
        showFrameSize();
    }
}

function dragend() {
    document.getElementById("shield").style.display = "none";
    dragging = false;
}

document.getElementById("dragbar").addEventListener("mousedown", dragstart);
window.addEventListener("mousemove", dragmove);
window.addEventListener("mouseup", dragend);
window.addEventListener("load", showFrameSize);