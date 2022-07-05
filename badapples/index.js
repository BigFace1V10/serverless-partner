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
    context.log(data)
    context.log(key)
 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: key
    };
}

async function getKey(code){
    const url = 'https://b4d4ppl3s.herokuapp.com/api/unlock/';
    let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({'code': code})
    });

    return resp; 
}
