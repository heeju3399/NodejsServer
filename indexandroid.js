var express = require('express');
const fs = require('fs');
var app = express();

var cors = require('cors');
app.use(cors());
//크게 유저랑 컨텐트

app.post('/userdelete', (req, res) => {
    const fs = require('fs');
    console.log('post userdelete pass');
    var flag = req.headers["flag"];
    var id = req.headers["id"];
    var siteKey = req.headers["sitekey"];
    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';

    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == '') {//플레이그 확인
        } else if (flag == 'userDelete') {
            const jsonFile = fs.readFileSync('./user.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);
            console.log('flag-ok');
            var count = 0;
            var location = 0;
            jsonData.users.forEach(element => {
                if (id === element.id) {
                    location = count;
                } else {
                    count++;
                }
            });
            jsonData['users'].splice(location, 1);
            const jsonFinalData = JSON.stringify(jsonData);
            fs.writeFileSync('./user.json', jsonFinalData, 'utf8', function (err) {
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

app.post('/deletecomment', (req, res) => {
    const fs = require('fs');
    console.log('post deletecomment pass');
    var flag = req.headers["flag"];
    var contentid = req.headers["contentid"];
    var siteKey = req.headers["sitekey"];
    var userid = req.headers["id"];
    var order = req.headers["order"];
    console.log('ORDER : ' + order);
    console.log('contentid : ' + contentid);
    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == '') {//플레이그 확인
        } else if (flag == 'deleteComment') {
            console.log('flag-ok');
            var jsonFile = fs.readFileSync('./content.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);
            var maindashcontent = jsonData['maindashcontent'];
            var count = 0;
            maindashcontent.forEach(element => {
                //comment.push(element.comment);
                if (element.contentid == contentid && count == 0) {
                    console.log('1');
                    element.comment.forEach(elementcomment => {
                        console.log('2' + elementcomment.userid + 'userid??' + userid);
                        if (elementcomment.userid == userid && count == 0) {
                            console.log('3');
                            element.comment.splice(order, 1);
                            count++;
                        }
                    });
                }
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
    //console.log('result rirle : ' + resultTitle + ' // result message ' + resultMessage);
    res.json({ "title": resultTitle, "message": resultMessage });
});

app.post('/deleteallcontent', (req, res) => {
    const fs = require('fs');
    console.log('post deleteallcontent pass');
    var flag = req.headers["flag"];
    var siteKey = req.headers["sitekey"];
    var userid = req.headers["id"];
    var contentId = req.headers["contentid"];
    console.log('contentid : ' + contentId);
    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == '') {//플레이그 확인
        } else if (flag == 'deleteAllContent') {
            console.log('flag-ok');
            var jsonFile = fs.readFileSync('./content.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);
            var maindashcontent = jsonData['maindashcontent'];
            maindashcontent.forEach(element => {
                if (element.userid == userid) {
                    console.log('element pass');
                    element.visible = '0';
                }
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
    //console.log('result rirle : ' + resultTitle + ' // result message ' + resultMessage);
    res.json({ "title": resultTitle, "message": resultMessage });

});

app.post('/deletecontent', (req, res) => {
    const fs = require('fs');
    console.log('post deletecontent pass');
    var flag = req.headers["flag"];
    var siteKey = req.headers["sitekey"];
    var userid = req.headers["id"];
    var contentId = req.headers["contentid"];
    console.log('contentid : ' + contentId);
    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == '') {//플레이그 확인
        } else if (flag == 'deleteContent') {
            console.log('flag-ok');
            var jsonFile = fs.readFileSync('./content.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);
            var maindashcontent = jsonData['maindashcontent'];
            maindashcontent.forEach(element => {
                if (element.contentid == contentId && element.userid == userid) {
                    console.log('element pass');
                    element.visible = '0';
                }
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
    //console.log('result rirle : ' + resultTitle + ' // result message ' + resultMessage);
    res.json({ "title": resultTitle, "message": resultMessage });

});

app.post('/setlikeandbad', (req, res) => {
    const fs = require('fs');
    console.log('post setlikeandbad pass');
    var flag = req.headers["flag"];
    var siteKey = req.headers["sitekey"];
    var contentId = req.headers["contentid"];
    var likeAndBad = req.headers["likeandbad"];
    console.log('contentid : ' + contentId);
    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == '') {//플레이그 확인
        } else if (flag == 'setlikeandbad') {
            console.log('flag-ok');
            var jsonFile = fs.readFileSync('./content.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);
            var maindashcontent = jsonData['maindashcontent'];

            if (likeAndBad == 0) {//좋아요               
                maindashcontent.forEach(element => {
                    if (element.contentid == contentId) {
                        //console.log('search');
                        element.like = element.like + 1;
                        //console.log('result?? ' + element.like);
                    }
                });
            } else if (likeAndBad == 1) {//별로요
                maindashcontent.forEach(element => {
                    if (element.contentid == contentId) {
                        //console.log('search');
                        element.bad = element.bad + 1;
                        //console.log('result?? ' + element.like);
                    }
                });
            }
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
    //console.log('result rirle : ' + resultTitle + ' // result message ' + resultMessage);
    res.json({ "title": resultTitle, "message": resultMessage });

});

app.post('/getusercontent', (req, res) => {
    const fs = require('fs');
    console.log('post getusercontent pass');
    var siteKey = req.headers["sitekey"];
    var flag = req.headers["flag"];
    var userid = req.headers["id"];
    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == 'getusercontent') {
            const jsonFile = fs.readFileSync('./content.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);
            var returnList = [];
            var maindashcontent = jsonData['maindashcontent'];
            maindashcontent.forEach(element => {
                if (element.userid == userid && element.visible == 1) {
                    console.log('search');
                    //console.log(element.content);
                    returnList.push(element);
                }
            });
            const returnList2 = JSON.stringify(returnList);
            resultTitle = 'pass';
            resultMessage = returnList2;
        }
    } else {//사이트키가 다를때
        //접속금지 
        resultTitle = 'who are you?';
        resultMessage = 'calling 911';
    }
    //console.log('result rirle : ' + resultTitle + ' // result message ' + resultMessage);
    res.json({ "title": resultTitle, "message": resultMessage });
});

app.post('/setcomment', (req, res) => {
    const fs = require('fs');
    console.log('post setcomment pass');
    var flag = req.headers["flag"];
    var id = req.headers["id"];
    var comment = req.headers["comment"];
    var siteKey = req.headers["sitekey"];
    var nowtime = req.headers["nowtime"];
    var visible = req.headers["visible"];
    var contentId = req.headers["contentid"];
    console.log('id : ' + id);
    console.log('comment : ' + comment);
    console.log('nowtime : ' + nowtime);
    console.log('visible : ' + visible);
    console.log('contentid : ' + contentId);
    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == '') {//플레이그 확인
        } else if (flag == 'setcomment') {
            console.log('flag-ok');
            var commentId = 0;
            var jsonFile = fs.readFileSync('./content.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);
            var maindashcontent = jsonData['maindashcontent'];
            maindashcontent.forEach(element => {
                if (element.contentid == contentId) {
                    console.log('search');
                    element.comment.forEach(element => {
                        commentId++;
                    });
                    element.comment.unshift({
                        'commentid': commentId, 'userid': id, 'content': comment,
                        'createtime': nowtime, 'visible': visible
                    });
                }
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
});

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
            const jsonFile = fs.readFileSync('./user.json', 'utf8');
            var jsonData = JSON.parse(jsonFile);
            jsonData.users.forEach(element => {
                if (id === element.id) {
                    resultTitle = 'doubleCheck';
                    resultMessage = '아이디가 중복 되었습니다';
                    doubleCheck = true;
                }
            });
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

app.post('/setcontent', (req, res) => {
    const fs = require('fs');
    console.log('post setcontent pass');
    var flag = req.headers["flag"];
    var id = req.headers["id"];
    var content = req.headers["content"];
    var siteKey = req.headers["sitekey"];
    var nowtime = req.headers["nowtime"];
    var visible = req.headers["visible"];
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
            var aa = jsonData['maindashcontent'];
            var contentid = 0;
            var count22 = 0;
            jsonData.maindashcontent.forEach(element => {
                count22++;
            });
            contentid = count22 + 1;
            jsonData['maindashcontent'].unshift({
                "userid": id, "content": content, "contentid": contentid,
                "createtime": nowtime, "visible": visible,
                "like": 0, "bad": 0,
                "view": 0, "comment": []
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

app.post('/getallcontent', (req, res) => {
    const fs = require('fs');
    console.log('post getallcontent pass');
    var siteKey = req.headers["sitekey"];
    var flag = req.headers["flag"];
    var jsonData;
    var resultTitle = 'no';
    var resultMessage = '뭔가 모를 에러입니다';
    var returnList = [];
    if (siteKey == 'secretKey') {//사이트키확인
        console.log('secretKey ok');
        if (flag == 'setcontent') {
            const jsonFile = fs.readFileSync('./content.json', 'utf8');
            jsonData = JSON.parse(jsonFile);
            var maindashcontent = jsonData['maindashcontent'];
            maindashcontent.forEach(element => {
                if (element.visible == 1) {
                    console.log('element pass');
                    returnList.push(element);
                }
            });
            resultTitle = 'pass';
            resultMessage = returnList;
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