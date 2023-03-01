import {quotes, users} from './fakedb.js';
import {randomBytes} from 'crypto';
import mongoose from 'mongoose';
import {bcrypt} from 'bcryptjs';

const User = mongoose.model("User");

const resolvers = {
    Query: {
        users: () => users,
        user:(_,{_id})=> users.find(user => user._id == _id),
        quotes: () => quotes,
        iquote:(_, {by}) => quotes.filter(quote => quote.by == by), 
    },
    User: {
        quotes:(ur) => quotes.filter(quote => quote.by == ur._id)
    },
    Mutation: {
        signupUser:(_,{ userNew }) => {
           const user = User.findOne({email:userNew.email })
           if(user){
            throw new Error("User already exists with that email");
           }
        //    const hashedPassword = await bcrypt.hash(userNew.password,12);

           new User({
                
           })
        }
    }
}

export default resolvers