import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Grid, Label, List, TextArea } from 'semantic-ui-react';
import { send } from './action';
import Spinner from '../../components/Spinner';

const cap = str => str.charAt(0).toUpperCase() + str.slice(1);

// eslint-disable-next-line no-unused-vars
const Analyze = ({ keyphrases, wiki, loading, send: sendText }) => {
  const [typedText, setText] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [topWords, setTopWords] = useState(2);
  // eslint-disable-next-line no-unused-vars
  const [words, setWords] = useState(2);

  // eslint-disable-next-line no-console
  console.log(wiki);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
          <Form style={{ margin: '10px' }}>
            {loading && <Spinner />}
            <TextArea
              placeholder="Place your text here"
              rows={13}
              value={typedText}
              onChange={(ev, data) => {
                setText(data.value);
              }}
            />
            <List horizontal style={{ width: '100%' }}>
              {keyphrases.map(v => (
                <List.Item key={v}>
                  <List.Content>
                    <Label color="green">
                      {v}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <Button
              style={{ width: '120px', marginTop: '15px', marginLeft: 'calc(50% - 60px)' }}
              primary
              onClick={() => {
                sendText(typedText, words, topWords);
              }}
            >
              Submit
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={3}>
          <Grid style={{ paddingTop: '10px' }}>
            <Grid.Column>
              {wiki.length > 0 && (
                <Grid.Row>
                  <h2 style={{ color: 'darkgray', fontSize: 16, fontWeight: 'bold' }}>
                    Wiki:
                  </h2>
                </Grid.Row>
              )}
              { wiki.map(v => (
                <Grid.Row>
                  <List style={{ marginTop: '5px' }}>
                    <List.Item>
                      <List.Content>
                        {`${cap(v.key_word)}:`}
                      </List.Content>
                    </List.Item>
                    {v.urls.map(u => (
                      <List.Item key={u[0]}>
                        <List.Content>
                          <a href={u[1]}>
                            {u[0]}
                          </a>
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Grid.Row>
              ))}
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Analyze.propTypes = {
  keyphrases: PropTypes.arrayOf(PropTypes.string),
  wiki: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  send: PropTypes.func.isRequired
};
Analyze.defaultProps = {
  keyphrases: [],
  wiki: [],
  loading: false
};

const mapStateToProps = rootState => ({
  keyphrases: rootState.analyze.keyphrases,
  wiki: rootState.analyze.wiki,
  loading: rootState.analyze.isLoading
});

const actions = {
  send
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analyze);
