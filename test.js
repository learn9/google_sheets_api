// test.js
const { getData } = require('./googleSheet.js');


const docID = '1gJEQ7h0ee58RF0hxb3EycEnMtv-KyPmGFJ8hDP2BjLo';
const sheetID = '1824659097'; // '0' for the first sheet
const credentialsPath = './asphalt-club-63c5352186a5.json';

(async () => {
  const resp = await getData(docID, sheetID, credentialsPath);
  console.log(resp);
})();