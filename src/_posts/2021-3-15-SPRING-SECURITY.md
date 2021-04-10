---
title: Spring Security
date: 2021-3-15
tags: 
  - spring
  - security
author: swjang
location: Seoul  
---

# Spring Security

## UserDetails 인터페이스에 정의된 메소드와 역할
|               Return 타입               |           메소드명         |                                               설명                                              |
|:---------------------------------------:|:--------------------------:|:------------------------------------------------------------------------------------------------:|
|  String                                 |  getUsername()             |  계정의 이름을 리턴한다                                                                          |
|  String                                 |  getPassword()             |  계정의 패스워드를 리턴한다                                                                      |
|  boolean                                |  isAccountNonExpired()     |  계정이 만료되지 않았는지를 리턴한다(true를 리턴하면 만료되지 않음을 의미)                       |
|  boolean                                |  isAccountNonLocked()      |  계정이 잠겨있지 않은지를 리턴한다(true를 리턴하면 계정이 잠겨있지 않음을 의미)                  |
|  boolean                                |  isCredentialsNonExpired() |  계정의 패스워드가 만료되지 않았는지를 리턴한다(true를 리턴하면 패스워드가 만료되지 않음을 의미) |
|  boolean                                |  isEnabled()               |  계정이 사용가능한 계정인지를 리턴한다(true를 리턴하면 사용가능한 계정인지를 의미)               |
|  Collection<? extends GrantedAuthority> |  getAuthorities()          |  계정이 갖고 있는 권한 목록을 리턴한다                                                           |


## 참조
- [Spring Security의 계정 클래스와 권한 클래스 설계](https://zgundam.tistory.com/49?category=430446)
- [Spring Security의 DB 사용 버전 테이블 정의](https://zgundam.tistory.com/48?category=430446)
- **[Spring Security 파헤치기](https://sjh836.tistory.com/165)**