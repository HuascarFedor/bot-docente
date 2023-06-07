const { addKeyword } = require("@bot-whatsapp/bot");

const flowDocente = addKeyword("2", { sensitive: true })
  .addAction(async (ctx, { endFlow, provider} ) => {
    const nanoid = await import('nanoid')
    const ID_GROUP = nanoid.nanoid(5)
    const refProvider = await provider.getInstance()
    await refProvider.groupCreate(`Bot Docente (${ID_GROUP})`,[
        `${ctx.from}@s.whatsapp.net`
    ])
    return endFlow("Te hemos agregado a un grupo con el docente para que puedas hablar directamente con él.");
  })

module.exports = flowDocente;