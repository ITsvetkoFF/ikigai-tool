import {init} from "./app.js"
import {renderDiagram} from "./components/diagram/diagram.js";
import {defineUser} from "./services/user.js";

const user = await defineUser();
init();
renderDiagram(user.pillars);
