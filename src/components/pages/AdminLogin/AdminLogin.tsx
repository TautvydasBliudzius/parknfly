import React, { FormEvent, useState } from "react";
import { checkAdminCredentials } from "../../utils/admin";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Forms/FormInput/FormInput";
import { useCookies } from 'react-cookie'
import axios from "axios";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', { email, password })
      .then(result => {
        const responseData = result.data.message;
        if (responseData === "Success") {
          const expirationDate = new Date();
          expirationDate.setSeconds(expirationDate.getSeconds() + 300);
          setCookie('access_token', result.data.token, { expires: expirationDate });
          navigate('/admin/menu')
        } else {
          setError(responseData);
        }
      })
      .catch(err => console.error(err));

  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
