import { Outlet, useNavigate } from "react-router-dom";
import { PropsToken } from "../types/PropsToken";
import { useEffect } from "react";

const Autenticacao: React.FC<PropsToken> = ({ token }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!token){
        navigate("/login");
        }
    }, [token]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Autenticacao;
