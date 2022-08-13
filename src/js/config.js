// export const API_URL = 'https://api.openweathermap.org/data/2.5/onecall';
// export const API_EXCLUDE = 'exclude=minutely,hourly,alerts';
// export const API_UNITS = 'units=metric';
// export const API_KEY = '757af3d52f7592d65bc9fb1804cfcffa';

// // API Template
// // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// // https://api.openweathermap.org/data/2.5/onecall?lat=-38.180480&lon=144.513410&units=metric&exclude=minutely,hourly,alerts&appid=757af3d52f7592d65bc9fb1804cfcffa

// // API Geolocation
export const GEO_API = 'https://api.positionstack.com/v1/reverse';
export const GEO_KEY = 'ef425a05d03569ac568939084288dff3';

export const API_URL = 'https://api.weather.bom.gov.au/v1/locations';
export const API_FORCAST = 'forecasts/daily';

// BOM API
// LOCATION SEARCH https://api.weather.bom.gov.au/v1/locations?search=geelong / returns data in json format
// const geohash = data[0].geohash

// LOCATION SEARCH https://api.weather.bom.gov.au/v1/locations/${geohash}/forecasts/daily / returns forecast in json format
// const today = data[0]
