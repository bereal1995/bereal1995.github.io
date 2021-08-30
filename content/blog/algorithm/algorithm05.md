---
title: '알고리즘 #05 - 투포인터'
date: 2021-08-26 16:21:13
category: '알고리즘'
draft: false
---

## 목표
- 오름차순으로 정렬된 두 배열이 주어지면 두 배열을 오름차순으로 합쳐라.

## 풀이
```javascript
function solution02(arr1, arr2) {
  let answer = [];
  let n = arr1.length;
  let m = arr2.length;
  let p1 = 0, p2 = 0;
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  while (p1 < n && p2 < m) {
    if (arr1[p1] === arr2[p2]) {
      answer.push(arr1[p1++]);
      p2++;
    }
    else if (arr1[p1] < arr2[p2]) p1++;
    else p2++;
  }

  return answer;
}
console.log('solution02',solution02([1,3,9,5,2], [3,2,5,7,8]));
```
- 우선 인자로 받는 배열을 오름차순 정렬을 해준다.
- p1, p2로 포인터변수를 만들어 증가하면서 탐색을 한다.
- 탐색 중 두 값이 같으면 answer에 푸쉬를 해주고 p1, p2 둘다 1씩 증가를 해준다.
- 아닐경우 두 값중 작은 값에 포인터 변수를 1증가 해준다.


출처
- https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4/dashboard
