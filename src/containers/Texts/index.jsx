import React from 'react';
import { Grid, Label, List } from 'semantic-ui-react';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTop } from './action';
import { protocol, transformParams } from '../../helpers/esHelper';

const Texts = ({ words, getTop: top }) => {
  if (words.length === 0) top(5);
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
          <ReactiveBase
            componentId="base"
            app="es"
            url={'https://semantic-s.ml/'.replace('https', protocol)}
            transformRequest={transformParams}
          >
            <ReactiveList
              componentId="list"
              dataField="body"
              pagination={false}
              paginationAt="bottom"
              // pages={5}
              // sortBy="desc"
              size={10}
              showResultStats={false}
              loader="Loading..."
              render={({ data }) => (
                <Grid>
                  <Grid.Column width={16}>
                    <List divided relaxed style={{ marginTop: '20px' }}>
                      {data.map(item => (
                        <List.Item
                          // eslint-disable-next-line no-underscore-dangle
                          key={item._id}
                          style={{
                            padding: '10px',
                            marginBottom: '20px',
                            background: '#ffffff'
                          }}
                        >
                          <Grid>
                            <Grid.Column>
                              <Grid.Row>
                                {`${item.body.split(' ')
                                  .slice(0, 40)
                                  .join(' ')}...`}
                              </Grid.Row>
                              <Grid.Row>
                                <List.Item>
                                  <List
                                    horizontal
                                    style={{
                                      width: '100%',
                                      marginTop: '10px'
                                    }}
                                  >
                                    {item.key_phrases.map(v => (
                                      <List.Item key={v}>
                                        <List.Content>
                                          <Label color="green">
                                            {v}
                                          </Label>
                                        </List.Content>
                                      </List.Item>
                                    ))}
                                  </List>
                                </List.Item>
                              </Grid.Row>
                            </Grid.Column>
                          </Grid>
                        </List.Item>
                      ))}
                    </List>
                  </Grid.Column>
                </Grid>
              )}
            />
          </ReactiveBase>
        </Grid.Column>
        <Grid.Column width={3}>
          {words.length > 0 && (
            <Grid.Row>
              <h2 style={{ color: 'darkgray', fontSize: 16, fontWeight: 'bold', paddingTop: '20px' }}>
                Top themes:
              </h2>
            </Grid.Row>
          )}
          <Label.Group color="blue" style={{ padding: '10px' }}>
            {words.map(item => (
              <Label>
                {item.key}
                <Label.Detail>{item.doc_count}</Label.Detail>
              </Label>
            ))}
          </Label.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Texts.propTypes = {
  getTop: PropTypes.func.isRequired,
  words: PropTypes.arrayOf(PropTypes.object)
};
Texts.defaultProps = {
  words: []
};
const mapStateToProps = rootState => ({
  words: rootState.top.words
});

const actions = {
  getTop
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Texts);

