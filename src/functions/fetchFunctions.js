
export const fetchCovidData = async (past, date, country) => {


    const countryURL =
      "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/countries_summary?min_date=" +
      past + "T00:00:00.000Z&max_date=" + date + "T00:00:00.000Z&country=" + country;

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(countryURL, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {

    
        //console.log(result);
        // const tempData = result;

        // let dataList = [
        //   [
        //     { type: "string", label: "Day" },
        //     "Confirmed daily  ",
        //     "Deaths daily  ",
        //   ],
        // ]

        // for (var i = 0; i < 364; i++) {

        //   let day = tempData[i].date;
        //   let trueDay = day.toString().slice(0, 10);
        //   // console.log(trueDay);

        //   dataList.push([trueDay, tempData[i].confirmed_daily, tempData[i].deaths_daily])
        // }

        //console.log(dataList);

    //     const dataObject = result[364]
    //     if (dataObject) {
    //       this.setState({
    //         dataVisible: true,
    //         population: dataObject.population,
    //         confirmed: dataObject.confirmed,
    //         deaths: dataObject.deaths,
    //         confirmed_daily: dataObject.confirmed_daily,
    //         deaths_daily: dataObject.deaths_daily,
    //         recovered: dataObject.recovered,
    //         recovered_daily: dataObject.recovered_daily,
    //         data: dataList,

    //         selectedImage: this.state.images[this.state.country + ".png"]
    //       })
    //     }
    //    })
    //   .catch((error) => console.log("error", error));
    const data = await response.json()
    return data
}