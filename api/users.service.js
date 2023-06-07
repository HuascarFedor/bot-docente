const axios = require("axios");

const getEstudiante = async(celular) => {
  try{
    var config = {
      method: "get",
      url: `https://strapi-production-3176.up.railway.app/api/estudiantes?filters[celular][$eq]=${celular}`,
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_KEY}`,
      }
    };
    const response = await axios(config);
    return response.data;
  }catch(e){
    console.log(e);
    return null;
  }
};
module.exports = { getEstudiante };