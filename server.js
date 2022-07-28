const http = require('http');
const products = require('./products');
const fs = require('fs');
//create server
const server = http.createServer((req, res) => {
  let mess = 'Welcome to ';
  res.setHeader('Content-Type', 'text/html');
  switch (req.url) {
    case '/': {
      mess += 'Home page';
      res.write(`<h1>${mess}</h1>`);
      return res.end();
    }
    case '/products': {
      mess += 'Products page';
      res.write(`<h1>${mess}</h1>`);
      products.map((el) => {
        res.write(`<div> <span>${el.id} </span>
     <span>${el.name}</span>
     </div>`);
      });
      return res.end();
    }
    default: {
      let htmlFile='';
      fs.readFile(
        `${__dirname}/404.html`,
        {
          encoding: 'utf-8',
        },
        (err, data) => {
          res.write(data);
          res.end();
        }
      );
    }
  }
});

server.listen(4000);
