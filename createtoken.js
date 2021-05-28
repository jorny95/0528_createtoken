const crypto = require('crypto');


function createtoken(){
    let header = {
        "alg": "HS256",
        "typ": "JWT"
    }

    let encodeheader = Buffer.from(JSON.stringify(header)).toString('base64'); //안녕하세요 -> 바이너리 데이터바꿈(16진수)

    // console.log('object :',header);
    // console.log('string :',JSON.stringify(header)); 

    let payload = {
        "sub": "1234567890",
        "name": "John Doe",
        "user": "wlgus2134",
        "iat": 1516239022
    }


    let encodepayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace('=','');


    let signature = crypto.createHmac('sha256',Buffer.from('jihyun'))
                    .update(`${encodeheader}.${encodepayload}`)
                    .digest('base64')
                    .replace('=','')

    return `${encodeheader}.${encodepayload}.${signature}`
}

let token = createtoken();
console.log(token);
module.exports = createtoken; //초록색은 class 
                              //파랑색은 상수
                              //노랑색은 함수

