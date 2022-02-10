import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoBackgroundSvg from '../../assets/icons/logoBackgroundSvg.svg';

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 16px;
  font-family: ${(props) => props.theme.headingFont};
  font-size: ${(props) => props.windowwidth >= 600 ? '42px' : '24px'};
  color: ${(props) => props.theme.black};
  background: no-repeat url(${logoBackgroundSvg}) center center / contain;
`;

const Logo = ({ windowWidth }) => {
  return <StyledLink windowwidth={windowWidth} to="/">Tracks</StyledLink>;
};

export default Logo;
