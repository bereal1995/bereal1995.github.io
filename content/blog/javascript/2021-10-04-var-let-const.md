---
title: 'var, let, const 차이'
date: 2021-10-04 16:21:13
category: '자바스크립트'
draft: false
---

> 3가지 모두 변수를 선언하는 키워드이다. 여기서 let, const는 ES6이후 등장했다.

## 재선언
- var은 재선언이 가능
- let, const는 재선언이 불가능

```javascript
var name = 'jo';
var name = 'jun'; // 가능하다.

let name = 'jo';
let name = 'jun'; // 에러
```

## 재할당
- var, let은 재할당이 가능하지만, const는 상수와 같은 고정값을 선언할 때 사용하므로 재할당이 불가능하다.

```javascript
const COLOR_PRIMARY = '#000';

COLOR_PRIMARY = '#fff'; // 에러
```

- 하지만 const가 객체 변수일 경우 객체 내의 프로퍼티가 추가, 변경, 삭제 되는것 까지는 막지 않는다.

```javascript
const obj = { name: 'jo'};

obj.name = 'kim' // { name: 'kim' } 이 외에도 추가, 삭제도 가능하다.
```

## 스코프
- var은 함수 스코프를 가진다.
- let, const는 블록 스코프를 가진다.

## 호이스팅
- var은 함수 스코프의 최상단으로 호이스팅이 되고 선언과 동시에 값이 undefined로 초기화 된다.

```javascript
console.log(num); // undefined
var num = 1;
console.log(num) // 1
```

- let, const는 블록 스코프의 최상단으로 호이스팅이 되고 값이 할당되기 전까지 초기화 되지 않는다.

```javascript
console.log(str); // 에러
let str = "Hello";
console.log(str); // Hello
```

## 요약

### var
- 함수 스코프를 가진다.
- 재선언이 가능
- 재할당 가능
- 함수 스코프의 최상단으로 호이스팅 선언과 동시에 undefined로 초기화
- var은 함수 스코프 호이스팅, 재선언 등 버그 발생을 시킬 가능성이 높아 let, const를 사용하는것이 좋다.

### let
  - 블록 스코프를 가진다.
  - 재선언이 불가능
  - 재할당 가능
  - 블록 스코프의 최상단으로 호이스팅, 값이 할당되기 전까지는 어떤 값으로도 초기화되지 않는다.
### const
  - 상수와 같은 고정값을 선언할 때 사용.
  - 블록 스코프를 가진다.
  - 재선언이 불가능
  - 재할당이 불가능
  - 블록 스코프의 최상단으로 호이스팅, 값이 할당되기 전까지는 어떤 값으로도 초기화되지 않는다.
  - 초기 값을 반드시 할당 해야 함.

참고자료출처
- https://ko.javascript.info/variables