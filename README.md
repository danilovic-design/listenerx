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

Incoming requests are saved into the directory called 'victiminfo'.
The application's default configuration is to run the server on port 8000.
With --port (alias -p) switch the port can be changed.

```sh
node server.js -p 9000
```

Certain type of request may be disabled. With --noget / --nopost the server won't respond to GET/POST requests.

## API

## DISCLAIMER

This piece of a software is made for educational purposes only. Educational purpose may include testing your own environment and learning information security, because... hacking is ILLEGAL. Never use this software outside your allowances, test only those networks which you are actually allowed to test with the owner's explicit consent.
Should you use this or any other software for malicious purposes, it is only your responsibility.

### Version

This is ListenerX v.1.1.0
Created and tested with node v14.16.0
