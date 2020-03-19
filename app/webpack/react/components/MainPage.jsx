import PropTypes from 'prop-types';
import React from 'react';
import {SignInModal} from './SignInModal'

export default class MainPage extends React.Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired, // this is passed from the Rails view
  // };
  state = {

  };

  constructor(props) {
    super(props);

  }

  // updateName = (name) => {
  //   this.setState({ name });
  // };

  render() {
    return (
      <div className="container">
          <div className="d-flex">
              <div className="icon"></div>
              <h1>Warehouses & Stores</h1>
              <SignInModal buttonLabel="ОТКРЫТЬ НАХУЙ "/>
              <button className="btn btn-primary">Sign iot</button>
          </div>
        <h3>
          Hello!
        </h3>
        <hr />

      </div>
    );
  }
}


