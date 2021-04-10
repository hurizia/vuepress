---
title: WEB UI UNIT
date: 2021-3-25
tags: 
  - front-end
  - unit
author: swjang
location: Seoul  
---

## 개요
- em 및 rem 단위는 상대 길이 단위로 요소의 글꼴 크기와 관련되어있다.
  - 지정된 요소의 `font-size`의 배수라고 보면 된다.
- vh 및 vm 은 단위는 viewport 의 1/100 단위입니다.

## EM
- 단위 `em`은 [엠:]이라고 읽으며 과거 금속활자의 각 폰트디자인의 기준점을 알파벳 'M'으로 잡은것에서 유래했다고 한다.
- 가장 폭이 넓고 네모꼴이기 때문에 M의 너비를 전체 금속활자의 높이가 되게 만들면서 폰트디자인의 기준이 되었다고 한다.
- 그래서 'M'이라는 글자의 소리를 따서 `em`단위를 만들었고 지금의 css 단위로도 사용된다.

## REM
- `root em`이라는 뜻이다.
- `rem` 또한 상대 길이 단위로 루트 요소의 글꼴 크기와 관련되어 있으며 루트 요소가 가진 `font-size`의 배수라고 보면 된다.

# VH & VW (Viewport Width & Viewport Height))
- 반응형 웹디자인 테크닉은 퍼센트 값에 상당히 의존하고 있다.
- 하지만 CSS의 퍼센트 값이 모든 문제를 해결할 좋은 방법은 아닙니다. 
- CSS의 너비 값은 가장 가까운 부모 요소에 상대적인 영향을 받습니다.
- 이런 점을 보완하기 위해 `viewport`를 기준으로 너비값과 높이를 지정할 수 있다.
- VW(Viewport Width) : 뷰포트 너비의 1% 길이와 동일하다.
- VH(Viewport Height) : 뷰포트 높이의 1% 길이와 동일하다.
- 예를 들어 브라우저 높이값이 900px일때 1vh는 9px이라는 뜻이 되지요. 그와 유사하게 뷰포트의 너비값이 750px이면 1vw는 7.5px이 됩니다.

# VMIN & VMAX (Viewport Minimum & Viewport Maximum)
- VMIN : `viewport` 너비 또는 높이를 기준으로 하는 최소 값입니다.
- VMAX : `viewport` 또는 높이를 기준으로 하는 최대 값입니다.

# EX
- ex 단위의 정의는 현재 폰트의 `x-height` 값이다
- `x-height`값은 소문자 x의 높이이다.


## 정리
- 너무 em단위를 font-size를 지정하는데 너무 남용하면 조상요소와 후손요소간의 관계구조가 복잡했을 때 상속 된 font-size를 예측하기 어려울 수 있다.
- 여러요소의 em단위로 중첩되어 상속의 상속을 거듭한 font사이즈를 rem단위로 쉽게 원하는 크기를 지정 할 수 있다.
- rem은 root em이라는 말 그대로 최상위 요소의 font-size에 대한 em단위 이다.
- 최상위인 html요소에 font-size가 10px로 지정되어 있을 때 하위에 있는 어떤 요소든 font-size값으로 rem단위를 사용하면 10px에 대한 배수가 적용된다.
- 따라서 rem단위를 사용하면 부모요소의 font-size에 상관없이 root인 html요소로부터 계산되어 적용되기 때문에 좀 더 쉽게 크기를 지정할 수 있다.

# 참조
- [em단위와 rem단위](https://velog.io/@ursr0706/em%EB%8B%A8%EC%9C%84%EC%99%80-rem%EB%8B%A8%EC%9C%84-523lgn8l)
