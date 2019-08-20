import styled from '@emotion/styled';

import { flex, alignCenter } from './Flex';

const Navbar = styled.nav`
	background: #3F51B5;
	color: #fff;
	padding: 1rem;
	font-weight: bold;
	font-size:20px;
	${flex};
	${alignCenter};
`;

export default Navbar;