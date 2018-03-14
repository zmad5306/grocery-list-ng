# GroceryListNg

## Run with Docker

`docker pull zmad5306/grocery-list-ng:latest`

`docker run -d --name grocery-list-ng -p 8080:80 zmad5306/grocery-list-ng:latest`

## Builds

### Circle CI

https://circleci.com/gh/zmad5306/grocery-list-ng

### Docker Hub

https://hub.docker.com/r/zmad5306/grocery-list-ng/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Kubernetes

### Pods

`kubectl create -f pod.yml`

`kubectl get pods --all-namespaces`

`kubectl describe pods`

`kubectl get pods/grocery-list-pod`

`kubectl delete pods grocery-list-pod`

### Pods with yml

`kubectl create -f rc.yml`

`kubectl get rc`

`kubectl describe rc`

`kubectl apply -f rc.yml`

### Services

`kubectl expose rc grocery-list-rc --name=grocery-list-svc --target-port=8080 --type=NodePort`

`kubectl describe svc grocery-list-svc`

`kubectl create -f svc.yml`

`kubectl get svc`

Run with `http://minikube:30683` (have to get service to get port)

### Deployments

`kubectl create -f kubernetes/deploy.yml`

`kubectl get deployment`

`kubectl describe deployment grocery-list-deployment`

`kubectl get rs`

`kubectl describe rs`

`kubectl apply -f kubernetes/deploy.yml --record`

`kubectl rollout status deployment grocery-list-deployment`

`kubectl rollout history deployment grocery-list-deployment`