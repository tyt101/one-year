'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

// 执行babel index.js --out-file babel_test.js  可生成装饰器装饰后的babel_test.js


// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}
function observerCount(fnName) {
  return function (target, key) {
    var prev = target[key];
    Object.defineProperty(target, key, {
      set: function set(next) {
        target[fnName](prev, next);
        prev = next;
      }
    });
  };
}
function onClickDecorator(target, name, descriptor) {
  // target: Button.prototype
  // name: 修改的目标属性属性名
  // descriptor:
  console.log('=======', target, '====', name, '===', descriptor, '========');
  var originMethod = descriptor.value;
  console.log(originMethod, 'TTT:', this.name111, 'this.name11');
  descriptor.value = function () {
    console.log('我是现在的逻辑', this.name111);
    this.name111 = 1234;
    return originMethod.apply(this, arguments);
  };
  return descriptor;
}
// 将装饰器“安装”到Button类上

var Button = classDecorator(_class = (_class2 = function () {
  // Button类的相关逻辑


  // 装饰属性====有问题
  // @observerCount('onCountChange')
  // static count

  // onCountChange(prev, next) {
  //   console.log(">>>>prev:", prev)
  //   console.log(">>>>next:", next)
  // }
  function Button(name) {
    _classCallCheck(this, Button);

    this.name111 = name;
    this.human = 'name' + name;
  }

  _createClass(Button, [{
    key: 'onClick',
    value: function onClick() {
      console.log('我是Func原有逻辑');
    }
  }]);

  return Button;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onClick', [onClickDecorator], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClick'), _class2.prototype)), _class2)) || _class;

// 验证装饰器是否生效


var btn = new Button('aaa');
btn.onClick();
console.log(Button.count, '=========');
console.log('Button 是否被装饰了：', Button.hasDecorator);
