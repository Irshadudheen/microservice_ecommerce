import amqp from 'amqplib';
import {  processProductData } from '../service/productService.js';

import expressAsyncHandler from 'express-async-handler';

const MAX_RETRY_ATTEMPTS = 9; // Maximum number of retry attempts
let retryAttempts = 0; // Counter for retry attempts

const consumeUserData = async () => {
    try {
        await connectAndConsume('user_data', processUserData);
    } catch (error) {
        console.error('Error in consumeUserData:', error.message);
        if (retryAttempts < MAX_RETRY_ATTEMPTS) {
            console.log(`Retry attempt ${retryAttempts + 1} to connect.`);
            retryAttempts++;
            setTimeout(()=>{

                 consumeUserData(); 
            },20000)
        } else {
            console.error('Max retry attempts reached. Could not connect to RabbitMQ.');
            
        }
    }
};

const consumeProductData = async () => {
    try {
        await connectAndConsume('product_data', processProductData);
    } catch (error) {
        console.error('Error in consumeProductData:', error.message);
        if (retryAttempts < MAX_RETRY_ATTEMPTS) {
            console.log(`Retry attempt ${retryAttempts + 1} to connect.`);
            retryAttempts++;
            setTimeout(()=>{
                consumeProductData(); 

            },20000)
        } else {
            console.error('Max retry attempts reached. Could not connect to RabbitMQ.');
           
        }
    }
};

const connectAndConsume = async (queueName, processDataFunction) => {
    const connection = await amqp.connect({
        hostname: "rabbitmq",
        port: 5672,
        username: "admin",
        password: "admin123",
        vhost: "/",
    });
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    console.log(`[*] Waiting for messages in ${queueName}. To exit press CTRL+C`);

    channel.consume(queueName, (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content.toString());
            console.log(`[x] Received ${queueName} data:`, data);
            processDataFunction(data);
            channel.ack(msg);
        }
    });
};

export {  consumeProductData };