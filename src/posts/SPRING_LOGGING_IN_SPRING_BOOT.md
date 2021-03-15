# SPRING LOGGING IN SPRING BOOT

## 개요
- Spring Boot의 로깅 방식은 기존 Srpring 방식을 자동화하여 `Zero Configuration Logging`을 완성하였다.
- 기본 동작 방식과 커스텀 설정하는 방법에 대해 기술한다.

## Zero Configuration Logging
- Spring Boot는 매우 유용한 프레임 워크입니다. 이를 통해 대부분의 구성 설정을 잊어 버릴 수 있으며 대부분은 자동 조정됩니다.
- 로깅의 경우 유일한 필수 종속성은 Apache Commons Logging입니다.
- Spring 5 (Spring Boot 2.x)에서 Spring Framework의 `spring-jcl` 모듈에서 제공하므로 Spring 4.x (Spring Boot 1.x)를 사용할 때만 가져 오면됩니다.
- `Spring Boot Starter` (거의 항상 그렇습니다)를 사용하는 경우 `spring-jcl`을 가져 오는 것에 대해 전혀 걱정할 필요가 없습니다. 
- 그것은 우리의 `spring-boot-starter-web`과 같은 모든 스타터가 이미 우리를 위해 `spring-jcl`을 가져 오는 `spring-boot-starter-logging`에 의존하기 때문입니다.

## Default Logback Logging
- `Spring Boot Starter`를 사용할 때 Logback은 기본적으로 로깅에 사용됩니다.
- Spring Boot는 패턴과 ANSI 색상으로 미리 구성하여 표준 출력을 더 읽기 쉽게 만듭니다.
![Spring Boot Logging](/img/spring-boot-logging.png)
- 보시다시피 Logger의 기본 로깅 수준은 INFO로 사전 설정되어 있습니다. 즉, TRACE 및 DEBUG 메시지가 표시되지 않습니다.
- 구성을 변경하지 않고 활성화하기 위해 명령 줄에 `–debug` 또는 `–trace` 인수를 전달할 수 있습니다.
```
java -jar target/spring-boot-logging-0.0.1-SNAPSHOT.jar --trace
```

## Log Levels
- Spring Boot는 환경 변수를 통해 보다 세분화 된 로그 수준 설정에 대한 액세스를 제공합니다. 
- 이를 달성 할 수있는 몇 가지 방법이 있습니다.
  + 먼저 VM 옵션에서 로깅 수준을 설정할 수 있습니다.
```
-Dlogging.level.org.springframework=TRACE 
-Dlogging.level.com.baeldung=TRACE
```  

  + 또는 Maven을 사용하는 경우 명령 줄을 통해 로그 설정을 정의 할 수 있습니다
```
mvn spring-boot:run 
  -Dspring-boot.run.arguments=--logging.level.org.springframework=TRACE,--logging.level.com.baeldung=TRACE
```

  + Gradle로 작업 할 때 명령 줄을 통해 로그 설정을 전달할 수 있습니다. 이를 위해서는 bootRun 작업을 [설정](https://www.baeldung.com/spring-boot-command-line-arguments#gradle)해야합니다. 완료되면 애플리케이션을 실행합니다.
    
```
./gradlew bootRun -Pargs=--logging.level.org.springframework=TRACE,--logging.level.com.baeldung=TRACE
```

 + 영구적으로 변경하려면 여기에 설명 된대로 `application.properties` 파일에서 변경할 수 있습니다.
```
logging.level.root=WARN
logging.level.com.baeldung=TRACE
```
 
  + 마지막으로 로깅 프레임 워크 구성 파일을 사용하여 로깅 수준을 영구적으로 변경할 수 있습니다. Spring Boot Starter는 기본적으로 Logback을 사용한다고 언급했습니다. 두 개의 개별 패키지에 대한 수준을 설정하는 Logback 구성 파일의 일부를 정의하는 방법을 살펴 보겠습니다.
```
<logger name="org.springframework" level="INFO" />
<logger name="com.baeldung" level="INFO" />
```

-  패키지의 로그 수준이 위에 언급 된 다른 옵션을 사용하여 여러 번 정의되었지만 로그 수준이 다른 경우 가장 낮은 수준이 사용됩니다.
-  따라서 Logback, Spring Boot 및 환경 변수를 동시에 사용하여 로깅 수준을 설정하면 요청 된 수준 중 가장 낮은 수준 인 TRACE가됩니다.

## Logback Configuration Logging
- 기본 구성이 유용하더라도 (예 : POC 또는 빠른 실험 중에 제로 시간에 시작하기 위해) 일상적인 요구 사항에 충분하지 않을 가능성이 큽니다.
- 콘솔 및 파일 출력에 대한 별도의 사양, 대용량 로그 파일 생성을 방지하기 위해 적절한 롤링 정책을 사용하여 다른 색상 및 로깅 패턴을 사용하여 Logback 구성을 포함하는 방법을 살펴 보겠습니다.
- 먼저 다른 많은 애플리케이션 설정에 일반적으로 사용되는 `application.properties`를 오염시키는 대신 로깅 설정 만 처리 할 수있는 솔루션을 찾아야합니다.
- 클래스 경로의 파일에 다음 이름 중 하나가 있으면 Spring Boot는 기본 구성을 통해 파일을 자동으로로드합니다.
  + logback-spring.xml
  + logback.xml
  + logback-spring.groovy
  + logback.groovy
- Spring은 다음 예시 처럼 가능한 일반 버전보다 `-spring` 변형을 사용할 것을 권장합니다. 간단한 logback-spring.xml을 작성해 보겠습니다.
  + 이제 TRACE 및 DEBUG 메시지를 기록하고 전체 콘솔 패턴은 이전과 텍스트 및 색채가 모두 다릅니다.
  + 또한 현재 경로 아래에 생성 된 `/logs` 폴더의 파일에 로그온하고 롤링 정책을 통해 보관합니다.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <property name="LOGS" value="./logs" />

    <appender name="Console"
        class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <Pattern>
                %black(%d{ISO8601}) %highlight(%-5level) [%blue(%t)] %yellow(%C{1.}): %msg%n%throwable
            </Pattern>
        </layout>
    </appender>

    <appender name="RollingFile"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOGS}/spring-boot-logger.log</file>
        <encoder
            class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <Pattern>%d %p %C{1.} [%t] %m%n</Pattern>
        </encoder>

        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- rollover daily and when the file reaches 10 MegaBytes -->
            <fileNamePattern>${LOGS}/archived/spring-boot-logger-%d{yyyy-MM-dd}.%i.log
            </fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy
                class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>10MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
    </appender>
    
    <!-- LOG everything at INFO level -->
    <root level="info">
        <appender-ref ref="RollingFile" />
        <appender-ref ref="Console" />
    </root>

    <!-- LOG "com.baeldung*" at TRACE level -->
    <logger name="com.baeldung" level="trace" additivity="false">
        <appender-ref ref="RollingFile" />
        <appender-ref ref="Console" />
    </logger>

</configuration>
```
## 참조
- [Logging in Spring Boot](https://www.baeldung.com/spring-boot-logging)