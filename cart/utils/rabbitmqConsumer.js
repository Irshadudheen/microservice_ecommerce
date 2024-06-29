import amqp from 'amqplib';
import { processUserData,processProductData } from '../services/cartServices.js';

import expressAsyncHandler from 'express-async-handler';

const consumeUserData = async () => {
    try {
        // Update the connection URL to use the correct hostname or IP address
        const connection = await amqp.connect({
            hostname: "localhost",
            port: 5672,
            username: "admin",
            password: "admin123",
            vhost: "/",
        });
        const channel = await connection.createChannel();
        const queue = 'user_data';

        await channel.assertQueue(queue, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const userData = JSON.parse(msg.content.toString());
                console.log(" [x] Received %s", userData);

                // Process the userData
                

                    processUserData(userData);
                

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error in RabbitMQ Consumer:', error.message);
    }
};

const consumeProductData = async () => {
    try {
        // Update the connection URL to use the correct hostname or IP address
        const connection = await amqp.connect({
            hostname: "localhost",
            port: 5672,
            username: "admin",
            password: "admin123",
            vhost: "/",
        });
        const channel = await connection.createChannel();
        const queue = 'product_data';

        await channel.assertQueue(queue, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const productData = JSON.parse(msg.content.toString());
                console.log(" [x] Received %s", productData);

                // Process the userData
                

                    processProductData(productData);
                

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error in RabbitMQ Consumer:', error.message);
    }
};


export { consumeUserData,consumeProductData };