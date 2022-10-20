const axios = require('axios')
const config = require('./config.js')
const productionKey = config.PRODUCTION_API_KEY
const sandboxKey = config.SANDBOX_API_KEY

const headerConfig = {
    headers: {
        'Content-Type': 'application/xml'

    }
}

//Keeps API calls under 1000
for (let i = 1; i < 1000; i++) {
    task(i);
}

function task(i) {
    setTimeout(function () {

        const fs = require("fs");
        fs.readFile("data.txt", "utf-8", (err, data) => {
            if (err) console.log(err);
            else

            var lines = data.split('\n');
            
            var tabs = lines[i].split('\t');

            const sendGetRequest = async () => {
                try {

                    const resp = await axios.get(`https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${tabs[1].toString()}?apikey=${sandboxKey}&format=json`)

                    const marc = `<bib>${resp.data.anies[0].replace(/\n/gm, "").replace(/(.+?)(<record>.+<\/controlfield>)(.+)/gm, `$2<datafield ind1=" " ind2=" " tag="035"><subfield code="a">(OCoLC)${tabs[0].toString()}</subfield></datafield>$3`)}</bib>`

                    const sendPutRequest = async () => {
                        try {
                            const res = await axios.put(`https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${tabs[1].toString()}?apikey=${sandboxKey}`, marc, headerConfig)
                            console.log("Success", tabs[1].toString())
                        } catch (err) {
                            fs.appendFile('putError.txt', tabs[1].toString(), function (err) {
                                if (err) throw err
                            })
                        }

                    }
                    sendPutRequest()

                } catch (err) {
                    fs.appendFile('getError.txt', tabs[1].toString(), function (err) {
                        if (err) throw err;

                    })
                }

            }
            sendGetRequest()

        });

    }, 2000 * i);
}




