import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import Menu from './Menu';

const cx = classNames.bind(styles);

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Menu />
        <header className={cx("header")} style={{ backgroundImage: `url(home-bg.jpg)` }}>
          <div className="overlay"></div>
          <Container>
            <Row>
              <Col className={cx("mx-auto", { lg: "8", md: "10" })} >
                <div className={cx("heading")}>
                  {/* <h1></h1> */}
                </div>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default Header;