## Deploy

Passos para realizar o deploy do backend no google cloud.

### 1. Docker image

Primeiro passo é gerar a imagem docker e validar se ela está rodando normalmente.

```
$ docker buildx build --platform linux/amd64 -t backend .
```

Obs: o --platform é importante caso esteja sendo gerado em uma máquina rodando MACOS.

### 2. Subir para o Container Registry

Antes de subir para Container Registry do Google Cloud, é necessário realizar o login utilizando o sdk

```
$ gcloud auth login
```

Tendo a imagem pronta, basta subir para o container registry

```
$ docker tag backend gcr.io/tcc-backend-371416/backend
$ docker push gcr.io/tcc-backend-371416/backend
```
