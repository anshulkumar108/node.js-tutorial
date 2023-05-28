//to use this function in other module we use export module
//to import in other module we use require function 
module.exports = function (template,product) {
    let output= template.replace('{{%IMAGE%}}',product.productImage)
    output= output.replace('{{%NAME%}}',product.name)
    output= output.replace('{{%MODELNAME%}}',product.modeName)
    output= output.replace('{{%MODALNUMBER%}}',product.modelNumber)
    output= output.replace('{{%SIZE%}}',product.size)
    output= output.replace('{{%CAMERA%}}',product.camera)
    output= output.replace('{{%PRICE%}}',product.price)
    output= output.replace('{{%COLOR%}}',product.color)
    output= output.replace('{{%ID%}}',product.id)
    output= output.replace('{{%DESC%}}',product.Description)
    return output;
}