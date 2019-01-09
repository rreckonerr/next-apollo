import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    const { onLoadMore, queryVariables } = this.props;

    const { orderBy, first, skip } = queryVariables;


    return (
      <button onClick={() => onLoadMore({orderBy, skip: skip + 5, first})}>
        Pagination component
      </button>
    );
  }
}
