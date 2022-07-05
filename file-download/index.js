const fetch = require('node-fetch')
const password = "bigface" // password to access noahblobstorage's containers

module.exports = async function (context, req) {
    const blob_url = "noahblobstorage"
    const filename = req.headers['filename']
    const userpassword = req.headers['password']
    let download = ""

    context.log(filename)
    responseMessage = "You succeeded! Here's your URL"
    if (filename == undefined)
        responseMessage = "You didn't specify file name, please try again."
    else if (userpassword != password)
        responseMessage = "Password is invalid. Please try again."
    else
    {
        download = "https://" + blob_url + ".blob.core.windows.net/storage0705/" + filename; // storage0705 -> specific container for this assignment
        let resp = await fetch(download, {
            method: 'GET',
        })
        let data = await resp; // why do we need this?
    
        if (data.statusText == "The specified blob does not exist.") {
            context.log("Does not exist: " + data)
            responseMessage = "The file you are looking for does not exist. Please check again."
        } 
    }

    context.res = {
        body: {
                responseMessage,
                download
            }
        // {
        //          "downloadUri" : download,
        //          "success": success,
        // }
  };
  context.log(download);
  context.done();
}