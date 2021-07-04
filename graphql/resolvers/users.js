import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-errors'

import { validateRegisterInput } from '../../utils/validators.js'
import User from '../../models/User.js'
import { SECRET_KEY } from '../../config.js'

export const usersResolvers = {
  Mutation: {
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = User.findOne({ username })
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      }

      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString
      })

      const res = await newUser.save()

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      )

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
