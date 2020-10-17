import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);

        console.log({ propsInHome: this.props });
    }

    componentDidMount() {
        this.props.getCurrentUser();
    }

    render() {
        return (
            <div className="general-padding">
                <h1>Task App Example</h1>
            </div>
        );
    }
}

export default Home;
