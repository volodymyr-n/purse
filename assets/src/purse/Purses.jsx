import React from 'react';
import {connect} from 'react-redux'
import Purse from "./Purse";

const Purses = ({purses, app}) => {
    if (app.loading) {
        return 'Loading...'
    }
    if (!purses.length) {
        return <div className="alert alert-primary" role="alert">
            Empty.
        </div>
    }
    return purses.map(post => <Purse post={post} key={post.id}/>)
}

const mapStateToProps = state => {
    return {
        purses: state.purses.purses,
        app: state.app
    }
}

export default connect(mapStateToProps, null)(Purses)