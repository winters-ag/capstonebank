import React                  from 'react';
import ReactDOM               from 'react-dom/client';
import                             './index.css';
import App                    from './App';
import reportWebVitals        from './reportWebVitals';
import                             'react-bootstrap';
import                              'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = React.createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export function Card(props) {
  function classes(){
    const bg  = props.bgcolor ? ' bg-'+props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor:' text-white';
    return 'card mb-3 text-center ' + bg + txt;
  }



  return (
      <div className={classes()}>
        <div className="card-header">
          {props.header}
        </div>
        <div className="card-body">
          {props.title  && (<h5 className="card-title">{props.title}</h5>)}
          {props.text   && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
        {props.footer   && <div className="card-footer text-body-secondary">
          {props.footer}
        </div>}
      </div>
  )
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
