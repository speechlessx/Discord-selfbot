/**
Disclaimer:
I am not responsible for what may ever happen to your account.
Using this on a user account is prohibited by the Discord TOS and can lead to the account block. 
I made this software for Educational purposes only.

  
MIT License

Copyright (c) 2021 yayeen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

//Hi if your reading this, you probrably know how to code, I wish you goodluck in your career and have a great day :)
//Im not really good at programming though, I'm just a beginner so feel free to open an issue to improve this code

const Discord = require('discord.js-selfbot') //https://www.npmjs.com/package/discord.js-selfbot
const selfbot = new Discord.Client() //create a new client
const moment = require('moment') //for converting time
const fs = require('fs') //for writing in txt files
const readline = require('readline-sync')
const db = require('quick.db') //database
const axios = require('axios')
const chalk = require('chalk')
const { green, red, yellow, blue, magenta, yellowBright, redBright, cyan } = require('chalk') //add some color in our console
const { version } = require('./package.json')

/**
 red - remove/delete
 green - add
 yellow - update
 */

const { token, prefix } = require('./config.json') //get token and prefix
const snipes = new Discord.Collection() //create a collection for snipe command
const esnipes = new Discord.Collection()

//function for clear command
function clear(){
    console.clear()
}

//user input
var mode = readline.questionInt(chalk.blue('[1] Normal Mode\n') + chalk.red('[2] Raid Mode\n' + chalk.magenta('Select number: ')))
console.clear()
if(mode === 1){
    var meslog = readline.question('Message Logging(y/n): ')
    var memlog = readline.question('Member Logging(y/n): ')
    var guildlog = readline.question('Server Logging(y/n): ')
}
console.clear()
var activity = readline.question('Set Presence(y/n): ')
console.clear()
if(activity === 'y'){
    var playing = readline.questionInt('Type of Activity\n' + chalk.yellow('[1] Playing\n') + chalk.green('[2] Listening\n') + chalk.red('[3] Watching\n') + chalk.magenta('[4] Streaming\n') + chalk.white('Enter the number: '))
    console.clear()
    var name = readline.question('Enter the name of your Activity: ')
    console.clear()
} else {
    console.clear()
}

console.log(green('Loading Please wait...'))

//ready event (emitted when the client start)
selfbot.on('ready', async () => {
    //if the activity didn't change restart/refresh your discord or wait some time to change
    if(playing === 1){
        return selfbot.user.setActivity(name, {type: "PLAYING"})
    } else if (playing === 2){
        return selfbot.user.setActivity(name, {type: "LISTENING"})
    } else if (playing === 3){
        return selfbot.user.setActivity(name, {type: "WATCHING"})
    } else if (playing === 4){
        return selfbot.user.setActivity(name, {type: "STREAMING", url: 'https://www.twitch.tv/twitch'})
    }

//mode selection
console.clear()
//normal mode
if(mode === 1){
    console.log(blue(`
    
                             ░██████╗███████╗██╗░░░░░███████╗██████╗░░█████╗░████████╗
                             ██╔════╝██╔════╝██║░░░░░██╔════╝██╔══██╗██╔══██╗╚══██╔══╝
                             ╚█████╗░█████╗░░██║░░░░░█████╗░░██████╦╝██║░░██║░░░██║░░░
                             ░╚═══██╗██╔══╝░░██║░░░░░██╔══╝░░██╔══██╗██║░░██║░░░██║░░░
                             ██████╔╝███████╗███████╗██║░░░░░██████╦╝╚█████╔╝░░░██║░░░
                             ╚═════╝░╚══════╝╚══════╝╚═╝░░░░░╚═════╝░░╚════╝░░░░╚═╝░░░

                                   Developer: qwertyuiopasdfghjklzxcvbnm#1312

                                              Version: ${version}
                                              
                                      Logged in as: ${selfbot.user.tag}
    `))
    if(meslog === 'y'){
        console.log('                                   Message Logging: ' + chalk.green("Enabled"))
    } else {
        console.log('                                   Message Logging: ' + chalk.red("Disabled")) 
    }
    if(memlog === 'y'){
        console.log('                                   Member Logging: ' + chalk.green(" Enabled")) 
    } else {
        console.log('                                   Member Logging: ' + chalk.red(" Disabled")) 
    }
    if(guildlog === 'y'){
        console.log('                                   Server Logging: ' + chalk.green(" Enabled"))  
    } else {
        console.log('                                   Server Logging: ' + chalk.red(" Disabled")) 
    }

    console.log('\n\n\n')

//raidmode
   } else if (mode === 2){ //start
    console.log(magenta(`
    

                                           ███╗░░██╗██╗░░░██╗██╗░░██╗███████╗
                                           ████╗░██║██║░░░██║██║░██╔╝██╔════╝
                                           ██╔██╗██║██║░░░██║█████═╝░█████╗░░
                                           ██║╚████║██║░░░██║██╔═██╗░██╔══╝░░
                                           ██║░╚███║╚██████╔╝██║░╚██╗███████╗
                                           ╚═╝░░╚══╝░╚═════╝░╚═╝░░╚═╝╚══════╝

                                        Developer: qwertyuiopasdfghjklzxcvbnm#1312

                                                Version: ${version}
                                              
                                           Logged in as: ${selfbot.user.tag}

`))

console.log(yellow('Warning!! Using this commands can get your account banned'))
setTimeout(() => {
    menu()
}, 1500)

   }//end
})

//functions
function commands(){
    console.clear()
    console.log(`Prefix - ${prefix}\n`)
    console.log(cyan(`${prefix}nuke - Destroy the server`))
    console.log(cyan(`${prefix}ban - Ban all members`))
    console.log(cyan(`${prefix}kick - Kick all members`))
    console.log(cyan(`${prefix}delch - Delete all channels`))
    console.log(cyan(`${prefix}delrole - Delete all roles`))
    console.log(cyan(`${prefix}delemj - Delete all emojis`))
    console.log(cyan(`${prefix}dm - DM all members`))
    let back = readline.question(chalk.yellow("\n[1] Start   ") + chalk.red("   [x] Exit") + chalk.white("     >>> "))
    if(back === "1"){
        raid()
    } else {
        process.exit()
    }
}

function info(){
    console.clear()
    var guildID = readline.question('Enter Guild ID: ')
    console.clear()
    const guild = selfbot.guilds.cache.get(guildID)
    if(!guild){
        console.log(red('Invalid Guild ID...'))
        setTimeout(() => {
            menu()
        }, 1500)
        return
    }
    console.clear()
    const { memberCount } = guild
    console.log(magenta(`
    Guild Name:     ${guild.name}
    Owner ID:       ${guild.ownerID}
    Users:          ${guild.members.cache.filter(m => !m.user.bot).size}
    Bots:           ${guild.members.cache.filter(m => m.user.bot).size}
    Total Members:  ${guild.memberCount}
    Text Channels:  ${guild.channels.cache.filter(c => c.type === 'text').size}
    Voice Channels: ${guild.channels.cache.filter(c => c.type === 'voice').size}
    Channels:       ${guild.channels.cache.size}
    Roles:          ${guild.roles.cache.size}
    `))
    let back = readline.question(chalk.yellow("\n[1] Back to menu   ") + chalk.red("   [x] Exit") + chalk.white("     >>> "))
    if(back === "x"){
        process.exit()
    } else {
        menu()
    }
}

function about(){
    console.clear()
    console.log('\n\n\n\n')
    console.log(blue('                            Developed by: qwertyuiopasdfghjklzxcvbnm#1312'))
    console.log(magenta('                                            Github: yayeen'))
    console.log(red('                                      Library: Discord.js-selfbot'))
    console.log(redBright("                                         Copyright © 2021 Yayeen"))
    let back = readline.question(chalk.yellow("\n[1] Back to menu   ") + chalk.red("   [x] Exit") + chalk.white("     >>> "))
    if(back === "x"){
        process.exit()
    } else {
        menu()
    }
}

function menu(){
    console.clear()
    console.log(yellowBright(`[1] Commands`))
    console.log(yellow(`[2] Guild Info`))
    console.log(redBright(`[3] About`))
    console.log(red(`[4] Exit`))
    var option = readline.questionInt('Select number: ')
    if(option === 1){
        commands()
    } else if (option === 2){
        info()
    } else if (option === 3){
        about()
    } else {
        process.exit()
    }
}

function nukeCommands(){
    console.clear()
    console.log(`Prefix - ${prefix}\n`)
    console.log(cyan(`${prefix}nuke - Destroy the server`))
    console.log(cyan(`${prefix}ban - Ban all members`))
    console.log(cyan(`${prefix}kick - Kick all members`))
    console.log(cyan(`${prefix}delch - Delete all channels`))
    console.log(cyan(`${prefix}delrole - Delete all roles`))
    console.log(cyan(`${prefix}delemj - Delete all emojis`))
    console.log(cyan(`${prefix}dm - DM all members`))
}

//Normal Commands
if(mode === 1){
//message event (emitted when someone create a message)
selfbot.on('message', async message => {
    if(message.channel.type === 'dm') return
    if(message.author.id !== selfbot.user.id) return
    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase()

    //commands (too lazy to make handler)
    //ping command
    if(command === 'ping'){
        await message.delete()
        await message.channel.send(`Pong`).then( async(msg) => {
        const ping = msg.createdTimestamp - message.createdTimestamp
        await msg.edit(`Ping \`${ping}ms\``).catch(e => console.log(e))
    })
    //help command
    } else if (command === 'help'){
        await message.delete()
        const embed = new Discord.MessageEmbed()
        .setAuthor('Commands', selfbot.user.displayAvatarURL())
        .setTitle(`Prefix - \`${prefix}\``)
        .addFields(
            {
                name: 'avatar',
                value: "Display user's avatar",
                inline: true
            },
            {
                name: 'servericon',
                value: "Display server's icon",
                inline: true
            },
            {
                name: 'user',
                value: "Show's user information",
                inline: true
            },
            {
                name: 'server',
                value: "Show's information about the guild",
                inline: true
            },
            {
                name: 'role',
                value: "Show's information about the role",
                inline: true
            },
            {
                name: 'snipe',
                value: "Retrieve recently deleted message(including images)",
                inline: true
            },
            {
                name: 'esnipe',
                value: "Retrive recently edited message",
                inline: true
            },
            {
                name: 'embed',
                value: `Create an embed\nUsage: \`${prefix}embed color/title/description/author\``,
                inline: true
            },
            {
                name: 'about',
                value: "Credits information",
                inline: true
            },
            {
                name: 'help',
                value: "Show this message",
                inline: true
            },
            {
                name: 'stats',
                value: "Display your stats and current uptime",
                inline: true
            },
            {
                name: 'clear',
                value: "Clear your console",
                inline: true
            },
            {
                name: 'dog',
                value: 'Get a URL of a dog image',
                inline: true
            },
            {
                name: 'neko',
                value: 'Get a URL of a neko image',
                inline: true
            },
            {
                name: 'waifu',
                value: 'Get a URL of a waifu image',
                inline: true
            }
        )
        .setColor('BLURPLE')
        .setFooter('More commands to come')

        await message.channel.send(embed).catch(e => console.log(e))
    //userinfo command
    } else if (command === 'user'){
        await message.delete()
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        if(!member) return

        let role = member.roles.cache.filter((roles) => roles.id !== message.guild.id).map((role) => role.toString())
        if(role.length === 0) role = "No roles to display"
        if(role.length > 20) role = "Too many roles to display"

        const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`**Name:** <@${member.user.id}>\n**Joined Server:** ${moment(member.joinedAt).format("LL")}\n**Joined Discord:** ${moment(member.createdAt).format("LL")}`)
        .addField('Roles', `${role}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor(member.displayHexColor)
        .setFooter(`ID: ${member.user.id}`)

        await message.channel.send(embed).catch(e => console.log(e))
    //avatar command
    } else if (command === 'avatar'){
        await message.delete()
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        if(!member) return

        const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setColor(member.displayHexColor)
        .setFooter(`ID: ${member.user.id}`)

        await message.channel.send(embed).catch(e => console.log(e))
    //roleinfo command
    } else if (command === 'role'){
        await message.delete()
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.find(r => r.name.toLowerCase() === args[0])
        if(!role) return

        const embed = new Discord.MessageEmbed()
        .setTitle(role.name)
        .setDescription(`**Name:** ${role.name}\n**Color:** ${role.hexColor}\n**Mentionable:** ${role.mentionable}\n**Managed:** ${role.managed}\n**Members:** ${role.members.size}`)
        .addField('Role created on:', `${moment(role.createdAt).format("LL")}`)
        .setColor(role.displayHexColor)
        .setFooter(`ID: ${role.id}`)

        await message.channel.send(embed).catch(e => console.log(e))
    //serverinfo command
    } else if (command === 'server'){
        await message.delete()
        const guild = selfbot.guilds.cache.get(args[0]) || message.guild

        const embed = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL())
        .addField('Owner', `<@${guild.ownerID}>`)
        .addField('Server Stats',`Members: ${guild.memberCount}\nText Channels: ${guild.channels.cache.filter(c => c.type === 'text').size}\nVoice Channels: ${guild.channels.cache.filter(c => c.type === 'voice').size}\nRoles: ${guild.roles.cache.size}\nEmojis: ${guild.emojis.cache.size}`)
        .setThumbnail(guild.iconURL())
        .setFooter(`ID: ${guild.id}`)

        await message.channel.send(embed).catch(e => console.log(e))
    //snipe command
    } else if (command === 'snipe'){
        await message.delete()
        const sniped = snipes.get(message.channel.id)
        if(!sniped) return

        const snipe = +args[0] - 1 || 0
        const target = sniped[snipe]
        if(!target) return

        const { msg, image } = target
        const embed = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setImage(image)
        .setDescription(msg.content || '[no message]')
        .setFooter(`${snipe + 1}/${sniped.length}`)
        .setColor('RANDOM')

        await message.channel.send(embed).catch(e => console.log(e))
    //edit snipe command
    } else if (command === 'esnipe'){
        await message.delete()
        const esniped = esnipes.get(message.channel.id)
        if(!esniped) return

        const esnipe = +args[0] - 1 || 0
        const target = esniped[esnipe]
        if(!target) return

        const { oldmsg, newmsg, image } = target
        const embed = new Discord.MessageEmbed()
        .setAuthor(oldmsg.author.tag, oldmsg.author.displayAvatarURL())
        .setImage(image)
        .addField('Before', oldmsg.content || '[no message]')
        .addField('After', newmsg.content || '[no message]')
        .setFooter(`${esnipe + 1}/${esniped.length}`)
        .setColor('RANDOM')

        await message.channel.send(embed)
    //servericon command
    } else if (command === 'servericon'){
        await message.delete()
        const guild = selfbot.guilds.cache.get(args[0]) || message.guild
        const icon = guild.iconURL({ dynamic: true, size: 2048 })

        if(icon){
            const embed = new Discord.MessageEmbed()
            .setImage(icon)
            .setFooter(`ID: ${guild.id}`)

            await message.channel.send(embed)
        } else {
            const embed = new Discord.MessageEmbed()
            .setDescription('This server has no icon yet')

            await message.channel.send(embed)
        }
    //create embed command
    } else if (command === 'embed'){
        await message.delete()
        const msg = args.join(" ")
        const splitmsg = msg.split("/")
        let color = splitmsg[0]
        let title = splitmsg[1]
        let description = splitmsg[2]
        let author = splitmsg[3]

        const fail = new Discord.MessageEmbed()
        .setDescription('Invalid arguments')
        .setColor('RED')

        if(!color) return message.channel.send(fail).then(msg => msg.delete({ timeout: 3000 }))
        if(!title) return message.channel.send(fail).then(msg => msg.delete({ timeout: 3000 }))
        if(!description) description = ""
        if(!author) author = ""

        const embed = new Discord.MessageEmbed()
        .setAuthor(author)
        .setTitle(title)
        .setDescription(description)
        .setColor(color)

        await message.channel.send(embed).catch(e => console.log(e))
    //about command
    } else if (command === 'about'){
        await message.delete()
        const embed = new Discord.MessageEmbed()
        .setTitle('Discord Selfbot')
        .setDescription('**Developer:**\n[qwertyuioasdfghjklzxcvbnm#1312](https://discord.com/users/814406096022011934)\n\n[Github](https://github.com/yayeen)\n[Discord.js](https://www.npmjs.com/package/discord.js-selfbot)')
        .addField('Disclaimer', "I am not responsible for what may ever happen to your account.\nUsing this on a user account is prohibited by the [Discord TOS](https://discord.com/guidelines) and can lead to the account block. I made this software for Educational purposes only.")

        await message.channel.send(embed)
    //uptime command
    } else if (command === 'stats'){
        await message.delete()
        let pings = await db.get(`mentions`)
        let msg = await db.get(`messages`)
        let sent = await db.get(`sent`)
        if(pings === null) pings = 0
        if(msg === null) msg = 0
        if(sent === null) sent = 0

        let days = Math.floor(selfbot.uptime / 86400000 );
        let hours = Math.floor(selfbot.uptime / 3600000 ) % 24;
        let minutes = Math.floor(selfbot.uptime / 60000) % 60;
        let seconds = Math.floor(selfbot.uptime / 1000) % 60;

        const embed = new Discord.MessageEmbed()
        .setTitle('Uptime')
        .setDescription(`\`\`\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`\`\``)
        .addField('Stats', `📥 **Messages Received:** ${msg}\n\n📤 **Messages Sent:** ${sent}\n\n🏓 **Pings:** ${pings}\n\n**🛡 Guilds:** ${selfbot.guilds.cache.size}`)

        await message.channel.send(embed)
    //clear command
    } else if (command === 'clear'){
        await message.delete()
        clear()
    //dog command
    } else if (command === 'dog'){
        await message.delete()

        try {
            axios.get('https://random.dog/woof.json')
            .then(async (res) => {
              const dog = new Discord.MessageEmbed()
              .setImage(res.data.url)
              .setColor('RANDOM')
      
              await message.channel.send(dog).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    //neko command
    } else if (command === 'neko'){
        await message.delete()
        try {
            axios.get('https://nekos.life/api/v2/img/neko')
            .then(async (res) => {
                const neko = new Discord.MessageEmbed()
                .setImage(res.data.url)
                .setColor('RANDOM')

                await message.channel.send(neko).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    //waifu command
    } else if (command === 'waifu'){
        await message.delete()
        try {
            axios.get('https://api.waifu.pics/sfw/waifu')
            .then(async (res) => {
              const embed = new Discord.MessageEmbed()
              .setImage(res.data.url)
              .setColor('RANDOM')
      
              await message.channel.send(embed).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
})

//message delete event for snipe
selfbot.on('messageDelete', async message => {
    if(message.channel.type === 'dm') return
    if(message.author.id === selfbot.user.id) return
    if(message.author.bot) return
    let sniped = snipes.get(message.channel.id) || []
    if(sniped.length > 99) sniped = snipes.slice(0, 98)

    sniped.unshift({
        msg: message,
        image: message.attachments.first()?.proxyURL || null, 
    })

    snipes.set(message.channel.id, sniped)
})

//message update event for edit snipe
selfbot.on('messageUpdate', async (oldMessage, newMessage) => {
    if(oldMessage.channel.type === 'dm') return
    if(oldMessage.author.id === selfbot.user.id) return
    if(oldMessage.author.bot) return
    let esniped = esnipes.get(oldMessage.channel.id) || []
    if(esniped.length > 99) esniped = esnipes.slice(0, 98)

    esniped.unshift({
        oldmsg: oldMessage, 
        newmsg: newMessage,
        image: oldMessage.attachments.first()?.proxyURL || null
    })

    esnipes.set(oldMessage.channel.id, esniped)
})
} //end (normal commands)

//console logging
//emitted when someone deleted a message
if(meslog === 'y'){
    const time = Date.now()
    selfbot.on('messageDelete', async message => {
        //write in deleted_messages.txt file when this event triggers
        if(message.channel.type === 'dm') return
        if(message.author.id === selfbot.user.id) return
        const attachment = message.attachments.first()?.proxyURL
    
        if(!attachment){
            let del = `[-] ${message.author.tag} Deleted a message in #${message.channel.name}[${message.guild.name}] - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\nContent: ${message.content}\n\n`
            console.log(red(del))
            fs.appendFile('./log/message/deleted_messages.txt', del, function (err) {
                if(err) return console.log(err)
            })
        } else {
            //trigger when someone deleted an attachments
            let del = `[-] ${message.author.tag} Deleted an attachments in #${message.channel.name}[${message.guild.name}] - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\nAttachment: ${attachment}\n\n`
            console.log(red(del))
            fs.appendFile('./log/message/deleted_attachments.txt', del, function (err) {
                if(err) return console.log(err)
            })
        }
    })
    
    //emitted when someone edit a message
    selfbot.on('messageUpdate', async (oldMessage, newMessage) => {
        //write in edited_messages.txt file when this event triggers
        if(oldMessage.channel.type === 'dm') return
        if(oldMessage.author.id === selfbot.user.id) return
        let edit = `[+] ${oldMessage.author.tag} Edited a message in #${oldMessage.channel.name}[${oldMessage.guild.name}] - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\nBefore: ${oldMessage.content}\nAfter: ${newMessage.content}\n\n`
        console.log(yellow(edit))
        fs.appendFile('./log/message/edited_messages.txt', edit, function (err) {
            if(err) return console.log(err)
        })
    })
}

//emitted when someone banned from the server
if(memlog === 'y'){
    const time = Date.now()
    selfbot.on('guildBanAdd', async (guild, user) => {
        //write in ban_members.txt file when this event triggers
        let ban = `[-] ${user.tag}(${user.id}) has been banned from ${guild.name} - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\n`
        console.log(red(ban))
        fs.appendFile('./log/member/ban_members.txt', ban, function (err) {
            if(err) return console.log(err)
        })
    })
    
    //emitted when someone unbanned
    selfbot.on('guildBanRemove', async (guild, user) => {
        //write in unban_members.txt file when this event triggers
        let unban = `[+] ${user.tag}(${user.id}) has been unbanned from ${guild.name} - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\n`
        console.log(green(unban))
        fs.appendFile('./log/member/unban_members.txt', unban, function (err) {
            if(err) return console.log(err)
        })
    })
}

//emitted when someone create a channel
if(guildlog === 'y'){
    const time = Date.now()
    selfbot.on('channelCreate', async channel => {
        let ch = `[+] ${channel.name} has been created in ${channel.guild} (${channel.type}) - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\n`
        console.log(green(ch))
        fs.appendFile('./log/guild/channel/created_channels.txt', ch, function (err) {
            if(err) return console.log(err)
        })
    })
    
    //emitted when someone delete a channel
    selfbot.on('channelDelete', async channel => {
        let ch = `[-] ${channel.name} has been deleted in ${channel.guild} (${channel.type}) - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\n`
        console.log(red(ch))
        fs.appendFile('./log/guild/channel/deleted_channels.txt', ch, function (err) {
            if(err) return console.log(err)
        })
    })
    
    //emitted when someone edit a channel
    selfbot.on('channelUpdate', async (oldChannel, newChannel) => {
        if(oldChannel.name !== newChannel.name){
            let ch = `[+] A channel has been updated in ${oldChannel.guild}\nBefore: ${oldChannel.name} - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\nAfter: ${newChannel.name}\n\n`
            console.log(yellow(ch))
            fs.appendFile('./log/guild/channel/updated_channels.txt', ch, function (err) {
                if(err) return console.log(err)
            })
        }
    })
    
    //emitted when someone create a role
    selfbot.on('roleCreate', async role => {
        let r = `[+] ${role.name} has been created in ${role.guild} (role) - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\n`
        console.log(green(r))
        fs.appendFile('./log/guild/role/created_roles.txt', r, function (err) {
            if(err) return console.log(err)
        })
    })
    
    //emitted when someone delete a role
    selfbot.on('roleDelete', async role => {
        let r = `[-] ${role.name} has been deleted in ${role.guild} (role) - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\n`
        console.log(red(r))
        fs.appendFile('./log/guild/role/deleted_roles.txt', r, function (err) {
            if(err) return console.log(err)
        })
    })
    
    //emitted when someone edit a role
    selfbot.on('roleUpdate', async (oldRole, newRole) => {
        if(oldRole.name !== newRole.name){
            let r = `[+] A role has been updated in ${oldRole.guild} - ${moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a")}\nBefore: ${oldRole.name}\nAfter: ${newRole.name}\n\n`
            console.log(yellow(r))
            fs.appendFile('./log/guild/role/updated_roles.txt', r, function (err) {
                if(err) return console.log(err)
            })
        }
    })
}

//stats
//save data when someone pinged you
selfbot.on('message', async message => {
    if(!message.mentions.users.first()) return
    if(message.author.id === selfbot.user.id) return
    if(message.mentions.users.first().id !== selfbot.user.id) return
    let data = await db.get(`mentions`)
    if(!data){
        await db.set(`mentions`, 1)
    } else {
        await db.add(`mentions`, 1)
    }
})

//save data when someone send a message
selfbot.on('message', async message => {
    if(message.author.id === selfbot.user.id) return
    let data = await db.get(`messages`)
    if(!data){
        await db.set(`messages`, 1)
    } else {
        await db.add(`messages`, 1)
    }
})

//save data when you send a message
selfbot.on('message', async message => {
    if(message.author.id !== selfbot.user.id) return
    let data = await db.get(`sent`)
    if(!data){
        await db.set(`sent`, 1)
    } else {
        await db.add(`sent`, 1)
    }
})

//nuke commands
if(mode === 2){
function raid(){
    nukeCommands()
    setTimeout(() => {
        console.log(green("\n\n\There's no turning back..."))
    }, 1500)
    setTimeout(() => {
        console.log(green("Type the commands on any channel..."))
    }, 3000)
    selfbot.on('message', async message => {
        if(message.channel.type === 'dm') return
        if(message.author.id !== selfbot.user.id) return
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase()

        if(command === 'nuke'){
            nukeCommands()
            await message.delete()
            message.guild.setIcon('https://cdn.discordapp.com/attachments/882474976136007740/888705036971016212/null.png')
            message.guild.setName('nuked')
            message.guild.channels.cache.forEach(channel => channel.delete().catch(e => console.log(red(`[-] Unable to delete ${channel.name}`))))
            message.guild.members.cache.forEach(member => member.ban().catch(e => console.log(red(`[-] Unable to ban ${member.user.tag}`))))
            message.guild.roles.cache.forEach(role => role.delete().catch(e => console.log(red(`[-] Unable to delete ${role.name}`))))
            message.guild.emojis.cache.forEach(emoji => emoji.delete().catch(e => console.log(`[-] Unable to delete ${emoji.name}`)))      
        } else if (command === 'ban'){
            nukeCommands()
            await message.delete()
            console.log(green(`Attempting to ban ${message.guild.members.cache.size} Members`))
            message.guild.members.cache.forEach(member => member.ban().catch(e => console.log(red(`[-] Unable to ban ${member.user.tag}`))))
        } else if (command === 'kick'){
            nukeCommands()
            await message.delete()
            console.log(green(`Attempting to kick ${message.guild.members.cache.size} Members`))
            message.guild.members.cache.forEach(member => member.kick().catch(e => console.log(red(`[-] Unable to kick ${member.user.tag}`))))
        } else if (command === 'delch'){
            nukeCommands()
            await message.delete()
            console.log(green(`Attemting to delete ${message.guild.channels.cache.size} Channels`))
            message.guild.channels.cache.forEach(channel => channel.delete().catch(e => console.log(red(`[-] Unable to delete ${channel.name}`))))
        } else if (command === 'delrole'){
            nukeCommands()
            await message.delete()
            console.log(green(`Attemting to delete ${message.guild.roles.cache.size} Channels`))
            message.guild.roles.cache.forEach(role => role.delete().catch(e => console.log(red(`[-] Unable to delete ${role.name}`))))
        } else if (command === 'delemj'){
            nukeCommands()
            await message.delete()
            console.log(green(`Attemting to delete ${message.guild.emojis.cache.size} Channels`))
            message.guild.emojis.cache.forEach(emoji => emoji.delete().catch(e => console.log(`[-] Unable to delete ${emoji.name}`)))
        } else if (command === 'dm'){
            nukeCommands()
            await message.delete()
            let msg = args.join(" ")
            if(!msg) msg = `${message.author.username} was here`
            console.log(magenta(`Attempting to DM ${message.guild.members.cache.size} Members`))
            message.guild.members.cache.forEach(member => member.send(msg).catch(e => console.log(red(`[-] Unable to DM ${member.user.tag}`))))
        } else if (command === 'spamch'){
            nukeCommands()
            await message.delete()
            let amount = args[0]
            let name = args.slice(1).join(" ")
            if(isNaN(args[0]) || !args[0]) amount = 500
            if(!name) name = `${message.author.username} was here`
            for(let i = 0; i < amount; i++){
                message.guild.channels.create(name, {type: 'text'})
            }
        } else if (command === 'spamrole'){
            nukeCommands()
            await message.delete()
            let amount = args[0]
            let name = args.slice(1).join(" ")
            if(isNaN(args[0]) || !args[0]) amount = 250
            if(!name) name = 'nuked'
            for(let i = 0; i < amount; i++){
                message.guild.roles.create({
                    data: {
                        name: name,
                        color: 'RANDOM'
                    },
                    reason: 'Nuking'
                })
            }
        }
    })
}
}

selfbot.login(token) //login