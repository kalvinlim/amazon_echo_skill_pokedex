# Amazon Echo Custom Skill- Pokedex [![Build Status](https://travis-ci.org/kalvinlim/amazon_echo_skill_pokedex.svg?branch=master)](https://travis-ci.org/kalvinlim/amazon_echo_skill_pokedex)
Proof of concept for Alexa Skills Kit.  This custom skill hooks into Pokeapi (https://pokeapi.co/) to query Pokemon info.  Tested on AWS Lambda and Alexa Developer Console

### Sample Request:
**'Pokedex lookup charizard'**
```
{
  "session": {
    "sessionId": "...",
    "application": {
      "applicationId": "..."
    },
    "attributes": {},
    "user": {
      "userId": "..."
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.895e9b55-0ce4-4959-a7a8-fd930a96e50f",
    "locale": "en-US",
    "timestamp": "2016-09-19T07:39:51Z",
    "intent": {
      "name": "pokedex",
      "slots": {
        "POKEMONNAME": {
          "name": "POKEMONNAME",
          "value": "charizard"
        }
      }
    }
  },
  "version": "1.0"
}
```

### Sample Response
**'charizard, the flying,fire pokemon.'**
```
{
  "version": "1.0",
  "response": {
    "outputSpeech": {
      "type": "SSML",
      "ssml": "<speak>charizard, the flying,fire pokemon.</speak>"
    },
    "shouldEndSession": true
  },
  "sessionAttributes": {}
}
```

### Mocha Tests:
```
> npm test
```

### Local testing

* Alexa App Server (https://github.com/matt-kruse/alexa-app-server) - Place this repo into the /examples/apps directory then run
```
> node server
```
on /examples/server.js in the alexa app repository. Navigate to http://localhost:8080/alexa/pokedex to start simulating Alexa requests.