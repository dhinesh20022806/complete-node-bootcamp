const fs = require("fs");
// import replaceTemplate from './modules.js/replaceTemplate';
const http = require("http");
const url = require("url");
const slugfiy = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
console.log(replaceTemplate);
// // async

// fs.readFile('./txt/read-this.txt','utf-8',(err,data)=>{
//     if(err) console.log(err);

//     console.log(data+ `        Async` );
// })

// console.log(`the file going to read the data`);

// console.log(`this is sync , this will block the code`);
// const readData = fs.readFileSync('./txt/read-this.txt','utf-8');
// console.log(readData +`        Sync`);

// // wirte the data Async vs Sync

// // Async

// const path = `./txt/input.txt`;
// // fs.writeFile(path,'hello, world',(err)=>{
// //     if(err) console.log(err);
// // })

// fs.writeFileSync(path,"Sync write")

// async read......

// fs.readFile(__dirname +'/txt/start.txt','utf-8',(err,data)=>{
//     if(err) console.log(err);
//     fs.readFile(`${__dirname}/txt/${data}.txt`,'utf-8',(err,data)=>{
//         if(err) console.log(err);
//         fs.readFile(`${__dirname}/txt/${data}.txt`,`utf-8`,(err,data)=>{
//             if(err) console.log(err);
//             console.log(data);
//         })
//     })
// })

// routing

// http.createServer((req,res)=>{
//     console.log(req.url);
//     res.writeHead(200,{'Content-Type':"text/plain"})
//     res.write("hello, world");
//     res.end();
// }).listen(8080)

// make the port number
const port = 8080;
// make the jsonFile Async
// const jsonFile = fs.readFile(
//   `${__dirname}/dev-data/data.json`,
//   `utf-8`,
//   (err, data) => {
//     if (err) console.error(err);
//     JSON.parse(data);
//   }
// );

let templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  `utf-8`
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  `utf-8`
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const jsonFileSync = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  `utf-8`
);
const dataObj = JSON.parse(jsonFileSync);
// console.log(jsonFile);

// const slugs =

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    // overview page
    case `/`:
      res.writeHead(200, { "Content-type": "text/html" });
      const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
      res.end(templateOverview);
      break;
    case "/overview":
      res.writeHead(200, { "Content-type": "text/html" });
      const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
      console.log(cardsHtml);
      templateOverview = templateOverview.replace(
        /{%PRODUCT_CARDS%}/g,
        cardsHtml
      );
      res.end(templateOverview);
      break;
    // product
    case "/product":
      res.writeHead(200, { "Content-Type": "text/html" });
      const product = dataObj[query.id];
      const output = replaceTemplate(templateProduct, product);
      res.end(output);
      break;
    // api
    case `/api`:
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(jsonFileSync);
    default:
      res.writeHead(404, {
        "Content-type": "text/html",
        "my-own-header": "hello world",
      });
      res.end(`<h1>Page Not Found</h1>!`);
      break;
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Listening to request on port http://127.0.0.1:${port}`);
});
