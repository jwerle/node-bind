node-bind
======

Bind an object to a node

## install

```sh
$ component install jwerle/node-bind
```

## usage

Property proxy:

```html
<div id="node"></div>
```

Creating a default property binding:

```js
var bind = require('node-bind');
var node = document.getElementById('node');
var obj = bind(node);

obj.innerHTML = "beep";

```

yields the follow effect:

```html
<div id="node">beep</span></div>
```

Creating a transformation property binding:

```js
var bind = require('node-bind');
var node = document.getElementById('node');
var morph = bind(node, {
  innerHTML: function (html) {
    return '<span style="color: cyan;">'+ html +'</span>';
  }
});

morph.innerHTML = 'boop';
```

yields the following:

```html
<div id="node">
  <span style="color: cyan;">boop</span>
</div>
```

## license

MIT
