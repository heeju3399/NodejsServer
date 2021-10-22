var express = require('express');
var fs = require('fs');
var app = express();

var commentok = {
    'userid': 'oksk', 'content': '[236, 152, 164, 236, 188, 128, 236, 157, 180, 236, 151, 144, 236, 138, 164, 236, 188, 128, 236, 157, 180]',
    'createtime': '2002.05.05', 'visible': '1'
};

////////////////////////////////////////////////////////////////
console.log('pass');
const jsonFile = fs.readFileSync('./userExample2.json', 'utf8');
var jsonData = JSON.parse(jsonFile);

const userid = 'hyejin';
var count = 0;
var location = 0;
jsonData.users.forEach(element => {
    if (userid === element.id) {
        location = count;
    } else {
        count++;
        console.log(count);
    }
});

console.log(jsonData);
console.log(location);
jsonData['users'].splice(location, 1);

console.log('==============comment===============');
console.log(jsonData);
console.log('============comment=================');


// const jsonFinalData = JSON.stringify(jsonData);
// fs.writeFileSync('./user.json', jsonFinalData, 'utf8', function (err) {
//     console.log('write err:' + err);
// });

//ss.unshift();
// var Users = maindashcontent;
// // var Users = [{ name: '소녀시대', age: 20 }, { name: '걸스데이', age: 22 }];
// console.log(Users);
// console.log('=============================');
// Users.push({ name: '티아라', age: 23 });
// console.log(Users);
// //Users.pop();
// console.log('=============================');
// Users.unshift({ name: '티아라', age: 23 });
// //Users.shift();
// console.log(Users);
// console.log('=============================');
// Users.splice(3, 0, { name: '애프터스쿨@@', age: 25, ne: 44 });
// console.log(Users);

// jsonData['comment'].push({
//     "userid": id, "content": content,
//     "createtime": nowtime, "visible": visible,

// });

// const jsonFinalData = JSON.stringify(jsonData);
// fs.writeFileSync('./contentEx.json', jsonFinalData, 'utf8', function (err) {
//     console.log('write err:' + err);
// });

/*



 push(object)

 배열의 끝에 요소를 추가

 pop()

 배열의 끝에 있는 요소를 삭제

 unshift()

 배열의 앞에 요소를 추가

 shift()

 배열의 앞에 있는 요소를 삭제

 splice(index, removeCount, [Object]

 여러 개의 객체를 요소로 추가하거나 삭제

 slice(index, copyCount)

 여러 개의 요소를 잘라내어 새로운 배열 객체로 만듦
*/