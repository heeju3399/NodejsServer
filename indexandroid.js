var express = require('express');
const fs = require('fs');
var app = express();
var cors = require('cors');

app.use(cors());

       

app.post('/',(req,res) => {
    console.log('post pass');
    
    var flag = req.headers["flag"];
    var id = req.headers["id"];
    var pass = req.headers["pass"];
    console.log(flag);
    console.log(id);
    console.log(pass);     
    
    var resultTitle = 'no';
    var resultMessage = '아이디와 비밀번호가 맞지 않습니다';
    
    if(flag == ''){

    }else if(flag == 'signin'){
        //로그인 되는지 안되는지 확인하고 넘겨주기 
        const jsonFile = fs.readFileSync('./user.json', 'utf8');        
        const jsonData = JSON.parse(jsonFile);
        jsonData.users.forEach(element => {          
            if(id === element.id && pass === element.pass){
                resultTitle = 'pass';
                resultMessage = 'ok';               
            }                   
        }); 
    }else if(flag == 'signup'){
        
    }

    res.json({"title":resultTitle,"message":resultMessage});


//    res.json({"key":"check header!"});
    });
    
    
app.listen(3000,() => console.log(3000));