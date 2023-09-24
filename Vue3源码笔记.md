<a name="ybhY1"></a>
## vNode创建，渲染，生成dom过程
![](https://cdn.nlark.com/yuque/0/2023/jpeg/29453752/1694182960804-f642695e-4cf7-4447-85e7-3ba8ddd5d47b.jpeg)
<a name="aFjS5"></a>
### 组件的vnode是什么样的，patch接收组件的vnode之后是怎么处理的？
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29453752/1694353503064-7308a426-dc99-4cee-900a-2bfafe0edede.png#averageHue=%2320242a&clientId=u84ea1da4-a44d-4&from=paste&height=309&id=u78731cfb&originHeight=309&originWidth=198&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35734&status=done&style=none&taskId=u49f57ae0-f3a8-4167-8803-5300738f02f&title=&width=198)

处理过程： pacth接收组件的vnode，新旧vnode如果相等，则不处理，新旧vnode如果type不相同，则unmount旧vnode，然后会根据vnode的不同类型进入到相应的处理函数， 例如vnode是一个组件，会进入到处理组件节点的函数，创建组件实例，设置组件实例，设置并运行带副作用的渲染函数，在这个副作用渲染函数中，会去创建组件的副作用更新函数，当组件未挂载，直接挂载组件，并递归的去patch子树。当组件已经挂载，则会调用副作用函数去更新组件。

<a name="UZo1u"></a>
### vnode节点类型有哪些，挂载dom和挂载组件有什么不一样
节点类型：<br />Element(元素节点)，Text(文本节点)，Comment(注释节点)，Fragment(片段节点)，Component(组件节点)，Portal(传送门节点)<br />挂载dom，patch的时候走processElement，会将vnode渲染成对应的dom节点。先创建当前节点dom，若有子节点，再去挂载子树，进行递归patch子节点，若无子树，则直接设置元素文本。<br />挂载component， patch的时候走processComponent，会将vnode渲染成相应的vue组件实例，在设置并运行带副作用的渲染函数时去递归的patch子树。

<a name="LWPM0"></a>
### 不同类型的节点是怎么挂载的：
```markdown
- 例如：
  ```javascript
  <App></App>
  <h1>title</h1>
  ```
```
针对组件类型App, 挂载的时候Vue会先去查找定义为App的Vue组件，并创建，设置为组件实例，再挂载到对应的dom元素上，再对组件内部的元素进行模版渲染。而针对h1,就是普通的元素节点的挂载。

<a name="LX7Ns"></a>
### 生成vnode的时候，Vue3做了哪些优化？

1. 静态树提升，Vue3能识别并提升静态树，即那些在组件渲染期间不会发生改变的部分，这些静态树只会在首次渲染的时候进行计算，然后被缓存以供以后重新渲染时使用，减少了不必要的计算和内存开销。
2. 静态节点标记，Vue3能标记静态节点，并在重新渲染的时候跳过对这些静态节点的处理。
3. Fragments支持，Vue3允许多根标签，不需要将多个根节点放在一个父节点下面。
4. 缓存组件节点，Vue3缓存了组件节点的VNode，以避免不必要的组件实例话和渲染。
<a name="mm2Au"></a>
### 多根标签，Vue3中是如何支持的
Fragment标记片段的引入。在处理具有多个根元素的组件模板时，Vue3会将模板中的每个根级标签都编译为一个Fragment标记片段，将这些片段作为一个数组，来创建渲染函数。
<a name="TupCl"></a>
### 组件更新是如何进行的
```javascript
// 组件的更新，例如：
<div id="app">
	<child-component></child-component>
</div>


// child-component
<button @click="count++">点击更新子组件{{count}}</button>
```
当执行到child-component挂载的时候，会多执行一个解析child-component, 然后创建内部子节点Vnode，获取到，subTree，再通过patch挂载到container中
<a name="R1QNg"></a>
### 元素更新是如何进行的
例如:<input v-model="inputVal" />元素标签，当inputVal的值发生改变时，触发set，最终会触发到effect.run()函数去调用闭包里的组件更新函数，重新渲染新子树，再用新旧子树进行patch比对。<br />比如v-modal绑定的inputVal值发生变化，对比结果dirs指令有区别，则会用新的val去替换旧val（未触发diff算法）

而当新旧vnode节点的标签类型，key值，命名空间等属性不相同时，则会触发diff算法。例如：<br /><div key='1'>111</div> => <div key='1'>111</div><div key='2'>222</div>, diff算法比对如下题 **diff算法是如何运行的 **所示

<a name="wyotX"></a>
### diff算法是如何运行的
patch中触发diff算法，进入patchKeyedChildren函数，头头对比，尾尾对比，判断是否有新挂载的节点，判断是否有需要删除的节点，最后进行未知子序列的比对。<br />定义一个变量i从头开始，即i = 0, <br />定义新旧vnode节点索引e1 = oldVnode.length - 1; e2 = newVnode.length - 1
<a name="kzVXM"></a>
#### 头头对比
```javascript
while(i <= e1 && i <= e2) {
  n1 = oldVNode[i]
  n2 = newVNode[i]

  if(sameType(n1, n2)) {
    patch(n1, n2, container)
  } else {
    break;
  }

  i++
}
```
<a name="Mm7UG"></a>
#### 尾尾对比
```javascript
while(i <= e1 && i <= e2) {
  n1 = oldVNode[e1]
  n2 = newVNode[e2]

  if(sameType(n1, n2)) {
    patch(n1, n2, container)
  } else {
    break;
  }

  e1--;
  e2--;
}
```
<a name="U6AXL"></a>
#### 判断是否有新挂载的节点
```javascript
//  e1 < i <= e2  情况下，旧节点已比对完，有多余新节点需要进行挂载

if(i > e1 && i <= e2) {
  while(i <= e2) {
    
    patch(null, newVNode[i])

    i++;
  }
}
```
<a name="DNCD3"></a>
#### 判断是否有需要删除的节点
```javascript
// e2 < i <= e1	   情况下，新节点已比对完，有多余旧节点需要删除
if(i > e2 && i <= e1){
  while(i <= e1) {
    
  	unmount(oldVNode[i])

    i++;
  }
}
```
<a name="VTzku"></a>
#### 未知子序列的比对
总结：未知子序列的比对就是先建立一个map对新子序列进行key到index 的映射，再建立一个map进行新节点索引到旧节点索引的映射并进行patch比对， 若新节点处理完毕，还有剩余旧子节点，直接unmount旧子节点。然后创建新旧索引映射的最长递增子序列。从新子序列尾开始遍历，若映射值为0，说明旧子序列中不存在该节点，直接挂载新节点，若映射值不为0且映射值在最长递增子序列中，直接跳过，不在最长递增子序列中，进行移动(移动到第一个跳过未处理的子节点前面)
```javascript
//  oldVNode: [e, a, b, c]
//  newVNode: [m, a, b, k]


// 1. 映射新节点key:index
// e1: 旧vnode的尾
// e2: 新vnode的尾
s1 = i;
s2 = i;
for(i = s2; i < e2; i++) {
  keyToNewIndexMap(newVNode.key, i)
}

// 2. 新节点到旧节点映射 newIndex: oldIndex
patched = 0; shouldBePatch = e2 - s2 + 1
for(i = 0; i < shouldBePatch; i++) newIndexToOldIndex[i] = 0

for(i = s1; i < e1; i++){
  oldVNode = c1[i]
	let newIndex;
  if(oldVNode.key) newIndex = keyToNewIndexMap.get(oldVNode.key)
  if(patched > shouldBePatch || newIndex === undefined) {
    unmount()
  } else {
    newIndexToOldIndexMap[newIndex - s2] = i + 1
    patch()
    patched++
  }
}

// 3. 挂载/移动vnode节点
// 过程：
// 3.1. 获取到最长递增子序列
// 3.2. 从新子序列的最后一位开始， 新旧索引对应的为0， 直接挂载新节点
// 3.3. 判断新旧索引对应的值是否在最长递增子序列中，在则直接跳过
// 3.4. 判断新旧索引对应的值是否在最长递增子序列中，不在则进行移动
const increasingNewIndexSequence = getSequence(newIndexToOldIndexMap)
let j = increasingNewIndexSequence.length - 1
for(i = sholdBePatch - 1; i >=0; i--) {
  if(newIndexToOldIndexMap[i] === 0) mount()
  else {
    if(j < 0 || increasingNewIndexSequence[j] !== i) {
      move()
    } else {
      j--
    }
  }
}

```
  
<a name="G03Nq"></a>
## 响应式原理
![](https://cdn.nlark.com/yuque/0/2023/jpeg/29453752/1694070174806-57c7ccf4-758d-433a-8c11-7fb0be9bc8cc.jpeg)

<a name="iawI4"></a>
## 计算属性
计算属性computed可以传入一个函数(默认为getter)， 也可以穿入一个对象。使用computed会创建一个computedRefImpl类，在构造函数中创建ReactiveEffect。当其所依赖的属性值发生改变后，会触发重新计算数据更新，而没有发生改变时，会返回上一次计算的缓存值。这个缓存机制的实现主要是通过一个变量dirty来控制的。当访问计算属性时，触发getter，在dirty为false的时候，返回缓存值，为true的时候，重新计算并将dirty变为false，表示不需要再更新了。当访问setter 的时候，表示依赖值发生改变，将dirty变为true。<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/29453752/1694081044692-0a7c6e21-fde7-46af-9588-c42274797a58.jpeg)

<a name="uPfLi"></a>
## 侦听属性
侦听属性watch，接收三个参数source, cb, options, source可以是ref，reactive，function或者响应式对象数组。会先去处理source，创建出getter函数，然后通过reactiveEffect创建出响应式副作用对象effect, 然后effect.run 先获取到oldValue，当监听的source发生改变时，再调用effect.run()获取到新值，去触发cb回掉函数，回调函数触发完成再将newVal复制给oldValue。

而这个更新触发cb的过程，执行机制是根据options中配置的flush来决定的，如果flush=‘sync’，就是直接同步执行，当flush为post，会将调度执行函数job推到queuePostRenderEffect微任务队列中异步执行。默认flush为pre，会将job推到queueJob队列中异步执行。

![](https://cdn.nlark.com/yuque/0/2023/jpeg/29453752/1694141122897-20b5c9ba-6f94-41a1-bbe0-65ebe0a5d10a.jpeg)
<a name="I1kr3"></a>
## 生命周期
![](https://cdn.nlark.com/yuque/0/2023/jpeg/29453752/1694940227841-3b80ace5-c140-4e6a-bb00-ad410e6c46d4.jpeg)
<a name="O6coc"></a>
## 模版解析
![](https://cdn.nlark.com/yuque/0/2023/jpeg/29453752/1695541725018-de50f5eb-648d-4fd6-92b7-26ded070f052.jpeg)
<a name="PCuIz"></a>
## 
<a name="VrIhH"></a>
## 我们平时开发页面就是把页面拆成一个个组件，那么组件的拆分粒度时越细越好吗？为什么？
组件的拆分粒度并没有一个固定的标准，这取决于项目的规模，复杂度。
```markdown
- 较粗的组件拆分粒度
  优点：
    1. 减少了组件的结构，依赖关系，降低了复杂度
    2. 更容易维护，因为组件较大，只需要操作一个组件
    3. 可以提高性能，因为较少的组件加载和渲染开销
  缺点：
    1. 导致组件过于臃肿，不易理解和维护
    2. 难以实现组件的复用，因为组件可能包含了多个不相关的功能

- 较细的组件拆分粒度
  优点：
  	1. 提高了代码的可维护性，因为组件相对较小，更容易理解和修改
  	2. 可以很好的实现高程度的组件复用
  	3. 更容易进行并行开发，不同团队成员可以独立开发不同的组件
 
  缺点：
    1. 增加了组件间的依赖关系，需要更多的通信机制
    2. 可能导致性能问题，因为有许多小组件需要加载和渲染
 



所以拆分组件的粒度应该根据具体情况来决定。项目初期可以进行合理的拆分，然后随着项目的发展和需求的变化，不断调整组件粒度。
拆分原则：
1. 遵循单一指责原则： 确保每个组件只负责一个特定的功能或展示一个特定的内容
2. 关注可维护性：确保组件的拆分不会导致过于复杂或难以维护的代码
3. 根据复用性需求来拆分：如果某个功能或组件可能在多个页面或项目中被复用，可以更细致地拆分为可重用组件。

```
<a name="nfNN8"></a>
## v-for编写列表的时候key能用来遍历索引index吗，为什么？
不能用。原因如下

- 不稳定性：使用索引作为‘key’， 若列表项中的数据发生变化时，‘key’也会变化。比如在列表的首部添加一项，就会导致Vue重新渲染所有的元素。
- 不唯一性：索引‘index’ 本质上不是一个唯一的标识符，。如果数据中存在重复的值，或在多个v-for中使用相同的索引变量，就会导致‘key’不唯一，引发奇怪的行为或者渲染错误。
- 不适用于有状态的组件：如果列表项包含有状态的子组件，使用索引key可能会导致子组件状态的混乱，因为vue无法正确的跟踪和更新每个子组件。

