import {patchUser} from "./services/user.js";
import {debounceGatherMap1} from "./utils/debounce.js";

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

    document.addEventListener('PILLAR_TEXT_CHANGE', async event => {
        await patchUser({
            pillars: {[event.detail.pillar]: event.detail.value}
        })
    });
    document.addEventListener('PILLAR_TEXT_KEYBOARD_EVENT', debounceGatherMap1(
        (mappedEvents) => (async () => {
            await patchUser({log: mappedEvents})
        })(),
        event => ({
            pillar: event.detail.pillar,
            action: 'type',
            actionData: event.detail.value,
            timestamp: Date.now().valueOf()
        }),
        3000
    ));
}
