---
title: WEB FONT LINE-HEIGHT
date: 2021-3-24
tags: 
  - front-end
  - font
author: swjang
location: Seoul  
---

## 개요
- 오래 전 글자를 손으로 배열하여 활판 인쇄하던 때의 활자 인쇄물은 독립적으로 만들어진 활자 블럭을 가로로 이어 붙여서 만들어 냈습니다.
- 그리고 행간(leading)은 각 글줄들 사이에 적절한 공간을 주기 위해 조각블럭을 넣는 방법으로 추가되었습니다.
- 이러한 행간과 같은 표현을 CSS에서는 line-height 를 사용하여 글줄 사이의 수직 여백을 조정할 수 있습니다.


## line-height 표기

```css
/* 1. normal 값 사용 */ 
p { line-height: normal; } 

/* 2. inherit(상속)값 사용 */ 
p { line-height: inherit; } 

/* 3. 퍼센트값 사용 */ 
p { line-height: 120%; } 

/* 4. 길이 단위 값(px, em 등) 사용 */ 
p { line-height: 20px; } 

/* 5. 숫자 값(단위 표기가 없는) 사용 */ 
p { line-height: 1.2; }
```

## 정리
- 일반적으로 font-size 크기에 따라 line-height 값이 달라질 수 있도록 단위없는 숫자 값을 사용하는 것이 가장 좋은 방식입니다.
- 각 상황에 맞는 완벽한 행간을 설정하는 것은 어려운 일입니다.
- 하지만, 제목(heading)은 문단의 line-height 와 독립되어 있는 편이 좋다고 볼 수 있습니다.
- 예를 들자면 모든 내용을 1.5 로 지정한 뒤에 제목은 1.2 로 재지정하는 것입니다.

```css
body { line-height: 1.5; } 
h1, h2, h3, h4, h5, h6 { line-height: 1.2; }
```


## 참조
- [CSS line-height](https://webclub.tistory.com/631)