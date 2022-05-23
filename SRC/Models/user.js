const mongoose = require('mongoose')
const schema = mongoose.Schema
const hashing = require('bcrypt')
const userSchema = new schema({
    username: {
        type: String,
        required: true,
        //lowercase: true,
        //uppercase: true,
        //unique: true,
    },
    password: {
        type: String,
        required: true,
        //lowercase: true,
        //uppercase: true,
        //unique: true,
    },
    email: {
        type: String,
        required: true,
        
    }
}, {timestamps: true})


userSchema.pre('save', async function (next) {
    try{
        const saltRounds = await hashing.genSalt(12)
        const passwordHashed = await hashing.hash(this.password,saltRounds)
        this.password=passwordHashed
        next()
        console.log('user password has been hashed')

    }catch(err){
       next(err) 
    }
})

userSchema.methods.comparePassword = async function (password) {
    if(!password) throw new Error('Password is missing')
    try{
        const valid = await hashing.compare(password,this.password)
        return valid

    }catch(err){
        console.log(err)
    }
}


const User = mongoose.model('Users',userSchema)

module.exports = User