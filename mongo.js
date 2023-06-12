const mongoose = require('mongoose'); // Mongoose

// Checking terminal for the password to connect to MongoDB Atlas
if (process.argv.length < 3) {
  console.log('please enter the password as an argument');
  process.exit(1);
} else {
  const password = process.argv[2];
  const url = `mongodb+srv://wound:${password}@cluster0.at5jkcn.mongodb.net/phoneApp?retryWrites=true&w=majority`;

  mongoose.set('strictQuery', false);
  mongoose.connect(url);
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // Printing out all the people in the database to the terminal.
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(result => {
    console.log('Note saved');
    mongoose.connection.close();
  });
} else {
  console.log('too many parameters, try again');
  mongoose.connection.close();
}
