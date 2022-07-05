const multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const boundary = multipart.getBoundary(req.headers['content-type']);
    const body = req.body; // req.body, not req.query.body, query is like the parameters

    // let responseMessage = await uploadFile(parsedBody, ext);
    let responseMessage = ""
    try {
        // use parse-multipart to parse the body
        const parsedBody = multipart.Parse(body, boundary);

        // get the header called "codename"
        let fileName = req.headers['codename'] 

        responseMessage = await uploadFile(parsedBody, fileName);
        // fill the parameters in!
    } catch(err) {
        context.log(err);
        context.log("Undefined body image");
        responseMessage = "Sorry! No files attached."
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

async function uploadFile(parsedBody, fileName)
{
    // Get reference to container
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "storage0705";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container 
    
    // Create a blob
    const blobName = fileName;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    // Upload data to blob
    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    return "File Saved";
}