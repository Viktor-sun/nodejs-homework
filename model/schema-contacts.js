const { Schema, model, SchemaTypes } = require('mongoose')

const schemaContacts = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
  }
)

schemaContacts.virtual('info').get(function () {
  return `${this.name} has this number ${this.phone}`
})

const Contact = model('contact', schemaContacts)

module.exports = Contact
