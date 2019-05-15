const { DataSource } = require('apollo-datasource');

class CommentAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async findAll() {
    const res = await this.store.Comment.find({})
      .populate()
      .exec();
    return res.map(u => ({
      _id: u._id.toString(),
      text: u.text,
      author: u.author,
      post: u.post
    }));
  }

  async findById(_id) {
    return await this.store.Comment.findOne({ _id }).exec();
  }

  async findByAuthor(author) {
    return await this.store.Comment.find({ author }).exec();
  }

  async create(comment) {
    const newComment = await new this.store.Comment({
      text: comment.text,
      author: comment.author,
      post: comment.post
    });

    return await newComment.save();
  }

  async update({ _id, comment }) {
    return await this.store.Comment.findByIdAndUpdate(
      _id,
      { $set: { ...comment } },
      { new: true }
    ).exec();
  }

  async delete(_id) {
    return await this.store.Comment.findByIdAndDelete(_id).exec();
  }
}

module.exports = CommentAPI;
