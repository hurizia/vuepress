---
title: SPRING GROBAL EXCEPTION
date: 2021-3-16
tags: 
  - spring
  - exception
author: swjang
location: Seoul  
---

## 개요
- 일반적으로 Execption 발생시 개별적으로 처리하는 예제들이 많은데 효율적인 처리를 위해 Spring 에서 Exception 처리를 공통으로 처리하기 위한 방법에 대해 알아 본다.
- Spring에서 @ControllerAdvice, @ExceptionHandler를 이용한 예외처리 분리, 통합하게 되며 관련 방법에 대해 기술한다.

## 일반적인 Exception 처리 문제점
- 프로그래밍에서 예외 처리는 아주 중요하면서도 아주 어렵다.
- 과하다할 만큼 상세하고 다양하게 예외를 잡아 처리해준다면, 클라이언트도 그렇고 서버도 그렇고 더 안정적인 프로그램이 될 수 있게 도와준다.
- 예외 처리를 하는 경우와 방법은 다양하다.
  + 메서드 내에서 예외 상황을 예측해서 처리하는 try-catch문을 이용하는 방법
  + 요구사항에 의한 예외 처리 (ex. validation > 특정 값이 0~255범위가 아니면 유효하지 않은 값으로 판단하고 예외 처리)
  + 스프링 시큐리티에서 인터셉터로 잡아서 UnauthorizedException 같은 예외 처리
  + 기타 여러 예외 처리들을 적용하다보면 코드가 엄청나게 복잡해진다.
- if문으로 잡든 try-catch로 잡든 상위 메서드로 예외처리를 위임하든 코드는 복잡해진다
- 그렇게 되면 유지보수하기 아주 어려워진다.
- 비즈니스 로직에 집중하기 어렵고, 비즈니스 로직과 관련된 코드보다 예외 처리를 위한 코드가 더 많아지는 경우도 생긴다.

> [솔루션] 이런 문제를 조금이라도 개선하기 위해 @ExceptionHandler와 @ControllerAdvice를 사용한다고 보면 이해가 쉬워진다.

## @ExceptionHandler

- @ExceptionHandler같은 경우는 @Controller, @RestController가 적용된 Bean내에서 발생하는 예외를 잡아서 하나의 메서드에서 처리해주는 기능을 한다.
- @ExceptionHandler라는 어노테이션을 쓰고 인자로 캐치하고 싶은 예외클래스를 등록해주면 끝난다.
- @ExceptionHandler({ Exception1.class, Exception2.class}) 이런식으로 두 개 이상 등록도 가능하다.
- MyRestController에 해당하는 Bean에서 NullPointerException이 발생한다면, @ExceptionHandler(NullPointerException.class)가 적용된 메서드가 호출될 것이다.

``` java
@RestController
public class MyRestController {
    ...
    ...
    @ExceptionHandler(NullPointerException.class)
    public Object nullex(Exception e) {
        System.err.println(e.getClass());
        return "myService";
    }
}
```

> 주의사항/알아 둘 것
  - Controller, RestController에만 적용가능하다. (@Service같은 빈에서는 안됨.)
  - 리턴 타입은 자유롭게 해도 된다. (Controller내부에 있는 메서드들은 여러 타입의 response를 할 것이다. 해당 타입과 전혀다른 리턴 타입이어도 상관없다.)
  - @ExceptionHandler를 등록한 Controller에만 적용된다. 다른 Controller에서 NullPointerException이 발생하더라도 예외를 처리할 수 없다.
  - 메서드의 파라미터로 Exception을 받아왔는데 이것 또한 자유롭게 받아와도 된다.


## @ControllerAdvice
- @ExceptionHandler가 하나의 클래스에 대한 것이라면, @ControllerAdvice는 모든 @Controller 즉, 전역에서 발생할 수 있는 예외를 잡아 처리해주는 annotation이다.
- 아래와 같이 새로운 클래스파일을 만들어서 annotation을 붙이기만 하면 된다. 그 다음에 @ExceptionHandler로 처리하고 싶은 예외를 잡아 처리하면 된다.
- 별도의 속성값이 없이 사용하면 모든 패키지 전역에 있는 컨트롤러를 담당하게 된다.

```java
@RestControllerAdvice public class MyAdvice { 
    @ExceptionHandler(CustomException.class) 
    public String custom() { return "hello custom"; } 
}
```

@RestControllerAdvice와 @ControllerAdvice가 존재하는데 @RestControllerAdvice 어노테이션을 들여다보면 아래와 같이 되어있다.

```java
@Target(ElementType.TYPE) 
@Retention(RetentionPolicy.RUNTIME) 
@Documented 
@ControllerAdvice 
@ResponseBody 
public @interface RestControllerAdvice { //... }
```

