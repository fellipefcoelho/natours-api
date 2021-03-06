const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    console.log(`The tour id is: ${val}`)
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    }
  next();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'missing name or price'
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    });      
}

exports.getToursById = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;

    const tour = tours.find(element => element.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });      
}
exports.postTour = (req, res) => {
    console.log(req.body);
  
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
  
    tours.push(newTour);
  
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      err => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour
          }
        });
      }
    );
  };

exports.patchTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
           tour: '<Uodated tour here...>' 
        }
    })   
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })   
}