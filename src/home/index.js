/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import { Checkbox, RaisedButton } from 'material-ui';
import * as actionCreators from '../state/actions';

const mapStateToProps = (state) => {
  return {
    count: state.count,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incCount : () => dispatch(actionCreators.incrementCount()),
  }
}

class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    count : PropTypes.number,
    incCount : PropTypes.func,
  };

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <ul>
          {this.props.articles.map(article =>
            <li key={article.url}>
              <a href={article.url}>{article.title}</a>
            by {article.author} count { this.props.count }</li>,
          )}
        </ul>
        <Checkbox label="Testing"/>
        <RaisedButton label={"Button"} onClick={this.props.incCount}/>
        <p>
          <br /><br />
        </p>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
