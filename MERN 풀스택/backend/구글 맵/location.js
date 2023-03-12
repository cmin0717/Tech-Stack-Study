const axios = require("axios");

const API_KEY = "AIzaSyD6JMTYtSl_gIAO5-m5oU7xkSbpuMNl--0";

async function getCoords(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data

  if(!data || data.status === "ZERO_RESULTS"){
    const error = new Error("찾을 수 없는 장소입니다.")
    error.code = 404
    return next(error)
  }

  const coordinates = data.results[0].geometry.location

  return coordinates
}

module.exports = getCoords