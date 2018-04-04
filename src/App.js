import React, { Component } from 'react';
import './App.css';
import valid from 'card-validator'



console.log(valid)
class App extends Component {
state ={
  accNum: '',
  date: '',
  name:'',
  accType: '',
  accPic: ''
}
handleChange = (e) =>{
  e.preventDefault()
  this.setState({
    [e.target.name]: e.target.value
  })
}
handleAccountChange = (e) =>{
  e.preventDefault()
  this.setState({
  [e.target.name]: e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
})
  var numberValidation = valid.number(e.target.value);

if (!numberValidation.isPotentiallyValid) {
  console.log("invalid number")
}

else if (numberValidation.card) {
  var type = numberValidation.card.type // 'visa'
  if(type === "visa"){
    this.setState({
      accPic: "https://www.seeklogo.net/wp-content/uploads/2014/10/visa-logo-400x400.png"
    })
  }else if(type === "master-card"){
    this.setState({
      accPic: "https://www.seeklogo.net/wp-content/uploads/2011/08/mastercard-logo.png"
    })
  }else if(type === "american-express"){
    this.setState({
      accPic: "http://logok.org/wp-content/uploads/2014/09/American-Express-logo-880x660.png"
    })
  }else if(type === "discover"){
    this.setState({
      accPic: "https://seeklogo.com/images/D/Discover_Card-logo-4BC5D7C02C-seeklogo.com.png"
    })
  }
}
} 
handleChangeDate = (e) =>{
  e.preventDefault()
  this.setState({
    [e.target.name]: e.target.value
  })
  var dateValidation = valid.expirationDate(e.target.value)
  if(!dateValidation.isPotentiallyValid){
    console.log("Invalid Date")
  }else if(dateValidation.card){
    this.setState({
      date:this.state.value
    })
  }
}

  render() {
    return (
      <div>
        <div className="card">
          <div>
            <img className="chip" src="https://www.wpcu.coop/Portals/3/News-Room/Newsletters/Card_Chip_150x150.png"/>
            <img className="logo" src={this.state.accPic}/>
          </div>
          <div className="cardNumber">
            <input onChange={this.handleAccountChange} value={this.state.accNum} name="accNum" className="accountNumber"/>
          </div>
          <div className="date">
            <p className="valid">valid thru</p>
            <p className="month">MONTH/YEAR</p>
            <input onChange={this.handleChangeDate} value={this.state.date} className="expDate" name="date"/>
          </div>
          <div className="name">
            <input onChange={this.handleChange} value={this.state.name} className="fullName" name="name"/>
          </div>
        </div>
        <div className="form">
          <form>
            <input value={this.state.accNum} onChange={this.handleAccountChange} type="text" name="accNum" placeholder="Card Number"/>
            <input value={this.state.date} onChange={this.handleChangeDate} type="text" name="date"placeholder="MM/YY"/>
            <input value={this.state.name} onChange={this.handleChange} type="text" name="name" placeholder="Full Name"/>
            <button>Submit</button>
          </form>
        </div>

      </div>
    )
  }
}

export default App;
