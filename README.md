# mobile_vue


## Docker镜像build和push上传
发布的时候：
```./docker-build-push-image.sh```

若只是build image，可以把docker-build-push-image.sh 里面的```push_images```注释掉

## Docker日常自己测试的时候：

1.  build   
    ```docker build -t haokegenjin_front_h5:v1.0 -f ./Dockerfile_test .```
2.  run 
    ```docker run -p 3000:80 -d --name haokegenjin_front_h5 haokegenjin_front_h5:v1.0```
3.  local test  
    浏览器直接打开“http://localhost:3000/”
4.  查看docker运行情况  
    `docker exec -it haokegenjin_front_h5 sh`


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
