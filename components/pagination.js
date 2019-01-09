import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    const { onLoadMore } = this.props;
    return (
      <button onClick={onLoadMore} style={{ backgroundColor: "red" }}>
        Load more!
      </button>
    );
  }
}
