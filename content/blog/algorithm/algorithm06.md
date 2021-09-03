---
title: '알고리즘 #06 - 투포인터'
date: 2021-09-03 16:21:13
category: '알고리즘'
draft: false
---

## 목표
- 주어진 n개의 수열에서 연속부분수열의 합이 특정숫자 M이 되는 경우가 몇 번 있는지 구하시오.

## 풀이
```javascript
function solution03(n, m, arr) {
  let answer = 0;
  let lt = 0, sum = 0;

  for (let rt=0; rt<n; rt++) {
    sum += arr[rt];
    if (sum === m) answer++;

    while (sum >= m) {
      sum -= arr[lt++];
      if (sum === m) answer++;
    }
  }

  return answer;
}

console.log('solution03',solution03(8, 6, [1, 2, 1, 3, 1, 1, 1, 2]));
```
- lt, rt, sum 이라는 변수를 선언해준다.
- 반복문을 통해 rt값이 증가하고 배열[rt]에 있는 값을 sum에 누적을 해준다.
- 누적 할때마다 sum과 m을 비교하여 값이 같을 때 answer를 증가시켜준다.
- 그리고 while문을 통해 sum >= m 이면 lt를 증가시켜 배열[lt]값을 sum값이 m보다 작아질때까지 빼주고 이 때마다 sum === m을 확인해서 같으면 answer++ 해준다
- 즉 rt값이 더할 때 m값 비교해주고 lt값 뺄 때 m값 비교해서 같으면 answer++를 해준다. 

출처
- https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4/dashboard
