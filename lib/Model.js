var DataStore = require('./DataStore');
var stor = DataStore.store;

function Model(schema) {
  //grab schema keys
  this.schema = schema;
  this.id = null;
  //add keys from schema if they don't exist
  for (var key in schema) {
    this[key] = null;
  }
  if(stor[this.constructor.name] === undefined) {
    stor[this.constructor.name] = [];
  }
  console.log('Model properties: ' + Object.getOwnPropertyNames(this));
}

Model.prototype.save = function () {
  console.log('my id is: ', this.id);
  if(this.id === null) {
    this.id = this.constructor.getNextId();
    stor[this.constructor.name].push(this);
  }
  console.log('now my id is: ', this.id);
};

Model.getNextId = function(){
    console.log('getNextId called for ' + this.name + '. value: ', stor[this.name].length + 1);
    return stor[this.name].length + 1;
};

Model.find = function(theId) {
  console.log('find invoked for id: ', theId);
  for(var i = 0; i < stor[this.name].length; i++) {
    if(stor[this.name][i].id === theId) {
      return stor[this.name][i];
    }
  }
  return null;
};

Model.extend = function(klass) {
  for (var k in this) {
    console.log('current property: ', k);
    if (this.hasOwnProperty(k)) {
      klass[k] = this[k];
    }
  }
  for (var k in this.prototype) {
    console.log('current property: ', k);
    if (this.prototype.hasOwnProperty(k)) {
      klass[k] = this.prototype[k];
    }
  }
  //return klass;
  console.log('klass properties: ', Object.getOwnPropertyNames(klass));
  return klass;
};



/*
Model.prototype.extend = function(klass) {
  for (var k in this) {
    if (this.hasOwnProperty(k)) {
      klass[k] = this[k];
    }
  }
  return klass;
};
*/




module.exports = Model;


  // var theDate = Date();
  // var testSchema = {
  //     a : 'Hi there',
  //     b : 'hi-diddly-ho, neighbor!',
  //     c : 7,
  //     d : theDate
  //   };
  // var otherSchema = {
  //   a: 'howdy',
  //   b: 'hey, dude!',
  //   c: 9,
  //   d: Date()
  // };

  // var item = new Model(testSchema);
  // console.log('item properties: ' + Object.getOwnPropertyNames(item));
  // item.save();
  // console.log('ModelCaller:' + Model.caller);
  //   console.log(item.id);
  //   console.log(item.Model[0]);