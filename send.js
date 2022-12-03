const amqp = require('amqplib');
const exchangeName = 'headersMassage';
const sendData = async () => {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'headers');
    channel.publish(exchangeName, '', Buffer.from("message"),{headers:{
        author: 'davod',
        runtime:'nodejs',
        price:898,
        comments:[]
    }});
    setTimeout(() => {
        process.exit(0)
    })
}
sendData()