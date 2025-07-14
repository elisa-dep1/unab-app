"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";



export default function Nav({ name, periodo, tipoUsuario }) {

    const getFormattedName = (name) => {
        if (!name) return "";

        const parts = name.split(" ");
        return parts.length >= 3 ? `${parts[2]} ${parts[0]}` : name;
    };

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
                <div
                    className="profileContainer"
                    onClick={() => setMenuVisible(true)}
                    onMouseLeave={() => setMenuVisible(false)}
                >
                    {tipoUsuario === "alumno" &&(
                        <button className="buttonMenu">
                            <img src="/images/1.svg" />
                            <div className="nameUser">
                                <span> {getFormattedName(name)} </span>
                                <span> Periodo {periodo}</span>
                            </div>
                        </button>
                    )
                    }
                    {tipoUsuario === "profesor" && (
                        <button className="buttonMenu">
                            <img src="/images/1.svg" />
                            <div className="nameUser">
                                <span> Profesor </span>
                                <span> {getFormattedName(name)} </span>
                            </div>
                        </button>
                    )}
                    {tipoUsuario === "admin" &&(
                        <button className="buttonMenu">
                            <img src="/images/1.svg" />
                            <div className="nameUser">
                                <span> Administrador </span>
                                <span> {getFormattedName(name)} </span>
                            </div>
                        </button>
                    )}
                    {menuVisible && (
                        <div className="profileMenu">
                            <button onClick={profile} className="profileButton">Editar perfil</button>
                            <button onClick={logout} className="logoutButton">Cerrar sesión</button>
                        </div>
                    )}
                </div>

            )}
        </nav>
    );
}
