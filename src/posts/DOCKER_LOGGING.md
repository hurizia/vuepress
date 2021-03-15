# DOCKER LOGGING

## 개요
- docker를 이용한 서비스 운영시 로그처리 매커니즘 및 처리에 대해 알아 본다.

## 로깅 메커니즘
- Docker에는 실행중인 컨테이너 및 서비스에서 정보를 가져 오는 데 도움이되는 여러 로깅 메커니즘이 포함되어 있습니다. 이러한 메커니즘을 로깅 드라이버(`logging driver`)라고합니다.
- 로깅 드라이버 설정을 통해 저장 메체 및 위치를 조정할 수 있다.
- 기본적으로 `docker logs` 또는 `docker service logs` 명령을 터미널에서 대화 형으로 실행했을 때 표시되는 것처럼 명령의 출력을 표시합니다. UNIX 및 Linux 명령어는 일반적으로 실행시 `STDIN`, `STDOUT`, `STDERR`이라고하는 3 개의 I/O 스트림을 엽니다. 
- `STDIN`은 명령의 입력 스트림으로, 키보드 입력 또는 다른 명령 입력을 포함 할 수 있습니다. `STDOUT`은 일반적으로 명령의 일반 출력이고 `STDERR`은 일반적으로 오류 메시지를 출력하는 데 사용됩니다. 기본적으로 `docker logs`는 명령어의 `STDOUT` 및 `STDERR`을 표시합니다.
- `http`, `ngnix` 와 같은 응용 프로그램은 로그는  파일에 로그를 기록한다.
  + [방법1] volume 실행 옵션을 통해 호스트에 로깅 처리
  + [방법2] `STDOUT`, `STDERR` 로 출력할 수 있게 처리

:::tip  
공식 `nginx` 이미지는 `/var/log/nginx/access.log`에서 `/dev/stdout`으로의 심볼릭 링크를 만들고 `/var/log/nginx/error.log`에서 `/dev/stderr` 로의 또 다른 심볼릭 링크를 만들어 로그를 덮어 씁니다. 대신 관련 특수 장치로 로그가 전송되도록합니다. 공식 `nginx` 도커 이미지 `Dockerfile`을 참조세요.

공식 `httpd` 드라이버는 `httpd` 응용 프로그램의 구성을 변경하여 일반 출력을 `/proc/self/fd/1` (`STDOUT`)에 직접 작성하고 오류를 `/proc/self/fd/2` (`STDERR`)에 기록합니다. 공식 `http` 도커 이미지 `Dockerfile`을 참조하십시오.  
:::

## 로깅 위치
```
/var/lib/docker/containers/[container-id]/[container-id]-json.log
```

## 로깅 용량
docker-compose.yml 에서 max-file : “4”로 해둔대로 최대 용량이 정해진다. 로그가 위치한 경로로 가다가 끝까지 들어가지 않고 컨테이너가 만들어진 경로인  /var/lib/docker/containers 까지만 가서 'ls -alh' 명령어를 통해 컨테이너의 용량을 보면 docker-compose.yml에서 선언한 최대 용량과 같이 꽉 차있음을 확인할 수 있다.

## 로그 중앙 처리
`syslog`, `fluentd` 등을 통해 로그를 중앙에 집중하여 처리할 수 있다.


## 참고

- [View logs for a container or service](https://docs.docker.com/config/containers/logging/)
- [Configure logging drivers](https://docs.docker.com/config/containers/logging/configure/)
- [fluentd 로깅](https://hoony-gunputer.tistory.com/entry/docker-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-log-%EB%82%A8%EA%B8%B0%EA%B8%B0)