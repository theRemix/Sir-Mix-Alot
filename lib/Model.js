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
}

Model.prototype.save = function () {
  if(!this.id) {
    this.id = this.constructor.getNextId();
    stor[this.constructor.name].push(this);
  }
};

Model.getNextId = function(){
    return stor[this.name].length + 1;
};

Model.find = function(theId) {
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
