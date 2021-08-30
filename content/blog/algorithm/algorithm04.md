---
title: '알고리즘 #04 - 투포인터'
date: 2021-08-25 16:21:13
category: '알고리즘'
draft: false
---

## 목표
- 오름차순으로 정렬된 두 배열이 주어지면 두 배열을 오름차순으로 합쳐라.

## 풀이
```javascript
function solution01(arr1, arr2) {
  let answer = [];
  let n = arr1.length;
  let m = arr2.length;
  let p1 = 0, p2 = 0;

  while (p1<n && p2<m) {
    if (arr1[p1] <= arr2[p2]) answer.push(arr1[p1++]); // p1값을 넣준 후에 p1을 ++ 해준다.
    else answer.push(arr2[p2++]);
  }
  while (p1<n) answer.push(arr1[p1++]);
  while (p2<m) answer.push(arr2[p2++]);

  return answer;
}
console.log('solution01',solution01([1,3,5],[2,3,6,7,9]));
```
- p1, p2로 포인터변수를 만들어 증가하면서 탐색을 한다.
- 두 배열에 값을 비교해 더 낮은값을 answer에 push해주고 push한 배열에 포인터변수를 증가시켜준다.
- while문이 끝나면 나머지 값을 answer에 넣어줘야하는데 둘 중에 무엇이 나머지 인지를 알 수 없기 때문에 둘 다 선언을 해준다.


출처
- https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4/dashboard
