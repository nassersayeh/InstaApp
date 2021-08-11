import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { login} from '../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const Login = () => {
        const initialState ={ email:'',password:''}
        const [userData,setuserData]=useState(initialState)
        const {email,password}= userData
        const [typepass,settypepass] =useState(false)
      const dispath = useDispatch()
        const handleChangeInput = e =>{
            const{name,value} = e.target
            setuserData({...userData,[name]:value})
        }
        const handleSubmit=e=>{
          e.preventDefault()
          dispath(login(userData))
        }
    return (
        <div className="auth_page">
        <form onSubmit={handleSubmit}>

            <h3 className="text-uppercase text-center mb-4">InstaApp</h3>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChangeInput} value={email} name="email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type={ typepass ? "text" : "password"} className="form-control" id="exampleInputPassword1" onChange={handleChangeInput} value={password} name="password" />
    <small onClick={() =>settypepass(!typepass)}>
      {typepass ? 'hide' : 'show'}
    </small>
  </div>
  <button type="submit" className="btn btn-dark w-100"
  disabled={email && password ? false:true}>Login</button>
  <p className="my-2">you don't have an account? <Link to="/register" style={{color:"crimson"}}>Register now</Link></p>
</form>

        </div>
    )
}

export default Login
