import {Component} from 'react'


class App extends Component {
  
    state = {
        text: '',
    }
    
   

   onChanged() {
       this.setState({text:'test'})
   }

    render() {
        const {text} = this.state
        return (
            <div>
                
                <h1>{text}</h1>
                <button onClick={this.onChanged.bind(this)}>Click</button>
            </div>
        )
    }
}

export default App