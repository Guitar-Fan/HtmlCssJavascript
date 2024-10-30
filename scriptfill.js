document.getElementById('runButton').addEventListener('click', () => {
    const code = document.getElementById('code').value;
    const resultFrame = document.getElementById('resultFrame').contentWindow.document;

    resultFrame.open();
    resultFrame.write(code);
    resultFrame.close();
});

const resizer = document.getElementById('resizer');
const leftSide = document.getElementById('left');
const rightSide = document.getElementById('right');
const displaySize = document.getElementById('displaySize');

resizer.addEventListener('mousedown', (e) => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    const containerWidth = document.querySelector('.container').offsetWidth;
    const leftWidth = e.clientX / containerWidth * 100;
    leftSide.style.width = `${leftWidth}%`;
    rightSide.style.width = `${100 - leftWidth}%`;
    updateDisplaySize();
}

function stopResize() {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

function updateDisplaySize() {
    const width = rightSide.offsetWidth;
    const height = rightSide.offsetHeight;
    displaySize.textContent = `${width}px x ${height}px`;
}

window.addEventListener('resize', updateDisplaySize);
updateDisplaySize();
