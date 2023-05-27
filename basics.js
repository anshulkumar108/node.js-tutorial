// to import module in node.js we use require() function
//The node:readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time.

const readline = require('readline');
const fs = require('fs');
const http=require('http');

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

//************************************************************** */
//CREATING A SIMPLE WEB SERVER ********************************

const html=fs.readFileSync('./template/index.html','utf-8')
// STEP 1 : create A SERVER ********************************

const server=http.createServer((request,response)=>{
    response.end(html);
    console.log("a new request recived");
   // console.log(request)
    //console.log(response)
})

//step 2 : start a server

server.listen(8000,'127.0.0.1',()=>{
    console.log("server is running on port 8000");
})