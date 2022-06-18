// import translator from 'emoji-translator';
let translator = require('emoji-translator');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let redacted = req.query.redacted;
    const vocabulary = {'🕵🏽':'John', '🕵🏻‍♀️':'Nora', '🗻':'Waverly Valley Place'};
    const translate = translator(vocabulary);
    const text_message = translate(redacted);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: text_message
    };
}