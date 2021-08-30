---
title: 'map, filter, reduce'
date: 2021-08-05 16:21:13
category: '함수형프로그래밍'
draft: false
---

```javascript
const product = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000}
];
```

## map
```javascript
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

// let names = [];
// for(const p of products) {
//   names.push(p.name);
// }
// log(names);
log(map(p => p.name, products));
// let price = [];
// for(const p of products) {
//   price.push(p.name);
// }
// log(price);
log(map(p => p.price, products));
```

## filter
```javascript
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if(f(a)) res.push(a);
  }
  return res;
};

// let under20000 = [];
// for(const p of prodcuts) {
//   if (p.price < 20000) under20000.push(p);
// }
// log(...under20000); // 20000 미만 값들이 나옴
log(filter(p => p.price < 20000, products)); // 20000 미만 값들이 나옴

// let over20000 = [];
// for(const p of prodcuts) {
//   if (p.price >= 20000) over20000.push(p);
// }
// log(...over20000); // 20000 이상 값들이 나옴
log(filter(p => p.price >= 20000, products)); // 20000 이상 값들이 나옴
```

## reduce
```javascript
const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total = total + n;
}
log(total); // return 15

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc + a);
  } 
  return acc;
};

const add = (a, b) => a + b;

log(reduce(add, 0, [1, 2, 3, 4, 5])); // return 15
log(reduce(add, [1, 2, 3, 4, 5])); // return 15

```

- map, filter, reduce 함수는 고차함수이다.
- 함수를 값으로 다루면서 원하는 시점에서 인자를 적용한다.

출처
- https://www.inflearn.com/users/31989
