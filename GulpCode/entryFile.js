const fse = require("fs-extra");
const CommonColumns = require("../schema.json");

var dotenv = require("dotenv");
dotenv.config();

const StartFunc = ({ inDistPath }) => {
    LocalFuncForOnArray({ inDistPath });
};

const LocalFuncForOnArray = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/OnArray/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    contentAsJson.columns = CommonColumns.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace("$TableName", CommonColumns.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace("$ApiVersion", process.env.VERSION);

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

module.exports = { StartFunc };