---
title: DOCKER VOLUMES DRIVER
date: 2021-3-16
tags: 
  - docker
  - volumes
author: swjang
location: Seoul  
---

## 개요
- `docker-compose` 설정 파일 전역(global) 영역에 `volumes` 항목 작성시 `driver` 값으로 `local`, `flocker`가 사용된다.

```
volumes:
  esdata1:
    driver: local
  esdata2:
    driver: local
```
- 설정의 의미와 동작 방식에 대해 기술 한다.

## local 설정

- 상기 예시로 작성된 설정은 아래 명령과 같다.

```shell
docker volume create --driver local --name esdata1
docker volume create --driver local --name esdata2
```

- local은 esdata1 및 esdata2 볼륨이 컨테이너를 실행하는 동일한 Docker 호스트에 생성됨을 의미합니다.
- Docker Desktop (Windows) 에서  volume 의 실 저장 위치는 아래에 위치한다. 

```shell
\\wsl$\docker-desktop\mnt\host\wsl\docker-desktop-data\data\docker
```

## flocker 설정

- 상기 예시로 작성된 설정은 아래 명령과 같다.

```shell
docker volume create --driver flocker --name esdata1
docker volume create --driver flocker --name esdata2
```
- 외부 호스트에 볼륨을 만들고 로컬 호스트 (예 : `/ data-path`)에 마운트 할 수 있습니다. 따라서 컨테이너가 `/data-path`에 쓸 때 실제로 네트워크를 통해 외부 디스크에 씁니다.


## 참조 
- [사용 가능한 볼륨 플러그인의 종류](https://docs.docker.com/engine/extend/legacy_plugins/#/volume-plugins)