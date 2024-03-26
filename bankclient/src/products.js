import React from 'react'
import {UserContext} from './App.js'


function Products() {
  const ctx = React.useContext(UserContext);
  ctx.users.push(Math.random().toString(36).substr(2,5));
  return (
    <div>
      <h3>Products Component</h3>
      {JSON.stringify(ctx.users)}
    </div>
  )
}

export default Products;