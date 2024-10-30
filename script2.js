document.addEventListener('DOMContentLoaded', () => {
    const backgroundCode = document.getElementById('background-code');
    const flexboxCode = document.getElementById('flexbox-code');
    
    backgroundCode.addEventListener('input', () => {
        const style = document.createElement('style');
        style.innerHTML = backgroundCode.value;
        document.head.appendChild(style);
    });

    flexboxCode.addEventListener('input', () => {
        const style = document.createElement('style');
        style.innerHTML = flexboxCode.value;
        document.head.appendChild(style);
    });

    // Add similar event listeners for other sections as needed
});
