const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.get('/get-todos', (request, response) => {
  fs.readFile(`${ __dirname }/data/todos.json`, function(error, data) {
    if(error) {
      console.log(`Error reading todos.json: ${ error }`);
      response.status(500);
      response.send(error);
    } else {
      response.send(data.toString());
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
