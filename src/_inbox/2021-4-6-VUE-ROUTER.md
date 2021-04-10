---
title: VUE ROUTER
date: 2021-4-6
tags: 
  - front-end
  - vue
  - router
author: swjang
location: Seoul  
---

1. 라우팅 모드
먼저, HTML 5 히스토리 모드 로 갈 것인지 해시 모드 로 갈 것인지 결정해야합니다. 2018년 이 후 HTML5 히스토리 모드를 사용하는 것이 좋습니다.
히스토리 모드를 사용하는 경우 클라이언트 측 라우터가 서버 측 라우터와 동기화되어 작동해야 함을 의미합니다.

2. 마이크로 프런트 엔드
당신이 이것을 알고 있는지는 잘 모르겠지만 마이크로 프런트 엔드 는 당신이 찾고있는 용어입니다. 기본적으로 이것은 분리의 첫 번째 줄입니다. 앱을 여러 개의 작은 앱으로 분할해야합니다. 각 앱에는 루트 구성 요소, 라우터 , 모델, 서비스 등이 있습니다. 많은 구성 요소를 공유 할 수 있습니다 (물론 매우 큰 응용 프로그램 이라는 단어 가 중요합니다. 말 그대로 의미합니다.)

3. 단일 저장소 고려 사항
Micro-frontends로 진행하기로 선택한 경우 Lerna 또는 Builder를 사용하여 모노 저장소 설정 을 고려할 수 있습니다.

4. 라우팅 모듈-초기화
에 관계없이 마이크로 애플리케이션의 앱은 하나의 시작점이 있어야합니다 - main.js나 index.js. 이 파일에서 모든 싱글 톤을 초기화해야합니다. 일반적인 Vue.js 앱의 주요 싱글 톤 엔티티는 Root Component , Data Store , Router 등입니다.

라우팅 모듈은 구성 요소와 분리됩니다. 이 항목 파일에서 라우팅 모듈을 가져 와서 여기에서 초기화하십시오.

5. 라우팅 모듈-구현
라우팅 모듈은 더 작은 모듈로 더 분할되어야합니다. 이를 위해 간단한 기능과 ES 모듈을 사용하십시오. 각 함수는 RouteConfig객체 반환을 담당 합니다. 다음과 같이 보일 것입니다.

```javascript
const route: RouteConfig = {
    path: '/some-path',
    component: AppComponent,
    children: [
        getWelcomeRoute(),
        getDashboardRoute()
    ]
};

function getWelcomeRoute(): RouteConfig {
    return {
        name: ROUTE_WELCOME,
        path: '',
        component: WelcomeComponent
    };
}
```

경로 수준에서 모듈의 지연로드를 고려해야합니다. 이렇게하면 초기로드에서 많은 바이트가 절약됩니다.

```javascript
function getLazyWelcomeRoute(): RouteConfig {

    // IMPORTANT for lazy loading
    const LazyWelcomeComponent = () => import('views/WelcomeComponent.vue');

    return {
        name: ROUTE_WELCOME,
        path: '',
        component: LazyWelcomeComponent
    };
}
```

Webpack 또는 Rollup과 같은 번 들러를 사용하지 않으면이를 수행 할 수 없습니다.

5. 라우팅 모듈-가드
이것은 매우 중요한 경비원이 귀하의 승인을 처리해야하는 곳입니다. Vue.js를 사용하면 구성 요소 수준의 경로 보호를 작성할 수 있습니다. 그러나 제 제안은 그렇게하지 않는 것 입니다. 절대적으로 필요한 경우에만 수행하십시오. 기본적으로 우려의 분리입니다. 라우팅 모듈은 앱의 승인에 대한 지식을 가지고 있어야합니다. 그리고 기술적으로 인증은 구성 요소보다 경로에 존재 / 적용됩니다. 이것이 바로 라우팅을 별도의 모듈로 만든 이유입니다.

매우 큰 응용 프로그램에 Redux 또는 Vuex와 같은 일종의 데이터 저장소를 사용하고 있다고 가정합니다. 경로 수준 가드를 작성하려는 경우 권한 부여 결정을 내리기 위해 Redux / Vuex 저장소의 데이터를 참조해야합니다. 이는 라우팅 모듈에 저장소를 삽입해야 함을 의미합니다. 이를 수행하는 가장 간단한 방법은 라우터 초기화를 다음과 같은 함수로 래핑하는 것입니다.

```javascript
export function makeRouter(store: Store<AppState>): VueRouter {
    // Now you can access store here
    return new VueRouter({
        mode: 'history',
        routes: [
            getWelcomeRoute(store),
        ]
    });
}
```

이제 진입 점 파일에서이 함수를 간단히 호출 할 수 있습니다.

6. 라우팅 모듈-기본 경로
사용자에게 일반 / 지능형 404 메시지를 표시하려면 기본 포괄 경로를 정의해야합니다.

7. 라우팅 모듈-라우팅 데이터
우리는 실제로 매우 큰 응용 프로그램 에 대해 이야기하고 있으므로 구성 요소 내에서 라우터에 직접 액세스하지 않는 것이 좋습니다. 대신 라우터 데이터를 `vuex-router-sync` 와 같은 데이터 저장소와 동기화 상태로 유지하세요 . 이렇게하면 고통스러운 버그를 줄일 수 있습니다.

8. 라우팅 모듈-부작용
`$router.replace()`또는` $router.push()`구성 요소 내에서 자주 사용 합니다. 구성 요소의 관점에서 보면 부작용입니다. 대신 구성 요소 외부의 프로그래밍 방식 라우터 탐색을 처리하십시오. 모든 라우터 탐색을위한 중앙 위치를 만듭니다. 이러한 부작용을 처리하기 위해이 외부 엔터티에 요청 / 작업을 발송합니다. TLDR; 구성 요소 내에서 직접 라우팅 부작용을 수행하지 마십시오. 구성 요소를 견고하고 테스트하기 쉽게 만듭니다. 우리의 경우 라우팅 부작용을 처리하기 위해 `redux-observable`을 사용합니다.

나는 이것이에 대한 라우팅의 모든 측면을 다루고 희망 매우 큰 규모의 응용 프로그램을.


## 참조
- [](https://micro-frontends.org/)
- [What is the best Vue-Router practice for very large webapplications?](https://stackoverflow.com/questions/50020026/what-is-the-best-vue-router-practice-for-very-large-webapplications/50357164)
- [Mono Repo 를 위한 Lerna 간단 정리하기](https://pks2974.medium.com/mono-repo-%EB%A5%BC-%EC%9C%84%ED%95%9C-lerna-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-65c22029988)