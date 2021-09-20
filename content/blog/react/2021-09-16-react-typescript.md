---
title: 'React 프로젝트에 typescript적용하기'
date: 2021-09-16 16:21:13
category: '리액트'
draft: false
---

> 기존에 react로 만들었던 프로젝트에 typescript를 적용해 보기로 했다.

## 타입스크립트란?
> 자바스크립트에 타입을 부여한 언어로, 자바스크립트의 확장판이라고 볼 수 있다.  
> 타입스크립트는 브라우저에서 실행하려면 컴파일 과정을 한번 거쳐야 한다.

## 타입스크립트를 써야하는 이유
- 에러의 사전 방지
- 코드 가이드 및 자동 완성
- 타입이 선언되어 있어 코드를 분석, 파악할 때 편함

## 타입스크립트 적용하기

### 설치
```shell
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```
- @types가 붙어있으면 타입스크립트가 지원되는 라이브러리 입니다.
- 추가로 사용하는 라이브러리가 있으면 타입스크립트 버전도 같이 설치를 해줘야 합니다.

### 적용
- 설치가 모두 완료 됐으면 js파일은 .ts, jsx문법파일은 .tsx로 확장자를 변환해준다.

## 참고자료
- [타입스크립트 핸드북](https://joshua1988.github.io/ts/why-ts.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%9E%80)
