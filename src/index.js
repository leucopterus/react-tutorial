import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import styled from 'styled-components';
import AppTheme from './app';

/*
function ListItem({ item }) {
  return (
    <Fragment>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

const elements = [
  {id: 1, term: 'apple', description: 'just apple'},
  {id: 2, term: 'coconut', description: 'cool one'},
  {id: 3, term: 'carrot', description: 'fresh and healthy'}
]

*/
// ========================================
// context
/*
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}

class ThemeButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  };
}
*/
// compozition
/*
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

<Page user={user} avatarSize={avatarSize} />
// ... который рендерит ...
<PageLayout userLink={...} />
// ... который рендерит ...
<NavigationBar userLink={...} />
// ... который рендерит ...
{props.userLink}
*/
// slots
// function Page(props) {
//   const user = props.user;
//   const content = <Feed user={user} />;
//   const topBar = (
//     <NavigationBar>
//       <Link href={user.permalink}>
//         <Avatar user={user} size={props.avatarSize} />
//       </Link>
//     </NavigationBar>
//   );
//   return (
//     <PageLayout
//       topBar={topBar}
//       content={content}
//     />
//   );
// }


// ========================================


// ReactDOM.render(
//   <Glossary items={elements}/>,
//   document.getElementById('root')
// )

ReactDOM.render(
  <AppTheme />,
  document.getElementById('root')
);
