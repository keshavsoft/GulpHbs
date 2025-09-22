import { StartFunc as StartFuncOnExpandRow } from "../onExpandRow/EntryFile.js";
import IconsJson from '../icons.json' with {type: 'json'};

const StartFunc = () => {
    var $table = $('#table');

    const finalOptions = {
        onExpandRow: StartFuncOnExpandRow,
        icons: IconsJson
    };

    $table.bootstrapTable(finalOptions);
};

export { StartFunc };
