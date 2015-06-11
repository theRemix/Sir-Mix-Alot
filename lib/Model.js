var db = require('./DataStore').store;

function Model ( schema ) {
  this.id = null;
  this.schema = schema;

  for(var k in schema){
    this[k] = null;
  }

  db[this.constructor.name] = db[this.constructor.name] || [];
}

Model.prototype.save = function() {
  if(this.id === null){
    this.id = this.constructor.getNextId();
    db[this.constructor.name].push(this);
  }
};

Model.prototype.destroy = function() {
  if(this.id !== null){
    var selfID = this.id;
    db[this.constructor.name].forEach(function(obj,i,store){
      if(obj.id === selfID){
        store.splice(i,1);
      }
    });
  }
};

Model.find = function(id) {
  return db[this.name].filter(function(obj){
    return obj.id === id;
  })[0] || null;
};


Model.getNextId = function () {
  return db[this.name].reduce(function (p,c) {
    return p > c.id ? p : c.id;
  },0) + 1;
};

Model.extend = function(klass) {
  for (var k in Model) {
    if (Model.hasOwnProperty(k)) {
      klass[k] = Model[k];
    }
  }
  for (var k in Model.prototype) {
    if (Model.prototype.hasOwnProperty(k)) {
      klass.prototype[k] = Model.prototype[k];
    }
  }
};

module.exports = Model;