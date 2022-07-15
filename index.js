const express = require('express'); //Import the express dependency
const axios = require('axios').default;
const cors = require('cors');
const bodyParser = require('body-parser')

const API_URL='https://online-test-api.achilles.systems/api/v1/';
const app = express();  
app.use(bodyParser.json())
app.use(cors());
const port = 5100;

app.get('/signers', (req, res) => { 
  axios.get(`${API_URL}signers`).then((response) => {
    res.send(response.data);   
  });
});
app.post('/signers', (req, res) => { 
  axios.post(`${API_URL}signers`, req.body).then((response) => {
      console.log(response.data);
      res.send(response.data);   
  }).catch((err) => {
      console.log('err', err)
  })
});

app.post('/signers/:id', (req, res) => { 
    console.log(req.params, req.body);
    const id = req.params.id;
    axios.put(`${API_URL}signers/${id}`, req.body).then((response) => {
        console.log(response.data);
        res.send(response.data);   
        res.status(200)
    }).catch((err) => {
        res.send(err);
        res.status(err.status)
    });
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});