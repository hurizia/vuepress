
# SPRING AOP

## AOP 개요
- Aspect Oriented Programming : 관점 지향 프로그래밍
- OOP 와 분리된 개념이 아니라, OOP에 기초를 두는 프로그래밍 방식
- 하나의 프로그램을 관점(혹은 관심사)라는 논리적인 단위로 분리하여 관리하는 개념
- 로깅, 감사, 선언적 트랜젝션, 보안, 캐싱 등 다양한 곳에서 사용된다.

## AOP 용어
- Joint Point : 모듈이 삽입되어 동작하게 되는 특정 위치(메서드 호출 등)
- Point Cut : 다양한 Joint Point 중에 어떤 것을 사용할지 선택
- Advice : Joint Point에 삽입되어 동작할 수 있는 코드
- Advisor : Advice를 모아놓은 것
- Weaving : Advice를 핵심 로직 코드에 적용하는 것
- Aspect : Point Cut + Advisor

## AOP Advice 종류
- before : 메서드 호출 전에 동작하는 Advice
- after-returning : 예외 없이 호출된 메서드의 동작이 완료되면 동작하는 Advice
- after-throwing : 호출된 메서드 동작 중 예외가 발생했을 때 동작하는 Advice
- after : 예외 발생 여부에 관계없이 호출된 메서드의 동작이 완료되면 동작하는 Advice
- around : 메서드 호출 전과 후에 동작하는 Advice

## 참고
- [AspectJ Weaver를 사용한 XML 기반의 스프링 AOP 구현 방법](https://atoz-develop.tistory.com/entry/AspectJ-Weaver%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-XML-%EA%B8%B0%EB%B0%98%EC%9D%98-%EC%8A%A4%ED%94%84%EB%A7%81-AOP-%EA%B5%AC%ED%98%84-%EB%B0%A9%EB%B2%95)