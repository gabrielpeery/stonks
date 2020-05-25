import React from 'react';
import './Search.scss';
import Axios from 'axios';

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = props.handleSubmit;
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    handleSubmit(event) {

    }

    render() {
      return (

      );
    }

}

export default Search;
