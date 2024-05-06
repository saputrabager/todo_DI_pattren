const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

class AuthController {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async create (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = errors.array();
          return res.status(400).json({ success: false, message: error[0].msg });
        }

        const data = {email: req.body.email, password: req.body.password, name: req.body.name}
        const [user, created] = await this.authRepository.findOrCreate({
            where:{email:req.body.email},
            defaults: data
        });

        if (!created){
            return res.status(400).json({succes: false, message: 'User already exists'});
        }

        return res.json({
            succes: true,
            data: {user}
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            succes: false,
            message: error.message
        })
    }
  }

  async signIn (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {    
          return res.status(400).json({ success: false, message: errors.array() });
      }

      const payload = {};
      const user = await this.authRepository.findOne({email: req.body.email}, true);
      if (!user){
        return res.status(400).json({ success: false, meesage:"Email is not found!" });
      }
      const validPassword = await user.comparePassword(req.body.password);
      if(!validPassword){
        return res.status(400).json({ success: false, message:"Wrong password!" });
      } else {
        const accessToken = jwt.sign({ id:  user.user_id, name: user.name, email: user.email }, process.env.SECRET_KEY);

        payload.access_token = accessToken;
        payload.user = user;

        return res.json({success: true, message: "success", data: payload}); 
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, message:error.message });
    }
  }

  async isAuthenticated (req, res) {
    try {
        if (typeof req.headers.authorization !== "undefined") {
            let token = req.headers.authorization.split(" ")[1];
            if (token == undefined || token == 'undefined'){
                return res.status(403).json({succes: false, message: 'Not Authorized'});
            }
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

            
                    const user = await this.authRepository.findOne({user_id: decodeToken.id});
                    if (!user)  return res.status(404).json({succes: false, message: 'User not found!'});
                    delete user.password;

                    return res.json({succes: true, message: 'success', data: {...user.dataValues}});
                
        } else {
            return res.status(403).json({succes: false, message: 'Not Authorized'});
        }
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({succes: false, message: 'Bad request'});
    }
  }
}

module.exports = AuthController