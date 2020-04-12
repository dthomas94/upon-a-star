import React, { FC } from "react";
import { Link } from "@reach/router";
import routes from "../routes";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";

// this is only active when the location pathname is exactly
// the same as the href.
const isActive = ({ isCurrent }: { isCurrent: boolean }) => {
	return isCurrent ? { className: "active" } : {};
};

const StyledNav = styled.nav`
	display: flex;
	flex-directon: row;
	justify-content: space-between;
`;

const Header: FC = () => (
	<header>
		<StyledNav>
			{routes.map(({ title, path }) => (
				<Link to={path} getProps={isActive}>
					{title}
				</Link>
			))}
		</StyledNav>
	</header>
);

export default Header;
