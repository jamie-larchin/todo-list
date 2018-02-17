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

app.post('/create-todo', (request, response) => {
  fs.readFile(`${ __dirname }/data/todos.json`, (error, data) => {
    if(error) {
      console.log(`Error reading todos.json: ${ error }`);
      response.status(500);
      response.send(error);
    } else {
      const list = JSON.parse(data);
      list.todos.push(request.fields)

      const updatedData = JSON.stringify(list);

      fs.writeFile(`${ __dirname }/data/todos.json`, updatedData, (error) => {
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

app.listen(port, () => console.log(`Listening on port ${port}`));
