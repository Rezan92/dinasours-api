const { Router } = require('express')
const router = new Router()
const Dino = require('./model')

router.get('/', (req, res, next) => {
  Dino.findAll()
    .then(dino => {
      res.json(dino)
    })
    .catch(error => next(error))
})

router.get('/:id', (req, res, next) => {
  Dino.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dino => {
      if (dino) {
        res.status(200).json(dino)
      }
      res.status(404).send({ message: 'Not exist' })
    })
    .catch(error => next(error))
})

router.post('/', (req, res, next) => {
  const body = req.body
  const dinosaur = {
    name: body.name,
    image: body.image,
    type_of_dinosaur: body.type_of_dinosaur,
    lenght: body.lenght,
    diet: body.diet,
    when_it_lived: body.when_it_lived,
    found_in: body.found_in,
    named_by: body.named_by,
    taxonomy: body.taxonomy
  }
  Dino.create(dinosaur)
    .then(dino => {
      if (dino.name.length < 3 || dino.image < 3 || 
        dino.diet < 3 || dino.found_in < 1 || 
        dino.named_by < 3 || dino.taxonomy < 3) {
        res.status(404).send({
          message: 'Please fill in all the inputs with valid data'
        })
      }
      res.json(dino)
    })
    .catch(error => next(error))
})

router.delete('/:id', (req, res, next) => {
  Dino.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(numDeleted => {
      if (numDeleted) {
        res.status(200).send({
          message: "Deleted successfully"
        });
      } else {
        res.status(404).send({
          message: "Can't delete, Not exist in the database"
        });
      }
    })
    .catch(next);
})


router.put('/:id', (req, res, next) => {
  Dino.findOne({
    where: { id: req.params.id }
  })
    .then(dino => {
      if (dino) {
        dino
          .update(req.body)
          .then(dino => res.json(dino));
      } else {
        res.status(404).send({
          message: "Can't update, Not exist in the database"
        });
      }
    })
    .catch(next);
});

module.exports = router