import Post from '../../models/Post.js'

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}

export default resolvers
