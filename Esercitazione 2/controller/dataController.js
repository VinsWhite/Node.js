const fs = require('fs');

const getData = () => {
    const data = JSON.parse(fs.readFileSync('./data/data.json'));
    return data;
};

const getAllData = (req, res) => {
    const data = getData();
    res.status(200).json({
        status: 'success',
        data
    });
};

module.exports = {
    getAllData
};