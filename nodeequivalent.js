const token = '625045601:AAF4Kr-a7yJRGVUU9ssi0MI79NZDeN-RUws';
const DORGE47 = 440753792;
const NATEDOGG1232 = 298857178;
const PBTESTINGGROUP = -1001276603177;
const PBTESTINGCHANNEL = -1001397346553;

// function sendRequest(func, data, callback) {
//     var request = require('request');
//     var options = {
//         uri: 'https://api.telegram.org/bot' + token + "/" + func,
//         method: 'POST',
//         json: data
//     };
//     request(options, function (error, response, body) {
//         console.log('error:', error); // Print the error if one occurred
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         callback(body);
//         console.log('body:', body);
//     });
//     request.end = callback;
// }

function sendRequest(func, data, callback) {
    var options = {
        hostname: 'api.telegram.org',
        path: '/bot' + token + '/' + func,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    var https = require('https');
    var req = https.request(options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => data += chunk);
        resp.on('end', () => {
            //Call the callback with the data
            callback(data);
        });
    }).on('error', (err) => {
        console.log("Error sending request: " + err.message);
    });
    req.write(JSON.stringify(data));
    req.end();
}

var neoIds = ['AgADAQADKqgxGz4T4ETyDgAB-HJkU7l7agwwAATTbIXD4B7LvYYWBAABAg', 'AgADAQADd6gxGyp2sETQL_-uRhn2aWsfFDAABMy1yM2uN5VjMnwBAAEC', 'AgADAQADeKgxGyp2sETR6bg3BDK6dU1lDDAABIg61WhN8AEvTRIEAAEC', 'AgADAQADeagxGyp2sERGZFFIqLEkbnJmDDAABByGO0cibrFlEhQEAAEC', 'AgADAQADeqgxGyp2sETcb1HUvhw3IdJlDDAABIcONL6QZLDHAgsEAAEC', 'AgADAQADDagxG_uvsESOCHu6WbJC_IYfFDAABP3S9NZVpb-eCHYBAAEC', 'AgADAQADd6gxGyp2sETQL_-uRhn2aWsfFDAABMy1yM2uN5VjMnwBAAEC', 'AgADAQADeKgxGyp2sETR6bg3BDK6dU1lDDAABIg61WhN8AEvTRIEAAEC', 'AgADAQADeagxGyp2sERGZFFIqLEkbnJmDDAABByGO0cibrFlEhQEAAEC', 'AgADAQADeqgxGyp2sETcb1HUvhw3IdJlDDAABIcONL6QZLDHAgsEAAEC', 'AgADAQADDagxG_uvsESOCHu6WbJC_IYfFDAABP3S9NZVpb-eCHYBAAEC', 'AgADAQADDqgxG_uvsETwpzTLZ1KK5MQCCzAABFyckX6nbuEmGAcDAAEC', 'AgADAQADe6gxGyp2sESWrCJYEq7G6T4DCzAABNZDI4LRz_gdHAoDAAEC', 'AgADAQADD6gxG_uvsESfjGnpY_wy3de7CjAABE1ZplDPi3wurnkDAAEC', 'AgADAQADfKgxGyp2sET7r8evcbA-stFxDDAABLQPiyf5LcRr5g4EAAEC', 'AgADAQADEKgxG_uvsESBcR_5DHxNmE0TFDAABB6c-chpZOYLE3kBAAEC', 'AgADAQADEagxG_uvsERO6bIP3uo2600cFDAABBMn9jsCC4we6HsBAAEC', 'AgADAQADfagxGyp2sERUEHNj59LK8tRxDDAABMu8Mlv8XbXZPREEAAEC', 'AgADAQADfqgxGyp2sESLhu7L3NCgkcsPFDAABJ0oINET7Mqg_n0BAAEC', 'AgADAQADf6gxGyp2sERG8arEmdt1K1A0FDAABGXEwIMAATTdvHRUAQABAg', 'AgADAQADgKgxGyp2sESEwr_gQtoTRwq1CjAABPpKCaWh25VSUlwDAAEC', 'AgADAQADgagxGyp2sESuFs1se0xvwfwRFDAABD-ZKTDgnHw7sHgBAAEC', 'AgADAQADgqgxGyp2sEQ-TgHXzJqdUXm7CjAABEfLJMhhpEmTWVoDAAEC', 'AgADAQADEqgxG_uvsESajg_OhNz0WlLqCjAABP5StTCktfnfnfYCAAEC', 'AgADAQADg6gxGyp2sEQlNhXH68l1KoQTFDAABGHiLoQeLSRM6HoBAAEC', 'AgADAQADF6gxGybMsERT8-AXj3SwyyYaFDAABNnKjd_uYq168nkBAAEC', 'AgADAQADxqgxG3z-qUTmefmCMDl7mZ55DDAABN1yTNrgEMEtSgUEAAEC', 'AgADAQADNagxG3OauEQ27QFsZgvxnU7_CjAABEpgSiz4tchLMQMDAAEC', 'AgADAQADK6gxG2dFuES-YLuDjPvloTIQFDAABOmTGum2dLXjoX4BAAEC', 'AgADAQADLKgxG2dFuETm2iKgZqdgvSI0FDAABGgdsIJTiVg52lQBAAEC', 'AgADAQADLagxG2dFuETTCPJUR9GU4jrpCjAABMR0ceJc6AWG3e4CAAEC', 'AgADAQADNqgxG3OauER8dnsvV7fXXD14DDAABEg0zezZI495vw4EAAEC', 'AgADAQADN6gxG3OauERKFOuFnG1ugW-9CjAABMxm3xIoDJEkEjwDAAEC', 'AgADAQADLqgxG2dFuERzVx2Wf72xyRS2CjAABBP9olCSV_ntVGgDAAEC', 'AgADAQADOKgxG3OauEQC9gVg4jWnFbC-CjAABJLbaeUL1taMHzkDAAEC', 'AgADAQADOagxG3OauETWKvNcA4avzxMaFDAABJEEkcsexotfonwBAAEC', 'AgADAQADL6gxG2dFuERxfn4pYkp_gZb_CjAABAgRiNL-VvRD5v8CAAEC', 'AgADAQADMKgxG2dFuEQM6f-45xbPsK0cFDAABCjDEu3vZtGevH4BAAEC', 'AgADAQADMagxG2dFuEQcJZOzR71kMPRmDDAABLuRT_taKJ_ShwwEAAEC', 'AgADAQADOqgxG3OauESVaFEzNgESm9VnDDAABD36t3ss9ChuhxMEAAEC', 'AgADAQADO6gxG3OauEQSyE0eSJKzTBgzFDAABPGJOK6h4yrno1cBAAEC', 'AgADAQADPKgxG3OauEQJBRK8bH3c-GMeFDAABG2z_NOOl4LXtnoBAAEC', 'AgADAQADPagxG3OauEQm-lFOLlg-YMYFCzAABA98VnCkIZI8wQgDAAEC', 'AgADAQADPqgxG3OauEQLfeirPL9CVhNnDDAABDMsmxneNw6m3RIEAAEC', 'AgADAQADMqgxG2dFuERIX1h5P2WfOeAPFDAABLKAdt6_6fNPrHoBAAEC', 'AgADAQADP6gxG3OauESIa44xw0L2Ems1FDAABHi9ycFwKsvMQlMBAAEC', 'AgADAQADM6gxG2dFuESl8rTiYcIEHy8VFDAABJIaW2eRsh6Qc38BAAEC', 'AgADAQADQKgxG3OauEQZxBn-aagvSawBCzAABNu1cqrfwYwR0AkDAAEC', 'AgADAQADQagxG3OauESgI4lFo2dC3D0ECzAABLkOyVqcjN6sQgQDAAEC', 'AgADAQADNKgxG2dFuEScHXYSfxKf5E4ZFDAABLvCyCPbxCDv1HwBAAEC', 'AgADAQADQqgxG3OauESRsxiA2xMua7x0DDAABBgC8_3o67FK7hAEAAEC', 'AgADAQADQ6gxG3OauESYRuc6Qcmz-B8iFDAABNMHOEPd14voIn4BAAEC', 'AgADAQADRKgxG3OauESyyEuNymGqCxxsDDAABOqAQ3ckLxSwDA4EAAEC', 'AgADAQADRagxG3OauEQ_hMIsfXsAAQrtZAwwAARqTuVm1_BQLcsVBAABAg', 'AgADAQADRqgxG3OauESRavBmQ2qEUoRjDDAABAu9yHfOXPpbQBUEAAEC', 'AgADAQADNagxG2dFuERzZ0w4urFn5pO7CjAABAgWmsUDX5Vx72IDAAEC', 'AgADAQADR6gxG3OauESaUueB43wGVlATFDAABKHR4XYZRIHKfH4BAAEC', 'AgADAQADNqgxG2dFuESYhKVyYMmHwba4CjAABAfq4blykyBTklsDAAEC', 'AgADAQADN6gxG2dFuEQSFwF5pF-2-_UTFDAABJZzSCCE1AaHbXwBAAEC', 'AgADAQADSKgxG3OauETAL5nyYggXt2FvDDAABKv9pbd554SH7QwEAAEC', 'AgADAQADOKgxG2dFuETp8SJH8uU4htAhFDAABE9BYTyon53ZrHsBAAEC', 'AgADAQADSagxG3OauETe2LXVfpu7n4V0DDAABGjvnKqRUxaArQoEAAEC', 'AgADAQADOagxG2dFuETkNl6eqBghBLtzDDAABOl8Qv6C6BAuygcEAAEC', 'AgADAQADSqgxG3OauET2y7f8OqymCaK9CjAABNW-tHZ8kyTHlToDAAEC', 'AgADAQADS6gxG3OauER4YLWr1AoR5O5tDDAABN3PkvwXytgiGA4EAAEC', 'AgADAQADTKgxG3OauESYrfTUgF5HNcZlDDAABJOhFoMTmme6dQ8EAAEC', 'AgADAQADTagxG3OauERbj0eXUY-3kMR4DDAABGcDQQ2VEA7W-BMEAAEC', 'AgADAQADTqgxG3OauEQXVPZ_ObYV4ZYQFDAABGYp2JHxbgVEGn4BAAEC', 'AgADAQADKKgxGybMuERoZoI-3C55r8JiDDAABCaBa0V1RsQAAVQRBAABAg', 'AgADAQADT6gxG3OauERrDEG_YBzyuyBkDDAABHq2TWgiJudn6BgEAAEC', 'AgADAQADUKgxG3OauERxQJcTgctZaaY1FDAABFDyxUGEFJB3vVgBAAEC', 'AgADAQADUagxG3OauES9c-XFpibb6RC2CjAABLVcEh3JrFzj4WMDAAEC', 'AgADAQADOqgxG2dFuETRV_333bPacqLtCjAABHU6l6VmbygLyu0CAAEC', 'AgADAQADUqgxG3OauER2khMfZGB2T2u2CjAABDEWC6jN12dKOVUDAAEC', 'AgADAQADU6gxG3OauET2-uwtAc641x0iFDAABCHRDgABy4aoCU9-AQABAg', 'AgADAQADVKgxG3OauERjsiaPIXw4H-YWFDAABMEH6O23If5NJnwBAAEC', 'AgADAQADVagxG3OauESnqjZMZiJF-FDoCjAABHlQUPlAPMXg8OwCAAEC', 'AgADAQADO6gxG2dFuETg44RzjKsFuNEYFDAABOikf9gbUNP9vH8BAAEC', 'AgADAQADVqgxG3OauER34JnBnhVDmxAeFDAABN8a3M59fC6W6HkBAAEC', 'AgADAQADPKgxG2dFuEQtknmHqsU5k8s0FDAABOdnUtiQ7yz14VEBAAEC', 'AgADAQADPagxG2dFuESHSVMLHpgjK7m2CjAABPVUeovdv5GNknADAAEC', 'AgADAQADPqgxG2dFuESAjH9u83VanoIfFDAABO5dUmYagkUYonsBAAEC', 'AgADAQADV6gxG3OauETmyoYMggPAHkoGCzAABBCkxj8U0zXSOwIDAAEC', 'AgADAQADWKgxG3OauETFlmW_w1KuNL9uDDAABAoXI4wRkT5WshEEAAEC', 'AgADAQADWagxG3OauERPc4s9EFtFiQABawwwAAQzIomNHenOuhgPBAABAg', 'AgADAQADWqgxG3OauEQFFhrG6Sf6kmdkDDAABNIE99-hfrA7TQsEAAEC', 'AgADAQADQKgxG2dFuER2T5WDYqkaKAoWFDAABHE-tUfbnjt9uHwBAAEC', 'AgADAQADQagxG2dFuET4TNHs6PxkbFV2DDAABHC4MxkTEN0-rREEAAEC', 'AgADAQADQqgxG2dFuEQUw97Yqi-G8Oi7CjAABFKJxYHNdnt8d2QDAAEC', 'AgADAQADW6gxG3OauESsgNNlhScVwTx5DDAABCUoCz84yUvM-xAEAAEC', 'AgADAQADXKgxG3OauEQySRwakswSShIcFDAABHVfKteUTw2FsXoBAAEC', 'AgADAQADXagxG3OauERNRgq_eKELR0lmDDAABKkk-__rlmKMhREEAAEC', 'AgADAQADXqgxG3OauERwjxrN3B4odmBsDDAABA0BecR2qgNvERAEAAEC', 'AgADAQADX6gxG3OauEQqDm6ZszGaynZnDDAABKFOZsGAtVTdSQ8EAAEC', 'AgADAQADYKgxG3OauES9tWP4ZHHm8iDqCjAABO89AAEGkIfwGTDuAgABAg', 'AgADAQADQ6gxG2dFuESy6GpVH3izFct1DDAABHRswFI5UKf33BQEAAEC', 'AgADAQADYagxG3OauES2Xuokr8ytBpIAAQswAASV5JBCx3k1gHQFAwABAg', 'AgADAQADRKgxG2dFuETY6aTu63tdvsZvDDAABER1_6KbmB_KPA4EAAEC', 'AgADAQADYqgxG3OauEQqiFEgWgdbEyfACjAABEhRDzEwcgABQbM7AwABAg', 'AgADAQADY6gxG3OauERiciWH8FgJhG0zFDAABLq57wplx9RD_lIBAAEC', 'AgADAQADRagxG2dFuET7UCPogx36z-t3DDAABBn9fvPpLk8x5w4EAAEC', 'AgADAQADZKgxG3OauETG9NSa9UFxb91xDDAABI-2IkKG4TgvSQ8EAAEC', 'AgADAQADRqgxG2dFuESXXrvQVlSh0lPvCjAABMTeCi5Zg3u0B-4CAAEC', 'AgADAQADZagxG3OauEQN7aT1T6gN1fpoDDAABFk-5xgC8QjFcA8EAAEC', 'AgADAQADR6gxG2dFuES_jncaztAbBNRzDDAABI0ulI02gI0UPgkEAAEC', 'AgADAQADSKgxG2dFuERVR80P1HoqYx7_CjAABOfiLljgXWkSRAYDAAEC', 'AgADAQADSagxG2dFuETky6jhlUia8QM1FDAABAptGeEUUDe0JFUBAAEC', 'AgADAQADSqgxG2dFuERE2fm9hhoW310XFDAABKPgKNL1EmM4wHwBAAEC', 'AgADAQADZqgxG3OauEQS_2-qa3jJbYtmDDAABCSRGyyVlAb2Wg0EAAEC', 'AgADAQADZ6gxG3OauETbU4ByH__JV0IFCzAABGzuiGYrcLT1VgcDAAEC', 'AgADAQADS6gxG2dFuERF9RzBdpkue2ARFDAABO2Jra5FolWjfXgBAAEC', 'AgADAQADaKgxG3OauET3u9qPQ0E2YOfpCjAABE2LrHcbkHT_tvECAAEC', 'AgADAQADTKgxG2dFuESNVM_uy88e8X3tCjAABKSvPrhmt656GfICAAEC', 'AgADAQADTagxG2dFuESzvoDMSVZtuIS7CjAABK3rZCsZp0g9BmUDAAEC', 'AgADAQADaagxG3OauEQrmyWimXp5YENkDDAABPBq83E16lBesAcEAAEC', 'AgADAQADaqgxG3OauERQ_YD7x8GEhtppDDAABLf33SjptWDrqBMEAAEC', 'AgADAQADTqgxG2dFuETzHgta-tTDkGwZFDAABI3uYJmxAmR5o34BAAEC', 'AgADAQADT6gxG2dFuEQtQwsK4tPEV8i6CjAABAFVQpHjpW2OnWkDAAEC', 'AgADAQADa6gxG3OauETJmpZpeKX4C8e_CjAABBunEEp8oy3ZXTgDAAEC', 'AgADAQADbKgxG3OauEQLlvOzRIGsGlARFDAABNYhNpnNWmoZpnsBAAEC', 'AgADAQADbagxG3OauETuE5E7yWTVHMQXFDAABM-89t33xhVVe3wBAAEC', 'AgADAQADUagxG2dFuESRJdMRb_p3Y_8ZFDAABLGsyux4UKn3iXwBAAEC', 'AgADAQADbqgxG3OauEQi_ZzXryQsXoa2CjAABKoj_RpIDNPpk2oDAAEC', 'AgADAQADb6gxG3OauESfRquGKJksQR82FDAABH5sp42KJfhH5lUBAAEC', 'AgADAQADcKgxG3OauEQeDAbP_wbXDGBzDDAABFgN53p68aauww0EAAEC']
var emeraldIds = ['AgADAQADE6gxGwuVqUR_nOGMgODyS2psDDAABCBJj5xc_4YT4AoEAAEC', 'AgADAQADFKgxGwuVqURg1yBx7kBEIgsYFDAABN2AN9sd27x8CXcBAAEC', 'AgADAQAD7acxGzxMqEQXH9VKRF9n6U0WFDAABNZwWGiI3GYF3HkBAAEC', 'AgADAQAD7qcxGzxMqEROtpdupVvIiLwPFDAABHhBVHpVrTz1HXYBAAEC', 'AgADAQADFagxGwuVqUSFGw0I-SB3d9EgFDAABBJN2jBd7AL_5XQBAAEC', 'AgADAQAD76cxGzxMqESW4mkNOO9gWXu4CjAABOp7yP5yK7oeQmADAAEC', 'AgADAQADFqgxGwuVqUSZu1MGaOsYmYs0FDAABGTTSUZP00KueU4BAAEC', 'AgADAQADBqgxG9-wwUQ7s962Uf8_LV8WFDAABEEXatb_XKZiS4ABAAEC', 'AgADAQAD8KcxGyp2wER7-XKMx6Lnw6ztCjAABOKPdNzfbNhi__ACAAEC', 'AgADAQADB6gxG9-wwUStQIZQeRLbcs0iFDAABFDO6a3PzlvRf3sBAAEC', 'AgADAQADCKgxG9-wwUTSo7-M59jTCIhzDDAABPe42h56Aa4wCA8EAAEC', 'AgADAQAD8acxGyp2wETzbBfKgEF70jsAAQswAAQY4_V51zx3jZgEAwABAg', 'AgADAQADCagxG9-wwUQYFtuaCNTnMSW-CjAABCv54JKeC0m2Hz0DAAEC', 'AgADAQAD8qcxGyp2wESDBpfPKceWOwJnDDAABPb9ZjBx2vAeixAEAAEC', 'AgADAQAD86cxGyp2wERpGzYaIzhilc4ECzAABDpv2NB6TzdNvgcDAAEC', 'AgADAQADCqgxG9-wwURSobhlcRRngu67CjAABAOTbtX97kivNmUDAAEC', 'AgADAQAD9KcxGyp2wETAAtEoMuxqqRF1DDAABKESTrjASGfYthUEAAEC', 'AgADAQAD9acxGyp2wEStDQZPfThoyAT_CjAABL3xNqfOmal_YgQDAAEC', 'AgADAQAD9qcxGyp2wER0oUKPTIpStVC-CjAABPceVWnttowCxkEDAAEC', 'AgADAQADC6gxG9-wwUQG3ch_DWQjwZ4SFDAABMKy9gHLrQIy83sBAAEC', 'AgADAQADDKgxG9-wwUSCx9k40uSnsos0FDAABFclMT5DzJ_otlQBAAEC', 'AgADAQADDagxG9-wwURAhGkQQ9E9fvwSFDAABKnr2ltHttIzL4ABAAEC', 'AgADAQAD96cxGyp2wESRca3wiGlnMPwcFDAABPeYCSSMgSX32nkBAAEC', 'AgADAQADDqgxG9-wwURIE_nn3WL6IKx5DDAABBnKExOXBJN9XQ4EAAEC', 'AgADAQADD6gxG9-wwUTTPd7OZZzaARE1FDAABNtluNEqQqGlJ1YBAAEC', 'AgADAQADEKgxG9-wwUSJKxm0DXg1kFkUFDAABDxOeGhEJYMlEX4BAAEC', 'AgADAQADEagxG9-wwUQevL6Cnqm6tAwbFDAABGuG6rhrdk7SgXsBAAEC', 'AgADAQADEqgxG9-wwUS9K-Am5Aq23PJxDDAABB7ccYA_kX_LhBMEAAEC', 'AgADAQAD-KcxGyp2wEQOiX7Nr6sjmqdsDDAABCifETb1Q9xqdwsEAAEC', 'AgADAQADE6gxG9-wwUQGZrU80dCCg4RiDDAABGEc6gv3mBZWWA0EAAEC', 'AgADAQADFKgxG9-wwUS9CVIUDYhI1_sECzAABDkIDtywdEIFgwcDAAEC', 'AgADAQADFagxG9-wwURfEkNpbLx2rDO3CjAABJXBTv3yeQoykGUDAAEC', 'AgADAQAD-acxGyp2wEQ1S1UnlczHLL-4CjAABabUfX25xg-xVgMAAQI', 'AgADAQADFqgxG9-wwUTpfCXAA1HjKXAiFDAABMYoHFwCx-2J6IABAAEC', 'AgADAQAD-qcxGyp2wETITym5BQyjDGUhFDAABICDFm3fse7aOX4BAAEC', 'AgADAQADF6gxG9-wwUSmLWbONbSGBJIeFDAABC_Il-StuM-CE4ABAAEC', 'AgADAQADGKgxG9-wwUSe-f88y--XdXf_CjAABBij4rYfUXrrDwoDAAEC', 'AgADAQAD_qcxGyp2wERFB-u3Mq6eFMV2DDAABILU3tWNAAGiGwUYBAABAg', 'AgADAQADHqgxG9-wwUS4YvZmQ3C_AvhnDDAABNPocfjCVNKBZBIEAAEC', 'AgADAQADGagxG9-wwUQzx1WFAW9DWugRFDAABC0STNPRFW1C4XoBAAEC', 'AgADAQAD-6cxGyp2wERGeUu4LeyeEOgPFDAABLsDSSLMONrip38BAAEC', 'AgADAQAD_KcxGyp2wETFn6fSX-kIHTzsCjAABK6YDVOTWXAye_ICAAEC', 'AgADAQADHagxG9-wwURaH19EFBRnkadrDDAABJsVPJ216TKXqxAEAAEC', 'AgADAQADGqgxG9-wwUS18hJuW6mhmaRvDDAABMEFO7LotZRsrg8EAAEC', 'AgADAQADG6gxG9-wwUTylMW-7KcgcFlnDDAABJGocY-O1zi8nA8EAAEC', 'AgADAQAD_acxGyp2wEQS2QO86b7j0XFkDDAABDdR_XTxX3mlWBMEAAEC', 'AgADAQADHKgxG9-wwUQWR_3NUl49WpAdFDAABFT-Vg69N74OEnwBAAEC', 'AgADAQADH6gxG9-wwUQngbB6U1RbVWa2CjAABD_Kp8XQ3TvZE2sDAAEC', 'AgADAQAD_6cxGyp2wERjTVuiAAF9yvAjwAowAARQjoLjgr_0H3A8AwABAg', 'AgADAQADJagxG9-wwURP5aEHIpFb0LUyFDAABDjHswzIQyORylEBAAEC', 'AgADAQADBKgxGyp2wETi6XLoQqqruYkFCzAABELvbPm7w7DudQsDAAEC', 'AgADAQADJqgxG9-wwURWXLgU8rxevcU1FDAABOVsTS1G9wMTdFUBAAEC', 'AgADAQADBagxGyp2wETK5PYq2eeEfQ-9CjAABDWAGTerUNpOl0EDAAEC', 'AgADAQADXqgxG5luwEQU-GqqKhJ-cd11DDAABGYWH6aB5MyAvQgEAAEC', 'AgADAQADX6gxG5luwEQq1_sFv2NQauZxDDAABJRRk-Nu-Qc1hxIEAAEC', 'AgADAQADYKgxG5luwERECoHHXzVoWmhyDDAABDMCXC63GSQPTxEEAAEC', 'AgADAQADYagxG5luwETioZTLauTPdmq7CjAABHry4OIBAAEFlOxfAwABAg', 'AgADAQADYqgxG5luwESZk_JMYxqI1dUWFDAABAi6whnFfccQr4EBAAEC', 'AgADAQADY6gxG5luwERZ5SmAFyIrwb7_CjAABJLvCfvTt643ngoDAAEC', 'AgADAQADZKgxG5luwES9BRz959XDkeNyDDAABEKlfqdvT2-PBAwEAAEC', 'AgADAQADZagxG5luwESP-GTxCVciDkFvDDAABF9Y7GUHUow5zBQEAAEC', 'AgADAQADZqgxG5luwEQQ84z1vI-g5pu4CjAABLlhsYEQ-y-uw20DAAEC', 'AgADAQADZ6gxG5luwEQyBMYOcUZLqw63CjAABOyM746zZnOIXGUDAAEC', 'AgADAQADaKgxG5luwETzKODHjEK_9LpvDDAABKzJD2FIpQXjzBMEAAEC', 'AgADAQADaagxG5luwER5q_rkt-C7MxhxDDAABDkhqd0XTnvPJBAEAAEC', 'AgADAQADaqgxG5luwETdpCMw0D3hZgZ3DDAABBtF9R4yrMbOEw4EAAEC', 'AgADAQADa6gxG5luwET6jVK3YB8kKEJmDDAABE_twKAZrCS4iA0EAAEC', 'AgADAQADbKgxG5luwEQM_CkxScUNOCJ4DDAABOcPkI00jqNLORAEAAEC', 'AgADAQADbagxG5luwEQwlpyHlLRs8y3rCjAABMjGxI_IPYpch_MCAAEC', 'AgADAQADbqgxG5luwESBCqYKZiEcPKEyFDAABJC5rNWXoZOw8FUBAAEC', 'AgADAQADb6gxG5luwETbOSJiE9tznX0WFDAABIGBb9XBojmd_YEBAAEC', 'AgADAQADcKgxG5luwETkLXJ0AcFYU5EQFDAABKibwvbM-cGIQX4BAAEC', 'AgADAQADK6gxGz4T4ESHDVwldhsOwWV1DDAABGEg0n6jpt5ZAhEEAAEC']
var dishwasherIds = ['AgADAQADE6gxG_uvsEQBlg-KKrcAAQfdtwowAAQ5xCV7ScpFQgFkAwABAg', 'AgADAQADhagxGyp2sEQVKqfVGEiSixsXFDAABBr8p3g0xBS413oBAAEC', 'AgADAQADFKgxG_uvsESW51ttLo3dLWm3CjAABIYcpwQ9tx8n_lgDAAEC', 'AgADAQADFagxG_uvsESURTRi6MhjjnQUFDAABAScwkt3q3QTx3sBAAEC', 'AgADAQADhqgxGyp2sEQeKJo1-f2LC1wbFDAABL_kww4nvrz203oBAAEC', 'AgADAQADFqgxG_uvsERKc6Qa8d4C448aFDAABJkQKYg35dgq_XoBAAEC', 'AgADAQADF6gxG_uvsETd8T0aUVU1oDJnDDAABDICwGUdS0TXwxEEAAEC', 'AgADAQADGKgxG_uvsETsLz38D3KW7K4gFDAABILfgkcV5G3uyncBAAEC', 'AgADAQADGagxG_uvsEQD23iazCpvRkfsCjAABKw3f6hJ1rUygOYCAAEC', 'AgADAQADGqgxG_uvsEQQbcyMa0OIvC8bFDAABPDilQFislqvKXkBAAEC', 'AgADAQADG6gxG_uvsER2O30JLhNYvldxDDAABO4X0XnbyQAB_7oTBAABAg', 'AgADAQADHKgxG_uvsEQjEHFjzpJ5X8AAAQswAARM4163LurQ4IABAwABAg', 'AgADAQADh6gxGyp2sESLJCJSFOO_XakFCzAABMBtxZu6wXfHq_0CAAEC', 'AgADAQADiKgxGyp2sESoKx0eIw4QHnxjDDAABE4iS_-T-bJi9AUEAAEC', 'AgADAQADHagxG_uvsER4wAgsOrXP4NpuDDAABGWSTf5b4mfjygoEAAEC', 'AgADAQADiagxGyp2sETRF43csWeBDoYDCzAABFnzMwyavmYmaQQDAAEC', 'AgADAQADHqgxG_uvsERPi_1NuV4TnfAfFDAABBbgRGcZqsfKsncBAAEC', 'AgADAQADH6gxG_uvsES_61l0Es2MYMnrCjAABPzbjNd8Xdu8AvICAAEC', 'AgADAQADIKgxG_uvsETYowzcm3q_A4dwDDAABPvwcZGEmy0fygoEAAEC', 'AgADAQADIagxG_uvsET4CVoYJDL7Y0A1FDAABAfcSU7WE1y0rlMBAAEC', 'AgADAQADKagxG_uvsERErAABERtochsSbAwwAATOwwYdLAPTEu4JBAABAg', 'AgADAQADKqgxG_uvsESWudXMZzFQ_Q8dFDAABHGMqPffKrSQ13kBAAEC', 'AgADAQADK6gxG_uvsETUekA0SV8X4KpjDDAABAjmcRNvtbo4BgUEAAEC', 'AgADAQADLKgxG_uvsERFdRyN4c-VYKkcFDAABN_mpybkCtL8q3oBAAEC', 'AgADAQADLagxG_uvsEQ4cOOxD2lHwMp3DDAABLDe9DfqAxCvThAEAAEC', 'AgADAQADj6gxGyp2sERLmnUAATa05itYBQswAAQiNErkOIpuwEsCAwABAg', 'AgADAQADkKgxGyp2sESji2pXF9Vorm90DDAABARWwmDS_iAFPQoEAAEC', 'AgADAQADM6gxG_uvsERrUB-od6JJgBdkDDAABNRxwYenopAuuRAEAAEC', 'AgADAQADkagxGyp2sET4GZnTM65QB2S6CjAABGB5Dri0mrjdgWQDAAEC', 'AgADAQADkqgxGyp2sESYAAG7nYtTos-3cQwwAASMzoRyyRm4IogKBAABAg', 'AgADAQADOqgxG_uvsERBWSeWOjCgS623CjAABMflEOb4DR1jgV8DAAEC', 'AgADAQADO6gxG_uvsEQ1Gp5-urfN7MIYFDAABF4-ckHaI4xE0HgBAAEC', 'AgADAQADPKgxG_uvsESkqf5QYRVa00xxDDAABBdK-9arF29L9gwEAAEC', 'AgADAQADlKgxGyp2sERj3ivjhM09X067CjAABDMWJeqSut6IRlgDAAEC', 'AgADAQADE6gxG_uvsEQBlg-KKrcAAQfdtwowAAQ5xCV7ScpFQgFkAwABAg', 'AgADAQADhagxGyp2sEQVKqfVGEiSixsXFDAABBr8p3g0xBS413oBAAEC', 'AgADAQADFKgxG_uvsESW51ttLo3dLWm3CjAABIYcpwQ9tx8n_lgDAAEC', 'AgADAQADFagxG_uvsESURTRi6MhjjnQUFDAABAScwkt3q3QTx3sBAAEC', 'AgADAQADhqgxGyp2sEQeKJo1-f2LC1wbFDAABL_kww4nvrz203oBAAEC', 'AgADAQADFqgxG_uvsERKc6Qa8d4C448aFDAABJkQKYg35dgq_XoBAAEC', 'AgADAQADF6gxG_uvsETd8T0aUVU1oDJnDDAABDICwGUdS0TXwxEEAAEC', 'AgADAQADGKgxG_uvsETsLz38D3KW7K4gFDAABILfgkcV5G3uyncBAAEC', 'AgADAQADGagxG_uvsEQD23iazCpvRkfsCjAABKw3f6hJ1rUygOYCAAEC', 'AgADAQADGqgxG_uvsEQQbcyMa0OIvC8bFDAABPDilQFislqvKXkBAAEC', 'AgADAQADG6gxG_uvsER2O30JLhNYvldxDDAABO4X0XnbyQAB_7oTBAABAg', 'AgADAQADHKgxG_uvsEQjEHFjzpJ5X8AAAQswAARM4163LurQ4IABAwABAg', 'AgADAQADh6gxGyp2sESLJCJSFOO_XakFCzAABMBtxZu6wXfHq_0CAAEC', 'AgADAQADiKgxGyp2sESoKx0eIw4QHnxjDDAABE4iS_-T-bJi9AUEAAEC', 'AgADAQADHagxG_uvsER4wAgsOrXP4NpuDDAABGWSTf5b4mfjygoEAAEC', 'AgADAQADiagxGyp2sETRF43csWeBDoYDCzAABFnzMwyavmYmaQQDAAEC', 'AgADAQADHqgxG_uvsERPi_1NuV4TnfAfFDAABBbgRGcZqsfKsncBAAEC', 'AgADAQADH6gxG_uvsES_61l0Es2MYMnrCjAABPzbjNd8Xdu8AvICAAEC', 'AgADAQADIKgxG_uvsETYowzcm3q_A4dwDDAABPvwcZGEmy0fygoEAAEC', 'AgADAQADIagxG_uvsET4CVoYJDL7Y0A1FDAABAfcSU7WE1y0rlMBAAEC', 'AgADAQADKagxG_uvsERErAABERtochsSbAwwAATOwwYdLAPTEu4JBAABAg', 'AgADAQADKqgxG_uvsESWudXMZzFQ_Q8dFDAABHGMqPffKrSQ13kBAAEC', 'AgADAQADK6gxG_uvsETUekA0SV8X4KpjDDAABAjmcRNvtbo4BgUEAAEC', 'AgADAQADLKgxG_uvsERFdRyN4c-VYKkcFDAABN_mpybkCtL8q3oBAAEC', 'AgADAQADLagxG_uvsEQ4cOOxD2lHwMp3DDAABLDe9DfqAxCvThAEAAEC', 'AgADAQADj6gxGyp2sERLmnUAATa05itYBQswAAQiNErkOIpuwEsCAwABAg', 'AgADAQADkKgxGyp2sESji2pXF9Vorm90DDAABARWwmDS_iAFPQoEAAEC', 'AgADAQADM6gxG_uvsERrUB-od6JJgBdkDDAABNRxwYenopAuuRAEAAEC', 'AgADAQADkagxGyp2sET4GZnTM65QB2S6CjAABGB5Dri0mrjdgWQDAAEC', 'AgADAQADkqgxGyp2sESYAAG7nYtTos-3cQwwAASMzoRyyRm4IogKBAABAg', 'AgADAQADOqgxG_uvsERBWSeWOjCgS623CjAABMflEOb4DR1jgV8DAAEC', 'AgADAQADO6gxG_uvsEQ1Gp5-urfN7MIYFDAABF4-ckHaI4xE0HgBAAEC', 'AgADAQADPKgxG_uvsESkqf5QYRVa00xxDDAABBdK-9arF29L9gwEAAEC', 'AgADAQADlKgxGyp2sERj3ivjhM09X067CjAABDMWJeqSut6IRlgDAAEC', 'AgADAQADiqgxGyp2sERtPR52MoSxDBIgFDAABNfoGMDanhcowHwBAAEC', 'AgADAQADIqgxG_uvsETdFyOYoTzouWwzFDAABDqhIzfWcSUCmVIBAAEC', 'AgADAQADi6gxGyp2sEQBv2HF0jICld54DDAABKREoY_0q9s3fxEEAAEC', 'AgADAQADI6gxG_uvsEQ2xAGnMeCXw9MfFDAABAV9b2ufChXfkX4BAAEC', 'AgADAQADJKgxG_uvsEScq7LwptkqkwroCjAABAhxHjbV-DLej-0CAAEC', 'AgADAQADjKgxGyp2sETFhG7IfUFwmSQYFDAABIH2oXqsVA_QRHsBAAEC', 'AgADAQADJagxG_uvsERSNXAbTBv6-lcaFDAABPdJ5lGboKwFb3gBAAEC', 'AgADAQADJqgxG_uvsETM_HRlvJhl1Y9rDDAABKOVqrP6Od5sJwkEAAEC', 'AgADAQADJ6gxG_uvsETpOSHffvT-lNO3CjAABIWSph_FBOd0BF8DAAEC', 'AgADAQADKKgxG_uvsETOKaEnO-8KVlZoDDAABHqT86NZs-gs2xYEAAEC', 'AgADAQADNqgxG_uvsERoGT30feZs_moAAQswAARKDvEMQStqLS8CAwABAg', 'AgADAQADNagxG_uvsEQvRXnLeOZnJ-14DDAABZatQX8nATjjBwQAAQI', 'AgADAQADN6gxG_uvsES75OvqHKiFKx1qDDAABAbAD3uO8YIOqQ8EAAEC', 'AgADAQADOKgxG_uvsERuDVVbashoGPnpCjAABO157eyhzF7pke0CAAEC', 'AgADAQADk6gxGyp2sERLtiZ8dCTp6QtpDDAABPUqsDntgefGSxAEAAEC', 'AgADAQADNKgxG_uvsERCOOQrFoTkHF5uDDAABD28QURKZK7klgsEAAEC', 'AgADAQADOagxG_uvsERYSskTgT05QGAgFDAABCMUjkCUB_1p9XoBAAEC', 'AgADAQADP6gxG_uvsEToPrlF-NPoZn-4CjAABMQ0Ovz7CfSFkmADAAEC', 'AgADAQADlagxGyp2sEQJtwS57MCxBNhpDDAABG3IK0CUX0NSAAERBAABAg', 'AgADAQADPagxG_uvsEQR2HVMzeBbS_FxDDAABI_xUodcFeVX_QoEAAEC', 'AgADAQADPqgxG_uvsET9KBAD_9fdRxi6CjAABKdPTP5RpkTFll0DAAEC', 'AgADAQADQagxG_uvsERRblYDscwDsv7qCjAABAygwi8zdd_ONu0CAAEC', 'AgADAQADQKgxG_uvsERtQo2-B1-uHRF0DDAABPL6uDEIdBDiGAsEAAEC', 'AgADAQADMagxG_uvsEQtVh1NQNb_uwS3CjAABFOgymrqh5OD4WYDAAEC', 'AgADAQADMKgxG_uvsESA14hs0_up2R0zFDAABARu3VT4w49mVE4BAAEC', 'AgADAQADjqgxGyp2sESyJxbhMJk6A0toDDAABAbuwG2culkDXg4EAAEC', 'AgADAQADjagxGyp2sEQtpXG2DzxllZ8cFDAABMlP5_UddvK4f3wBAAEC', 'AgADAQADLqgxG_uvsES_v65PkG8eW_YZFDAABPxD2yxWvOwfKHoBAAEC', 'AgADAQADL6gxG_uvsETjVxDLJCK2PMhrDDAABCjqycdnCFRHfQcEAAEC', 'AgADAQADMqgxG_uvsETT_b5jbRxAJinrCjAABLsftzdutqnl6-0CAAEC']

var lewdIds = [
    {
        id: 'AgADAQAD6qcxG7pfmUT1L7gYQEBX4uwXFDAABBWvuReLVBCXWXQBAAEC',
        caption: "Stop. That is lewd!"
    },
    {
        id: 'AgADAQAD7acxG7pfmURxYJ_HSvj7xYj_CjAABLwoemCQirdos_oCAAEC',
        caption: "Stop it, that's LEWD!"
    },
    {
        id: 'AgADAQADQ6gxG0kMmURBN3l1LKxDGWfrCjAABEU7tKFDcn8TCuoCAAEC',
        caption: "This! Is! Filth!"
    },
    {
        id: 'AgADAQADDqgxGzxMmERMf9RiM1Mx9lEXFDAABBpmsfkv_-zpJHABAAEC',
        caption: "Biip! Buup!"
    }
]
// The various strings pennybot can respond to.
var identifiers = [
    "penny",
    "pb",
    "pennybot",
    "penny bot",
    "@P3nny_v2_bot"
];

var messages = [];

// Populates the messages array with any new messages. Does not clear them.
function getMessages() {
    sendRequest("getUpdates", null, function(text) {
        messages = JSON.parse(text);
        ///FOR TESTING TAKE THIS OUT
        console.log(messages);
    });
}

// Clears messages from the updateId passed back
function clearMessage(updateId) {
    var message = {
        offset: updateId + 1,
    };
    sendRequest("getUpdates", message, function(text) {
         console.log(text);
    });
}

//Sends a message to the given chat id.
function sendMessage(id, msg) {
    var message = {
        chat_id: id,
        text: msg,
    };
    sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

//Sends a reply to the message of replyId in the chat given by id
function sendReply(id, msg, replyId) {
    var message = {
        chat_id: id,
        text: msg,
        reply_to_message_id: replyId,
    };
    sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

//Forwards a message (msgId) from a chat (fromId) to a different chat (id)
function forwardMessage(id, fromId, msgId) {
    var message = {
        chat_id: id,
        from_chat_id: fromId,
        message_id: msgId,
    };
    var request = sendRequest("forwardMessage", message, function(text) {
        console.log(text);
    });
}

//Sends a photo with id (fileId) to (id) as a reply to (replyId)
function sendPhoto(id, fileId, replyId) {
    var message = {
        chat_id: id,
        photo: fileId,
        reply_to_message_id: replyId,
    };
    var request = sendRequest("sendPhoto", message, function(text) {
        console.log(text);
    });
}

//Sends a photo with id (fileId) to (id) as a reply to (replyId) with caption (captionText)
function sendCaptionedPhoto(id, fileId, replyId, captionText) {
    var message = {
        chat_id: id,
        photo: fileId,
        reply_to_message_id: replyId,
        caption: captionText,
    };
    var request = sendRequest("sendPhoto", message, function(text) {
        console.log(text);
    });
}

//Sends (text) linked to (link) to (id) as a reply to (replyId) with previews shown or disabled according to (disableShowPreview)
function sendLink(id, text, link, replyId, disableShowPreview) {
    var message = {
        chat_id: id,
        text: `[${text}](${link})`,
        parse_mode: "Markdown",
        disable_web_page_preview: disableShowPreview,
        reply_to_message_id: replyId,
    };
    var request = sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

//Sends animation with id (fileId) to (id) as a reply to (replyId) with caption (captionText)
function sendAnimation(id, fileId, replyId, captionText) {
    var message = {
        chat_id: id,
        animation: fileId,
        reply_to_message_id: replyId,
        caption: captionText,
    };
    var request = sendRequest("sendAnimation", message, function(text) {
        console.log(text);
    });
}

//Sends contact with (phoneNumber) and (firstName) to (id) as a reply to (replyId)
function sendContact(id, phoneNumber, firstName, replyId) {
    var message = {
        chat_id: id,
        phone_number: phoneNumber,
        first_name: firstName,
        reply_to_message_id: replyId,
    };
    var request = sendRequest("sendContact", message, function(text) {
        console.log(text);
    });
}

// Handle sending responses
function sendResponses() {

    //Check through all the unchecked messages we have
    for (let i = 0; i < messageArray.length; i++) {
        var messageProcessed = false
        if (messageArray[i].hasOwnProperty('channel_post')) { //ignore channel posts
            clearMessage(messageArray[i].update_id);
            continue;
        }

        //Check for various misspellings of Pyrrha
        misspellings(messageArray[i])

        if (!forPenny(messageArray[i])) {
            clearMessage(messageArray[i].update_id);
            continue;
        }

        if (test(messageArray[i])) {
            messageProcessed = true;
        }

        if (isWeissFlat(messageArray[i])) {
            messageProcessed = true;
        }

        if (checkHelp(messageArray[i])) {
            messageProcessed = true;
        }

        if (suggestion(messageArray[i])){
            messageProcessed = true;
        }

        if (neoPhoto(messageArray[i])) {
            messageProcessed = true;
        }

        if (lewd(messageArray[i])) {
            messageProcessed = true;
        }

        if (emeraldPhoto(messageArray[i])) {
            messageProcessed = true;
        }

        if (dishwasherPhoto(messageArray[i])) {
            messageProcessed = true;
        }

        if (heresy(messageArray[i])) {
            messageProcessed = true;
        }

        //BQADAQADXgADSQyhRJLAb7gV87EpAg

        if (protec(messageArray[i])) {
            messageProcessed = true;
        }

        if (doNothingToCook(messageArray[i])) {
            messageProcessed = true;
        }

        if (nutsAndDolts(messageArray[i])) {
            messageProcessed = true;
        }

        if (shutdown(messageArray[i])){
            continue;
        }

        if (!messageProcessed) {
            sendReply(messageArray[i].message.chat.id,"I'm sorry, I didn't understand that!",messageArray[i].message.message_id);
            clearMessage(messageArray[i].update_id);
        }
    }
}

function misspellings(msg) {
    //Various misspellings of Pyrrha.
    if (!msg.message.hasOwnProperty('text')) {
        return
    }
    var pyrrha = ["phyrra","pyrah","phyrrha","phryrra","pyhrra","pyrrah","phrrya","pyrhha","pirrah","piera","pyra","pyhra","pierra","priah","phyrria","pyrra","pyrhaa","pyyra","pyrrea","pureha","pharah","pharaoh","pyhhra","phyyra","pryyha","pyyrha","phyra","prryha","pearhat","purra","prhhya"]
    for (let i = 0; i < pyrrha.length; i++) {
        if (msg.message.text.toLowerCase().includes(pyrrha[i])) {
            sendReply(msg.message.chat.id,`${pyrrha[i][0].toUpperCase() + pyrrha[i].slice(1)}? Do you mean Pyrrha?`,msg.message.message_id);//Sends 'P' + the string from pyrrha minus the first letter
        }
    }
}

function forPenny(msg) {
    for (let i = 0; i < identifiers.length; i++) {
        if (!msg.message.hasOwnProperty('text')) {
            return false;
        }
        else if (msg.message.text.toLowerCase().includes(identifiers[i])) {
            if (msg.message.text.toLowerCase().indexOf(identifiers[i]) == 0) {
                return true;
            }
        }
    }
    return false;
}

function checkHelp(msg) {
    //var command = parseCommand(msg.message.text);
    //if (doesMatchCommand(command, "help")) {
    if (msg.message.text.toLowerCase().includes('help')) {
        sendReply(msg.message.chat.id,
`List of supported commands:
help
test
neo
emerald
dishwasher art
suggestion
weiss isn't flat
heresy
protec
lewd
do nothing to cook
Will correct misspellings of Pyrrha`, msg.message.message_id);
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function test(msg) {
    //var command = parseCommand(msg.message.text);
    //if (doesMatchCommand(command, "test")) {
	if (msg.message.text.toLowerCase().includes('test')) {
        sendReply(msg.message.chat.id, "I'm working!", msg.message.message_id);
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function isWeissFlat(msg) {
    if (msg.message.text.toLowerCase().includes("weiss isn't flat")) {
        sendLink(msg.message.chat.id, "She's not?", "https://imgur.com/a/zxDbY", msg.message.message_id, true)
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function suggestion(msg) {
    //var command = parseCommand(msg.message.text);
    //if (doesMatchCommand(command, "suggestion")) {
	if (msg.message.text.toLowerCase().includes('suggestion')) {
        forwardMessage(PBTESTINGCHANNEL, msg.message.chat.id, msg.message.message_id);
        sendReply(msg.message.chat.id, "Your suggestion was sent to the developers.", msg.message.message_id);
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function sendRandomPhotoFromArray(msg, photoArray) {
    sendPhoto(msg.message.chat.id, photoArray[Math.floor((Math.random() * photoArray.length))], msg.message.message_id)
}

function sendRandomPhotoWithCaption(msg, captionArray) {
    var randPhoto = Math.floor((Math.random() * captionArray.length));
    sendCaptionedPhoto(msg.message.chat.id, captionArray[randPhoto].id, msg.message.message_id, captionArray[randPhoto].caption)
}

function neoPhoto(msg) {
    //var command = parseCommand(msg.message.text);
    //if (doesMatchCommand(command, "neo")) {
	if (msg.message.text.toLowerCase().includes('neo')) {
        sendRandomPhotoFromArray(msg, neoIds);
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function emeraldPhoto(msg) {
    //var command = parseCommand(msg.message.text);
    //if (doesMatchCommand(command, "emerald")) {
	if (msg.message.text.toLowerCase().includes('emerald')) {
        sendRandomPhotoFromArray(msg, emeraldIds);
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function dishwasherPhoto(msg) {
	if (msg.message.text.toLowerCase().includes('dishwasher art') || msg.message.text.toLowerCase().includes('dishwasher1910 art')) {
        sendRandomPhotoFromArray(msg, dishwasherIds);
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function heresy(msg) {
    if (msg.message.text.toLowerCase().includes('heresy')) {
        sendAnimation(msg.message.chat.id, 'BQADAQADQQADSQyZROKE-HVS2UiSAg', msg.message.message_id, 'Warning! Heresy detected! Pennybot reporting Combat Ready! Firing main cannon!');
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function protec(msg) {
    if (msg.message.text.toLowerCase().includes('protec')) {
        sendAnimation(msg.message.chat.id, 'CgADAQADbQAD28IQRTfjbnU1vQKEAg', msg.message.message_id, 'Protec the smile.');
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function lewd(msg) {
    if (msg.message.text.toLowerCase().includes('lewd')) {
        sendRandomPhotoWithCaption(msg, lewdIds);
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

function doNothingToCook(msg) {
    if (msg.message.text.toLowerCase().includes('do nothing to cook') || msg.message.text.toLowerCase().includes('do nothing to the cook')) {
        sendPhoto(msg.message.chat.id, 'AgADAQADJ6gxG9-wwURbYA8yWu8pHYXqCjAABL40_i1Z9R67efICAAEC', msg.message.message_id);
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

//Sends nuts and dolts fanart
function nutsAndDolts(msg) {
    if (msg.message.text.toLowerCase().includes('nuts and dolts') || msg.message.text.toLowerCase().includes('nuts & dolts')) {
        sendCaptionedPhoto(msg.message.chat.id, 'AgADAQADAqgxG0kMoUTZsEdEe4jScjgDCzAABAmoyO5mPjerx_wCAAEC', msg.message.message_id, 'Kiss!');
        clearMessage(msg.update_id);
        return true;
    }
    return false;
}

//Shuts down the bot when the message "Spaniel broad tricycle" is received from Dorge47
function shutdown(msg) {
    var message_text = msg.message.text.toLowerCase();
    if (message_text.includes("spaniel broad tricycle") || message_text.includes("spaniel, broad, tricycle")) {
        if (msg.message.from.id == DORGE47) {
            sendMessage(msg.message.chat.id, "!snoitatulaS");
            clearMessage(msg.update_id);
            stopResponding();
            return true;
        }
        else {
            sendReply(msg.message.chat.id,"That's not for you!", msg.message.message_id);
            clearMessage(msg.update_id);
            return true;
        }
    }
    return false;
}

// Parses the pb command into its parts
function parseCommand(msg_text) {
    //Split by whitespace, removing any empty elements
    var commands = msg_text.trim().split(/\s+/).filter(Boolean);
    //Remove whatever identifier called to pennybot
    for (let i = 0; i < identifiers.length; i++) {
        commands = commands.filter(argument => argument.toLowerCase() !== identifiers[i].toLowerCase());
    }
    return commands;
}

function matchMultiWordCommand(command, command_name) {
    var command_words = command_name.trim().split(/\s+/).filter(Boolean);
}

function doesMatchCommand(command, command_name) {
    if (command[0].toLowerCase() === command_name.toLowerCase()) {
        return true;
    }
    return false;
}

function doStuff() {
    getMessages();
    setTimeout(function() {
        if (messages.ok) {
            messageArray = messages.result;
            sendResponses();
        }
        else {
            console.log(messages.error_code + ': ' + messages.description)
        }
    },1000)
}

function startResponding() {
    sendMessage(PBTESTINGCHANNEL,'PennyBotV2 is ON')
    getMessages()
    setTimeout(function() {
        if (messages.result.length) {
            console.log('Messages already present. Please clear messages and try again.')//The bot glitches out if there are too many messages already present when it starts up
            sendMessage(PBTESTINGCHANNEL,'PennyBotV2 is OFF')
        }
        else {
            interVar = setInterval(doStuff,3500)
        }
    }, 1000)
}

function stopResponding() {
    clearInterval(interVar);
    sendMessage(PBTESTINGCHANNEL,'PennyBotV2 is OFF')
}

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/chain.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(443);

startResponding()
