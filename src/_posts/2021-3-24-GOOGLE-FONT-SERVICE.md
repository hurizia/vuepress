---
title: GOOGLE FONT SERVICE
date: 2021-3-24
tags: 
  - front-end
  - font
author: swjang
location: Seoul  
---

## 개요
- Google은 `fonts.googleapis.com/css?` 접속한 브라우저의 UA 헤더에 따라서 현재 브라우저에 필요한 것만 제공한다. 
- 필요한 모든 글꼴 (또는 URL 만)을 얻으려면  다른 위조 헤더로 브라우저에서 CSS 파일을 여러 번로드해야한다.

## 내 서버에서 Google 웹 글꼴을 호스팅

### 수동
1. google fonts 서비스에서 사용하는 font 다운로드 한다.
 - [방법1] `https://github.com/google/fonts` 에서 구글 서비스에서 제공되는 트루타입 글꼴 제공
 - [방법2] `https://www.fonts.com/` 에서 개별 적인 글꼴 제공
 - [방법3] NPM [get-google-fonts](https://www.npmjs.com/package/get-google-fonts) 이용
2. font 분할하여 CSS 작성한다.
- NPM [font-ranger](https://www.npmjs.com/package/font-ranger) 이용

### 자동
1. [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts)
 - [방법1] 사이트에서 폰트 선택후 CSS 및 Font 다운로드하여 사용
 - [방법2] API 이용하여 사용

## 정리
- 구글 폰트 서비스를 이용하는 경우 인터라넷 서비스가 아니라면 `Google Foonts` 서비스를 이용한다.
- 자체 구축을 한경우 WOFF2 를 분할하여 서비스할 수 없기 때문에 폰트 최적화 이점을 얻을 수 없기 때문이다.

## 참조

- [User Agent 파헤치기](https://unabated.tistory.com/entry/User-Agent-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0-navigatoruserAgent)