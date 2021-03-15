# ETC

## Category 및 Tag 구성

### 구성 방법
- category 는 선 정의된 tag 로 본다.
  + 기본적인 분류를 하기 위해 선 정의된 tag 로 본다.
  + 모든 게시물에 1개 이상의 category에 등록 한다.
  
### 예시 조사
- Category
  - tech
  - review
  - blog
  - eassy

- Tag 

```
archives-2018 archives-2017 archives-2019 archives-2020 jenkins python elasticsearch spring spring boot apache archives-2016 a-good-developer github logstash review archives-2021 java kibana blog filebeat flask hexo kafka linux mybatis web server aws batch book dashboard date deview Filter json monitoring nginx OpenAPI oracle spring-rest-docs Swagger Swagger-ui Transaction  access log agile anomaly detection AOP apache access log chromedriver ci circuit breaker cloneUtils curtule ec2 eclipse Elasitcsearch Event Driven facebook fileupload gdg github-actions gzip hackathon heap dump HttpServletRequestWrapper hugo Hystrix integration java deep copy jq jsp jupyter keepAlive Load Balance log logback logging lombok maven mentoring mod_deflate ModelAttribute module mysql Netflix network open source software oss out of memory packetbeat parallel precess performance pipeline Prefork MPM prophet pullRequest putty pycon rabbitMQ redirect redis ReqeustParam RequestBody RestClientException RestTemplate resume retryable robert c. martin selenium self-development SonarQube spring command 객체 structure tomcat tranquilpeak uncle bob user-agent Webhook Worker MPM write write the docs writing 디자인패턴 싱글톤 
```

## Markdown 문서 스타일 기능 개발

### 기능 정의
- 순서 있는 목록에 Unicode 사용하기 : [Ordered Lists with Unicode Symbols](https://css-tricks.com/ordered-lists-unicode-symbols/)  
- Web Font 활용
- 순서 없는 목록 머리글 커스텀

## 정적 페이지 생성기(static page generator) 를 활용한 서비스 개발
- 실시간 상호작용이 필요한 `comment` 서비스 외 정적 페이지로 서비스
- 빌드 중에 서버 렌더링 버전의 앱을 만들고 각 경로를 가상으로 방문하여 해당 HTML을 렌더링합니다. 
  + 이 접근 방식은 Nuxt에서 사용하는 방식 
  + nuxt generate명령 및 Gatsby 와 같은 기타 프로젝트 참고

## 참조
- [Category 및 Tag 분류](https://taetaetae.github.io/tags/)
- [쓸만한 마크다운 기본 extension](https://limdongjin.github.io/vuejs/vuepress/#%EC%93%B8%EB%A7%8C%ED%95%9C-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%EA%B8%B0%EB%B3%B8-extension-1-custom-container)
- [Vuepress Gihub Pages 서비스 배포](https://happycloud-lee.tistory.com/148)
- [IT분야 역량인정체계 직종/직무 분류체계](https://swjob.sw.or.kr/business/timeline.do)
- [Engineering Blog](https://www.daleseo.com/docker-networks/)
  + Tags 및 Category 구성 참조 할 것
