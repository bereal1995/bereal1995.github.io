---
title: '파이프라인, async/await 차이점..'
date: 2021-08-10 16:21:13
category: '함수형프로그래밍'
draft: false
---

## 개요
- 파이프라인이나 체이닝이나 이런 부분이 있고 async/await가 있다.
- 파이프라인이나 체이닝이 해결하고자 문제와 async/await 해결하고자 하는 문제는 전혀 다르다.
- async/await는 해결하고자 하는 부분은 표현식으로 갇혀있는 Promise, then.then.then 으로 다루기 어렵다 보니 문장형으로 다루기 위한 목적이다.
- 파이프라인, 이터러블 중심 프로그래밍 해결하고자 하는 부분은 비동기, 명령형 프로그래밍이 아니라 안전하게 함수를 합성하기 위한 목적이다.
- 서로 해결하고자 하는 부분이 다른 2개의 기술이다.
- 파이프라인은 동기, 비동기 부분이 아니라 어떠한 코드를 리스트를 다루면서 효과적으로 함수들을 조합하고 로직을 테스트, 유지보수 하기 쉽게 하기 위한 목적이다.
- async/await는 비동기 상황을 동기적인 문장으로 풀어서 표현할 때 사용하는 기법이다.
- 이 둘이 비슷하게 느껴지는 이유는 파이프라인으로 코딩했을때도 동기적일때와 비동기적일때의 모습이 비슷하기 때문에 생각 할 수 있지만 사실은 그렇지 않다.
- 비동기적인 코드를 동기적으로 표현하기 보다는 안전하게 함수 합성을 하기 위함이다.

## 파이프라인
```javascript
function f5(list) {
return go(list,
  L.map(a => delayI(a * a)),
  L.filter(a => delayI(a % 2)),
  L.map(a => delayI(a + 1)),
  C.take(3),
  reduce((a, b) => delayI(a + b)));
}

go(f5([1, 2, 3, 4, 5, 6, 7, 8]), a => log(a, 'f5'));
```
- delayI 부분은 비동기 상황이다.
- 동기적으로 코드가 표현이 되어있다.
- 하지만 사실 이 코드가 해결한 부분은 복잡한 for, if, 로직을 쉽고 안전하게 코딩을 하기 위함이다.

## async/await
```javascript
async function f6(list) {
    let temp = [];
    for (const a of list) {
      const b = await delayI(a * a);
      if (await delayI(b % 2)) {
        const c = await delayI(b + 1);
        temp.push(c);
        if (temp.length === 3) break;
      }
    }
    let res = temp[0], i = 0;
    while (++i < temp.length) {
      res = await delayI(res + temp[i]);
    }
    return res
}

go(f6([1, 2, 3, 4, 5, 6, 7, 8]), log);
```

- async/await는 함수 안에서 문장형으로 사용하기 위해서 사용한다.
- f6은 delayI가 없어도 promise를 리턴한다.
- 때문에 동기, 비동기가 없는 상황에서는 async/await부분을 모두 제거해야한다.

출처
- https://www.inflearn.com/users/31989
