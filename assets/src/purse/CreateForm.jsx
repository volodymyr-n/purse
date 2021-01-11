import React from 'react';
import {connect, useDispatch} from "react-redux";
import {createPurse, fetchPurse, showAlert} from "../redux/action";
import {Col, Row} from "react-bootstrap";

class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            price: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const newPurse = {
            "title": this.state.title,
            "price": parseInt(this.state.price)
        }

        if (this.state.title.length < 5){
            this.props.showAlert('danger', 'Title minimum length 6')
        }
        else if(this.state.price <= 0.01){
            this.props.showAlert('danger', 'Price minimum 0.01')
        }else {
            this.props.createPurse(newPurse)
            this.setState({
                title: '',
                price: ''
            })
        }
    }

    render() {
        return <form className="mt-2 mb-2" onSubmit={this.handleSubmit}>
            <Row className="pl-3 pr-3">
                <Col className="pr-0" xs={6}>
                    <input type="text" className="form-control" placeholder="Title" value={this.state.title ?? ''}
                           onChange={this.handleChange} name="title"/>
                </Col>
                <Col className="pl-1 pr-0" xs={4}>
                    <input type="number" className="form-control" placeholder="Price" step="0.01" value={this.state.price ?? 0.01}
                           onChange={this.handleChange} name="price"/>
                </Col>
                <Col xs={2} className="pl-1">
                    <button className="btn btn-success2 col" type="submit">+</button>
                </Col>
            </Row>
        </form>
    }
}

const mapDispatchToProps = {
    createPurse,
    fetchPurse,
    showAlert
}

export default connect(null, mapDispatchToProps)(CreateForm)