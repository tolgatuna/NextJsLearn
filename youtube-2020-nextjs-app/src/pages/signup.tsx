import {useState} from "react";

export default function Login() {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    async function handleLogin() {
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formValues.name,
                email: formValues.email,
                password: formValues.password
            })
        });
        const json = await response.json();
        console.log(json);
    }

    return (
        <div>
            <h1>New User :</h1>
            <input type='text' value={formValues.name} onChange={e => setFormValues({...formValues, name: e.target.value})} placeholder='name'/>
            <input type='text' value={formValues.email} onChange={e => setFormValues({...formValues, email: e.target.value})} placeholder='email'/>
            <input type='password' value={formValues.password} onChange={e => setFormValues({...formValues, password: e.target.value})} placeholder='password'/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
};
