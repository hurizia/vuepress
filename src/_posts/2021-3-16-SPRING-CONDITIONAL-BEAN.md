---
title: SPRING CONDITIONAL BEAN
date: 2021-3-16
tags: 
  - spring
author: swjang
location: Seoul  
---

## 개요
- 스프링 4.0+ 에서는 @Bean 을 적용할 수 있는 새로운 @Conditional 애너테이션이 있다.
- 조건이 참인 경우 빈이 생성된다. 그렇지 않으면 빈은 무시된다.
- 관련 기능의 사용방법을 알아 본다.

## 사용 방법
- @Conditional은 조건을 지정하기 위한 어노테이션 이며 이 경우 MagicExistsCondition 클래스이다.
```java
@Bean
@Conditional(MagicExistsCondition.class)
public MagicBean magicBean(){
    return new MagicBean();
}
```

## 조건 구현
1. Condition 인퍼테이스를 상속하여 구현한다.
2. 구현 클래스(MagicExistsCondition) 에서 override되는 matches 메소드 인자를 활용하여 조건을 구현한다.
3. 인자는 ConditionContext, AnnotationMetadata가 있다.

### Condition 인터페이스
- @Conditional은 Condition 인터페이스와 같이 사용된다. 
- @Conditional에 지정된 클래스는 Condition 인터페이스를 구현한 모든 유형이 된다.
- matches 메소드가 true를 돌려줄 경우, @Conditional으로 애너테이션된 빈이 생성된다.
- matches()가 false를 반환하면 그 빈은 작성되지 않는다.
```java
public interface Condition {
    boolean matches(ConditionContext ctxt,
                    AnnotationTypeMetadata metadata);
}
```

### MagicExistsCondition 클래스 구현
- Condtion에 magic 존재 여부 체크 
- Enviroment에서 magic 프로퍼티가 존재하는지를 확인하기 위한 Condition 코드를 제공한다.
- 환경 프로퍼티의 이름 magic이 존재하는지 여부를 확인하기 위해 주어진 ConditionContext 객체에서 Enviroment를 사용한다.
- 프로퍼티가 존재할경우matches()에서 반환된 true 값을 가지며, 조건을 충족하고 MagicExistsCondition을 참조하는 
- @Conditional 애너테인션의 빈이 생성된다.
- 반면, 프로퍼티가 존재하지 않는다면 조건은 실패하고 false가 matches()에서 반환된다. 그 빈들은 모두 생성되지 않는다.
```java
public class MagicExistsCondition implements Condition{
    @Override
    public boolean matches(ConditionContext context, 
                            AnnotatedTypeMetadata metadata) {
        Environment env = context.getEnvironment();
        return env.containsProperty("magic");    //magic 프로퍼티 체크
    }
}
```

:::tip

#### ConditionContext 인터페이스 
- getRegistry() 반환을 통한 BeanDefinitionRegistry로 빈 정의를 확인한다.
- 빈의 존재를 확인하고, getBeanFactory()에서 반환되는 ConfigurableListableBeanFactory를 통해 빈 프로퍼티를 발굴한다.
- getEnviroment()로 부터 얻은 Enviroment를 통해 환경 변수 값을 확인한다.
- getResourceLoader()에서 반환된 ResouceLoader를 통해 로드된 자원 내용을 읽고 검사한다.
- getClassLoader()에서 반환된 ClassLoader를 통해 클래스의 존재를 로드하고 확인한다. 

```java
public interface ConditionContext {
    BeanDefinitionRegistry getRegistry();
    ConfigurableListableBeanFactory getBeanFactory();
    Environment getEnvironment();
    ResourceLoader getResourceLoader();
    ClassLoader getClassLoader();
}
```

#### AnnotationMetadata 인터페이스
- AnnotationMetadata는 @Bean 메소드의 애너테이션을 검사할 수 있는 기회를 제공한다. 
- isAnnotated() 메소드를 사용하여, @Bean 메소드가 특정 애너테이션 타입을 사용해 애너테이션을 붙일 수 있는지를 검사한다.
- getAllAnnotationAttributes() 메소드를 사용하여 모든 애너테이션 애트리뷰트를 가져온다.
```java
public interface AnnotatedTypeMetadata {
    boolean isAnnotated(String annotationType);
     Map<String, Object> getAnnotationAttributes(String annotationType);
    Map<String, Object> getAnnotationAttributes(String annotationType, 
                                                    boolean classValuesAsString);
    MultiValueMap<String, Object> getAllAnnotationAttributes(String annotationType);
    MultiValueMap<String, Object> getAllAnnotationAttributes(String annotationType,
                                                    boolean classValuesAsString);
}
```
:::

## 구현체
- 스프링4+에서 시작된 @Profile 애너테이션은 @Conditional 및 Condition 인터페이스에 기초하여 리팩토링된다. 

### Profile 애너테이션
- @Profile 자체가 @Conditional을 사용하여 애너테이션되고, Condition 구현으로 ProfileCondition을 참조한다.
- ProfileCondition은 Condition을 구현하고 그 결정을 할 때 ConditionContext와 AnnotatedTypeMetadata 모두에서 여러 가지 요인을 고려한다.
```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@Documented
@Conditional(ProfileCondition.class)
public @interface Profile {
    String[] value();
}
```

### ProfileCondition 클래스
- 빈 프로파일의 사용 가능 여부를 체크 한다.
- ProfileCondition은 AnnotatedTypeMetadata에서 @Profile의 모든 애너테이션 애트리뷰트를 가져온다.
- 빈 프로파일의 이름이 포함되어 있는 value 애트리뷰트를 명시적으로 확인한다.
- 그 후 프로파일이(acceptsProfiles() 메소드를 호출하여) 활성 상태인지 여부를 확인하기 위해 ConditionContext에서 가져온 Eviroment를 살펴본다.
```java
class ProfileCondition implements Condition {
 
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        if (context.getEnvironment() != null) {
            MultiValueMap<String, Object> attrs = 
                            metadata.getAllAnnotationAttributes(Profile.class.getName());
            if (attrs != null) {
                for (Object value : attrs.get("value")) {
                    if (context.getEnvironment().acceptsProfiles(((String[]) value))) {
                        return true;
                    }
                }
                return false;
            }
        }
        return true;
    }
}
```

## 참고 
- [SPRING 조건부 빈](https://m.blog.naver.com/PostView.nhn?blogId=kimnx9006&logNo=220604974239&proxyReferer=https:%2F%2Fwww.google.com%2F)


