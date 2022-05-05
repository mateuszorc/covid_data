

const CovidData = ({data}) => {

    const {population, confirmed, recovered, deaths, confirmed_daily, recovered_daily, deaths_daily} = data

    return ( 
        <>
            <p className="population">Population:
                <br/>
                <span id="population">{population}</span>
            </p>

            <p className="infected">Infected:
                <br/>
                <span id="confirmed">{confirmed}</span>
            </p>

            {
            recovered !== 0 && 
            <p className="recovered">Recovered:
                <br/>
                <span id="recovered_daily">{recovered}</span>
            </p>   
            } 

            <p className="deaths">Deaths:
                <br/>
                <span id="deaths">{deaths}</span>
            </p>

            <p className="infected">Daily infected:
                <br/>
                <span id="confirmed_daily">{confirmed_daily}</span>
            </p>

            {
            recovered_daily !== 0 && 
            <p className="recovered">Daily recovered:
                <br/>
                <span id="recovered_daily">{recovered_daily}</span>
            </p>
            } 

            <p className="deaths">Daily deaths:
                <br/>
                <span id="deaths_daily">{deaths_daily}</span>
            </p> 
        </>
     );
}
 
export default CovidData;