import React from 'react';

const IssueForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addIssue}>
                <input type="text" value={props.currentIssue} onChange={props.updateIssue} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default IssueForm;