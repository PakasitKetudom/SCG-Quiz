const { Router } = require('express')

const router = Router()

var vending_machine = [
    {
        "id": 0,
        "location": "Bangkok",
        "product":[
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quality": 20
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quality": 20
            }
        ]
    },
    {
        "id": 1,
        "location": "Samutprakarn",
        "product":[
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quality": 20
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quality": 20
            }
        ]
    },
    {
        "id": 2,
        "location": "Chonburi",
        "product":[
            {
                "id": 0,
                "name": "Coke",
                "price": 15,
                "quality": 20
            },
            {
                "id": 1,
                "name": "Water",
                "price": 10,
                "quality": 20
            }
        ]
    },
  ];
  
  router.get('/vending_machine', (req, res) => {
    res.json(vending_machine)
  });

  router.get('/vending_machine/:id', (req, res) => {
    // res.json(vending_machine.find(vending_machine => vending_machine.id === req.params.id))
    // console.log(vending_machine)
    res.json(vending_machine.find(vm => vm.id === req.params.id))
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
  
  module.exports = router