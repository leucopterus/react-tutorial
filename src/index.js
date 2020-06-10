import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" 
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} 
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, 
      this.state.stepNumber + 1);
    const currnet = history[history.length - 1];
    const squares = currnet.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const currnet = history[this.state.stepNumber];
    const winner = calculateWinner(currnet.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move to step #' + move :
        'To the beginning';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Won ' + winner;
    } else {
      status = 'Next act: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currnet.squares}
            onClick={(i) => this.handleClick(i)} 
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

//=========================================

function Greeding(props) {
  return <h1>Welcome, {props.name}!</h1>;
}

function Avatar(props) {
  return (
    <img 
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function Info(props) {
  return (
    <div>
      <Avatar user={props.info} />
      <div className='userInfo-name'>{props.info.name}</div>
    </div>
  );
}


function Comment(props) {
  return (
    <div className="container">
      <Greeding name={props.userComment.info.name} />
      <div className="userinfo">
        <Info info={props.userComment.info} />
      </div>
      <div className="comment">{props.userComment.text}</div> 
    </div>
  );
}

const userComment = {
  text: "Just some text for comment",
  info: {
    name: "Semen Semenkov",
    avatarUrl: "https://placekitten.com/g/64/64"
  }
}

function App() {
  return (
    <div>
      <Greeding name={"Developer"} />
      <Greeding name={"Tester"} />
      <Greeding name={"Manager"} />
      <Comment
        userComment={userComment}
      />
    </div>
  );
}

// ========================================

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>Now is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

function ClockApp() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div> 
  );
}

// ========================================

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'Turned On' : 'Turned Off'}
      </button>
      /*
<button onClick={(e) => this.deleteRow(id, e)}>Удалить строку</button>
<button onClick={this.deleteRow.bind(this, id)}>Удалить строку</button>
      */
    )
  }
}

// ========================================

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Log in, please.</h1>
}

function ChooseGreeting(props) {
  const isLoggedIn = props.isLoggedIn;
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Log In
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Log Out
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    button = (isLoggedIn) 
      ? <LogoutButton onClick={this.handleLogoutClick} />
      : <LoginButton onClick={this.handleLoginClick} />;
    return (
      <div>
        <ChooseGreeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

// ========================================
// 8

function ListItems(props) {
  // Правильно! Не нужно определять здесь ключ:
  return <li>{props.value}</li>
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => 
  // Правильно! Ключ нужно определять внутри массива:
    <ListItems key={number.toString()} value={number} />
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

// ========================================

ReactDOM.render(
  <div>
    <Toggle />
    <ClockApp />
    <App />
    <Game />
    <LoginControl />
    <NumberList numbers={numbers} />
  </div>,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
