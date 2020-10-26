import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


/**
 * Loader to indicatie processing
 * @param {*} props 
 */
function LoaderComponent(props) {
    return (
        <div className="row">
            <div className="col-6 text-center ml-auto mr-auto" style={{ marginTop: '15%' }}>
                <CircularProgress style={{ color: '#333' }} />
                <h6 className="text-center">{props.text}</h6>
            </div>
        </div>
    );
}
export default LoaderComponent