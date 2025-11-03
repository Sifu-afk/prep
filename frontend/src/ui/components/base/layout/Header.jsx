import { useNavigate, Link, NavLink as RouterNavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
    <HeaderContainer>
      <NavMenu>
        <NavList>
          <NavItem>
            <StyledNavLink to="/events">Events</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink to="/profile">profile</StyledNavLink>
          </NavItem>

          {isLoggedIn ? (
            <NavItem>
              <button onClick={handleLogout}>Log out</button>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <StyledNavLink to="/login">Login</StyledNavLink>
              </NavItem>
              <NavItem>
                <StyledNavLink to="/register">Register</StyledNavLink>
              </NavItem>
            </>
          )}
        </NavList>
      </NavMenu>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;
  background: #181818;
  border-bottom: 1px solid #292929;
`;

const NavMenu = styled.nav``;

const NavList = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 0.5rem;
`;

const NavItem = styled.li`
  text-decoration: none;
  border: 1px solid white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledNavLink = styled(RouterNavLink)`
  text-decoration: none;
  color: white;
`;
