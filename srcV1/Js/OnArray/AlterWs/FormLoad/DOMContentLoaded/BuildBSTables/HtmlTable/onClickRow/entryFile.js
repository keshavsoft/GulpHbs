import { StartFunc as StartFuncNav } from "./Nav/entryFile.js";
import ConfigJson from '../../../../../../Config.json' with {type: 'json'};

const StartFunc = (row, $element, field) => {
    const jVarLocalPrimaryKey = ConfigJson.primaryKey;
    if (field === "KS-Alter") {
        StartFuncNav({ inRowpk: row[jVarLocalPrimaryKey] });
    };
};

export { StartFunc };