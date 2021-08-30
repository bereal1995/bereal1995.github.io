---
title: 'api 통신할때 queryParams 정리'
date: 2021-07-23 16:21:13
category: '자바스크립트'
draft: false
---

## 기존에 사용하던 코드
```javascript
axios.get(apiBaseUrl +`/search?key=${apiKey}&part=${payload.part}&maxResults=${payload.maxResults}&regionCode=${payload.regionCode}&q="먹방"&pageToken=${thisStore.state.nextPageToken}&order=${payload.order}`).then(function(response) {
          console.log('Done moreVideos', response)
          thisStore.commit('moreVideos', response.data)
        }).catch(function(error) {
          thisStore.dispatch('axiosError', error)
        })
```
- queryParams가 뒤로 주루루룩 가독성이 너무 안좋다.
- 나중에 수정하거나 할때도 뭐가뭔지 보기 너무 힘들다.
- 특정 query를 값에 따라 넣거나 뺄때도 불편하다.

## UrlUtils
```javascript
export function convertQueryParams2Str(queryObj, excludeKeys = []) {
    return Object.keys(queryObj).reduce(function (previousValue, currentValue) {
        if (excludeKeys.includes(currentValue)) {
            return previousValue;
        }

        return [
            previousValue, previousValue && '&', currentValue, '=', encodeURIComponent(queryObj[currentValue])
        ].join('');
    }, '');
}
```
- queryObj에 객체로 넣어줄 query값을 전달받는다.
- excludeKeys에는 배열로 제외할 키값을 넣어준다.
- 그 뒤에 queryString을 만들어서 리턴해준다

## 수정코드
```javascript
axios.get(apiBaseUrl + '/search?' + convertQueryParams2Str({
  key: apiKey,
  part: payload.part,
  maxResults: payload.maxResults,
  regionCode: payload.regionCode,
  q: "먹방",
  pageToken: thisStore.state.nextPageToken,
  order: payload.order
}, excludeKeys)).then(function(response) {
  console.log('Done moreVideos', response)
  thisStore.commit('moreVideos', response.data)
}).catch(function(error) {
  thisStore.dispatch('axiosError', error)
})
```
- util 함수를 만들어서 사용하니까 가독성이 훨씬 좋아졌다.
- 다른 api 통신을 할때에도 query를 넣고 빼고하기 편하다.
- excludeKeys를 사용하여 예외처리하기도 좋다.
