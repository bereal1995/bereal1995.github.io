---
title: '알고리즘 #08 - 투 포인터'
date: 2021-09-25 16:21:13
category: '알고리즘'
draft: false
---

## 목표
- N개의 수로 이루어진 수열이 주어집니다.
  이 수열에서 연속부분수열의 합이 특정숫자 M이하가 되는 경우가 몇 번 있는지 구하는 프로그 램을 작성하세요.

## 풀이
```javascript
function solution04(m, arr) {
  let answer = 0;
  let lt = 0, sum = 0;

  for (let rt=0; rt<arr.length; rt++) {
    sum += arr[rt];
    while (sum > m) {
      sum -= arr[lt++];
    }
    answer += (rt - lt + 1);
  }

  return answer;
}

console.log('solution04',solution04(5, [1,3,1,2,3]));
```
- 두 포인터 변수 lt,rt 총합 변수 sum을 선언해준다.
- 들어오는 배열 갯수를 기준으로 반복문을 실행하고 반복될때마다 sum과 m을 비교하여 sum이 더 커지면 arr[lt]값에 해당하는 값을 빼주고 다시 비교를 한다.
- answer에는 (rt - lt + 1)값을 누적해주는데 arr[rt]값이 포함된 m보다 작은 경우의 수 값이다.

출처
- [참고 내용](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4/dashboard)
