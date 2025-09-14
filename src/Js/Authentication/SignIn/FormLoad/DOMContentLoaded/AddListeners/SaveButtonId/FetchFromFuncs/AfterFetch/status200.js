// import UrlJson from './url.json' with { type: 'json' };

const StartFunc = ({ inRowPk }) => {
    // console.log("-------inRowPk : ", inRowPk);
    jFLocalAddUrlParams();
};

// const LocalFuncForSingleTable = ({ inRowPk }) => {
//     if (window.location.pathname.endsWith(`/${UrlJson.PresentUrl}`)) {
//         window.location.href = `${UrlJson.RedirectToUrl}?inRowPk=${inRowPk}`;
//         return true;
//     }
//     return false;
// };

// const LocalFuncForAllTables = ({ inRowPk }) => {
//     //  window.location.href = `${UrlJson.RedirectToUrl}?inRowPk=${inRowPk}`;
//     window.location.href = `${UrlJson.RedirectToUrl}`;
// };

// export { StartFunc };


// import ConfigJson from "../../../../../../../../Config.json" with {type: 'json'};

// let StartFunc = ({ inResponse }) => {
//     // const jVarLocalRedirectUrl = ConfigJson.Protected.RedirectUrl;

//     // window.location.href = jVarLocalRedirectUrl;

//     jFLocalAddUrlParams({ inSuccessUrl: "../ShowAll/AsIs.html" });
//     // console.log("aaaaaaa : ", jVarLocalRedirectUrl);
//     // http://localhost:9113/V5/StudentNames/pages/ShowAll/AsIs.html#top

// };

const jFLocalAddUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const jVarLocalToUrl = params.get('SuccessUrl'); // Output: "Jane"
    console.log("aaaaaaaa : ", jVarLocalToUrl);

    // const jVarLocalRedirectUrl = ConfigJson.Protected.RedirectUrl;

    // const url = new URL(window.location.href);

    // let NewURl = new URL(jVarLocalRedirectUrl, url);

    // NewURl.searchParams.append('SuccessUrl', inSuccessUrl);
    window.location.href = jVarLocalToUrl;
};

export { StartFunc };