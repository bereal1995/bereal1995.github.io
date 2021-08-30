---
title: '함수형 프로그래밍 #02'
date: 2021-08-16 16:21:13
category: '함수형프로그래밍'
draft: false
---

## 목표
- 명령형 코드를 함수형으로 표현해보자!

### 우선 reduce를 최대한 단순하게 만든다.
어떤 로직이든 reduce로 만들게 되고, reduce의 보조함수가 복잡해지는 경향이 있다.  
이런 부분들은 명령형 습관 남아있어서 그렇다.
```javascript
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 }
];

console.log(_.reduce((total, u) => total + u.age, 0, users));
// 이렇게 하나의 리듀스를 복잡하게 처리하는 것 보단

const add = (a, b) => a + b;
console.log(_.reduce(add, L.map(u => u.age, users)));
// 이렇게 리듀스를 처리하기 전에 데이터를 가공해주는것이 좋다!

const ages = L.map(u => u.age);
console.log(_.reduce(add, ages(users)));
// 이런식으로도 표현 가능하다.
```

```javascript
console.log(
  _.reduce((total, u) => u.age >= 30 ? total : total + u.age,
    0,
    users));
// 이런식 코드는 조건이 바뀔때 조금 더 복잡해진다.

console.log(
  _.reduce(add,
    L.map(u => u.age,
    L.filter(u => u.age < 30, users))));

console.log(
  _.reduce(add,
    L.filter(n => n < 30,
      L.map(u => u.age, users))));
// 이런 코드는 filter를 한줄 추가하는식으로 커스텀마이징이 쉬워진다.
```

### 이제 명령형 코드를 함수형으로 표현해보자

#### 쿼리 스트링 만들기
```javascript
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD'
};
// a=1&c=CC&d=DD 이런식으로 표현하는 함수를 만들어보자

function query1(obj) {
  let res = '';

  for (const k in obj) {
    const v = obj[k];
    if (v === undefined) continue;
    if (res !== '') res += '&';
    res += k + '=' + v;
  }

  return res
}
console.log('query1',query1(obj1));
```
- 이런식의 코드를 함수형으로 표현해보자 한다면

```javascript
const join = _.curry((sep, iter) =>
        _.reduce((a, b) => `${a}${sep}${b}`, iter));

const query4 = _.pipe(
  Object.entries,
  L.reject(([_, v]) => v === undefined),
  L.map(join('=')),
  join('&')
)
console.log('query4',query4(obj1));
```
- 이런식으로 훨씬 깔끔하게 표현이 가능하다.

#### 이번에는 반대로 쿼리스트링을 오브젝트로 변환하는 함수를 만들어보자
```javascript
const split = _.curry((sep, str) => str.split(sep));

const queryToObject = _.pipe(
  split('&'),
  L.map(split('=')),
  L.map(([k, v]) => ({ [k]: v })),
  _.reduce(Object.assign)
);

console.log(queryToObject('a=1&c=CC&d=DD'));
```
- map을 통해 먼저 가공을해서 reduce를 최대한 단순하게 표현한다.
- 이렇게 잘게 쪼개서 표현해야 유지보수나 변경하기 훨씬 좋다.

소스 내용 출처
- https://www.inflearn.com/course/%ED%95%A8%EC%88%98%ED%98%95_ES6_%EC%9D%91%EC%9A%A9%ED%8E%B8
