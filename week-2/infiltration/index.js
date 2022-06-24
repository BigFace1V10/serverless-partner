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
    let code = rot13Cipher(secretCode);
    context.log(code);


    resp = await fetch("https://badapples.herokuapp.com/api/unlock", {
        method: 'POST',
        body: {
            'code' : code
        }
    })
    context.log(resp);
    respJson = await resp.json();
    context.log(respJson);
    let key = respJson['key'];
 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: key
    };
}