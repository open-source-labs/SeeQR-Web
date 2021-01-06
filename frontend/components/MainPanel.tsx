import React, { Component } from 'react';
import { Compare } from './leftPanel/Compare';
import History from './leftPanel/History';
import { Tabs } from './rightPanel/Tabs';

type MainState = {
  queries: {
    queryString: string;
    queryData: {}[];
    queryStatistics: any;
    querySchema: string;
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
  componentDidMount() {
    // ipcRenderer.send('return-db-list');
    // // Listening for returnedData from executing Query
    // // Update state with new object (containing query data, query statistics, query schema
    // // inside of state.queries array
    // ipcRenderer.on('return-execute-query', (event: any, returnedData: any) => {
    //   // destructure from returnedData from backend
    //   const {
    //     queryString,
    //     queryData,
    //     queryStatistics,
    //     queryCurrentSchema,
    //     queryLabel,
    //   } = returnedData;
    //   // create new query object with returnedData
    //   const newQuery = {
    //     queryString,
    //     queryData,
    //     queryStatistics,
    //     querySchema: queryCurrentSchema,
    //     queryLabel,
    //   };
    //   // create copy of current queries array
    //   let queries = this.state.queries.slice();
    //   // push new query object into copy of queries array
    //   queries.push(newQuery);
    //   this.setState({ queries });
    // });
    // ipcRenderer.on(
    //   'db-lists',
    //   (event: any, returnedLists: any, returnedDbSize: string) => {
    //     console.log('database size in FE: ', returnedDbSize);
    //     this.setState((prevState) => ({
    //       ...prevState,
    //       lists: {
    //         databaseList: returnedLists.databaseList,
    //         tableList: returnedLists.tableList,
    //       },
    //       dbSize: returnedDbSize,
    //     }));
    //     console.log('dbsize in this.state after click new tab: ', this.state);
    //   }
    // );
    // ipcRenderer.on('switch-to-new', (event: any) => {
    //   const newSchemaIndex = this.state.lists.databaseList.length - 1;
    //   this.setState({
    //     currentSchema: this.state.lists.databaseList[newSchemaIndex],
    //   });
    // });
    // // Renders the loading modal during async functions.
    // ipcRenderer.on('async-started', (event: any) => {
    //   this.setState({ loading: false }); // ** James/Katie - changing to false for now to avoid loading modal until we can figure out later why the async complete listener isnt kicking in
    // });
    // ipcRenderer.on('async-complete', (event: any) => {
    //   this.setState({ loading: false });
    // });
  }
  // onClickTabItem(tabName) {
  //   ipcRenderer.send('change-db', tabName);
  //   ipcRenderer.send('return-db-list', tabName);
  //   this.setState({ currentSchema: tabName });
  //   console.log('this is the onClickTabItem func', this.state);
  // }

  submitQuery = async (event, query: String) => {
    event.preventDefault();
    const response = await fetch('/query/execute-query-tracked', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queryString: query }),
    });
    const returnedData = await response.json();
    console.log('this is returnedData Object', returnedData);
    console.log('this is queries before setQueries ', this.state.queries);
    const {
      queryString,
      queryData,
      queryStatistics,
      queryCurrentSchema,
      queryLabel,
    } = returnedData;
    const newQuery = {
      queryString,
      queryData,
      queryStatistics,
      querySchema: queryCurrentSchema,
      queryLabel,
    };
    // create copy of current queries array
    let queries = this.state.queries.slice();
    // push new query object into copy of queries array
    queries.push(newQuery);
    this.setState({ queries });

    // this.setState({
    //   queries: {
    //     // queryString: 'this is a test',
    //     queryData: newQuery.queryData,
    //     queryStatistics: returnedData.queryStats,
    //     queryLabel: returnedData.queryLabel,
    //   },
    // });
    console.log(
      'this is queries in state AFTER setQueries ',
      this.state.queries
    );
  };

  render() {
    return (
      <div id="main-panel">
        <div id="main-left">
          <History queries={this.state.queries} />
          <Compare queries={this.state.queries} />
        </div>
        <Tabs
          queries={this.state.queries}
          // tableList={this.state.lists.tableList}
          databaseSize={this.state.dbSize}
          submit={this.submitQuery}
        />
      </div>
    );
  }
}
export default MainPanel;
