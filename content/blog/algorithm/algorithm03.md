---
title: '알고리즘 #03 - 완전 탐색'
date: 2021-08-19 16:21:13
category: '알고리즘'
draft: false
---

## 목표
- M번의 수학 테스트 결과가 주어졌을때, 멘토와 멘티가 짝을 만들 수 있는 경우를 구하라.
- 멘토는 멘티보다 M번의 테스트 모두 등수가 앞서야 합니다.

## 풀이
```javascript
function solution03(test) {
  let answer = 0;
  let m = test.length;
  let n = test[0].length;

  for (let i=1; i<=n; i++) {
    for (let j=1; j<=n; j++) {
      let cnt = 0;

      for (let k=0; k<m; k++) {
        let pi = 0, pj = 0;

        for (let s=0; s<n; s++) {
          if (test[k][s] === i) pi = s;
          if (test[k][s] === j) pj = s;
        }

        if (pi > pj) cnt++;
      }

      if (cnt === m) answer++;
    }
  }

  return answer;
}

const testC = [
  [3, 4, 1, 2],
  [4, 3, 2, 1],
  [3, 1, 4, 2]
]

console.log('solution03', solution03(testC));
```
- 테스트 횟수 m, 학생수 n을 구한다.
- 모든 경우의 수를 구해야하므로 우선 모든학생의 경우의 수 2중포문을 돌린다. (n x n)
- 그 2중포문 안에서 각각 학생들의 점수를 비교하기 위해 또 2중포문을 돌린다. (m x n)
- 여기서 변수 pi, pj의 i, j 학생의 등수를 넣어 비교를 하여 pi등수가 높을 때 cnt를 1 증가해준다.
- 점수비교하기위한 포문이 종료되고 cnt와 m이 같으면 m번의 테스트 모두 점수가 높으므로 멘토,멘티가 확정되어 answer를 1 증가해준다.


출처
- https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4/dashboard
