const { addKeyword } = require("@bot-whatsapp/bot");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowHelp: (chatgptClass) => {
    return addKeyword("1", {
      sensitive: true,
    })
    .addAnswer(
      `¡Estoy listo!, ¿Qué pregunta tienes para mí?`,
      { capture: true },
      async (ctx, {  endFlow, fallBack, flowDynamic }) => { 
        if(!ctx.body.toLowerCase().includes('salir')){
          const textFromAI = await chatgptClass.handleMsgChatGPT(
              `pregunta="${ctx.body}"`
          );
          await fallBack(textFromAI.text);
          await flowDynamic("Escribe *salir* para terminar la conversación o formula otra pregunta.");
        }
        else{
          return endFlow("Hasta pronto. Te deseo un buen resto del día.");
        }
      }
    )
  },
};