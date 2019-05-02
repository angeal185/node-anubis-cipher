# node-anubis-cipher
nodejs module for the anubis 256 bit cipher in cbc mode with optional hmac authentication.

### Installation

npm

```sh
$ npm install node-anubis-cipher --save
```

git
```sh
$ git clone git@github.com:angeal185/node-anubis-cipher.git
```


```js


//default options
{
  iv: random,     // {string} 16 byte string encryption iv
  iterations: 10000, //~ {integer} pbkdf2 iterations
  pbkdf2: false,  //~ {boolean} run password through pbkdf2
  salt: undefined,//~ {string} pbkdf2 salt - must be set if using pbkdf2
  mac: false,     //~ {boolean/string} add hmac authentication
                  //  false to disable or string to be used for secret
  hash: 'sha512', //~ {boolean/array} hash used for hmac and pbkdf2
  buffer: false,  // {boolean/array} add/strip padding to both ends
                  //  false to disable or an array for true.        
                  //   [1,2] would prepend/slice 1 byte and         
                  //   append/slice 2 bytes                         
}


/**
 *  sync
 *  @param {string} password ~ password
 *  @param {string} data ~ plaintext/ciphertext
 *  @param {object} config ~ optional options
 **/

//encrypt  
anubis.encSync(password, data, config)

//decrypt
anubis.decSync(password, data, config)


/**
 *  callback
 *  @param {string} password ~ password
 *  @param {string} data ~ plaintext
 *  @param {object} config ~ optional options
 *  @param {function} cb ~ callback function(err,data)
 **/

//encrypt
anubis.enc(password, data, config, cb)

//decrypt
anubis.dec(password, data, config, cb)


/**
 *  promise
 *  @param {string} password ~ password
 *  @param {string} data ~ plaintext/ciphertext
 *  @param {object} config ~ optional options
 **/

//encrypt  
anubis.encP(password, data, config)

//decrypt
anubis.decP(password, data, config)


//demo

const anubis = require('node-anubis-cipher');

(function(){

  let key = 'test';
  let options = {
    pbkdf2: true,
    salt: 'salt',
    iterations: 10000,
    mac: 'secret',
    buffer: [1,2]
  }

  // callback
  console.log('anubis callback test starting...')

  anubis.enc(key, 'test', options, function(err, data){
    if(err){return console.log('enc callback error')}
    console.log(data)
    anubis.dec(key, data, options, function(err, data){
      if(err){return console.log('dec callback error')}
      console.log(data)
      console.log('anubis callback test done')
    })
  })

  //sync
  console.log('anubis sync test starting...')

  let syncEnc = anubis.encSync(key, 'test', options);
  console.log(syncEnc)
  let syncDec = anubis.decSync(key, syncEnc, options)
  console.log(syncDec)
  if(syncEnc.err){
    console.log('anubis sync enc test failure.')
  } else if(syncDec.err){
    console.log('anubis sync dec test failure.')
  } else {
    console.log('anubis sync test done.')
  }

  // promise
  console.log('anubis promise test starting...')

  anubis.encP(key, 'test', options).then(function(res){
    console.log(res)
    anubis.decP(key, res, options).then(function(res){
      console.log(res)
      console.log('promise test done.')
    }).catch(function(err){
      console.log('promise dec test failure.')
    })
  }).catch(function(err){
    console.log('promise enc test failure.')
  })

})()
```
