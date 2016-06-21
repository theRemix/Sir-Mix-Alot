var DataStore = require('./DataStore');
var stor = DataStore.store;

function Model(schema) {
  this.schema = schema;
  this.id = null;
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
  if(!this.id) {
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
    if (this.hasOwnProperty(k)) {
      klass[k] = this[k];
    }
  }
  for (var z in this.prototype) {
    if (this.prototype.hasOwnProperty(z)) {
      klass.prototype[z] = this.prototype[z];
    }
  }
};

Model.prototype.destroy = function() {
  if(this.id) {
     stor[this.constructor.name].shift();
  }
};



module.exports = Model;
