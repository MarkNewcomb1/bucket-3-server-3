const express = require('express');
const app = express();
const cors = require('cors');
const csvToJson = require('convert-csv-to-json');
app.use(cors());
const students = csvToJson.fieldDelimiter(',').getJsonFromCsv('students.csv');

function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        let holder = data[i].id.toString();
        if (holder === id) {
            return data[i];
        }
    }
}

app.get('/', (request, response) => {
    response.json(students);
})

app.get("/:id", function (request, response) {
    var record = findById(students, request.params.id);
    if (!record){
        response.status = 404;
        response.json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        response.json({students: record});
    }
});

app.listen(9000);