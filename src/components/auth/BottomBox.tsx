import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";
import PropTypes from "prop-types";

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: #0095f6;
  }
`;

const Scta = styled.span`
    color: ${(props) => props.theme.fontColor};
`

function BottomBox({ cta, link, linkText }) {
    return (
        <SBottomBox>
            <Scta>{cta}</Scta>
            <Link to={link}>{linkText}</Link>
        </SBottomBox>
    );
}

BottomBox.propTypes = {
    cta: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
};

export default BottomBox;