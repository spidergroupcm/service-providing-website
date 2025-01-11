import { useContext, useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import logo from '../assets/logo/logo.png';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const location = useLocation();

  useEffect(() => {
    // Apply theme on load
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const newTheme = darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdownOpen(false); // Close dropdown if open
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path ? 'text-yellow-200 font-bold' : '';

  return (
    <div className="navbar  mx-auto sticky top-0 bg-blue-800 shadow z-50">
      <div className="flex items-center justify-between w-full px-5">
        <Link
          to="/"
          className="flex gap-2 items-center"
          onClick={closeMobileMenu}
        >
          <img className="w-auto h-10" src={logo} alt="FastHelpbd Logo" />
          <span className="font-bold text-2xl text-white">FastHelpbd</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-circle text-xl"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-3xl focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:flex md:items-center md:justify-between ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col md:flex-row text-white gap-6 md:gap-8 text-lg items-center">
          <li>
            <Link to="/" onClick={closeMobileMenu} className={isActive('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              onClick={closeMobileMenu}
              className={isActive('/services')}
            >
              Services
            </Link>
          </li>
          {user && (
            <li className="relative">
              <button
                onClick={handleDashboardClick}
                className="flex items-center gap-1 mr-5"
                aria-expanded={dropdownOpen ? 'true' : 'false'}
              >
                Dashboard{' '}
                <FaChevronDown
                  className={`transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {dropdownOpen && (
                <ul className="absolute z-50 bg-black rounded-md shadow-md w-48 mt-10 ">
                  <li>
                    <Link
                      to="/dashboard/add-service"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 hover:bg-green-300 "
                    >
                      Add Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-service"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 hover:bg-green-300 "
                    >
                      Manage Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/booked-services"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 hover:bg-green-300"
                    >
                      Booked Services
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/service-to-do"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 hover:bg-green-300"
                    >
                      Service to do
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

        <div className="flex items-center gap-4 mt-6 md:mt-0">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  title={user?.displayName}
                  className="w-10 rounded-full"
                >
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg bg-red-500 rounded-md w-52"
              >
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white font-semibold block text-center w-full py-2 rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary ml-4"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

