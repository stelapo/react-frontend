function ErrMsgComponent(props) {
    return (
        <div className="alert alert-danger" role="alert">
            {props.msg}
        </div>);
}

export default ErrMsgComponent;