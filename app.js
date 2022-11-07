const {Telegraf} = require('telegraf')
const express = require('express')
const mongoose = require('mongoose')


const shecma = new mongoose.Schema({
    msg: {
        type: String
    }
})
const testmodel = mongoose.model('test',shecma)


mongoose.connect('mongodb+srv://rasedul20:rasedul20@telegramcluster.xfaz1rx.mongodb.net/sdBot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})


const app = express()

const bot = new Telegraf(process.env.TOKEN)


bot.start(ctx=>{
    ctx.reply('bot start')
})

bot.command('testdb',ctx=>{
    testmodel.find()
    .then(data=>{
        ctx.reply(data[0].msg)
    })
    .catch(e=>console.log(e))
})

app.use(bot.webhookCallback(`/`))



app.get('/',(req,res)=>{
    testmodel.find()
    .then(data=>{
        res.json({"data":data[0].msg})
    })
    .catch(e=>console.log(e))
})


app.listen(5000,()=>{
    console.log("The bot is running")
})