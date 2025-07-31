import { StartFunc as StartFuncTableFooterSaveButtonId } from "./TableFooterSaveButtonId/EntryFile.js";

let StartFunc = (inData, inOptions) => {
    StartFuncTableFooterSaveButtonId();

    table.querySelector("tfoot input").focus();

};

export { StartFunc };