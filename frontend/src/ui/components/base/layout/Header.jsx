import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header>
      <h1>MyApp</h1>
      <Link to='/events'>Events</Link>
      <Link to='/profile'>Profile</Link>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <nav>
          <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link>
        </nav>
      )}
    </header>
  );
}
