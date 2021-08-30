---
title: '제너레이터'
date: 2021-08-05 16:21:13
category: '함수형프로그래밍'
draft: false
---

## 제너레이터
- 이터레이터이자 이터러블을 생성하는 함수

```javascript
function *gen() {
  yield 1;
  yield 2;
  yield 3;
  
  return 100;
}
let iter = gen();
log(iter.next()) // return => {value: 1, done: false};

for(const a of gen()) log(a); //return => 1, 2, 3
```
- 제너레이터는 이터레이터를 리턴하는 함수이다.
- yield를 통해서 몇번의 next로 값을 꺼내줄지 설정할 수 있다.
- 순회도 가능하다.
- 마지막 값에 return 값을 줄 수 있다. * return값은 순회할때는 안나온다.
- 자바스크립트에서는 어떠한 값이든 이터러블이면 순회 할 수 있다.   
제너레이터는 순회할 수 있는 값을 만들 수 있기 때문에 이를 통해서 어떠한 값이든 순회 할 수 있게 만들 수 있는 것이다.

## odds
```javascript
function *infinity(i = 0) {
  while (true) yield i++;
}
function *limit(l, iter) {
  for(const a of iter) {
    yield a;
    if (a == l) return;
  }
}
function *odds(l) {
  for(const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}
let iter2 = odds(10);

for(const a of odds(40)) log(a); // 1~40 사이 홀수만 출력
```
- infinity는 next()를 호출할때마다 1씩 증가한다.
- limit은 최대값까지 iter 값들을 출력
- odds는 이제 limit에 최대값, infinity(1)을 넣어서 infinity가 최대값 까지만 호출되고, 그 값 중 홀수만 출력할 수 있게 설정했다.


출처
- https://www.inflearn.com/users/31989
