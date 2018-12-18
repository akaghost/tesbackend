module.exports = function (Account) {
    let app = require('../../server/server');
  
  
    Account.remoteMethod("register", {
      accepts: [{
        arg: "params",
        type: "Object",
        required: true
      }],
      returns: {
        type: "object",
        root: true
      },
      http: {
        path: "/register",
        verb: "post"
      }
    });
  
    Account.register = (params, cb) => {
      let userModel = app.models.User;
      let trxModel = app.models.Transaction;
      let random = Math.floor(Math.random() * 9000000000) + 1000000000;
  
      // Account.find(params, (err, res) => {
      //   console.log(res)
      // })
  
      userModel.create(params, (err, res) => {
        Account.create({
          userid: res.id,
          accountnumber: random
        }, (err, res) => {
          //   console.log(res)
  
          trxModel.create({
            accountId: res.id,
            type: 'DB',
            amount: 500000,
            date: Date.now()
          })
  
        })
  
        cb(null, res)
      })
  
  
  
    };
  
  
  }
  