## PC
### 上拉刷新
- scrollTop <= 0

### 下拉刷新
- scrollHeight <= scrollTop + clientHeight

## 移动端


### 下拉刷新
```javascript
var _element = document.getElementById('refreshContainer'),
    _refreshText = document.querySelector('.refreshText'),
    _startPos = 0,  // 初始的值
    _transitionHeight = 0; // 移动的距离
// start

_element.addEventListener('touchstart', function(e) {
  _startPos = e.touches[0].pageY; // 记录初始位置
  _element.style.position = 'relative';
  _element.style.transition = 'transform 0s';
}, false);

_element.addEventListener('touchmove', function(e) {
  // e.touches[0].pageY 当前位置
  _transitionHeight = e.touches[0].pageY - _startPos; // 记录差值

  if (_transitionHeight > 0 && _transitionHeight < 60) { 
      _refreshText.innerText = '下拉刷新'; 
      _element.style.transform = 'translateY('+_transitionHeight+'px)';

      if (_transitionHeight > 55) {
          _refreshText.innerText = '释放更新';
      }
  }                
}, false);

_element.addEventListener('touchend', function(e) {
  _element.style.transition = 'transform 0.5s ease 1s';
  _element.style.transform = 'translateY(0px)';
  _refreshText.innerText = '更新中...';
  // todo...
}, false);
```