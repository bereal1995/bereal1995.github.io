---
sidebar_position: 3
---

# 블록 스코프 선언: let, const

## 기억에 남았던 부분

### 호이스팅, TDZ

```js
let answer;
function hoisting() {
  answer = 42; // ReferenceError: Cannot access 'answer' before initialization
  console.log(answer);
  let answer;
}
hoisting();
```

- let, const는 호이스팅이 일어나지만, TDZ에 빠져있기 때문에 ReferenceError가 발생한다.
- TDZ는 변수가 선언되기 전까지 변수에 접근할 수 없는 구간을 말한다.
- 만약 호이스팅이 일어나지 않았다면, `answer`는 `undefined`가 출력될 것이다.

```js
function temporalExample() {
  const f = () => {
    console.log(value);
  };
  let value = 42;
  f();
}
temporalExample();
```

- TDZ는 시간에 관한 것이다.
- 위 코드에서 `f()`선언부분과 `let value = 42` 부분을 교환하면 에러가 발생한다. `f`가 초기화 되기전에 값을 사용하려고 하기 때문이다.
