const Discord = require("discord.js");
const botSettings = require("./botsettings.json");
const prefix = botSettings.prefix;
const YTDL = require("ytdl-core");

const bot = new Discord.Client({disableEveryone: true});

var servers = {};

bot.on("ready", async () => {
    console.log(`Bot ist fertig! ${bot.user.username}`);

    setInterval(async function() {

  
  
        let status = ['auf PandaGames', 'auf PandaGames | /help', 'die ν²', 'discord.gg/zwPzmxm', 'auf PandaGames | /help'];
        let chosen = status[Math.floor(Math.random() * status.length)];
      
        bot.user.setActivity(chosen, {type: "PLAYING"});
      
      
      
    }, 8000);
    

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }

});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(prefix)) return;
    
    

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);


    
            message.channel.sendEmbed(embed);
    
            return;
       }

if(command === `${prefix}ping`) {
    let iembed = new Discord.RichEmbed()
    .setColor(0x1abc9c)
    .addField("Ping:", Math.round(bot.ping))
    .setFooter('PandaGames Bot©', "https://cdn.discordapp.com/attachments/477617816279711745/498040273805246466/h.jpg");

    message.channel.send(iembed)

    return;
    
}


if(command === `${prefix}help`) {
    message.delete().catch(O_o=>{});

    let embed = new Discord.RichEmbed()
         .setColor(0x1abc9c)
         .setDescription("Allgemein:")
         .addField("Prefix:", `/`)
         .addField("Userinfo:", `/userinfo [@User]`)
         .addField("Ping:", `/ping`)
         .addField("8ball)", `/8ball Frage [Frage]`)
         .addField("Say:", `/say [Text]`)
        .addField("Bot-Team", `/botteam`)
        .addField("Vorschlag:", `/vorschlag [Text]`)
        .addField("Report:", `/report [@User] [Grund]`)
        .addField("Ticket:", `/ticket add [Problem]`)
        .addField("Play", `/play [Link]`)
        .addField("Skip", `/skip`)
        .addField("Stop", `/stop`)
         .setFooter("Seite 1/2", "https://cdn.discordapp.com/attachments/477617816279711745/498040273805246466/h.jpg")

    let embed2 = new Discord.RichEmbed()
    .setColor(0x1abc9c).setDescription("Team:")
    .addField("News:", `/news [Text]`)
    .addField("Umfrage:", `/umfrage [Text]`)
    .addField("Warn:", `/warn [@User] [Grund]`)
    .addField("Kick:", `/kick [@User] [Grund]`)
    .addField("Ban:", `/ban [@User] [Grund]`)
    .addField("Clear:", `/clear [Zahl]`)
    .setFooter("Seite 2/2", "https://cdn.discordapp.com/attachments/477617816279711745/498040273805246466/h.jpg")
    
    let embedh = new Discord.RichEmbed()
    .setColor(0x1abc9c)
    .setDescription("HelpListe")
    .addField("Allgemein", `Seite 1`)
    .addField("Team", `Seite 2`)
    .setFooter("Info", "https://cdn.discordapp.com/attachments/477617816279711745/498040273805246466/h.jpg")

    switch(args[0]) {
        
    case '1': message.channel.send(embed)
        
        break;
    case '2': message.channel.send(embed2)
        
        break;
    default: message.channel.send(embedh)

}}



if(command === `${prefix}botteam`) {
    message.delete().catch(O_o=>{});
    let embed = new Discord.RichEmbed()
    .setColor(0x1abc9c)
    .setDescription("Hier ist die Teamliste:")
    .addField("Head-Dev / Bot-Inhaber", `[∞♛«ʟɛռռɛxɖɛʋ»♛∞] "❤T❤"`)
    .setFooter('PandaGames Bot©', "https://cdn.discordapp.com/attachments/477617816279711745/498040273805246466/h.jpg");

    message.channel.sendEmbed(embed);

    return;
}

if(command === `${prefix}say`) {
    message.delete().catch(O_o=>{});
    message.channel.send(args.join(" "))
   }

if(command === `${prefix}play`) {
    if (!args[1]) {
        message.channel.sendMessage("Bitte füge einen Link hinzu!");
        return;
    }

    if (!message.member.voiceChannel) {
        message.channel.sendMessage("Bitte sei in einem Channel!");
        return;
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    };

    var server = servers[message.guild.id];

    server.queue.push(args[1])

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
        play(connection, message);
    });

}

function play (connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift(1);

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

if(command === `${prefix}skip`) {
    var server = servers[message.guild.id];

    if (server.dispatcher) server.dispatcher.end();

}

if (command === `${prefix}stop`) {
    var server = servers[message.guild.id];

    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();


}

});

bot.login(process.env.BOT_TOKEN);