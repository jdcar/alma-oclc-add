// const fetch = require('node-fetch')
const axios = require('axios')
const config = require('./config.js')
const productionKey = config.PRODUCTION_API_KEY
const sandboxKey = config.SANDBOX_API_KEY

let csv = require('fast-csv')
const fs = require('fs')

const headerConfig = {
    headers: {
        'Content-Type': 'application/xml'

    }
}

var stream = fs.createReadStream("data.txt");

csv.parseStream(stream, { headers: true, delimiter: '\t' })
    .on("data", function (data) {

        axios.get(`https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${data.MMS_ID}?apikey=${sandboxKey}&format=json`).then(resp => {

            const marc = `<bib>${resp.data.anies[0].replace(/\n/gm,"").replace(/(.+?)(<record>.+<\/controlfield>)(.+)/gm, `$2<datafield ind1=" " ind2=" " tag="035"><subfield code="a">(OCoLC)${data.OCLC}</subfield></datafield>$3`)}</bib>`
            console.log(marc)

            const sendPutRequest = async () => {
                try {
                    const res = await axios.put(`https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${data.MMS_ID}?apikey=${sandboxKey}`, marc, headerConfig)
                    console.log(res)    
                } catch (err) {
                    fs.appendFile('putError.txt', data.MMS_ID.toString(), function (err) {
                        if (err) throw err
                    })
                }
                
            }
            
            sendPutRequest()

        });
    })




