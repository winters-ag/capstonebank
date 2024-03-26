import React from 'react'
import {UserContext} from '../index.js'

function Context() {
  const ctx = React.useContext(UserContext);
  return (
    <div>
      <h3>Context Component</h3>
      {JSON.stringify(ctx.users)}
    </div>
  )
}

export default Context;