# todo-client

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

### Docker commands

```
docker build -t muratersin/todo-client .

docker run -it -p 8080:80 --rm --name todo-frontend muratersin/todo-client
```

### Environment Variables

Your can change this environment variable in .env.development and .env.production files :

```
VUE_APP_TODO_SERVICE_URL=http://localhost:3000
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
