
/** @jsx jsx */
import styled from '@emotion/styled';
import { css } from 'emotion';

import { queries } from './mediaQueries';

export const flex = css`
	display: flex;
`;

export const alignCenter = css`
	align-items: center;
`;

export const Test = styled.div`
		display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        min-height: 200px;
        background-color: rgba(33, 33, 33, .3);
        align-items: center;
        `;
export const CenterFlex = styled.div`
		display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        min-height:200px;
        align-items: center;
        `;
export const FlexChild = styled.div`
	${props => props.flex && css`
		flex: ${props.flex};
	`};
	${props => props.justifyContent && css`
		justify-content: ${props.justifyContent}
	`};
	${props => props.alignItems && css`
		align-items: ${props.alignItems}
	`};
	padding: 5px;
`;

const Flex = styled.div`
	display: flex;

	${props => props.justifyContent && css`
		justify-content: ${props.justifyContent}
	`};
	${props => props.responsive && queries.small`
		flex-direction: column;
	`};
	${props => props.flexDirection && css`
	flex-direction: ${props.flexDirection}
`};
`;

export default Flex;
/** @jsx jsx */