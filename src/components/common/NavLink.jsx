import {
    useLocation,
    matchRoutes,
    useResolvedPath,
    Link as L,
} from 'react-router-dom';
import styled from 'styled-components/macro';
import { ROUTES } from '../../constants/routes';
import { BREAKPOINTS } from '../../constants/breakpoints';

const Link = ({
    to,
    exact,
    className,
    activeClassName,
    inactiveClassName,
    ...rest
}) => {
    useLocation();
    let location = useLocation();
    let resolvedPath = useResolvedPath(to);
    let routeMatches = matchRoutes(ROUTES, location);

    let isActive;
    if (exact) {
        isActive = location.pathname === resolvedPath.pathname;
    } else {
        isActive = routeMatches.some(
            match => match.pathname === resolvedPath.pathname
        );
    }

    let allClassNames =
        className +
        (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);

    return <L className={allClassNames} to={to} {...rest} />;
};

/*

//////////////////// STYLING


 */

export const NavLink = styled(Link)`
    font-family: 'Barlow Condensed', sans-serif;
    font-size: var(--font-size-navlink);
    letter-spacing: 2.7px;
    color: var(--color-light);
    text-decoration: none;
    text-transform: uppercase;
    display: flex;
    gap: var(--padding-xs);
    @media screen and ${BREAKPOINTS.sm} {
        padding-block: 6px;
        border-right: 4px solid transparent;
    }

    @media screen and ${BREAKPOINTS.smMin} {
        padding-block: 36px;
        border-bottom: 3px solid transparent;
        border-top: 3px solid transparent;
    }

    span {
        font-weight: var(--font-bold);
        @media screen and ${BREAKPOINTS.smMin} {
            display: none;
        }

        @media screen and ${BREAKPOINTS.lgMin} {
            display: inline;
        }
    }

    &.active {
        border-bottom-color: var(--color-light);
        border-right-color: var(--color-light);
    }

    &.inactive {
    }
`;