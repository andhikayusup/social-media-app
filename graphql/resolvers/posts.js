import { AuthenticationError, UserInputError } from 'apollo-server'
import Post from '../../models/Post.js'
import { checkAuth } from '../../utils/check-auth.js'

export const postsResolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)

        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })

      const post = await newPost.save()

      return post
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)

      try {
        const post = await Post.findById(postId)

        if (post.username === user.username) {
          post.delete()
          return 'Post deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context)

      const post = await post.findById(postId)

      if (post) {
        if (post.likes.find(post.username === username)) {
          post.likes = post.likes.filter(
            (like) => like.username !== username
          )
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }

        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    }
  }
}
