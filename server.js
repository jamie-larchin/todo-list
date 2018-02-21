const express = require('express');
const fs = require('fs');
var formidable = require('express-formidable');

const app = express();
const port = process.env.PORT || 5000;

app.use(formidable());

app.get('/get-todos', (request, response) => {
  fs.readFile(`${ __dirname }/data/todos.json`, (error, data) => {
    if(error) {
      console.log(`Error reading todos.json: ${ error }`);
      response.status(500);
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

app.post('/:user/create-todo', (request, response) => {
  fs.readFile(`${ __dirname }/data/todos.json`, (error, data) => {
    if(error) {
      console.log(`Error reading todos.json: ${ error }`);
      response.status(500);
      response.send(error);
    } else {
      const list = JSON.parse(data);
      let userIndex = list.todos.findIndex(todo => todo.user === request.params.user);

      if(userIndex === -1) {
        userIndex = list.todos.length;

        list.todos[userIndex] = {
          "user": request.params.user,
          "body": []
        }
      }

      list.todos[userIndex].body.push(request.fields);
      const updatedList = JSON.stringify(list);

      fs.writeFile(`${ __dirname }/data/todos.json`, updatedList, (error) => {
          if(error) {
            console.log(`Error writing to todos.json: ${ error }`);
            response.status(500);
            response.send(error);
          } else {
            response.send(request.fields);
          }
      });
    }
  });
});

app.put('/:user/update-todo/:id', (request, response) => {
  fs.readFile(`${ __dirname }/data/todos.json`, (error, data) => {
    if(error) {
      console.log(`Error reading todos.json: ${ error }`);
      response.status(500);
      response.send(error);
    } else {
      const list = JSON.parse(data);
      const userIndex = list.todos.findIndex(todo => todo.user === request.params.user);
      list.todos[userIndex].body[request.params.id] = request.fields;
      const updatedList = JSON.stringify(list);

      fs.writeFile(`${ __dirname }/data/todos.json`, updatedList, (error) => {
          if(error) {
            console.log(`Error writing to todos.json: ${ error }`);
            response.status(500);
            response.send(error);
          } else {
            response.send(request.fields);
          }
      });
    }
  });
});

app.delete('/:user/delete-todo/:id', (request, response) => {
  fs.readFile(`${ __dirname }/data/todos.json`, (error, data) => {
    if(error) {
      console.log(`Error reading todos.json: ${ error }`);
      response.status(500);
      response.send(error);
    } else {
      const list = JSON.parse(data);
      const userIndex = list.todos.findIndex(todo => todo.user === request.params.user);

      list.todos[userIndex].body = list.todos[userIndex].body.filter(item => {
        return item.id !== Number(request.params.id);
      });

      const updatedList = JSON.stringify(list);

      fs.writeFile(`${ __dirname }/data/todos.json`, updatedList, (error) => {
        if(error) {
          console.log(`Error writing to todos.json: ${ error }`);
          response.status(500);
          response.send(error);
        } else {
          response.send({ success: true });
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
