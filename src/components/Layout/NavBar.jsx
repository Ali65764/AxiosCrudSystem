import { Link, useLocation } from "react-router-dom"

const NavBar = () => {
    const { pathname } = useLocation()

    const isActive = (path) => pathname === path

    const NavLink = ({ to, children, active, extra = "" }) => (
        <Link to={to} className={`${extra} ${active ? "text-[#ff4b69]" : "text-[#00009b]"}`}>
            {children}
        </Link>
    )
    return (
            <div className="bg-white text-3xl p-5">
                <div className="flex justify-center items-center font-bold">
                    <NavLink to='/' active={isActive('/')} extra={"mx-4"}>Table</NavLink>
                    <NavLink to='/AddUsers' active={isActive("/AddUsers")} extra={"mx-4"}>Add Users</NavLink>
                </div>
            </div>
    )
}

export default NavBar