const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const token = require('./createtoken');
const app = express();
const nunjucks = require('nunjucks');
const ctoken = require('./jwt');
const auth = require('./middleware/auth')

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false,}))
app.use(cookieParser());
app.use(express.static('public'));


app.get('/',(req,res)=>{
//key: value
// 응답메세지에서 header부분에 쿠키를 생성해서 주겠다
// res.cookie('키','밸류')
// headers영역에 Set-Cookie token=jihyun; Path=/
    /*
        headers:{
            set-cookie:'token=ingoo';
        }
    */
   let{msg} = req.query;
    res.render('index')
    
    /*
        res.send()나 res.render() 결국 응답메세지를  완성시켜서 보내줍니다.
    */
});

app.get('/user/info',auth,(req,res)=>{
    res.send(`Hello ${req.userid}`);
})

app.get('/menu1',(req,res)=>{
    res.send('menu1페이지입니다.');
})

app.post('/auth/local/login',(req,res)=>{
    let {userid,userpw} = req.body;
    //let {userid,userpw} = JSON.parse(req.get('data'));
    console.log('body req :',userid,userpw);
    //console.log('data req :',userid,userpw);
    if(userid=='root' && userpw=='root'){
        //로그인성공
        result = {
            result:true,
            msg:'로그인에 성공하셨습니다.'
        }

        let token = ctoken(userid);
        res.cookie('AccessToken',token,{httpOnly:true,secure:true,})
        //token내용을
    } else {
        //로그인실패
        result = {
            result:false,
            msg:'아이디와 패스워드를 확인해주세요.'
        }
    }
    res.json(result)
})

app.get('/login',(req,res)=>{
    let {id,pw} = req.query; // 비구조 할당문 사용시 let,const 변수선언문이 꼭 필요합니다.
                             // 혹시 사용할 이유가 없다면 () 안으로 사용해주셔야합니다.

    if(id=='root' && pw=='root') {
        //토큰 생성
        let ctoken = token();
        res.cookie('token',ctoken,{httpOnly:true,secure:true,});
        res.redirect('/?msg=로그인성공');
    } else {
        //토큰 실패
        res.redirect('/?msg=로그인실패');
    }
})

app.listen(3005,()=>{
    console.log('server start port 3005!')
})