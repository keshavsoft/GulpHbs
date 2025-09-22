import ConfigJson from "../../../../Config.json" with {type: 'json'};

let StartFunc = (index, row, $detail) => {
    let jVarLocalSubTableKey = ConfigJson.subTableKey;

    let jVarLocalDataArray = row[jVarLocalSubTableKey];
    let jVarLocalTemplateForSubTable = document.getElementById("TemplateForItemNames");
    let clone = jVarLocalTemplateForSubTable.content.cloneNode("true");

    const s = new XMLSerializer();
    const str = s.serializeToString(clone);

    let jVarLocalInsideTable = $detail.html(str).find('table');
    
    jVarLocalInsideTable.bootstrapTable({
        data: jVarLocalDataArray
    });
};

export { StartFunc };