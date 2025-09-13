const fse = require("fs-extra");
const CommonSchemaJson = require("../schema.json");

var dotenv = require("dotenv");
dotenv.config();

const CommonVersionCode = "$ApiVersion";
const CommonTableNameCode = "$TableName";

const StartFunc = ({ inDistPath }) => {
    LocalFuncForOnArray({ inDistPath });
    LocalFuncForRead({ inDistPath });
    LocalFuncForCalendar({ inDistPath });
    LocalFuncForProtected({ inDistPath });
    LocalFuncForShowAll({ inDistPath });
    LocalFuncForCards({ inDistPath });
    LocalFuncForCharts({ inDistPath });
    LocalFuncForCreate({ inDistPath });
    LocalFuncForDelete({ inDistPath });
    LocalFuncForAlter({ inDistPath });
    LocalFuncForDownload({ inDistPath });
    LocalFuncForGroupBy({ inDistPath });
};

const LocalFuncForOnArray = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/OnArray/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    // console.log("111111111111 : ", contentAsJson);

    contentAsJson.columns = CommonSchemaJson.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace(CommonVersionCode, CommonSchemaJson.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace(CommonTableNameCode, process.env.VERSION);
    // console.log("2222222222 : ", contentAsJson);
    // contentAsJson.DataTableOptions.Header.autoFocus = process.env.autoFocus;
    contentAsJson.DataTableOptions = CommonSchemaJson.DataTableOptions;

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

const LocalFuncForProtected = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Protected/Config.json`;

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

const LocalFuncForCalendar = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Calendar/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    contentAsJson.columns = CommonSchemaJson.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace("$TableName", CommonSchemaJson.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace("$ApiVersion", process.env.VERSION);
    contentAsJson.DataTableOptions = CommonSchemaJson.DataTableOptions;

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

const LocalFuncForShowAll = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/ShowAll/Config.json`;

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

const LocalFuncForCards = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Cards/Config.json`;

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

const LocalFuncForCharts = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Charts/Config.json`;

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
const LocalFuncForCreate = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Create/Config.json`;

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

const LocalFuncForDelete = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Delete/Config.json`;

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

const LocalFuncForAlter = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Alter/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    contentAsJson.columns = CommonSchemaJson.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace("$TableName", CommonSchemaJson.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace("$ApiVersion", process.env.VERSION);
    contentAsJson.DataTableOptions = CommonSchemaJson.DataTableOptions;

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

const LocalFuncForDownload = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Download/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    contentAsJson.columns = CommonSchemaJson.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace("$TableName", CommonSchemaJson.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace("$ApiVersion", process.env.VERSION);
    contentAsJson.DataTableOptions = CommonSchemaJson.DataTableOptions;

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

const LocalFuncForGroupBy = ({ inDistPath }) => {
    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/GroupBy/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);
    contentAsJson.columns = CommonSchemaJson.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace("$TableName", CommonSchemaJson.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace("$ApiVersion", process.env.VERSION);
    contentAsJson.DataTableOptions = CommonSchemaJson.DataTableOptions;

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

module.exports = { StartFunc };