---
title: '뷰로 가위바위보 게임 만들기'
date: 2021-07-19 16:21:13
category: '사이드프로젝트'
draft: false
---

## 프로젝트 구경하기
- [프로젝트 링크](https://github.com/bereal1995/games-vue)

## 프로젝트 구성안내

### 목표
- 저번에 리액트로 만들었던 가위바위보게임을 뷰로 만들어보자!

### 기능구현 사항
- [저번 글 참고](https://bereal1995.github.io/sideproject/rps-game/)

### 간단한 기술스택
- vuex
    - redux처럼 상태관리를 위해서 사용
    - firebase를 통해서 데이터값을 가져오기 위해서는 비동기 작업을 해야하는데  
      이때, 데이터를 스토어에 저장하기 위해 사용
- firebase
    - 실시간으로 데이터연동을 통한 온라인 게임플레이를 위해 realtimeDatabase를 사용
    - 배포를 하기 위해 firebase hosting 사용
- bootstrap
    - 디자인이 없는 상황에서 안정적이고 완성도있는 UI를 사용하기 위해 선택
    - UI관련 라이브러리중에서 제일 사용자가 많아 선택 (npmtrend 기준)
- dotenv
    - 외부에 노출되면 안되는 환경변수 관리를 위해 설치  
      ex) API_KEY, APP_ID ....
- vue-uuid (고유 키 값 생성)
    - 게임 방을 만들때 사용자를 구분하기 위해 사용
    - 이 uid값으로 host, challenger 구분을 한다.

## 폴더 트리 구조
```text
├── firebase.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── img
│   │   └── scss
│   ├── components
│   │   ├── Game
│   │   │   ├── Game.vue
│   │   │   ├── Play.vue
│   │   │   ├── Result.vue
│   │   │   └── Wait.vue
│   │   ├── GameList
│   │   │   └── List.vue
│   │   ├── Header.vue
│   │   ├── Home.vue
│   │   └── Nav.vue
│   ├── lib
│   │   └── firebase.js
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── moduleRps.js
│   └── utlls
│       ├── storageutil.js
│       └── urlutil.js
```

## 데이터 베이스 구조
- [저번 글 참고](https://bereal1995.github.io/sideproject/rps-game/)

## 프로젝트 기능설명
- [저번 글 참고](https://bereal1995.github.io/sideproject/rps-game/)

## 프로젝트 후기
### Vue
뷰를 처음 접해 보았다 느꼈던 몇가지를 적어보겠다.
- 폴더 트리가 리액트에 비해 훨씬 깔끔해졌다.
- vue에서 지원하는것이 많아 리액트에 비해 따로 설치할 라이브러리가 적었다.
- html, css, js가 딱딱 나눠져 있어 좋았다.  

이외에도 여러가지 장점이 많겠지만 처음 사용해봐서 그런지 구현에만 집중해서 어색한 부분들이 많았다.  
괜찮은 아이디어가 떠오르면 vue를 활용해서 프로젝트를 하나 더 만들어봐야겠다.
