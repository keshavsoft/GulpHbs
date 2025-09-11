const StartFunc = async (row, $element, field) => {
    if (field === "KS-WhatsApp") {
        const jVarLocalMobile = row.Mobile;
        const jVarLocalReplacePlus = jVarLocalMobile.replace("+", "");

        window.open(`https://api.whatsapp.com/send/?phone=${jVarLocalReplacePlus}&text&type=phone_number&app_absent=0`, "");
    };
};

export { StartFunc };
