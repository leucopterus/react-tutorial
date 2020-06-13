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
// 9
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please, write something about your DOM element'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Description was sent ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} 
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Send" />
      </form>
    );
  }
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your prefered flavour is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Choose your faivorite flavour:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">GrapeFruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Send" />
      </form>
    );
  }

}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          I'm going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

// ========================================
// 10

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>Water will boil.</p>;
  }
  return <p>Water won't boil.</p>;
}

const scaleName = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

function toCelsius(fahrenheit) {
  return (fahrenheit -32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Write temperature in {scaleName[scale]} degreese:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? 
      tryConvert(temperature, toCelsius)
      : temperature;
    const fahrenheit = scale === 'c' ?
      tryConvert(temperature, toFahrenheit)
      : temperature;
    return (
      <div>
        <TemperatureInput 
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} 
        />
        <TemperatureInput 
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

// ========================================
// 11

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome!"
      message="Thank you for visiting our spacecraft!" 
    />
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome on board, ${this.state.login}`);
  }

  render() {
    return (
      <Dialog title="Marse discovery program"
        message="How I can call you?">
        <input value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign up!
        </button>
      </Dialog>
    );
  }
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function Contacts() {
  return <div className="Contacts" />;
}

function Chat() {
  return <div className="Chat" />;
}

function App2() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      }
    />
  );
}

// ========================================
// 12

/*
FilterableProductTable
  SearchBar
  ProductTable
    ProductCategoryRow
    ProductRow
*/

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;
    
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    
    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>Name</tr>
          <tr>Price</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.value);
  }

  render() {
    return (
      <form>
        <input type="text" 
          placeholder="Search..." 
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}/>
        <p>
          <input type="checkbox" 
          checked={this.props.inStockOnly}
          onChange={this.handleInStockChange} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products} 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} 
        />
      </div>
    );
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

// ========================================

ReactDOM.render(
  <div>
    <Toggle />
    <ClockApp />
    <App />
    <Game />
    <LoginControl />
    <NumberList numbers={numbers} />
    <NameForm />
    <FlavorForm />
    <Reservation />
    <Calculator />
    <WelcomeDialog />
    <div class="Container">
      <App2 />
    </div>
    <SignUpDialog />
    <FilterableProductTable products={PRODUCTS} />,
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
