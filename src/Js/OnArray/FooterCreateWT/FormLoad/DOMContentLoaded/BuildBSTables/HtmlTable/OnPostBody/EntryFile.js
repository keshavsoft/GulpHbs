import { StartFunc as StartFuncTableFooterSaveButtonId } from "./TableFooterSaveButtonId/EntryFile.js";

let StartFunc = (inData, inOptions) => {
    StartFuncTableFooterSaveButtonId();
    console.log("aaaaaaaaa : ", inData);

    table.querySelector("tfoot input").focus();
};

export { StartFunc };