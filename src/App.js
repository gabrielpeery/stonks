import React from 'react';
import './App.scss';

import Card from "./components/card/SymbolCard"
import Axios from 'axios';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        symbol: '',
        cards: {} 
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ symbol: event.target.value });
      event.target.value = "";
    }

    handleSubmit(event) {
      Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.symbol}&apikey=HY0JP87WH3PG17X6`)
      .then((response) => {
        // handle success
        var data = response.data

        if (data['Time Series (Daily)'] === undefined) {
          alert('nothing found for symbol: ' + this.state.symbol)
          return
        }
        var cards = this.state.cards
        cards[this.state.symbol.toUpperCase()] = data
        this.setState({ cards: cards });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log(this.state);
      });
      event.preventDefault()
    }

    render() {
      var cards = []
      for (let [key, value] of Object.entries(this.state.cards)) {
        cards.push(<Card trending="up" key={key} symbol={key} data={value}></Card>)
      }
      return (
        <div className="app-container">
          <div className="control">
            <h1>Stock Watcher</h1>
            <form className="form" onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.symbol} onChange={this.handleChange} />
              <button type="sumbit" value="Submit" className="add shadow">ADD STOCK</button>
            </form>
          </div>

          <div className="card-container">
            {cards}
          </div>
        </div>
      );
    }

}

export default App;

