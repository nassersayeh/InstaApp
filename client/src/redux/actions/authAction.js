import { postDataApi } from "../../utils/fetchData"
export const TYPES ={
    AUTH : 'AUTH'
}
export const login =(data) =>{
    try{
        dispatch({type:'NOTIFY',payload:{loading:true} })
        const res = await postDataApi('login', data)
        dispatch
        ({type:'NOTIFY',
        payload:{token:res.data.access_token,
        user:res.data.user} })

        console.log(res )
        localStorage.setItem("firstLogin",true)
        dispatch
        ({type:'NOTIFY',
        payload:{success:res.data.msg} })

    }catch(err){
        dispatch
        ({type:'NOTIFY',
        payload:{error:err.respone.data.msg} })

    }
}

