import React, { Component } from 'react';
import { Compare } from './leftPanel/Compare';
import History from './leftPanel/History';
import { Tabs } from './rightPanel/Tabs';

type MainState = {
  queries: {
    queryString: string;
    queryData: {}[];
    queryStatistics: any;
    queryLabel: string;
  }[];
  loading: boolean;
  dbSize: string;
};
type MainProps = {};
class MainPanel extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    // this.onClickTabItem = this.onClickTabItem.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
  }
  state: MainState = {
    queries: [],
    // currentSchema will change depending on which Schema Tab user selects
    loading: false,
    dbSize: '',
  };

  submitQuery = async (event, query: String) => {
    event.preventDefault();
    const response = await fetch('/query/execute-query-tracked', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const returnedData = await response.json();
    const { queryData, queryStats, queryLabel } = returnedData;

    const newQuery = {
      queryString: '',
      queryData: queryData,
      queryStatistics: queryStats,
      queryLabel: queryLabel,
    };

    // create copy of current queries array
    let queries = this.state.queries.slice();
    // push new query object into copy of queries array
    queries.push(newQuery);
    this.setState({ queries });
  };

  render() {
    return (
      <div id="main-panel">
        <Tabs
          queries={this.state.queries}
          // tableList={this.state.lists.tableList}
          databaseSize={this.state.dbSize}
          submit={this.submitQuery}
        />
        <div id="main-left">
          <History queries={this.state.queries} />
          <Compare queries={this.state.queries} />
        </div>
      </div>
    );
  }
}
export default MainPanel;
