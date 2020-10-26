import React from 'react';

/**
 * Error Component if Network Error Occurs while fetching data
 */
function ErrorComponent () {
    return (
        <div className="row">
            <div className="col-12 text-center mt-3">
                <h5 className="text-center mt-3">
                    SOMETHING WENT WRONG. PLEASE TRY AGAIN AFTER SOMETIME.
                </h5>
            </div>
        </div>
    );
}

export default ErrorComponent;