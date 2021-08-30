---
title: '함수형 프로그래밍 #01'
date: 2021-08-13 16:21:13
category: '함수형프로그래밍'
draft: false
---

## 목표
- 문장형으로 이루어진 명령형코드를 함수형 프로그래밍으로 표현 해보자

### 명령형 코드 표현
```javascript
function f1(limit, list) {
  let acc = 0;
  for (const a of list) {
    if (a % 2) {
      const b = a * a;
      acc += b;
      if (--limit === 0) break;
  }
}
console.log('acc',acc);
}
f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```
- 홀수 n개를 뽑아서 제곱을 하는 값을 뽑는다.
- 명령형으로 작성된 코드 이다.

### 함수형 프로그래밍 표현
```javascript
const add = (a, b) => a + b;

function f2(limit, list) {
  _.go(list,
    L.filter(a => a % 2),
    L.map(a => a * a),
    L.take(limit),
    _.reduce(add),
    a => console.log('acc', a));
  }
f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```
- if를 filter로 수정하여 for문이 더 적게 실행된다.
- 값 변화 후 변수 할당을 map으로 해서 변수b에 값을 할당하면 부분을 제거한다.
- break를 take로 변경해주고 인자로 limit값을 넣어준다.
- 축약 및 합산을 reduce로 변경해준다.
- go함수로 감싸주면 파이프라인 형태로 읽기쉽게 표현이 가능하다.
- 이전에 명령형으로 작성된 코드에 비해 가독성이 좋다.
- 먼저 필터로 값을 걸러주고, 맵을 통해 제곱을 해준다음, 테이크로 리밋에 맞게 꺼내서, 리듀스로 합산을 해주고, 그 뒤 로그로 출력을 한다.

### 다른 예시
```javascript
// 명령형
function f3(end) {
  let i = 1;
  while (i < end) {
    console.log('i',i);
    i += 2;
  }
}
f3(10);

// 함수형
function f4(end) {
  _.go(
    L.range(1, end, 2),
    _.each(a => console.log('a',a)));
}
f4(10);
```
- while을 range로 추상화를 한다.
- range를 순회할 수 있게 each를 사용한다.
- while문과 동일한 효과를, 함수형 프로그래밍에서도 충분히 표현이 가능하다.
- 함수형프로그래밍에서 순수한영역(range부분)과 외부에 영향을 주는부분(each부분)이 나누어져 있다.

### 함수형 프로그래밍으로 별그리기, 구구단 표현

#### 별 그리기
```javascript
const join = sep => _.reduce((a, b) => `${a}${sep}${b}`);

_.go(
  L.range(1, 6),
  L.map(L.range),
  L.map(L.map(_ => '*')),
  L.map(join('')),
  join('\n'),
  console.log);
```
- range를 통해 원하는 만큼 별 숫자 값을 1차원 배열로 만들어준다.
- map함수를 통해 순서에 맞게 2차원 배열로 표현해준다.
- 만든 2차원 배열을 *문자열로 바꿔준다.
- 그 뒤에 2차원 배열을 합산해주고
- 1차원 배열을 줄바꿈하여 합산해준 뒤 콘솔에 출력한다.

#### 구구단
```javascript
_.go(
  _.range(2, 10),
  _.map(a => _.go(
    _.range(1, 10),
    _.map(b => `${a}x${b}=${a*b}`),
    join('\n'),
  )),
  join('\n\n'),
  console.log);
```
- 2~9 까지 1차원 배열을 만들어주고
- 1~9 까지 각각 2차원 배열을 만들어 준다.
- 2차원 배열에 각각 방에 'a*b = ab' 이런식으로 표현 해준다.
- 그뒤 2차원배열을 각각 줄바꿈을 하여 합산해주고
- 1차원배열을 2줄바꿈하여 콘솔에 출력해준다.

### 느낀점
#### 내가 생각하는 장점
- 가독성이 좋고 명확해서 내가 만든 코드를 시간이 지나서 보거나, 남이 만든 코드를 볼 때 유지보수하거나 수정하기 수월해 보인다. (결과를 예측하기 쉽다!)
- 함수를 조합하여 표현하기 때문에 기능을 수정할 때 편하다.
- 코드 재사용성이 매우 높다.
- 높은 수준의 추상화가 가능하다.
  - [여기서 추상화란..?](https://developer.mozilla.org/ko/docs/Glossary/Abstraction)
  - 복잡한 시스템을 단순한 API뒤에 숨겨 효율적으로 설계하고 구현할 수 있는 방법

#### 내가 생각하는 단점
- 순수함수를 잘 구현해야하는데 이 부분이 어려울 수 있다.
- 함수를 잘 조합해야하는데, 함수형 프로그래밍 사고에 익숙해지는데 시간이 걸린다.   
(이 부분이 제일 큰 러닝커브라고 생각한다.)


소스 내용 출처
- https://www.inflearn.com/course/%ED%95%A8%EC%88%98%ED%98%95_ES6_%EC%9D%91%EC%9A%A9%ED%8E%B8
