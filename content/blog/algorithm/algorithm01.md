---
title: '알고리즘 #01'
date: 2021-08-02 16:21:13
category: '알고리즘'
draft: false
---

## 목표
- 문자열이 주어지고 해당 문자열이 회문 문자열이면 "YES" 아니면 "NO"를 출력

## 풀이1
```javascript
function solution01(s) {
  let answer="YES";
  s = s.toLowerCase();
  let len = s.length;

  for(let i=0; i<Math.floor(len/2); i++) {
    if(s[i] !== s[len-i-1]) return answer = "NO";
  }

  return answer;
}

console.log('soultion01',solution01('gooG')); // return "YES"
```

## 풀이2
```javascript
function solution01(s) {
  let answer="YES";
  s = s.toLowerCase();

  if(s.split('').reverse().join('') !== s) return "NO";

  return answer;
}

console.log('soultion01',solution01('goonG')); // return "NO"
```

출처
- https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4/dashboard
