export const init = () => {

    // TODO: both event listeners should be closer to diagram

    const zoomout = document.getElementById("zoom-out");
    zoomout.addEventListener("click", () => {
        document.body.className = "";
    });

    document.onkeydown = function(evt) {
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            document.body.className = "";
        }
    };
}
