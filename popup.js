document.getElementById("read").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectedText
        }, (results) => {
            if (results && results[0] && results[0].result) {
                const text = results[0].result;
                const language = document.getElementById("language").value;
                const speed = parseFloat(document.getElementById("speed").value);

                chrome.tts.speak(text, {
                    lang: language,
                    rate: speed
                });
            }
        });
    });
});

function getSelectedText() {
    return window.getSelection().toString();
}

document.getElementById("stop").addEventListener("click", function () {
    chrome.tts.stop();
});
