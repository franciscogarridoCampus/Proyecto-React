import { useState } from 'react';

export function useAuth() {
    const [user] = useState(JSON.parse(localStorage.getItem('usuarioLogueado')));
    const isLogged = !!user;
    return { user, isLogged };
}