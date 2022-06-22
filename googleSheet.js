/**
 * i use this as quick guide to do credentials.
 * https://ithelp.ithome.com.tw/articles/10234325
 */

const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */
async function getData(docID, sheetID, credentialsPath = './credentials.json') {
  const result = [];
  let playerResult = {};
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const rows = await sheet.getRows();
  // note: how many columns it retrieves depends on how many columns of data is in the first row. 
  // it will consider the first row as header row.

  let i = 0;
  let headers;
  
  for (row of rows) {
    if (row._rowNumber == 2) {
      // this is a blank line
    } else if (row._rowNumber == 3) {
      // this is header row
      // record the headers
      headers = row._rawData;
    } else {
      let street_num = row["street_num"];
      for (let j=1; j < row._rawData.length; j++) {
        let player = row._rawData[j];
        if (!playerResult[player]) {
          playerResult[player] = [];
        }
        playerResult[player].push(headers[j] + "#" + street_num);
      }
      result.push(row._rawData);
    }

    

    i++;
  }
  //return result;
  return playerResult;
};

module.exports = {
  getData,
};
