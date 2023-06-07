const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { getEstudiante } = require("../api/users.service");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    [
      "🤖 *Boot* de atención académica 🎓",
      "Reconociendo tu número de celular..."
    ]
  )
  .addAction( async(ctx, { endFlow, flowDynamic, provider }) => {
    const estudiante = await getEstudiante(ctx.from);
    if(!estudiante.data.length){
      await flowDynamic("Actualmente el número de tu celular no está registrado, solicita el registro de tu celular con el docente.");
      return endFlow();
    }
    else{
      nombre = estudiante.data[0].attributes["nombre"];
      await flowDynamic(`👋 Hola ${nombre}, ¡Bienvenido!`);
      await flowDynamic("Elije una de las opciones: \n\n*1* Pregunta sobre alguna temática de clases.\n*2* Si quieres hablar directamente conmigo.");
      await flowDynamic("¡Responda escribiendo el número de la opción elegida!")
    }
  })

module.exports = flowPrincipal;