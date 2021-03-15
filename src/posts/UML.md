# UML

## UML Example 1
@startuml
node "Client" {
    agent Browser
    node "VueFramework" {
        (VueRouter)
        [Components]
        node "VueStore" {
            [State]
            [Mutations]
            [Actions]
        }
    }
}
Browser --> VueRouter : URI
Browser -> Components : Event
VueRouter --> Components
VueStore --> Components
State <- Mutations
State <-- Actions
Mutations <- Actions
@enduml

## UML Example 2
@startuml
node "Server" {
    node Helper {
        package "CrawlerPacakge" {
            node "MusicCrawler"
            node "NewsCrawler"
            node "Crawler" 
        }
        node "Youtube Search API" as YSA
    }
    node "REST API" as REST {
        node Service
        node Repository
        node RestController
    }
    database H2
}
RestController <-- Service
Service <-- Repository
Service <- Helper
Repository <-> H2
Crawler <|-- MusicCrawler
Crawler <|-- NewsCrawler
@enduml


## 참조
- [Plantuml 응용하기](https://junilhwang.github.io/TIL/Vuepress/Plantuml/#_3-plantuml-%E1%84%8B%E1%85%B3%E1%86%BC%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)
- [PlantUML 간단 요약](https://plantuml.com/ko/)