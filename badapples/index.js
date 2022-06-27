const fetch = require('node-fetch');
const rot13Cipher = require('rot13-cipher');

module.exports = async function (context, req) {
    
    let params = new URLSearchParams({
        'code': 'badapples123'
    })
    let resp = await fetch("https://b4d4ppl3s.herokuapp.com/api/code?" + params.toString(),{
        method: 'GET',
    })
    let respJson = await resp.json();
    context.log(respJson);

    let secretCode = respJson['secret'];
    let cipherCode = rot13Cipher(secretCode);
    context.log(cipherCode);

    let data = await getKey(cipherCode);
    let key = data['key'];
    // let resp2 = await fetch("https://b4d4ppl3s.herokuapp.com/api/unlock/", {
    //     method: 'POST',
    //     body: JSON.stringify({'code': cipherCode})
    // });
    // context.log(resp2);
    // let resp2Json = await resp2.json();
    // context.log(resp2Json);
    // let key = resp2Json['key'];
 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: key
    };
}

async function getKey(code){
    // const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    // const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    const uriBase = 'https://b4d4ppl3s.herokuapp.com/api/unlock/';
    let resp = await fetch(uriBase, {
        method: 'POST',
        body: JSON.stringify({'code': code})
    });
    let data = await resp.json();
    
    return data; 
}
