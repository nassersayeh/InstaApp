import axios from 'axios'
export const getDataApi = async(url,token)=>{
    const res = await axios.get(`/api/${url}` , {
        headers:{authorization:token}
    })
    return res;
}
export const postDataApi=async(url,post,token)=>{
    const res = await axios.post(`/api/${url}`,post,{
        headers:{authorization:token}
    })
    return res
}
export const putDataApi=async(url,post,token)=>{
    const res = await axios.put(`/api/${url}`,post,{
        headers:{authorization:token}
    })
    return res
}
export const patchDataApi=async(url,post,token)=>{
    const res = await axios.patch(`/api/${url}`,post,{
        headers:{authorization:token}
    })
    return res
}
export const deleteDataApi=async(url,post,token)=>{
    const res = await axios.delete(`/api/${url}`,post,{
        headers:{authorization:token}
    })
    return res
}