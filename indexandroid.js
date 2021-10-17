var express = require('express');
const fs = require('fs');
var app = express();

var cors = require('cors');
app.use(cors());

app.post('/login', (req, res) => {
    const fs = require('fs');
    console.log('post login pass');

    var flag = req.headers["flag"];
    var id = req.headers["id"];
    var pass = req.headers["pass"];
    var siteKey = req.headers["sitekey"];
    console.log('flag : ' + flag);
    console.log('id : ' + id);
    console.log('pass : ' + pass);
    console.log('sitekey : ' + siteKey);
    var resultTitle = 'no';
    var resultMessage = '아이디와 비밀번호가 맞지 않습니다';
    if (siteKey == 'secretKey') {
        console.log('secretKey ok');
        if (flag == '') {

        } else if (flag == 'signIn') {
            console.log('flag-ok');
            //로그인 되는지 안되는지 확인하고 넘겨주기 

            const jsonFile = fs.readFileSync('./user.json', 'utf8');
            const jsonData = JSON.parse(jsonFile);
            jsonData.users.forEach(element => {
                if (id === element.id && pass === element.pass) {
                    resultTitle = 'pass';
                    resultMessage = 'ok';
                }
            });
        } else if (flag == 'signup') {


        }
    } else {//사이트키가 다를때

    }

    res.json({ "title": resultTitle, "message": resultMessage });


    //    res.json({"key":"check header!"});
});
///////////////////////////////////////////////////////////
//회원가입 페이지////회원가입 페이지////회원가
//입 페이지////회원가입 페이지//
app.post('/signup', (req, res) => {
    const fs = require('fs');
    console.log('post signup pass');
    var flag = req.headers["flag"];
    var id = req.headers["id"];
    var pass = req.headers["pass"];
    var name = req.headers["name"];
    var siteKey = req.headers["sitekey"];
    console.log('flag : ' + flag);
    console.log('id : ' + id);
    console.log('pass : ' + pass);
    console.log('name : ' + name);
    console.log('sitekey : ' + siteKey);

    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    var doubleCheck = false;
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == '') {//플레이그 확인

        } else if (flag == 'signup') {
            console.log('flag-ok');
            //로그인 되는지 안되는지 확인하고 넘겨주기 
            //회원가입 페이지////회원가입 페이지////회원가입 페이지////회원가입 페이지////회원가입 페이지//
            //회원가입 페이지////회원가입 페이지////회원가입 페이지////회원가입 페이지////회원가입 페이지//
            const jsonFile = fs.readFileSync('./user.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);

            jsonData.users.forEach(element => {

                if (id === element.id) {
                    resultTitle = 'doubleCheck';
                    resultMessage = '아이디가 중복 되었습니다';
                    doubleCheck = true;

                }
            });
            //signUp

            if (!doubleCheck) {
                jsonData['users'].push({ "id": id, "name": name, "pass": pass });
                const jsonFinalData = JSON.stringify(jsonData);
                fs.writeFileSync('./user.json', jsonFinalData, 'utf8', function (err) {
                    console.log('write err:' + err);
                });
                resultTitle = 'pass';
                resultMessage = 'ok';
            }

        } else {//플래그 다를떄
            resultTitle = 'diffrent flag';
            resultMessage = 'check flag';
        }
    } else {//사이트키가 다를때
        //접속금지 
        resultTitle = 'who are you?';
        resultMessage = 'calling 911';
    }
    console.log('result rirle : ' + resultTitle + ' // result message ' + resultMessage);
    res.json({ "title": resultTitle, "message": resultMessage });

});
//회원가입 페이지////회원가입 페이지////회원가입 페이지////회원가입 페이지//
//회원가입 페이지////회원가입 페이지////회원가입 페이지////회원가입 페이지//

app.post('/setcontent', (req, res) => {
    const fs = require('fs');
    console.log('post setcontent pass');
    var flag = req.headers["flag"];
    var id = req.headers["id"];
    var content = req.headers["content"];
    var siteKey = req.headers["sitekey"];
    var nowtime = req.headers["nowtime"];
    var visible = req.headers["visible"];

    console.log('id : ' + id);
    console.log('content : ' + content);
    console.log('nowtime : ' + nowtime);
    console.log('visible : ' + visible);

    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == '') {//플레이그 확인
        } else if (flag == 'setcontent') {
            console.log('flag-ok');

            const jsonFile = fs.readFileSync('./content.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);

            jsonData['maindash'].push({
                "userid": id, "content": content,
                "createtime": nowtime, "visible": visible,
            });
            const jsonFinalData = JSON.stringify(jsonData);
            fs.writeFileSync('./content.json', jsonFinalData, 'utf8', function (err) {
                console.log('write err:' + err);
            });
            resultTitle = 'pass';
            resultMessage = 'ok';
        } else {//플래그 다를떄
            resultTitle = 'diffrent flag';
            resultMessage = 'check flag';
        }
    } else {//사이트키가 다를때
        //접속금지 
        resultTitle = 'who are you?';
        resultMessage = 'calling 911';
    }
    console.log('result rirle : ' + resultTitle + ' // result message ' + resultMessage);
    res.json({ "title": resultTitle, "message": resultMessage });

});


app.listen(3000, () => console.log(3000));