# Super Secure File Storage!

## ❓ Problem
Agent! We need you to create a super-secret system of sharing files. We need you to create a way of uploading a file of ANY type from one computer and be able to grab a download link from another computer.

![](https://i.imgur.com/LhLazuA.png)


## 💡 Proposed Solution

### Uploading Files
> A user story is an informal, natural language description of features of a software system. They are written from the perspective of an end user or user of a system. ([Wikipedia](https://en.wikipedia.org/wiki/User_story))

**User Story 1**: I want to be able to send a `POST` request with the file attached in the body.

**User Story 2**: I will be attaching my image in the `body` of my request through `form-data`. 

**User Story 3**: I want to be able to upload a file of any type. 

**User Story 4**: I want the backend of this app to be created using blob storage.

**User Story 5**: I want to know if my file was uploaded successfully or not.


### Downloading Files
**User Story 6**: I want there to be a password that the user needs to send in the header of the `GET` request to prove that they are able to access this endpoint.

**User Story 7**: I will also send the name of the file I want to download in the headers of my request. 

**User Story 8**: I want a download link that I can use to download the file if the file exists.

**User Story 9**: I want the API to tell me if the file doesn't exist, if I didn't specify a filename, or if the password was incorrect. 