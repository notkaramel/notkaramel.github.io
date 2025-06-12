+++
title = 'ECSE321'
date = '2025-06-11T22:25:51-04:00'
draft = true
+++

# Frontend Elements
- Within the `frontend` folder is a Vue.js project that's built with Vite.
- Major packages that we use:
  - Vue Router: to add routes to our Vue.js project
  - Axios: an alternative to the `fetch` API to send HTTP Requests to our backend server
  - Flowbite-Vue: a CSS Utitlity Library with pre-made component libraries for Vue
  - TailwindCSS: the CSS Library that Flowbite is built on top of, primary for specific styling of our app
  - Pinia: for state management
- Set up + Development guide is in the README.md file of the folder
- Folder management:
  - `assets`: for images, styling, media, etc.
  - `components`: reusable elements (like Objects in OOP) for our website
  - `views`: the viewing page. It must follow the syntax of `<PAGE>View.vue` and be routed in `index.ts` of router
  - `store`: relating to the state management system
- Documentation:
  - [Vue.js](https://vuejs.org/guide/quick-start.html)
  - [Flowbite-Vue](https://flowbite-vue.com/pages/getting-started)
  - [Flowbite](https://flowbite.com/docs/getting-started/quickstart/)
  - [TailwindCSS](https://tailwindcss.com) - @notkaramel suggests using their search feature!
  - [Axios](https://axios-http.com/docs/intro)
  - [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  - [Pinia](https://pinia.vuejs.org/core-concepts/)
- Development:
  - Only `.vue` files should be created and modified.
  - Use VSCode + Volar extention for Vue for development.
  - Code must pass `linting` and `build` actions before merging. 

# Backend Endpoints
- For localhost testing: after running the backend server using `./gradlew bootRun -xtest`, open another terminal emulator:
```
curl -X POST localhost:8080/employees -H 'Content-type:application/json' -d '{"name": ""}'
```
- Can also use Postman for easier working GUI

# General developer notes
## 1. Text Editor / IDE
- Developers can use any text editor or IDE they wish to use, with the exception of Eclipse for Java due to some issue with git (it ignores `.gitignore` sometimes) and lacks of IntelliSense extends or support from the team or the TAs of the class.
- Suggestions:
  - Text editor: VSCode + its large library of extensions for productivity and IntelliSense. Vim and its forks (e.g., Neovim) with plugins are also great (but not encouraged) options.
  - IDE: IntelliJ for Java backend dev, WebStorm for frontend dev 

## 2. Git Branches
- We name our branches following this template: `person-task`. This allows others to know whose branch it is and also which task they are working on.
- After pull request is accepted/merged, the branch should be deleted.
- To start working on a new task, the developer should `checkout` to the `main` branch, make sure that it's up-to-date, then branch out for the new work item.
```bash
git checkout main
git pull origin main
git checkout -b <new-branch>
```

## 3. Tools
- For UML diagrams (Domain model, Use-Case diagrams, etc.), we use [PlantUML](https://plantuml.com) to illustrate. They also have extension/plug-in for VSCode and IntelliJ. 
- Java: we use the open-source and long-term support (LTS) version of JDK: OpenJDK 17. Developers are recommended to download the JDK using a package manager `HomeBrew` for MacOS, `pacman` for Arch Linux, `Chocolatey` for Windows.
- SpringBoot version: 3.1.4 (using the [Spring Initializer](https://start.spring.io))
- Gradle version 8.3+ should work. Gradle-Groovy is the setting for this project
- JPA annotation ~ Hibernate 
  - [Inheritance](https://www.baeldung.com/hibernate-inheritance)
  - ...
- PostgreSQL: version 15
  - Linux Guide: [ArchWiki](https://wiki.archlinux.org/title/PostgreSQL)
  - MacOS Guide: [SQL Shack](https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/)
- Code Coverage: JaCoCo Plugin

## 4. Code Style
- The project should follow a certain code style, for consistency and readability.
- We're using 4 spaces for indentation instead of tabs. You can set this in VSCode by `F1` and search `Indent using Spaces`, and select `4`. 
- For `.java` files, use `Format Document` function of VSCode to format it. 
  - Make sure that you have [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) for the formatting.

# Database
- **IMPORTANT NOTE:** This is **NOT** a **deployment** as suggested by the instructor, but rather an accessible remote point for the developer team to focus on implementing the core functionalities of the project. Setting up PostgreSQL is fairly detailed in the [Tutorial Notes](https://mcgill-ecse321-fall2023.github.io/#_setting_up_a_local_postgresql_database), but extremely Windows-focused. That leaves MacOS and Linux users (which take up 4/6 of our team) having to deal with the complicated configuration process, both with GUI installer or package manager, which has a different setup guide. For example: [Arch Linux - PostgreSQL Guide](https://wiki.archlinux.org/title/PostgreSQL).
- (Suggested) The developer should use their `localhost` PostgreSQL, as they can get a chance to learn about setting up database server, logging into, and communicate with them. In that case, the `application.properties` would follow strictly to the section 2.3 of (Tutorial Notes)[https://mcgill-ecse321-fall2023.github.io/#_setting_up_a_spring_boot_project]:
```yaml
server.port = ${PORT:8080}

spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update

spring.datasource.url=jdbc:postgresql://localhost:5432/event_registration
spring.datasource.username=postgres
spring.datasource.password=PASSWORD
```
- This section focused on the configuration of Database within the `application.properties` file in our project.
- To protect the developer team's privacy password, we agreed upon accessing a remote PostgreSQL server on `server.notkaramel.me` with the following configuration for `application.properties` file:
```yaml
server.port = ${PORT:8080}

spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update

spring.datasource.url=jdbc:postgresql://server.notkaramel.me:5321/Mar1HotelDatabase
spring.datasource.username=mhs_developer
spring.datasource.password=ECSE321_DreamTeam05
```
- Developers can access and manually manipulate the database by: (Pre-requisite: having `psql` installed)
```bash
psql -h server.notkaramel.me -p 5321 -d Mar1HotelDatabase -U mhs_developer -W
Password: ECSE321_DreamTeam05
```
- Commonly used SQL syntax to manipulate exisiting data:
```sql
# (NOT RECOMMENDED, ONLY IF NECESSARY) To delete everything, execute BOTH following command:
drop schema public cascasde;
create schema public;

# To list databases on the server:
\l

# To list existing tables:
\dt

# To query from any table:
select * from <table_name>;
```

- The database will be removed once the course is completed.

# Project Board
## 1. Issues
- Issues are used for all type of work items: requirements, tasks, problems/bugs.
- When create issue, the developer must specify:
  - The title: See [Title](#2-title)
  - Description: if the issue is linked to another work item, it must be specify using `#` and the number of the work item in question. See (Autolinked References and URLs)[https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls]
  - Assignee(s)
  - Project: **`@Group 5's project`**
  - Label: although not required, it is suggested that developers specify which part of the project the issue is addressing.

## 2. Title
- The title for issue/PR must be descriptive and precise of the task/problem.
- For requirements, we follow the template: (`x` is the requirement number)
  - Functional Req.: `FRx - The system shall...`
  - Non-functional Req.: `NFRx - The system shall...`
## 3. Pull Request (PR) | Code Review
- PR can be in *Draft* mode when created.
- PRs should **have** and **be assigned to** a reviewer once it's ready.
- If code is involved, a code review session should be set up where everyone in the team review together.