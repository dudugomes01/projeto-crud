const bcrypy = require('bcrypt')

async function crypto(pwd){
  
    const salt = await bcrypy.genSalt()
  
    const password = await bcrypy.hash(pwd, salt)

    return password
  }

  module.exports={
    crypto,
  }