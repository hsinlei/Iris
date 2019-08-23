/** @jsx jsx */
import styled from '@emotion/styled';

const Link = styled.a`
	cursor: pointer;
	color: #5c6bc0;
	text-decoration: none;
	font-size:18px;

	&:hover {
		border-bottom: 1px dotted #ddd;
	}
`;
export const GreyLink = styled.a`
	cursor: pointer;
	color: #aaa;
	text-decoration: underline;
	font-size:18px;

	&:hover {
		border-bottom: 1px dotted #ddd;
	}
`;

export default Link;

export const SmallLink = styled.a`
	cursor: pointer;
	color: #a2a2a2;
	text-decoration: none;
	font-size:14px;

	&:hover {
		border-bottom: 1px dotted #ddd;
	}
`;