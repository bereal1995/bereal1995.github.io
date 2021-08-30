---
title: 'React Saga Fork'
date: 2021-04-20 16:21:13
category: '리액트'
draft: false
---

## 기존에 사용하던 코드

```
function* sagas() {
    yield all([
        fork(appSaga),
        fork(authSaga),
        fork(videoSaga),
        fork(searchSaga),
    ])
}
```

이런식으로 기존에는 saga파일들을 묶어줄때 fork를 사용해서 불러왔었다.
하지만 알아본결과 fork는 백그라운드로 작동하고 있는 방식이였고 호출은 call을 사용해야 한다.

```
function* sagas() {
    yield all([
        call(appSaga),
        call(authSaga),
        call(videoSaga),
        call(searchSaga),
    ])
}
```

## fork 특징

- fork는 백그라운드에서 동적으로 실행
- fork는 부모함수와 결합되어 있다
- 결합된 fork에서 error를 전달하거나 error가 발생할때 saga는 바로 취소된다
- fork된 태스크에서는 error를 잡을 수 없다
- fork 내부에서 error가 발생할 경우 fork한 부모가 취소 시킨다
- error를 잡을때는 error를 잡을 수 있는 함수를 따로 생성해서 체크
