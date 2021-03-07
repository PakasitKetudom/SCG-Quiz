const { Router } = require('express')

const router = Router()

var vending_machine = [
    {
        "id": 0,
        "location": "Bangkok",
        "product": [
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quantity": 11
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quantity": 12
            },
            {
                "id": 2,
                "name": "SnackA",
                "price": 5,
                "quantity": 24
            }
        ],
        "oneCoin": 180,
        "fiveCoin": 14,
        "tenCoin": 3
    },
    {
        "id": 1,
        "location": "Samutprakarn",
        "product": [
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quantity": 16
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quantity": 17
            }
        ],
        "oneCoin": 10,
        "fiveCoin": 4,
        "tenCoin": 5
    },
    {
        "id": 2,
        "location": "Chonburi",
        "product": [
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quantity": 20
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quantity": 35
            }
        ],
        "oneCoin": 100,
        "fiveCoin": 1,
        "tenCoin": 1
    },
    {
        "id": 3,
        "location": "Chiang Mai",
        "product": [
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quantity": 15
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quantity": 24
            }
        ],
        "oneCoin": 17,
        "fiveCoin": 12,
        "tenCoin": 5
    },
    {
        "id": 4,
        "location": "Surin",
        "product": [
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quantity": 20
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quantity": 18
            }
        ],
        "oneCoin": 12,
        "fiveCoin": 8,
        "tenCoin": 12
    },
    {
        "id": 5,
        "location": "Kanchanaburi",
        "product": [
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quantity": 12
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quantity": 14
            },
            {
                "id": 2,
                "name": "SnackA",
                "price": 5,
                "quantity": 20
            }
        ],
        "oneCoin": 7,
        "fiveCoin": 10,
        "tenCoin": 3
    },
];

router.get('/vending_machine', (req, res) => {
    res.json(vending_machine)
});

router.get('/vending_machine/:id', (req, res) => {
    // res.json(vending_machine.find(vending_machine => vending_machine.id === req.params.id))
    // console.log(req.params.id)
    res.json(vending_machine.find(vm => vm.id === parseInt(req.params.id)))
    // console.log(vm.id)
    // res.send(req.params)
});

router.post('/vending_machine', (req, res) => {
    const data = {
        id: vending_machine.length + 1,
        location: "XXXX",
        product: [
            {
                id: 0,
                name: "CokeZero",
                price: 11,
                quality: 11
            }
        ],
    };
    vending_machine.push(data);
    res.send(data);
});

// router.put('/vending_machine/:id/:proid', (req, res) => {
//     const updateIndex = vending_machine.findIndex(vm => vm.id === req.params.id)
//     res.json(Object.assign(vending_machine[updateIndex], req.body))
// });

module.exports = router