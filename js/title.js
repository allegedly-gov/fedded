document.addEventListener("DOMContentLoaded", function() {
    const title = "CLICK TO PROCEED";
    const winTitle = "FEDDED"

    const title_element = document.getElementById("click-button");
    let offset = 1;
    let winOffset = 1;

    let finished = false;

    setInterval(async function() {
        if (winOffset > winTitle.length) {
            document.title = winTitle.slice(0, winOffset);
            return;
        }
        document.title = winTitle.slice(0, winOffset) + "_";
        winOffset++;
    }, 300);

    setInterval(async function() {
        if(!finished) {
            if (offset > title.length) {
                finished = true
                title_element.innerHTML = "<span></span><span></span><span></span><span></span>"+title.slice(0, offset);
                return;
            }
            title_element.innerHTML = title.slice(0, offset) + "_";
            offset++;
        }
    }, 100);


})