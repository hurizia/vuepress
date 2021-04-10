---
title: VUE CODING BEST PRACTICE
date: 2021-4-6
tags: 
  - front-end
  - vue
  - coding
author: swjang
location: Seoul  
---

Vue.js 는 인터페이스 구축을위한 강력한 오픈 소스 JavaScript 프레임 워크이며 S단일 페이지 애플리케이션을 완벽하게 생성 할 수 있습니다.
이 언어를 사용하여 풍부한 응용 프로그램을 만들 수 있습니다. 효율성을 높이기 위해 코드를 Vue.js와 혼합 할 수 있습니다. 가볍기 때문에 Vue.js는 Angular 및 React와 같은 프레임 워크에 비해 장점이 있습니다. 
빠른 작성을 허용하는 것 외에도 뛰어난 커뮤니티 지원과 거대한 라이브러리가 있으며 Vue.jS는 다른 JavaScript 프레임 워크 중에서 가장 쉬운 프런트 엔드 프레임 워크이므로 사용하기 매우 편리합니다. 
그렇다면 더 나은 결과를 위해 따르고 싶은 Vue.js 모범 사례는 무엇입니까? Vue.js 는 정확히 어떻게 작동합니까?

## 1. 컴포넌트에서 데이터 속성 사용
이것은 가장 중요한 Vue.js 모범 사례 중 하나입니다.
component의 데이터 속성을 간단한 객체로 `data` 속성이 아닌 객체를 반환하는 함수로 사용해야합니다. `data` 값이 개체이면 component의 모든 인스턴스에서 공유됩니다.

```js
data: {

  title: ''

}
```

여기서 구성 요소의 다른 위치에서 제목 속성 을 사용하려는 경우 값을 변경 한 경우 개체를 사용하고 구성 요소의 모든 인스턴스가 동일한 것을 참조 할 때 구성 요소의 모든 위치가 반영됩니다. 데이터 개체, 한 부분에서 제목을 변경하면 다른 모든 부분의 제목도 변경됩니다.
구성 요소의 모든 부분이 데이터 속성 의 다른 인스턴스를 갖도록 데이터 속성을 함수로 사용해야 합니다.

```js
data: function () {

    return {
        title: ''
    }

}
```

## 2. Kebab-Case 사용
 
Vue.js의 작동 방식을 알고 있다면, 사용자 이벤트 이름을 kebab-case로 제공하지 않으면  내부적으로 kebab-case로 자동 변경되므로 사용자 정의 이벤트 이름을 작성하는 동안 항상 kebab-case를 사용해야한다는 것을 이미 알고 계실 것입니다. 
다음은 parent와 child component간의 데이터 공유 예입니다.

Child html:

```js
<button v-on:click="$emit('increase-count', 1)">Increment</button>
```

Parent html:

```js
<counter … v-on:increase-count="increaseCounter"></counter>
```

Parent js:

```js
methods: {
    increaseCounter: function (count) {
        this.value += count
    }
}
```

## 3. 지시에 대한 규칙
항상 `v-for` 지시문과 함께 `:key` 속성을 사용하십시오. 이 속성은 각 목록 항목의 고유성을 확인하는 데 사용됩니다. Vue의 가상 DOM은 목록의 각 항목에 VNode를 만듭니다. 따라서 목록 항목에 키 속성이 없으면 Virtual DOM은 각 항목을 개별적으로 식별하지 않습니다. 따라서 가상 DOM이 특정 목록 항목에 대한 변경 사항을 감지하는 것은 어려울 것입니다.

```js
<div v-for="item in items" :key="item.id" >
    {{item.value}}
</ div>
```

## 4. 키 속성에 대한 규칙
`:key` 속성 값에 항상 배열의 인덱스가 아닌 고유 ID를 사용하십시오. 아시다시피 배열은 변경 가능하며 배열에서 항목을 추가하거나 제거하는 동안 모든 항목의 인덱스를 변경할 수 있습니다. 

```js
<div v-for="item in items" :key="item.id" >
    {{item.value}}
</ div>
```


## 5. V-에 대한 규칙
따라야 할 또 다른 중요한 Vue.js 모범 사례는 V-에 대한 규칙입니다. v-for가 v-if보다 우선 순위가 높으므로 v-for와 함께 v-if를 사용해서는 안됩니다. 다음 예를 참조하십시오.

```js
<ul>
    <li
    v-for="자동차 속의 자동차"
    v-if="car.isActive"
    :key="car.id"
    >
    {{car.model}}
    </li>
</ul>
```

이 경우 목록의 모든 항목에 대해 루프가 반복 된 다음 v-if 조건을 확인합니다. 따라서 이것은 좋은 습관이 아닙니다.
대신, 렌더링하기 전에 목록을 계산하여 활성 자동차 만 반복되도록 할 수 있습니다.

```js
<ul>
    <li
    v-for="activeCars의 자동차"
    v-if="car.isActive"
    :key="car.id"
    >
    {{car.model}}
    </li>
</ul>


computed: {
    activeCars : function () {
        return this.cars.filter(function (car) {
            return car.isActive;
        })
    }
}
```


## 6. 컴포넌트 속성 사용
데이터 변경에 대해 메서드 호출을 사용하는 것보다 계산 된 속성을 사용하는 것이 좋습니다.
계산 된 속성은 종속성에 따라 캐시됩니다. 계산 된 속성은 종속성 중 일부가 변경된 경우에만 재평가됩니다. 
이에 비해 메서드 호출은 다시 렌더링이 발생할 때마다 항상 함수를 실행합니다.

Using computed:

```js
var vm = new Vue({
    el: '#example',
    data: {
        firstName: "John",
        lastName:"Doe"
    },
    computed: {
        setFullName: function () {
            return this.firstName + ' ' + this.lastName
        }
    }
})
```

Using methods:

```js
methods: {
    setFullName: function () {
        return  this.firstName + ' ' + this.lastName
    }
}
```

## 7. 다중 V- 조건 사용
여러 연속 요소를 렌더링하기 위해 여러 `v-if` 조건을 사용하지 마십시오. `<div>` 태그를 사용하여 요소를 래핑 할 수 있습니다. 그러나 할 일이없는 추가 요소를 제공합니다. 따라서 `<template>` 태그를 사용하여 요소를 래핑 할 수 있습니다.

```html
<template v-if="true">
 <p>Paragraph 1</p>
 <p>Paragraph 2</p>
 <p>Paragraph 3</p>
</template>
```

## 8. 키 속성 사용
재사용 가능한 요소를 사용하여 구별 하려면 키 속성을 사용하십시오. 토글에 동일한 요소를 사용한다고 가정하십시오. 무언가를 작성한 다음 다른 옵션으로 전환하면 키 속성을 사용 하여 구별 하지 않기 때문에 이전 텍스트가 여전히 남아 있습니다. 키 속성을 사용하면 비어 있으며 Vue.js가 작동하는 방식입니다.
사용자가 여러 로그인 유형간에 전환 할 수 있도록 허용하는 경우 :

```html
<template v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username">
</template>

<template v-else>
    <label>Email</label>
    <input placeholder="Enter your email address">
</template>
```

그런 다음 위 코드 에서 loginType 을 전환 해도 사용자가 이미 입력 한 내용은 지워지지 않습니다. 두 템플릿 모두 동일한 요소를 사용하기 때문에 `<input>` 은 대체되지 않고 자리 표시 자만 사용 됩니다.

```html
<template v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username" key="username-input">
</template>

<template v-else>
    <label>Email</label>
    <input placeholder="Enter your email address" key="email-input">
</template>
```

이제 이러한 입력은 토글 할 때마다 처음부터 렌더링됩니다.



## 9. Array 내 변경 감지
아시다시피 Vuejs에는 Vue가 배열 또는 객체 내에서 변경 사항을 감지 할 수없는 몇 가지 제한 사항이 있습니다. 이것은 Vue.js 모범 사례를 따라야합니다.

Array:

인덱스로 항목을 직접 설정하는 경우 (예 : vm.values​​[index] = newValue)
이에 대한 세 가지 해결책이 있습니다.

```js
Vue.set(vm.values, index, newValue)
vm.values.splice(index, 1 , newValue)
vm. $set(vm.values, index, newValue)
```

Object:

```js
var vm = new Vue ({
 data: {
    profile: {
        firstName: "John"
    }
 }
})
```

새 속성 추가를위한 솔루션 :

```js
Vue.set(vm.profile, 'lastName' ,"Doe")
vm.$set(vm.profile, 'lastName' ,"Doe")
```

## 10. 속기 사용
우리는 지시어에 항상 속기를 사용하거나 절대 사용해서는 안됩니다. 즉, 약칭과 지시문의 전체 이름을 혼용해서는 안됩니다. 

지침 shorthands (: for v-bind:, @ for v-on: and # for v-slot) 항상 또는 전혀 사용되어야한다.


## 참고 
- [Top 10 Vue.js Best Practices](https://www.innofied.com/top-10-vus-js-best-practices/)