# OCLC update [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
## Table of Contents
* [Description](#description)
* [Instructions](#installation-instructions)
* [License](#license)
* [Questions](#questions)
## Description
This repository contains instructions for how to add OCLC numbers to Alma records using the Alma bibs API. 
## Instructions
- The Problem: We have records in our collection that do not have OCLC numbers. These are typically older records that were created before there was an OCLC record. By now, they typically do have an OCLC record available (many have ISBNs). We want the OCLC number in the record and the holdings turn on in WorldCat. This is one way to take a tab delimited file of OCLC numbers and MMSIDs which will add the OCLC number to the record with the corresponding MMSID.
- Getting the OCLC numbers: For this to work, you will need to find a way to get the OCLC numbers in the first place. I will set up a separate repository that will show how to use OpenRefine and the WorldCat Search API to get this information.

Before running the program:

1. Install node modules using `npm i`
2. Add a file in the main directory called `config.js` where you will add your Alma API keys. It will look like this:

`module.exports = config = {
    PRODUCTION_API_KEY : '[API Key]',
    SANDBOX_API_KEY : '[API Key]' 
    }
    `

Always test in Sandbox! When you are ready to work in production, change sandboxKey to productionKey in index.js.

3. Add a file in the main directory called `data.txt` with tab delimited OCLC numbers and MMSIDs that looks like the data in `data.example.txt`.

4. Run with `node index.js`

## License
ISC. Copyright (c) 2022 Jamie Carlstone
## Questions
* https://github.com/jdcar
 