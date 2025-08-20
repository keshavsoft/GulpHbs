import { StartFunc as StartFuncTableFooterSaveButtonId } from "./TableFooterSaveButtonId/EntryFile.js";

let StartFunc = () => {
    StartFuncTableFooterSaveButtonId();
    // debugger;
    let $autoFocusInput = $("#table tfoot").find("input[autofocus], select[autofocus], textarea[autofocus]");
    // console.log("autoFocusInput : ", $autoFocusInput);

    if ($autoFocusInput.length > 0) {
        $autoFocusInput.trigger("focus");
    };
};

export { StartFunc };