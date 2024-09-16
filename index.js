const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// توكن هنا يالحبيب
const token = 'MTI4NDQ4OTY1NDc4NzI0NDE0NA.Gg9UOF.rWH1Iey_u0PwS7SBrf-kan407He62Tmsc4W-cc'; 
const prefix = '+';


let taxChannel = null;


client.once('ready', () => {
  console.log(`bot is ready ${client.user.tag}\n by Wick Studio !`);
  console.log(`discord.gg/wicks`);
});


client.on("messageCreate", (message) => {
  
  if (message.content.startsWith(prefix + "set-tax")) {
    const mentionedChannel = message.mentions.channels.first();
    if (mentionedChannel) {
      taxChannel = mentionedChannel.id; 
      message.channel.send(`**✅ | تم تحديد الروم بنجاح و هو <#${taxChannel}>**`);
    } else {
      message.channel.send("**اكتب الامر و منشن الروم.**");
    }
  }

  
  if (message.channel.id === taxChannel) {
    let Args = message.content.trim();
    if (!isNaN(Args)) {
      const Args2 = Args
        .replace("k", "000")
        .replace("K", "000")
        .replace("m", "000000")
        .replace("M", "000000")
        .replace("b", "000000000000")
        .replace("B", "000000000000");

      const Tax1 = Math.floor((Args2 * 20) / 19 + 1);
      const Tax2 = Math.floor((Args2 * 20) / 19 - 1 - Args2);
      const Tax3 = Math.floor((Tax2 * 20) / 19);

      const taxembed = new EmbedBuilder()
        .setTitle("Amg Tax")
        .setDescription(
          `
             **💳المبلغ دون ضريبة : ${Args2}\n💵الضريبة: ${Tax3}\n💰المبلغ بالضريبة : ${Tax1}**
          `
        );

      message.channel.send({
        content: `<@${message.author.id}>`,
        embeds: [taxembed],
      });
    }
  }
});


client.login(token);