# express-chromix
A experimental project to expose Chrome's tab API as a web service for basic
tab manipulation on a remote display on a private network.

## Requirements
This project requires the Chromix-Too [plugin](https://chrome.google.com/webstore/detail/chromix-too/ppapdfccnamacakfkpfmpfnefpeajboj?hl=en-GB)
and [service](https://www.npmjs.com/package/chromix-too).

## Getting Started
Start `chromix-too-server` and start `express-chromix`

    chromix-too-server &
    git clone https://github.com/greghxc/express-chromix
    cd express-chromix
    npm install
    npm start

Navigate to the API docs http://localhost:3000/api-docs

User: admin / Password: supersecret