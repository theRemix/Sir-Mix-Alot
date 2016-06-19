var DataStore = require('./DataStore');

function Model(theSchema){
  //grab schema keys
  var schemaKeys = Object.keys(theSchema);
  //console.log('schema keys: ' + schemaKeys);
  this.schema = theSchema;
  this.id = null;
  //add keys from schema if they don't exist
  for (var i = 0; i < schemaKeys.length; i++) {
    var theKey = schemaKeys[i];
    if(!this.hasOwnProperty(theKey)){
      this[theKey] = null;
    }
  }
  var myCreator = this.constructor.name;

  !DataStore.store.hasOwnProperty[myCreator] ? DataStore.store[myCreator] = [] : console.log(DataStore.store[myCreator]);
  console.log(DataStore.store[myCreator].length);

}

module.exports = Model;

var theDate = Date();
var testSchema = {
    a : 'Hi there',
    b : 'hi-diddly-ho, neighbor!',
    c : 7,
    d : theDate
  };


var item = new Model(testSchema);
console.log('item properties: ' + Object.getOwnPropertyNames(item));
//console.log('ModelCaller:' + Model.caller);
  //console.log(item.id);
  //console.log(item.Model[0]);

//console.log();