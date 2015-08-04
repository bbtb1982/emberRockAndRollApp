##Register
```sh
ember g http-mock project
```
#Add Stubs
server/mocks/project.js
```sh
res.send({
  project:{id: 1, number: 123, name: 'Fooshnickins'}
});
```
##Test mock using curl note the contenttype
```sh
>curl -H "ContentType:application/json" http://localhost:4200/api/project
```