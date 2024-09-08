import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="abcd" label={"Username"} />
        <InputBox onChange={e => {
          setEmail(e.target.value);
        }} placeholder="abcd@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:5000/api/v1/auth/register", {
              username,
              email,
              password,
            });
            console.log(response);
            try {
              if (response.data.success) {
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('Id', response.data.Id);
               
                const Url = `http://localhost:5173/dashboard`;
                 window.location.href = Url;
                
              } else {
                alert('Invalid username or password');
              }
            } catch (error) {
              console.error('Error signing in:', error);
            }
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}