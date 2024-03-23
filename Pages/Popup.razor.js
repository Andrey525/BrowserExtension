function collectImages() {
    chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];
        if (tab) {
            execScript(tab);
        } else {
            alert("There are no active tabs")
        }
    })
}

function execScript(tab) {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id, allFrames: true },
            func: grabImages
        },
        onResult
    )
}

function grabImages() {
    const images = document.querySelectorAll("img");
    return Array.from(images).map(image => image.src);
}

function onResult(frames) {
    if (!frames || !frames.length) {
        alert("Could not retrieve images from specified page");
        window.close();
        return;
    }
    const imageUrls = frames.map(frame => frame.result)
        .reduce((r1, r2) => r1.concat(r2));

    const regex = "^(http|https):\/\/";
    var filteredUrls = imageUrls.filter(url => url.match(regex));

    window.navigator.clipboard
        .writeText(filteredUrls.join("\n"))
        .then(() => {
            window.close();
        });
}
