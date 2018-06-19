const express = require('express');
const router = express.Router();
const path = require('path');
module.exports = router;


const rides = [
    { rideid: 1, name: 'Dan Onoja', departure: 'Lagos', arrival: 'Abuja', amount: 'N10,000', available_Seats: '2', date: '08-08-2018', time: '5:00pm' },
    { rideid: 2, name: 'Jeremy Hunt', departure: 'Lagos', arrival: 'Benin', amount: 'N7,000', available_Seats: '4', date: '08-08-2018', time: '5:00pm' },
    { rideid: 3, name: 'Erons Abumere', departure: 'Ekiti', arrival: 'Osun', amount: 'N3,000', available_Seats: '2', date: '08-08-2018', time: '5:00pm' },
    { rideid: 4, name: 'Dumebi Osu', departure: 'Lagos', arrival: 'Jigawa', amount: 'N11,000', available_Seats: '2', date: '08-08-2018', time: '5:00pm' },
    { rideid: 5, name: 'Mikel Obi', departure: 'Ogbomosho', arrival: 'Auchi', amount: 'N7,000', available_Seats: '4', date: '08-08-2018', time: '5:00pm' },
    { rideid: 6, name: 'Pelumi James', departure: 'Ebonyi', arrival: 'Delta', amount: 'N3,000', available_Seats: '2', date: '08-08-2018', time: '5:00pm' },
]
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

router.get('/api/rides', (req, res) => {
    res.send(rides);
});

router.get('/api/rides/:rideid', (req, res) => {
    const ride = rides.find(c => c.rideid === parseInt(req.params.rideid));
    if (!ride) {
        res.status(404).send('The ride with that ID was not given');
        return;
    }
    res.send(ride);
});


router.post('/api/rides', (req, res) => {

    const result = validateride(req.body);
    if (result.error) {
        res.status(400).send("Error");
        return;
    }

    const ride = {
        rideid: rides.length + 1,
        name: req.body.name,
        departure: req.body.departure,
        arrival: req.body.arrival,
        available_Seats: req.body.available_Seats,
        amount: req.body.amount,
        date: req.body.date,
        time: req.body.time,
    };
    rides.push(ride);
    res.send(ride);
});

router.post('/api/rides/:rideid/:requests', (req, res) => {
    const result = validateride(req.body);
    if (result.error) {
        res.status(400).send("Error");
        return;
    }

    rides.push(ride);
    res.send(ride);
});



router.put('/api/rides/:rideid', (req, res) => {
    const ride = rides.find(c => c.rideid === parseInt(req.params.rideid));
    if (!ride) {
        res.status(404).send('The ride with that ID was not given');
        return;
    }

    const result = validateride(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[1].message);
        return;
    }

    ride.name = req.body.name;
    ride.departure = req.body.departure;
    ride.arrival = req.body.arrival;
    ride.amount = req.body.amount;
    ride.available_Seats = req.body.available_Seats;
    ride.date = req.body.date;
    ride.time = req.body.time;

    res.send(ride);
});

function validateride(ride) {
    const schema = {
        name: Joi.string().min(3).required(),
        departure: Joi.string().required(),
        arrival: Joi.string().required(),
        amount: Joi.string().required(),
        available_Seats: Joi.number().integer().required(),
        date: Joi.date().required(),
        time: Joi.string().required()
    };
    return Joi.validate(ride, schema);
}


router.delete('/api/rides/:rideid', (req, res) => {
    const ride = rides.find(c => c.rideid === parseInt(req.params.rideid));
    if (!ride) return res.status(404).send('The ride with that ID was not given');

    const index = rides.indexOf(rides);
    rides.splice(index, 1);
    res.send(rides);
})