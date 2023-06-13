const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { getEstudiante } = require("../api/users.service");

/**
 * ChatGPT
 */
const ChatGPTClass = require("../chatgpt.class");
const chatGPT = new ChatGPTClass();

/**
 * Flows
 */
const { flowHelp } = require("./flowHelp");
const flowDocente = require("./flowDocente");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    [
      "🤖 *Boot Docente*  🎓",
      "Reconociendo tu número de celular..."
    ]
  )
  .addAction( async(ctx, { endFlow, flowDynamic }) => {
    const estudiante = await getEstudiante(ctx.from);
    if(!estudiante.data.length){
      return endFlow("Actualmente el número de tu celular no está registrado, solicita el registro para tener acceso al bot.");
    }
    else{
      nombre = estudiante.data[0].attributes["nombre"];
      await flowDynamic(`👋 Hola ${nombre}, ¡Bienvenido!`);
    }
  })
  .addAnswer(
        [
          'Elije una de las opciones:', 
          '*(1)* Pregunta sobre alguna temática de clases.', 
          '*(2)* Si quieres hablar directamente conmigo.', 
          '¡Responde escribiendo el número de la opción elegida!'
        ],
        { capture: true },
        (ctx) => {
            console.log(ctx)
        },
        [flowHelp(chatGPT), flowDocente] 
    )

module.exports = flowPrincipal;