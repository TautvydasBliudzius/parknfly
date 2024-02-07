import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";





const AdminMenu: React.FC = () => {
    const navigate = useNavigate()


    useEffect(()=> {
        axios.get('http://localhost:3000/admin/menu')
        .then(result=> {
            if(result.data !== "Success") {
                navigate("/admin/menu")
            }
        })
        .catch(err=> console.log(err))
    }, [])
    return (
        <div>
            <div>Admin Menu</div>
        </div>
    );
}

export default AdminMenu;
