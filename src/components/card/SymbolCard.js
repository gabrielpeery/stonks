import React from 'react';
import './SymbolCard.scss';
import { ReactSVG } from 'react-svg'
import caret from '../../assets/caret.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import ArrowDown from '../../assets/arrow-down.svg';


function SymbolCard(props) {
  const arrows = {
    up: ArrowUp,
    down: ArrowDown
  }
  console.log(props.data)

  var latest = props.data['Time Series (Daily)'][props.data['Meta Data']['3. Last Refreshed']]
  var data = {
    open: latest['1. open'],
    high: latest['2. high'],
    low: latest['3. low'],
    close: latest['4. close'],
    volume: latest['5. volume']
  }

  data['trend'] = parseFloat(data['open'] - data['close']).toFixed(2)
  data.trending = data['trend'] > 0 ? "up" : "down";
  data['percentage'] = parseFloat(data['open']/data['close']).toFixed(2)

  console.log(data)
  return (
    <div className="card shadow">
      <div className={"slider trending-" + data.trending}>
        <div className="scale">
          <ReactSVG src={caret} className="triangle" />
          <div className="bar"></div>
        </div>
        <div className="labels">
          <div>{data.high}</div>
          <div>{data.low}</div>
        </div>
      </div>

      <div className="body">
        <div className="symbol-name">
          <div className="title"></div>
          <div className="symbol">{props.symbol}</div>
        </div>
        <div className="current-price">
          <div className="value">
            {parseFloat(data.close).toFixed(2)}
          </div>
          <div className="trend">
            <div className="points">
              <div className={"arrow trending-" + data.trending}>
                <ReactSVG src={arrows[data.trending]} className={data.trending} />
              </div>
              <div className={data.trending}>{data.trend} ({data.percentage}%)</div>
            </div>
          </div>
        </div>
        <div className="splits">OPEN <span>{parseFloat(data.open).toFixed(2)}</span> HIGH <span>{parseFloat(data.high).toFixed(2)}</span> LOW <span>{parseFloat(data.low).toFixed(2)}</span></div>
      </div>
    </div>
  );
}

export default SymbolCard;
