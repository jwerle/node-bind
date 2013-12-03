
/**
 * Module dependencies
 */

var define = Object.defineProperty;
var noop = Function();
var isArray = Array.isArray;

/**
 * Binds a descriptor scope
 * to a DOM node and returns
 * a new object
 *
 * @api public
 * @param {Node} node
 * @param {Object} descriptor
 */

module.exports = bind;
function bind (node, descriptor) {
  var obj = {};
  var prop = null;
  var tmp = null;
  var set = [];

  if (null == descriptor) {
    descriptor = {};
  }

  if (true == isArray(descriptor)) {
    tmp = descriptor;
    descriptor = {};
    Object.keys(tmp).map(function (key) {
      descriptor[key] = function (v) {
        node[key] = v;
      };
    });
  }

  // proxy read only
  for (prop in node) {
    ~function (prop) {
      var setter = descriptor[prop];

      if ('function' != typeof setter) {
        setter = function (value) {
          return node[prop] = value;
        };
      }

      if ('function' == typeof node[prop]) {
        setter = noop;
      }

      define(obj, prop, {
        enumerable: false,
        get: function () {
          var value = node[prop];
          if ('function' == typeof value) {
            return value.bind(node);
          } else {
            return value;
          }
        },
        set: setter.bind(node)
      });

      set.push(prop);
    }(prop);
  }

  // set descriptors with node
  // as new scope
  for (prop in descriptor) {
    ~function (prop) {
      var setter = null;

      if (-1 != set.indexOf(prop)) {
        return;
      }

      setter = descriptor[prop];

      if ('function' != typeof setter) {
        return;
      }

      define(obj, prop, {
        enumerable: true,
        set: setter.bind(node)
      });


      set.push(prop);
    }(prop);
  }

  return obj;
}
