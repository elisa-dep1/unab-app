"use client";

import { usePathname, useRouter } from "next/navigation";


export default function Nav() {

    const router = useRouter();
    const pathname = usePathname();
    const name = "Elisa Rojas";

    const profile = () => router.push("/perfil");

    const handleLogoClick = () => pathname !== "/" && router.push("/inicio");



    return (
        <nav>
            <img
                onClick={handleLogoClick}
                src="/images/logo-unab.png"
                alt="Logo"
                width="15%" />
            <div>
                {pathname === "/" ? (
                    <span>Proyecto de título</span>
                ) : (
                    <button onClick={profile}>
                        <img src="/images/1.svg" />
                        <span> Perfil </span>
                    </button>
                )}
            </div>
        </nav>
    );
}
