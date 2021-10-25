const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);


exports.checkID = (req, res, next, val) => {
    console.log(`Tour: ${val}`);
   if (req.params.id * 1 > tours.length) {
     return res.status(404).json({
       status: "Fail",
       message: "Invalid ID",
     });
   }
  next();
}

//create own middleware function
//check if body contain the name and price property
//If not, send back 400(bad request(mane user name, price chara e request korse tai bad))
//And it to the post handler stack
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    })
  }
  next();
}



exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  console.log(newId);
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {

  res.status(200).json({
    status: "success",
    data: {
      tour: "Update tour here..",
    },
  });
};

exports.deleteTour = (req, res) => {
 
  res.status(204).json({
    status: "success",
    data: null,
  });
};
//ai function gula validition niya concern na ai gular uddasho ektai ja bola hoi kora.. delete function delete korbe, update function update korbe ai tader kaj. id validation upre automatic kore diyasi aita e express er ekta subida/gun