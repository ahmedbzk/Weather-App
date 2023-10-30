import React from 'react';
import './MainCard.css'; // CSS dosyasını içe aktar


class Main extends React.Component {
  render() {
    const { weatherData } = this.props;
    const localCity = weatherData.location.name;
    const localCountry = weatherData.location.country;
    return (
      <div className="row">
        {weatherData.forecast.forecastday.map((data, index) => (
          <div key={index} className="col-md-4 mt-5">
            <div className="card slide-in" style={{width: "80%"}}>
              <div>
                <span className='spanClass'>{index + 1}</span>
                <h5 className='h2Black' style={{ fontWeight: 'bold' }}>{data.day.avgtemp_c} Degree</h5>
                <img className='img floating-image' src={data.day.condition.icon} alt={data.day.condition.text} />
                <h5 className='h2Black'>{data.day.condition.text} </h5>
                <h3 className='h2Black mt-5'>{localCountry}</h3>
                <h4 className='h2Black'>{localCity}</h4>
                <h6 className='h2Black mt-4'>{data.date}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

    )
  }
}


export default Main; 
