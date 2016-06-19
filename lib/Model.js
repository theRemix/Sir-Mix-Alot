var DataStore = require('./DataStore');

function Model(theSchema){
  DataStore.call(this);
  var schemaKeys = Object.keys(theSchema);
  //console.log('schema keys: ' + schemaKeys);
  this.schema = theSchema;
  this.id = null;
  this.Model = [];
  for (var i = schemaKeys.length - 1; i >= 0; i--) {
    var theKey = schemaKeys[i];
    //console.log('current schema key: ' + theKey);
    //console.log('has property: ' + this.hasOwnProperty(theKey));
    if(!this.hasOwnProperty(theKey)){
      this[theKey] = null;
    }
  }
  //console.log(Object.getOwnPropertyNames(this));
}

module.exports = Model;

/*
var theDate = Date();
var testSchema = {
    a : 'Hi there',
    b : 'hi-diddly-ho, neighbor!',
    c : 7,
    d : theDate
  };

var item = new Model(testSchema);
console.log(item.id);
console.log(item.Model[0]);
*/