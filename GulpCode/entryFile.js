const fse = require("fs-extra");
const CommonSchemaJson = require("../schema.json");

var dotenv = require("dotenv");
dotenv.config();

const CommonVersionCode = "$ApiVersion";
const CommonTableNameCode = "$TableName";

const StartFunc = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    // console.log("111111111111 : ", contentAsJson);

    contentAsJson.columns = CommonSchemaJson.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace("$TableName", CommonSchemaJson.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace("$ApiVersion", process.env.VERSION);
    // console.log("2222222222 : ", contentAsJson);
    // contentAsJson.DataTableOptions.Header.autoFocus = process.env.autoFocus;
    contentAsJson.DataTableOptions = CommonSchemaJson.DataTableOptions;

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

module.exports = { StartFunc };