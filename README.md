## ListenerX

This is a simple server, written in NodeJS.
The server accepts incoming GET and POST requests and records them in .txt files.
The purpose of these saved .txt files may be recording stolen cookies during XFS testing.
The server may return an image if needed.

## Dependencies

This server runs with Node.js runtime.
Download Node [here](https://nodejs.org/)

This package has the following peer dependencies that need to be installed manually:

```json
{
  "yargs": "^17.4.1"
}
```

## USAGE

Start the server with command line from its own directory

```sh
node server.js
```

For quick help use the help menu:

```sh
node server.js --help
```

Incoming requests are saved into the directory called 'victiminfo'.
The application's default configuration is to run the server on port 5000.
With --port (alias -p) switch the port can be changed.

```sh
node server.js -p 9000
```

Certain type of request may be disabled. With --noget / --nopost the server won't record GET/POST requests.

```sh
node server.js --nopost
```

The server default behaviour is to send back a 404 response as a HTML response, but the requests will be recorded.
You can however overwrite this behaviour with the --customresponse switch, which will send back your short message as a HTML response. Remember that calling the /devil endpoint still will return an image

```sh
node server.js --customresponse "Hello world"
```

With stealth mode your server will just not respond to any requests, although they will keep on being recorded.

```sh
node server.js --stealth
```

On the other hand, as a HTML response you can send back custom-made scripts.
This is a test script to test if it really works.

```sh
node server.js --script ./scripts/testscript.js
```

## API

ListenerX responds to any endpoint and records it. There is one particular usecase, when calling /devil endpoint, then it sends back an image besides recording the request.

## DISCLAIMER

This piece of a software is made for educational purposes only. Educational purpose may include testing your own environment and learning information security, because... hacking is ILLEGAL. Never use this software outside your allowances, test only those networks which you are actually allowed to test with the owner's explicit consent.
Should you use this or any other software for malicious purposes, it is only your responsibility.

### Version

This is ListenerX v.1.1.0
Created and tested with node v14.16.0
