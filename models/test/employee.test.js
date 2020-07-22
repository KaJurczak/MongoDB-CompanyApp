const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  it('should throw an error if no "firstName, lastName, department" arg', () => {
    const employee = new Employee({}); 
  
    employee.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if arg is not a string', () => {
    const cases = [
      {firstName: 'John', lastName:'Doe', department: undefined}, {firstName: 'John', lastName:'Doe', department: 0},
      {firstName: 'John', lastName:'Doe', department: []},
      {firstName: 'John', lastName:'Doe', department: null},
    ];
    for(let arg of cases) {
      const employee = new Employee({ arg });
  
      employee.validate(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should throw right model if arg is correct', () => {
    const cases = {firstName: 'John', lastName:'Doe', department: 'IT'};
    const employee = new Employee( cases );

    employee.validate(err => {
      expect(err).to.not.exist;
    });
  });

  after(() => {
    mongoose.models = {};
  });

});