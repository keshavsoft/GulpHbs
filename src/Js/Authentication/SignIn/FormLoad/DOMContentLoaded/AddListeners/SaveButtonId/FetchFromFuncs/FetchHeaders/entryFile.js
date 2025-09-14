import KeysJson from './keys.json' with { type: 'json' };

let StartFunc = () => {
    const jVarLocalBodyData = {};
    jVarLocalBodyData.UserName = jFLocalUserNameId();
    jVarLocalBodyData.Password = parseInt(jFLocalPasswordId());

    KeysJson.body = JSON.stringify(jVarLocalBodyData);

    return KeysJson;
};

let jFLocalUserNameId = () => {
    let jVarLocalUserNameId = 'UserNameId'
    let jVarLocalHtmlId = document.getElementById(jVarLocalUserNameId);

    if (jVarLocalHtmlId === null === false) {
        return jVarLocalHtmlId.value.trim();
    };
};

let jFLocalPasswordId = () => {
    let jVarLocalPasswordId = 'PasswordId'
    let jVarLocalHtmlId = document.getElementById(jVarLocalPasswordId);

    if (jVarLocalHtmlId === null === false) {
        return jVarLocalHtmlId.value.trim();
    };
};

function jFLocalSerializeFormData(form) {
    const formData = new FormData(form);
    const serializedData = {};

    for (const [name, value] of formData) {
        const trimmedValue = value.trim();

        if (serializedData[name]) {
            if (!Array.isArray(serializedData[name])) {
                serializedData[name] = [serializedData[name]];
            }
            serializedData[name].push(trimmedValue);
        } else {
            serializedData[name] = trimmedValue;
        }
    }

    return serializedData;
}

export { StartFunc };
