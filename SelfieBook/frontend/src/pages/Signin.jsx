import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
          setUsername(e.target.value);
        }} placeholder="abcd@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
        <Button onClick={async () => {
        const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
      username,
      password
    });
    console.log('Server response:', response.data); 
    console.log('userid:', response.data.userid); 
    try {
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userid', response.data.userid);
      
      const Url = `http://localhost:5173/dashboard`;
       window.location.href = Url;
    } else {
      alert('Invalid username or password');
    }
  } catch (error) {
    console.error('Error signing in:', error);
  }
}} label="Sign in" />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}