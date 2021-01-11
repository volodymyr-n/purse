import React from 'react';
import {connect} from "react-redux";
import {changeElementChecked} from "../redux/action";

class Purse extends React.Component {

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
        const newElement = {
            id: event.target.value,
            checked: event.target.checked
        }
        this.props.changeElementChecked(newElement)
    }

    render() {
        const post = this.props.post
        return <div className="form-check purse-item">
            <div className="row">
                <div className="col">
                    <input className="form-check-input" type="checkbox" id={'element-' + post.id} value={post.id}
                           onChange={this.handleChange}/>
                    <label className="form-check-label d-block mb-2" htmlFor={'element-' + post.id}>
                        <span className="d-inline-block w-75 text-truncate"> {post.title}</span>
                        <span className="float-right"> {'$' + post.price}</span>
                    </label>
                </div>
            </div>
        </div>
    }
}

const mapDispatchToProps = {
    changeElementChecked
}

export default connect(null, mapDispatchToProps)(Purse)
