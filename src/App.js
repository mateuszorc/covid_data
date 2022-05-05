import React, { Component } from 'react';
import CovidData from './components/CovidData';
import './App.css';
import { Chart } from "react-google-charts";
import { subDays, subYears } from 'date-fns/esm';
import { format } from 'date-fns';
import { fetchCovidData } from './functions/fetchFunctions';



export default class App extends Component {

  state = {
    country: "Poland",
    date: "",
    past: "",
    dataVisible: false,
    images: [],
    selectedImage: "",

    population: "",
    confirmed: "",
    deaths: "",
    confirmed_daily: "",
    deaths_daily: "",
    recovered: "",
    recovered_daily: "",
    option: {
      chart: {
        title: 'Daily deaths and confirmed infections during the year',
      }


    },

    data: [
    ]
  }

  handleChange = (event) => {
    if (event.target.type === "text") {
      this.setState({
        country: event.target.value
      })
    } else {

      // const toMiliseconds = event.target.value
      // const dateInMiliseconds = Date.parse(toMiliseconds)
      // const dateInUTC = new Date(dateInMiliseconds).toUTCString()
      // const calculatingPast = new Date(dateInUTC)
      // calculatingPast.setDate(calculatingPast.getDate() - 365)
      // const past = calculatingPast.toISOString().slice(0, 10)
      // console.log(past)
      
      const past = subYears(new Date(event.target.value), 1)

      this.setState({
        date: event.target.value,
        past: format(past,"yyyy-MM-dd")
      })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const dataObject = await fetchCovidData(this.state.past, this.state.date, this.state.country)
    // console.log(dataObject)
    
        
    let dataList = [
      [
        { type: "string", label: "Day" },
        "Confirmed daily  ",
        "Deaths daily  ",
      ],
    ]

    // for (var i = 0; i < 364; i++) {

    //   let day = dataObject[i].date;
    //   let trueDay = day.toString().slice(0, 10);
    //   // console.log(trueDay);

    //   dataList.push([trueDay, dataObject[i].confirmed_daily, dataObject[i].deaths_daily])
    // }

    dataObject.forEach(day => { 
      dataList.push([day.date.toString().slice(0, 10), day.confirmed_daily, day.deaths_daily])
    });

     //console.log(dataList);
    const lastDataObject = dataObject[dataObject.length - 1]
    
    if (lastDataObject) {
      this.setState({
        dataVisible: true,
        population: lastDataObject.population,
        confirmed: lastDataObject.confirmed,
        deaths: lastDataObject.deaths,
        confirmed_daily: lastDataObject.confirmed_daily,
        deaths_daily: lastDataObject.deaths_daily,
        recovered: lastDataObject.recovered,
        recovered_daily: lastDataObject.recovered_daily,
        data: dataList,

        selectedImage: this.state.images[this.state.country + ".png"]
      })
    }
 

  }

  importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  componentDidMount = () => {

    // const latestDate = new Date();
    // latestDate.setDate(latestDate.getDate() - 1);
    // const yesterday = latestDate.toISOString().slice(0, 10);
    const date = subDays(new Date(), 1)

    // const calculatingPast = new Date();
    // calculatingPast.setDate(calculatingPast.getDate() - 365);
    // const past = calculatingPast.toISOString().slice(0, 10);
    const past = subYears(date, 1)

    this.setState({
      date: format(date,"yyyy-MM-dd"),
      images: this.importAll(require.context('./countries', false, /\.(png|jpe?g|svg)$/)),
      past: format(past,"yyyy-MM-dd")
    })

  }

  render() {

    return (

      <div id="main" >
        <header>

          <form onSubmit={this.handleSubmit}>
            <label>Insert country name:</label>
            <br />
            <input
              type="text"
              id="country"
              value={this.state.country}
              onChange={this.handleChange}
            >
            </input>
            <br />

            <label>Pick a date:</label>
            <br />
            <input
              id="date"
              type="date"
              value={this.state.date}
              onChange={this.handleChange}></input>
            <br />

            <button>Ask the server</button>
          </form>
        </header>


        <main>
          <img src={this.state.selectedImage} alt=""></img>
          {
            this.state.dataVisible &&
            <div className='data'>
              <CovidData data={this.state} />
            </div>
          }

          {
            this.state.dataVisible &&
            <Chart
              className='chart'
              chartType="Line"
              data={this.state.data}
              width="1000px"
              height="600px"
              legendToggle
              options={this.state.option}
            />
          }

        </main>
      </div>
    )
  }
}