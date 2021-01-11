import React from 'react';
import Purses from "./Purses";
import CreateForm from "./CreateForm";
import {connect, useDispatch} from "react-redux";
import {deletePurse, deletePurses, fetchPurse, showAlert} from "../redux/action";
import AddImg from "../image/add.svg";
import DeleteImg from "../image/delete.svg";
import {push} from "connected-react-router";
import {Button, Col, Dropdown, Row} from 'react-bootstrap';

class RightBlock extends React.Component {
    constructor(props) {
        super(props);
        this.deleteElementPurse = this.deleteElementPurse.bind(this);
    }

    deleteElementPurse() {
        const props = this.props
        let deleteArr = this.props.purses.filter(function (element) {
            return element.checked === true;
        })
        let status = false
        if (deleteArr.length) {
            this.props.deletePurses(deleteArr)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.filterDate.date.url !== prevProps.filterDate.date.url) {
            this.props.push(this.props.filterDate.date.url)
            this.props.fetchPurse();
        }
    }

    componentDidMount() {
        this.props.fetchPurse();
    }

    render() {
        return <Row>
            <Col xs={12}>
                <h1 className="font-weight-bold">My express</h1>
            </Col>
            <Col xs={12} className="day-express mb-4">
                <h1 className="text-center font-weight-bold">{this.props.filterDate.date.from_page}</h1>
            </Col>
            <Col xs={12} className="details">
                <div className="posts">
                    <Purses/>
                </div>
                <hr/>
                <h6 className="text-right font-weight-bold">
                    total:</h6>
                <h5 className="text-right font-weight-bold">
                    ${this.props.total}
                </h5>
            </Col>
            <Col xs={12} className="mt-4">
                <div className="action">
                    <Row>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle className="float-right" variant="success2" id="dropdown-basic">
                                    <img src={AddImg} alt="Add new item"/>Add new item
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <CreateForm/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <Button type="button" className="btn btn-danger2 float-left"
                                    onClick={this.deleteElementPurse}><img src={DeleteImg} alt="Delete item"/> Delete
                                item</Button>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
        purses: state.purses.purses,
        filterDate: state.filterDate,
        total: state.purses.total(state.purses.purses)
    }
}

const mapDispatchToProps = {
    deletePurse,
    deletePurses,
    showAlert,
    fetchPurse,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(RightBlock)
