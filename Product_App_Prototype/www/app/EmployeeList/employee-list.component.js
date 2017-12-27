angular.
    module('pap').
    component('employeeList', {
        templateUrl:"app/EmployeeList/employee-list.template.html",
        controller: function employeeListController() {
            this.employees = [
                {
                    EmployeeID:'123',
                    firstname: 'kajal',
                    lastname: 'Bhanushali',
                    DOB: '23-10-1986',
                    EmailAddress:'kajal.bhanushali@wavemaker.com'
                }, {
                    EmployeeID: '124',
                    firstname: 'Priyam',
                    lastname: 'Goswami',
                    DOB: '22-10-1986',
                    EmailAddress: 'Priya.Goswami@imaginea.com'
                }, {
                    EmployeeID: '125',
                    firstname: 'Gaurav',
                    lastname: 'babbar',
                    DOB: '21-10-1986',
                    EmailAddress: 'Gaurav.Babbar@imaginea.com'
                }
            ];
            this.setSelected = function (index) {
                this.selected = this.employees[index];
                console.log(this.selected);
            };
        }
    });