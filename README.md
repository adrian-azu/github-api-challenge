## Github API - Joyride Backend Engineer Technical Exam

## Prerequisites

- Node.js 16 and up
- Mysql
- Redis

### Optional
- Docker
- Docker Compose

## Run Locally

### Clone the repository and install node packages

```
git clone https://github.com/adrian-azu/github-api-challenge.git
cd github-api-challenge
npm install
```

### Create an ENV file and Setup config variables

```
// with git bash/linux/macOs
cp .env.example .env
```
#### Create Database and migrate Table using sequelize cli

Create Database
```
npx sequelize db:create
```
Migrate table

```
npx sequelize db:migrate
```

#### Start the server

```bash
  npm start
```

Try requesting with postman http://locahost:3000/test to see the response

### Docker

```
  docker-compose up --build -d
```

## API Reference

#### Register

```http
  POST /auth/register
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `name`     | `string` | **Required**. |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Login

```http
  POST /auth/login
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Challenge 1: Github Usernames

```http
  POST /challenge/usernames
```

| HEADERS         | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `Bearer` | **Required** User Authentication Token |

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `usernames`    | `array` | **Required**. |

#### Bonus Challenge: Hamming Distance

```http
  POST /challenge/usernames
```

| HEADERS         | Type     | Description                            |
| :-------------- | :------- | :------------------------------------- |
| `Authorization` | `Bearer` | **Required** User Authentication Token |

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `x`    | `number` | **Required**. |
| `y`    | `number` | **Required**. |

## Built With

- Node.js
- Express
- Mysql
- Redis
