import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    user: null,
    setUser: () => { },
    authTokens: null,
    setAuthTokens: () => { },
    registerUser: () => { },
    loginUser: () => { },
    logoutUser: () => { },
});

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        return localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
    });

    const [user, setUser] = useState(() => {
        return localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null;
    });

    const registerUser = async (email, username, password, password2) => {

        const response = await fetch("http://localhost:8000/auth/register/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        });
        console.log(response.data);

        if (response.status === 201) {
            navigate('/login');
        } else {
            console.log("Server issue");
            console.log(response.status);
        }
    };

    const loginUser = async (email, password) => {
        const response = await fetch("http://localhost:8000/auth/token/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            console.log("Logged In");
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate('/');
        } else {
            console.log(response.status);
            // setError("No active account found with the given credentials")
        }
    };


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate('/login');
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;