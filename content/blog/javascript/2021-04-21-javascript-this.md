---
title: '자바스크립트 this'
date: 2021-04-21 16:21:13
category: '자바스크립트'
draft: false
---

## 화살표함수와 일반함수에 this

### 일반함수
> 일반함수에서 this는 this에 바인딩할 어떤 객체가 동적으로 결정된다.
함수를 선언할 때 아니라, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

```
function hello(text) {
    this.text = text;
}

hello.prototype.addHello = function (arr) {
    return arr.map(function (x) {
        return this.text + ' ' + x; // hi 가 들어올거 같지만 안들어옴
    });
};

const pre = new hello('hello');
console.log(pre.addHello(['jo', 'koo']));
```

bind를 활용해서 this를 연결해준다

```
function hello(text) {
    this.text = text;
}

hello.prototype.addHello = function (arr) {
    return arr.map(function (x) {
        return this.text + ' ' + x; // hi 가 들어옴!
    }.bind(this));
};

const pre = new hello('hello');
console.log(pre.addHello(['jo', 'koo']));
```


### 화살표함수

> 화살표 함수는 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.
동적으로 결정되는 일반 함수와는 달리 화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다.

```
function hello(text) {
    this.text = text;
}

hello.prototype.addHello = function (arr) {
    return arr.map((x) => `${this.text} ${x}`); // this = hello {text: 'hello'}
};

const pre = new hello('hello');
console.log(pre.addHello(['jo', 'koo']));
```


this를 사용할때는 일반함수와 화살표함수를 잘 구분해서 사용해야겠다
