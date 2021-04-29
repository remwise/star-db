import React, { Component } from 'react';

import Spinner from '../spinner';

import './item-details.css';

export default class ItemDetails extends Component {
  state = {
    image: null,
    item: null,
    loading: true,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({ loading: true });
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then(item => {
      this.setState({ item, loading: false, image: getImageUrl(item) });
    });
  }

  render() {
    if (!this.state.item) {
      return <span>Select a item from a list</span>;
    }

    const { item, loading, image } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? (
      <React.Fragment>
        <img className="item-image" src={image} alt="" />
        <div className="card-body">
          <h4>{item.name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, child => {
              return React.cloneElement(child, { item });
            })}
          </ul>
        </div>
      </React.Fragment>
    ) : null;

    return (
      <div className="item-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };
