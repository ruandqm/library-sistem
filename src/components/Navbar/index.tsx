import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./index.scss";

function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);

    const showNavbar = () => {
        navRef.current ? (
            navRef.current.classList.toggle("responsive_nav")
        ) : null
    };

    return (
        <header className="fixed-top shadow">
            <a className="navbar-brand" href="/"><h4 className="m-0">LibSystem</h4></a>
            <nav ref={navRef}>
                <a href="/">Home</a>
                <a href="/loans">Emprestimos</a>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;