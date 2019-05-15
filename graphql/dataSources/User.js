const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async findAll() {
    const res = await this.store.User.find({})
      .populate()
      .exec();
    return res.map(u => ({
      _id: u._id.toString(),
      name: u.name,
      email: u.email,
      age: u.age,
      posts: u.posts,
      comments: u.comments
    }));
  }

  async findById(_id) {
    return await this.store.User.findOne({ _id }).exec();
  }

  async create(user) {
    const newUser = await new this.store.User({
      name: user.name,
      email: user.email,
      age: user.age
    });

    return await newUser.save();
  }

  async update({ _id, user }) {
    return await this.store.User.findByIdAndUpdate(
      _id,
      { $set: { ...user } },
      { new: true }
    ).exec();
  }

  async delete(_id) {
    return await this.store.User.findByIdAndDelete(_id).exec();
  }
}

module.exports = UserAPI;
