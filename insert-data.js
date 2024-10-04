// const { PrismaClient } = require('@prisma/client');
// const fs = require('fs');

// const prisma = new PrismaClient();

// async function insertData() {
//     const rawData = JSON.parse(fs.readFileSync('./public/frontendAssignment.json', 'utf8'));
//     const data = rawData.data; // Access the 'data' array inside the JSON object

//     for (const item of data) {
//         await prisma.trip.create({
//             data: {
//                 id: item._id, // Use the id from the JSON file
//                 tripId: item.tripId,
//                 transporter: item.transporter,
//                 tripStartTime: new Date(item.tripStartTime),
//                 currentStatusCode: item.currentStatusCode,
//                 currenStatus: item.currenStatus,
//                 phoneNumber: item.phoneNumber.toString(), // Ensure phone number is a string
//                 etaDays: item.etaDays,
//                 distanceRemaining: item.distanceRemaining,
//                 tripEndTime: item.tripEndTime ? new Date(item.tripEndTime) : null,
//                 source: item.source,
//                 sourceLatitude: item.sourceLatitude,
//                 sourceLongitude: item.sourceLongitude,
//                 dest: item.dest,
//                 destLatitude: item.destLatitude,
//                 destLongitude: item.destLongitude,
//                 lastPingTime: new Date(item.lastPingTime),
//                 createdAt: new Date(item.createdAt),
//             },
//         });
//     }
//     console.log("Data inserted successfully!");
// }

// insertData()
//     .catch(e => {
//         console.error('Error inserting data:', e);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
