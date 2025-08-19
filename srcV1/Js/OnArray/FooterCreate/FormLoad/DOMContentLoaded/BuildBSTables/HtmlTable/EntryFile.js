import { StartFunc as StartFuncFromOnPostBody } from "./OnPostBody/EntryFile.js";
// import ConfigJson from '../../../../../Config.json' with {type: 'json'};

const StartFunc = () => {
    var $table = $('#table');

    let LocalConfig = {};
    LocalConfig.onPostBody = StartFuncFromOnPostBody;
    // LocalConfig.autoFocus = "Latitude";
    // LocalConfig.autoFocus = ConfigJson?.DataTableOptions?.Header?.autoFocus

    $table.bootstrapTable(LocalConfig);
};

export { StartFunc };
