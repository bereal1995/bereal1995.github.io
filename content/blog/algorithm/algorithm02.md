---
title: '알고리즘 #02 - 문자열 탐'
date: 2021-08-16 16:21:13
category: '알고리즘'
draft: false
---

## 목표
- 문자열 s와 문자 t가 주어질때 각 문자들과 t의 떨어진 거리를 출력하라  
  `ex) input = teachermode e / output = [1, 0, 1, 2, 1, 0, 1, 2, 2, 1, 0]`
- 문자열의 길이는 100을 넘지 않는다.

## 풀이
```javascript
function solution04(s, t) {
  let answer = [];
  let p = 1000;

  for (let x of s) {
    if (x === t) {
      p = 0;
      answer.push(p);
    } else {
      p++;
      answer.push(p);
    }
  }

  p = 1000;

  for (let i=s.length - 1; i>=0; i--) {
    if (s[i] === t) p = 0;
    else {
      p++;
      answer[i] = Math.min(answer[i], p);
    }
  }

  return answer;
}

console.log('solution04',solution04('teachermode', 'e'));
```
- 문자 t를 기준으로 왼쪽거리값과 오른쪽거리값을 구해 최소값으로 넣어준다고 생각하고 풀이한다.
- 우선 거리 값을 계산하기 위해 변수 p를 선언한다. p는 문자열최대길이 보다 크게 잡는다.
- 문자열을 왼쪽부터 탐색하면서 p를 answer에 푸쉬하는데 t와 같은값을 만나면 0, 아니면 p를 1씩 추가한다.
- p값을 다시 초기값으로 설정한다.
- 문자열을 오른쪽부터 탐색하면서 p를 t와 같은값을 만나면 0, 아니면 거리값을 answer 비교해 최소값으로 넣어준다.


출처
- https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4/dashboard
