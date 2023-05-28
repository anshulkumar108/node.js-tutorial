// to import module in node.js we use require() function
//The node:readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time.

const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url=require('url') // this url object has method called parse

// const rl=readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question("please enter your name",(name)=>{
//     console.log("you entered :" + name);
//     rl.close() //The rl.close() method closes the Interface instance and relinquishes control over the input and output streams. When called, the 'close' event will be emitted

// });

// rl.on( 'close',()=>{
//     console.log("Interface is closed");
//     process.exit(0)//The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code. 
// })//Adds the listener function to the end of the listeners array for the event named eventName. 

//*****************************************************************************************************************
//************************************************************************************************** */
//READING FILE SYNCHRONOUSLY

// let textIn=fs.readFileSync('./Files/input.txt','utf-8');//readFileSync reads the input.txt file and once it read it .it will return content .
// console.log(textIn);

// let content=`data read from input file: ${textIn} \n date : ${new Date()} \n`
// let output=fs.writeFileSync('./Files/output.txt',content);


//*********************************************************************************************************/


// //READING FILE ASYNCHRONOUSLY.
// //outpiut of readfile assigned to data.
// fs.readFile('./Files/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
//     fs.readFile(`./Files/${data}.txt`, 'utf-8', (err, data2) => {
//         //we are not calling this readFile function outside callback function because we want to run his readfile function after 
//         // completing of previous readFile function that is data output.
//         console.log(data2);
//         fs.readFile(`./Files/append.txt`, 'utf-8', (err,data4)=>{
//                      console.log(data4);
//                      fs.writeFile(`./Files/output.txt`,`${data2}\n\n ${data4}\n\n date created : ${new Date()}`,()=>{
//                         console.log('file writen successfully')
//                     })
//         })
//     });
// })//this readFile run asynchronously so it will run in background as it completed its output stored in data.and it will be pused to main thread.

//******************************************************************************************************/
//*********************************************************************************************************//
// READING FILES ASYNCHRONOUSLY. using async await functions

// const util = require('util');
// const readFileAsync = util.promisify(fs.readFile);

// async function readfiles(){

//     try {
//         let data= await readFileAsync('./Files/start.txt','utf-8');
//         let data2= await readFileAsync(`./Files/${data}.txt`,'utf-8'); 
//         let data3 = await readFileAsync(`./Files/append.txt`,'utf-8');
//         console.log(`${data}\n\n ${data2}\n\n date created : ${new Date()}`)

//     } catch (error) {
//         console.log(error)
//     }
// }
//  console.log('reading  file......'); // first this line executed
//  readfiles(); // second this line executed

//***************************************************************/
//
//CREATING A SIMPLE WEB SERVER ********************************

const html = fs.readFileSync('./template/index.html', 'utf-8')
const product = JSON.parse(fs.readFileSync('./data/product.json', 'utf-8'))
const productList=fs.readFileSync("./template/product.html", 'utf-8')

let productHTMLArray=product.map((prod)=>{
 let output= productList.replace('{{%IMAGE%}}',prod.productImage)
      output= output.replace('{{%NAME%}}',prod.name)
      output= output.replace('{{%MODELNAME%}}',prod.modeName)
      output= output.replace('{{%MODALNUMBER%}}',prod.modelNumber)
      output= output.replace('{{%SIZE%}}',prod.size)
      output= output.replace('{{%CAMERA%}}',prod.camera)
      output= output.replace('{{%PRICE%}}',prod.price)
      output= output.replace('{{%COLOR%}}',prod.color)
      output= output.replace('{{%ID%}}',prod.id)
      return output;
})
// STEP 1 : create A SERVER ********************************

//whenever we are making request to server it getting that request inside this request parameter and request parameter has
//property called URL.THIS url property is going to store value which user has entered after the root URL.

// in node js we can't use static files.static means which might need in our node application ex:css files,image files,script files.
const server = http.createServer((request, response) => {
      let {query,pathname:path}= url.parse(request.url,true) // this true signifies that parse method will pass query string from url
      //console.log(query,path)
      //let path = request.url

    //response.end(path) // this give "/" as output
    if (path === '/' || path.toLocaleLowerCase() === '/home') {
        response.writeHead(200, { 'Content-Type': 'text/html'})
        response.end(html.replace('{{%CONTENT%}}',"you are in home page"))
        
    } else if (path.toLocaleLowerCase() === '/about') {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(html.replace('{{%CONTENT%}}', "you are in about page"))
    } else if (path.toLocaleLowerCase() === '/content') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'my-header': 'hello world!' //custome header
        })
        response.end(html.replace('{{%CONTENT%}}', "you are in content page"));
    } else if (path.toLocaleLowerCase() === '/products') {
        if(!query.id){
            let productListResponse=html.replace('{{%CONTENT%}}',productHTMLArray.join(','))
            response.writeHead(200, { 'Content-Type': 'text/html'})
            response.end(productListResponse)
        }else{
            response.end("the prodcts details having id:" + query.id)
        }
       
   // console.log( productHTMLArray.join(',')); // using join we get single html file
    } else {
        response.writeHead(404, {
            'Content-Type': 'text/html',
            'my-header': 'hello world!' //custome header
        })
        response.end(html.replace('{{%CONTENT%}}', "404 Error page not found"));
    }
})
//step 2 : start a server
server.listen(8000, '127.0.0.1', () => {
    console.log("server is running on port 8000");
})

//***************************************************************************************************//
//***************************************************************************************************//
//**PARSING QUERY STRING FROM URL**//

//Query string is a key value pair which we specify after a question mark 127.0.0.1:8000/product/id=10&name=iphone in this url id is quert string
//if we two query string then we & between them.