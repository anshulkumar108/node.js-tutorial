let fs=require('fs')

let fileName ='./Files/output.txt';

/// reading file async
async function file(fileName){
    try {
        let data = await fs.promises.readFile(fileName);
    console.log(data.toString()); 
    } catch (error) {
        console.log(error)
    }
}

/// writing file async

async function write(fileName,txt){
    try {
        let data2=await fs.promises.writeFile(fileName,txt);
        //console.log(data2);
        console.log(txt,"wirte successfully")

    } catch (error) {
        console.log(error)
    }
}

//getting status of file
  async function getStat(){
    try {
        let stat= await fs.promises.stat(fileName);
        console.log(stat);
    } catch (error) {
        console.log(error)
    }
}

//checking access of file

async function checkAccess(fileName){
    try {
        let access =await fs.promises.access(fileName);
        console.log("access");
    } catch (error) {
        console.log(error)
    }
}

checkAccess(fileName);

//getStat()
// file(fileName);
// write(fileName,`date:${new Date()}`)