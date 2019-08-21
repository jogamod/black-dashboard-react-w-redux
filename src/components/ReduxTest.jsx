import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLoginSuccess } from '../actions/login_actions';
import { Button, Row, Col } from 'reactstrap'

class ReduxTest extends Component {
    render() {
        return (
            <Row>
                <Col className="ml-auto mr-auto" lg="8">
                    <Row>
                        <Col sm={{size: 8, offset: 4}}>
                                <p>Redux Test component</p>
                                <Button color="primary" onClick={() => this.props.setLoginSuccess(true)}>Test</Button>
                                {this.props.isLoginSuccess && 
                                <h4>Redux is working!</h4>}
                        </Col>
                    </Row>
                </Col> 
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.user.isLoginSuccess,
    };
  }
  
  
const mapDispatchToProps = (dispatch) => {
    return {
       setLoginSuccess: (isLoginSuccess) => dispatch(setLoginSuccess(isLoginSuccess))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)
