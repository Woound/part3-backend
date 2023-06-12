const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(result => console.log('connected to mongodb'))
  .catch(error => console.log('error connecting to MongoDB', error.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      // Using regex to validate the format of the phone number
      validator: value => {
        let regEx = /^\d{2,3}-\d+$/;
        return regEx.test(value);
      },
      message: 'Please ensure the phone number is in the correct format',
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
