const { Router } = require('express')
const router = new Router()
const Dino = require('./model')

router.get('/dinosaur', (req, res, next) => {
  Dino.findAll()
    .then(dino => {
      res.json(dino)
    })
    .catch(error => next(error))
})

router.get('/dinosaur/:id', (req, res, next) => {
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

router.post('/dinosaur', (req, res, next) => {
  const body = req.body
  const dinosaur = {
    name: body.name,
    image: body.image,
    type_of_dinosaur: body.type_of_dinosaur,
    lenght: body.lenght,
    diet: body.diet,
    when_it_lived: body.when_it_lived,
    found_in: body.found_in,
    more_info: body.more_info,
    named_by: body.named_by,
    taxonomy: body.taxonomy
  }
  if (dinosaur.name.length < 3 || dinosaur.image.length < 3 ||
    dinosaur.type_of_dinosaur < 3 || dinosaur.when_it_lived < 3 ||
    dinosaur.diet.length < 3 || dinosaur.found_in.length < 1 ||
    dinosaur.named_by.length < 3 || dinosaur.taxonomy.length < 3) {
    return (res.status(404).send({
      message: 'Please fill in all the inputs with valid data'
    }))
  } else {
    Dino.create(dinosaur)
      .then(dino => {
        res.json(dino)
      })
      .catch(error => next(error))
  }
})


router.delete('/dinosaur/:id', (req, res, next) => {
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


router.put('/dinosaur/:id', (req, res, next) => {
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