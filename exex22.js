var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

app.get('/',(req,res) => {
    console.log('get pass');
var userHeader = req.headers["userheader"];
var uu = req.headers["uu"];





if(userHeader === "1234"){
    return res.json({"key":"value"});
}

if(userHeader === undefined){
    return res.json({"key":"Err"});
}
res.json({"key":"check header!"});
});


app.post('/',(req,res) => {
    console.log('post pass');
    var userHeader = req.headers["userheader"];
    var uu = req.headers["uu"];
    console.log(uu);
    console.log(userHeader);

    var id = req.headers["id"];
    var pass = req.headers["pass"];

    console.log(id);
    console.log(pass);          
    
    if(userHeader === "1234"){
        return res.json({"key":"value"});
    }
    
    if(userHeader === undefined){
        return res.json({"key":"Err"});
    }
    res.json({"key":"check header!"});
    });

app.listen(3000,() => console.log(3000));