const User = require('../model/schema-users')

const findById = async (id) => {
  return await User.findById(id)
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const createUser = async (body) => {
  const user = new User(body)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateSubscription = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription })
}

const updateAvatar = async (id, avatarURL, idCloudAvatar = null) => {
  return await User.updateOne({ _id: id }, { avatarURL, idCloudAvatar })
}

module.exports = {
  findById,
  findByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
}
