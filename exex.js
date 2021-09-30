var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    cors = require('cors');
app.use(cors());
http.listen(3000,() => console.log(3000));

var dummy = [
    {id: 1, pid: 'a1', category: 'TOP', scategory: 'tshirt', title: 'a1 티셔츠', des: 'DES...AAAA', img: 'https://cdn.pixabay.com/photo/2017/08/17/06/48/street-photography-2650236__340.jpg', price: 1000, },
    {id: 2, pid: 'b1', category: 'TOP', scategory: 'hood', title: 'b1 상의', des: 'DES...AAAA', img: 'https://cdn.pixabay.com/photo/2018/03/07/15/36/girl-3206245__340.jpg', price: 1000, },
    {id: 3, pid: 'c1', category: 'Bottom', scategory: 'pants', title: 'c1 하의', des: 'DES...AAAA', img: 'https://cdn.pixabay.com/photo/2015/02/09/14/07/funny-629675__340.jpg', price: 1000, },
    {id: 4, pid: 'd1', category: 'Bottom', scategory: 'skirt', title: 'd1 하의', des: 'DES...AAAA', img: 'https://cdn.pixabay.com/photo/2017/08/06/08/01/people-2590092__340.jpg', price: 1000, },
    {id: 5, pid: 'e1', category: 'Outer', scategory: 'coat', title: 'e1 아우터', des: 'DES...AAAA', img: 'https://cdn.pixabay.com/photo/2017/04/03/14/33/man-2198528__340.jpg', price: 1000, },
    {id: 6, pid: 'f1', category: 'Dress', scategory: '', title: 'f1 원피스', des: 'DES...AAAA', img: 'https://cdn.pixabay.com/photo/2015/09/02/12/57/woman-918784__340.jpg', price: 1000, },
    {id: 7, pid: 'g1', category: 'TOP', scategory: 'tshirt', title: 'g1 티셔츠', des: 'DES...AAAA', img: 'https://cdn.pixabay.com/photo/2015/01/13/13/20/guy-598180__340.jpg', price: 1000, },
];

var menuDummy = [
    {'name':'Home'},
    {
      'name':'Category',
      'expansion': [
        "TOP",
        "Bottom",
        "Outer",
        "Dress",
      ]
    }
  ];

io.on('connect', (socket) => console.log("CONNECT!"));
app.get('/',(req,res) => res.json( dummy ));
app.get('/menu',(req,res) => res.json( menuDummy ));
app.get('/scount/:start/ecount/:end', (req,res) => {
    var startIndex = req.params.start;
    var endIndex = req.params.end;
    if(endIndex > startIndex) return res.json('null');
    return res.json(dummy.slice(startIndex,endIndex));
});
app.get('/category/:categoryName', (req,res) => {
  var categoryName = req.params.categoryName;
  if(!categoryName) return res.json('null');
  return res.json(dummy.map((e,i) => {
        if(e.category === categoryName) return e;
    }).filter(e => e != undefined));
});
app.get('/category/:categoryName/scategory/:scategoryName', (req,res) => {
    var categoryName = req.params.categoryName;
    var scategoryName = req.params.scategoryName;
    if(!categoryName || !scategoryName) return res.json('null');
    var categoryData = dummy.map((e,i) => {
        if(e.category === categoryName) return e;
    }).filter(e => e != undefined);
    if(categoryData.length < 1) return res.json('null');
    return res.json(categoryData.map((e,i) => {
        if(e.scategory === scategoryName) return e;
    }).filter(e => e != undefined));
});
app.get('/item/:pid', (req,res) => {
    var pid = req.params.pid;
    if(!pid) return res.json('null');
    return res.json(dummy.map((e,i) => {
        if(e.pid === pid) return e;
    }).filter(e => e != undefined));
});
app.get('*', (req,res) => res.json('null'));