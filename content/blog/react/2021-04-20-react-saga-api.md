---
title: 'React Saga Api 여러개 날리기'
date: 2021-04-20 16:21:13
category: '리액트'
draft: false
---

## saga에서 api통신을 하던중 2개의 api통신을 해야하는 경우가 생겼다
```
const result = yield call(Api.fetchTopics, payload)
```
원래는 이런식으로 하나씩 콜을하고 있던중 2개를 해야하는경우

```
const result = yield call(Api.fetchTopics, payload)
const result2 = yield call(Api.fetchTopics2, payload)
```
이렇게 2개를 불러오는식으로 했던경우 여러가지 문제가 생겼다.

- 첫번째로 yield를 걸어주기 때문에 첫줄 코드 통신이 끝나기 전에는 두번째줄이 통신이 안되는 경우가 생겼다
- 또 이런식으로 작성을 하다보니 뭔가 중복되는 것들이 많아지는 느낌이라 쎄~함

그래서 알아본 결과 아래와 같이 수정하면 애매했던 부분들이 해소 되었다
```
const [result, result2] = yield all([
                call(Api.fetchTopics, payload),
                call(Api.fetchTopics2, payload)
            ])
```

이렇게 함으로 코드가 훨씬 깔끔해졌고 all로 묶어주고 거기에 yield를 걸어서 하나씩 통신하면서 넘어갔던부분이
2개 통신을 동시에 해서 훨씬 빨라졌다!
