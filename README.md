# node-anubis-cbc
nodejs module for cbc encryption with the anubis cipher

```js
const anubis = require('anubis');

//encrypt
anubis.enc(password, data, iv)

//decrypt
anubis.dec(password, data)

//encrypt pbkf2
anubis.encPbkf2(password, salt, iterations, keylen, data, iv)

//decrypt pbkf2
anubis.decPbkf2(password, salt, iterations, keylen, data)
```
