import { StartFunc as StartFuncFromOnPostBody } from "./OnPostBody/EntryFile.js";

const StartFunc = () => {
    var $table = $('#table');

    let LocalConfig = {};
    LocalConfig.onPostBody = StartFuncFromOnPostBody;
    LocalConfig.autoFocus = "Latitude";

    $table.bootstrapTable(LocalConfig);
};

export { StartFunc };
