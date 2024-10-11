// NavButton.jsx
import { NavLink } from "react-router-dom";

const NavButton = ({ to, icon: Icon, label }) => {
    return (
        <NavLink 
            to={to} 
            className={({ isActive }) => 
                `py-2 px-4 hover:bg-neutral-800 rounded-lg flex items-center ${isActive ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'} ${isActive ? 'my-1' : 'my-0'} group` // Only add margin on active state
            }
            end // This ensures it only matches for the exact path
        >
            {({ isActive }) => (
                <>
                    <Icon className={`mr-3 ${isActive ? 'text-green-500' : 'text-neutral-400'}`} />
                    <span className="hidden md:inline">{label}</span> {/* Show label only on medium and larger screens */}
                </>
            )}
        </NavLink>
    );
};

export default NavButton;
