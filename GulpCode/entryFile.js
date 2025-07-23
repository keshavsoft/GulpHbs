const fse = require("fs-extra");
const CommonSchemaJson = require("../schema.json");

var dotenv = require("dotenv");
dotenv.config();

const StartFunc = ({ inDistPath }) => {
    LocalFuncForOnArray({ inDistPath });
    LocalFuncForRead({ inDistPath });
};

const LocalFuncForOnArray = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/OnArray/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    contentAsJson.columns = CommonSchemaJson.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace("$TableName", CommonSchemaJson.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace("$ApiVersion", process.env.VERSION);

    // contentAsJson.DataTableOptions.Header.autoFocus = process.env.autoFocus;
     contentAsJson.DataTableOptions = CommonSchemaJson.DataTableOptions;
    
    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

const LocalFuncForRead = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Read/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    contentAsJson.columns = CommonSchemaJson.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace("$TableName", CommonSchemaJson.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace("$ApiVersion", process.env.VERSION);
     contentAsJson.DataTableOptions = CommonSchemaJson.DataTableOptions;
    
    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

module.exports = { StartFunc };