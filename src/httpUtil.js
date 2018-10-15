var axios = require('axios');
var util = require('util');

const postPromise = (url,postData=null,state=null) => new Promise((resolve,reject)=>{
    const base_axios = axios.create({
        baseURL:'http://localhost:8080',
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'no-cors',
            'state':state
        },
        timeout: 10000,
        withCredentials:true
    });
    base_axios.post(url,postData).then(res=>{resolve(res)}).catch(err=>reject(err));
});

const login = async (userInfo,state)=>{
    try{
        let res = await postPromise("/login",userInfo,state);
        return res;
    }catch (e) {
        console.log("login response is "+util.inspect(e,{depth:5}));
        return e.response;
    }
}
export default {login};