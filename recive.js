const amqp = require('amqplib');
const exchangeName = 'headersMassage';

const receiveData = async () => {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "headers");
    const assertedQoueue = await channel.assertQueue('', { exclusive: true });
    channel.bindQueue(assertedQoueue.queue,exchangeName,'',{ author: 'davod', runtime:'nodejs','x-match':'any'})  
    channel.consume(assertedQoueue.queue, msg => {
            console.log(msg.content.toString());
            console.log(msg.properties.headers);
    })
}
receiveData();