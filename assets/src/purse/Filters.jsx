import React from "react";
import {connect} from "react-redux";
import {push} from 'connected-react-router'
import {fetchPurse, filterDateUpdate} from "../redux/action";
import DayPicker from "react-daypicker";
import {Col, Row} from "react-bootstrap";

class Filters extends React.Component {
    constructor(props) {
        super(props);
        const date = new Date
        const yesterday = new Date
        const week = new Date
        yesterday.setDate(date.getDate() - 1)
        week.setDate(date.getDate() - 7)
        this.today_string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        this.yesterday_string = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`
        this.week_string = `${week.getFullYear()}-${week.getMonth() + 1}-${week.getDate()}/to/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let date
        if (e.target) {
            date = e.target.value
        } else {
            let da = new Date(e)
            date = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
        }
        this.props.filterDateUpdate(date)
    }

    render() {
        return <Row>
            <Col xs={12}>
                <h3 className="font-weight-bold">
                    Filters:
                </h3>
            </Col>
            <Col className={`pl-4`} xs={12}>
                <ul className="nav flex-column filter-date">
                    <li className="nav-item">
                        <button
                            className={`${(this.props.filterDate.date.url === '/filter/date/' + this.today_string || this.props.filterDate.date.url === '/') && 'activity'} nav-link`}
                            value={this.today_string}
                            onClick={this.props.filterDate.date.url !== '/filter/date/' + this.today_string ? this.handleClick : function () {
                                return null
                            }}>Today
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`${this.props.filterDate.date.url === '/filter/date/' + this.yesterday_string && 'activity'} nav-link`}
                            value={this.yesterday_string}
                            onClick={this.props.filterDate.date.url !== '/filter/date/' + this.yesterday_string ? this.handleClick : function () {
                                return null
                            }}>Yesterday
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`${this.props.filterDate.date.url === '/filter/date/' + this.week_string && 'activity'} nav-link`}
                            value={this.week_string}
                            onClick={this.props.filterDate.date.url !== '/filter/date/' + this.week_string ? this.handleClick : function () {
                                return null
                            }}>This week
                        </button>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Choose date range:</a>
                    </li>
                    <li className="nav-item mt-4">
                        <DayPicker
                            onDayClick={this.handleClick}
                        />
                    </li>
                </ul>
            </Col>
        </Row>
    }
}

const mapStateToProps = (state) => {
    return {
        purses: state.purses.purses,
        router: state.router,
        filterDate: state.filterDate
    }
}

const mapDispatchToProps = {
    fetchPurse,
    filterDateUpdate,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)

