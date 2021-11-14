import { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={DISHES} />
      </div>
    )
  }
}

export default App