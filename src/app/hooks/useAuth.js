import React, {useCallback, useEffect, useState} from 'react';
import {UserService} from "../services/user.service";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
const storageName = 'userData';

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);


    const signUp = async (content) => {
        try {
            const data = await UserService.create(content);
            navigate('/login');
        } catch(err) {
            const {response: {data: {message}}} = err;
            toast.error(message);
        }

    }

    const signIn = async (content) => {
        try {
            const data = await UserService.get(content);
            login(data.token, data.userId);
        } catch(err) {
            const {response: {data: {message}}} = err;
            toast.error(message);
        }

    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login]);

    return { login, logout, token, userId, signUp, signIn }
};

export default useAuth;