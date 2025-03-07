"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState("");
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setCurrentPath(pathname);
        
    }, [pathname]);

    const profile = () => redirect("/perfil");

    const logout = async () => {
        await fetch("/api/logout", { method: "GET" });
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    };

    const handleLogoClick = () => currentPath !== "/" && router.push("/inicio");

    return (
        <nav className="navContainer">
            <img
                onClick={handleLogoClick}
                src="/images/logo-unab.png"
                alt="Logo"
                className="logo"
            />


            {currentPath === "/" ? (
                <span className="titulo">Proyecto de título</span>
            ) : (
                <div>
                    <div>
                        <button className="buttonNotification">
                            <img src="/images/campana.svg" />

                        </button>
                    </div>
                    <div
                        className="profileContainer"
                        onClick={() => setMenuVisible(true)}
                        onMouseLeave={() => setMenuVisible(false)}
                    >
                        <button className="buttonMenu">
                            <img src="/images/1.svg" />
                            <span> Perfil </span>
                        </button>

                        {menuVisible && (
                            <div className="profileMenu">
                                <button onClick={profile} className="profileButton">Editar perfil</button>
                                <button onClick={logout} className="logoutButton">Cerrar sesión</button>
                            </div>
                        )}
                    </div>
                </div>

            )}
        </nav>
    );
}
