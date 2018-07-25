/**
 * Created by Manjesh on 14-05-2016.
 */

module.exports = {
  mongo: {
    uri: 'mongodb://localhost:27017/node_oauth2'
  },
  seedDB:false,
  seedMongoDB:false,
  seedDBForce:true,
  db:'mongo', // mongo,sql if you want to use any SQL change dialect above in sql config

  Gmail_User : 'webteam.deem@gmail.com',
  Gmail_pass: 'webteam@#123',
  Mail_host : 'smtp.gmail.com',
  Mail_port : 465,
  
};