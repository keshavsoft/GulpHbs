import { StartFunc as StartFuncTableFooterSaveButtonId } from "./TableFooterSaveButtonId/EntryFile.js";

let StartFunc = (inData, inOptions) => {
    StartFuncTableFooterSaveButtonId();

    jFLocalSetFocus(inOptions);
};

let jFLocalSetFocus = (inOptions) => {
    StartFuncTableFooterSaveButtonId();
    // console.log("aaaaaaaaaaaa", k1.columns[0]?.k1, k1.options.autoFocus, data, table.querySelector("tfoot input"));
    const jVarLocalHtmlToFocus = table.querySelector(`tfoot input[name=${inOptions.options.autoFocus}]`);
    // console.log("aaaaaaaaaaaa", jVarLocalHtmlToFocus);
    jVarLocalHtmlToFocus?.focus();
};

export { StartFunc };