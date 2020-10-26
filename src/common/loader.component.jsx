import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoaderComponent(props) {
    return (
        <div className="row">
            <div className="col-6 text-center ml-auto mr-auto" style={{ marginTop: '20%' }}>
                <CircularProgress style={{ color: '#333'}} />
            </div>
        </div>
    );
}
export default LoaderComponent