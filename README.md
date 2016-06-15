url for this app is https://donhenton.github.io/deviantart-sandbox/public_html/index.html


### Running locally

* create a folder under src/react called conf
* add conf.js with the following: 

```
module.exports = function () {
    
    
    return   { "clientID":"<da client id>", "client_secret": "<da_client_secret" }
}
```

* this folder is NOT checked into source
* run gulp for the default build and launch job 
* app runs at http://localhost:8000
