import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = cookies.access_token;
        if (token) {
          setIsLoggedIn(true);
        } else {
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        navigate("/admin/login");
      }
    };
    checkToken();
  }, [cookies, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  const handleLogOut = () => {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 1);
    setCookie('access_token', "", { expires: expirationDate });
    setIsLoggedIn(false);
    navigate("/");
  }
  
  return (
    <div>
      <h1>Admin Menu</h1>
      <p>{cookies.access_token}</p>
      <button onClick={() => handleLogOut()}>LogOut</button>
    </div>
  );
};

export default AdminMenu;
