import React from 'react';
import {connect} from "react-redux";

class Alert extends React.Component {
    render() {
        if (!this.props.alert.show){
            return null
        }
        return (
            <div className="list-alert">
                <div className={`alert alert-${this.props.alert.type || 'warning'} `} role="alert">
                    {this.props.alert.text}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        alert: state.app.alert
    }
}
export default connect(mapStateToProps, null)(Alert)