import React from 'react'
import ReactDOM from 'react-dom'

let reactNode = React.createElement('h1', null, '我很大!!!')
ReactDOM.render(reactNode, document.getElementById('app'))