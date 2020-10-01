const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        email: {
            type: String,
            required: [true,'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: [true,'Please enter an password'],
            minlength: [6, 'Minimum password length is 6 characters']
        }
})

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

userSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  if(user){
    const auth = await bcrypt.compare(password, user.password)
    if(auth){
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}


module.exports = mongoose.model('User', userSchema);
