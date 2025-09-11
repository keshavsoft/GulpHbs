const StartFunc = async (row, $element, field) => {
    if (field === "KS-WhatsApp") {
        const jVarLocalCurrentTr = $element[0];

        const selectElement = jVarLocalCurrentTr.querySelector("td select");

        const selectedIndex = selectElement.selectedIndex;
        const selectedText = selectElement.options[selectedIndex].text;

        console.log("aaaaaaaaa : ", selectedText);

        const jVarLocalMobile = row.Mobile;
        const jVarLocalReplacePlus = jVarLocalMobile.replace("+", "");

        let jVarLocalToSendText = selectedText;

        if (selectedText === "Greeting.1") {
            jVarLocalToSendText = ["we are a startup based at Kakinada.",
                "We need to develop prototypes for few software ideas.",
                "We are inviting capable web full stack developers.",
                "Qualification : Passed Out/Final Year.",
                "CGPA: 8+",
                "Branch : CSE and its allied branches any.",
                "Bond : 1 year.",
                "Work From Home only.",
                "1 Developer needed.",
                "6 LPA.",
                "Tech stack : JAM Stack",
                "",
                "https://keshavsoft.com/Interns/selection.html",
                "",
                "if above not qualified ",
                "",
                "we are offering",
                "",
                "https://keshavsoft.com/Interns/KeshavSoft_Internship_Proposal.pdf",
                "",
                "",
                "Thank you;"];
        };

        if (selectedText === "Task1") {
            jVarLocalToSendText = `https://keshavsoft.com/Interns/task1.pdf`;
        };

        window.open(`https://api.whatsapp.com/send?phone=${jVarLocalMobile}&text=${jVarLocalToSendText}`, "");

        // https://api.whatsapp.com/send?phone=+918143779221&text=Hi%20I%27m%20interested%20for%20BTECH/Diploma/MCA/MBA/MTech%20Course%20@Gandhi%20Institute%20for%20Technology(GIFT).%20Send%20me%20Prospectus%20and%20Fee%20Structure.
    };
};

export { StartFunc };