import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import './new-post-form.css';

class NewPostForm extends React.Component {
  form = React.createRef();

  state = {
    id: '',
    title: '',
    body: '',
    author: '',
    category: '',
    disableSubmit: true,
  }

  handlerSubmit({ current }) {
    if (current.checkValidity()) {
      const {
        postToEdit,
        onSubmit,
        history,
        onEdit,
      } = this.props;

      const post = { ...this.state };
      delete post.disableSubmit;
      
      if (!postToEdit) {
        post.id = uuidv1();
        timestamp: Date.now();
        onSubmit(post).then(() => history.push('/'));
      } else {
        onEdit(post).then(() => history.push('/'));
      }
    }
  }

  componentDidMount() {
    const { postToEdit } = this.props;

    if (postToEdit) {
      this.setState({ ...postToEdit });
    }
  }

  shouldDisableSubmit() {
    const { title, body, author, category } = this.state;
    if (title && body && author && category) {
      this.setState({ disableSubmit: false });
      return;
    }

    this.setState({ disableSubmit: true });
  }

  render() {
    return (
      <Fragment>
        <h2 className="new-post-title">Do que vamos falar?</h2>
        <form className="new-post-form" ref={this.form}>
          <div className="form-combo">
            <label className="form-label">título</label>
            <input
              className="form-input"
              value={this.state.title}
              onChange={event => this.setState({ title: event.target.value },
                () => this.shouldDisableSubmit())}
              required
            />
            <textarea
              className="form-textarea"
              placeholder="conte-me mais"
              value={this.state.body}
              onChange={event => this.setState({ body: event.target.value },
                () => this.shouldDisableSubmit())}
              required
            />
          </div>
          <div className="form-combo">
            <label className="form-label">autor</label>
            <input
              className="form-input"
              value={this.state.author}
              onChange={event => this.setState({ author: event.target.value },
                () => this.shouldDisableSubmit())}
              required
            />
          </div>
          <div className="form-combo">
            <label className="form-label">categoria</label>
            <select
              className="form-select"
              value={this.state.category}
              onChange={event => this.setState({ category: event.target.value },
                () => this.shouldDisableSubmit())}
              required
            >
              <option value="">SELECIONE</option>
              {
                this.props.categories.map(category => 
                  <option
                    value={category.name}
                    key={category.name}
                  >
                    {category.name.toUpperCase()}
                  </option>
                )
              }
            </select>
          </div>
          <div className="form-combo">
            <button
              type="button"
              className="form-submit"
              onClick={() => this.handlerSubmit(this.form)}
              disabled={this.state.disableSubmit}
            >
              <i className="fa fa-3x fa-share-square"></i>
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

NewPostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  postToEdit:  PropTypes.object,
};

NewPostForm.defaultProps = {
  postToEdit: null,
};

export default NewPostForm;
