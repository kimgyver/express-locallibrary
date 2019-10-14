var mongoose = require('mongoose');
const moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  if (this.date_of_death == null || this.date_of_birth == null) return "Alive";
  //if (this.date_of_death == null) 
  //  return (Date.now.getYear() - this.date_of_birth.getYear()).toString();
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

AuthorSchema
.virtual('birthdate')
.get(function() {
  return this.date_of_birth ? moment(this.date_of_birth).format('D/MMM/YYYY') : '';
});

AuthorSchema
.virtual('deathdate')
.get(function() {
  return this.date_of_death ? moment(this.date_of_death).format('D/MMM/YYYY') : '';
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
