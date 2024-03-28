const userController = require('../controllers/userController');
const vaccineController = require('../controllers/vaccineController');
const illnessController = require('../controllers/illnessController');

module.exports = (app) => {
    //user
    // app.post('/users', userController.createUser);
    app.post('/users', userController.createUserWithVaccinesAndIllnesses);
    app.get('/', userController.getAllUsers);
    app.get('/users/:id', userController.getUserById);
    app.post('/users/:id', userController.updateUser);
    app.delete('/users/:id', userController.deleteUser);

    //vaccine
    app.post('/vaccines/:userId', vaccineController.addVaccineToUser);
    app.delete('/users/:userId/vaccines/:vaccineId', vaccineController.deleteVaccineFromUser);
    app.get('/vaccines/:user_id', vaccineController.getVaccineByIdUser);

    //illness
    app.post('/users/:userId/illnesses', illnessController.addIllnessToUser);
    app.post('/illnes/:user_id', illnessController.updateIllnes);
    app.get('/illnes/:user_id', illnessController.getIllnesByIdUser);

}

