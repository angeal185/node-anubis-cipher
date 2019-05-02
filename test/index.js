const anubis = require('../');
(function(){
  let key = 'test';
  let options = {
    pbkdf2: true,
    salt: 'salt',
    iterations: 10000,
    mac: 'secret',
    buffer: [1,2]
  }

  console.log('anubis callback test starting...')
  anubis.enc(key, 'test', options, function(err, data){
    if(err){return 'enc callback error';}
    console.log(data)
    anubis.dec(key, data, options, function(err, data){
      if(err){return 'dec callback error';}
      console.log(data)
      console.log('anubis callback test done')
    })
  })

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
