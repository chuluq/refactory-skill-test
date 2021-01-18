const express = require('express');
const router = express.Router();
const fs = require('fs');

const res = fs.readFileSync('./inventory_list.json');
const inventory = JSON.parse(res);

router.get('/', (req, res) => {
  try {
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/meetingroom', (req, res) => {
  try {
    const sorted = inventory.filter(
      (val) => val.placement.name == 'Meeting Room'
    );
    const item = sorted.map((sorted) => sorted.name);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/electronic', (req, res) => {
  try {
    const sorted = inventory.filter((val) => val.type == 'electronic');
    const item = sorted.map((sorted) => sorted.name);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/furnitures', (req, res) => {
  try {
    const sorted = inventory.filter((val) => val.type == 'furniture');
    const item = sorted.map((sorted) => sorted.name);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/date/:date', (req, res) => {
  const date = req.params.date;
  let formatDate = new Date(date + 'Z');
  formatDate = formatDate.toUTCString();

  try {
    const sorted = inventory.filter((val) => val.type == formatDate);
    const item = sorted.map((sorted) => sorted.name);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/brown', (req, res) => {
  try {
    let sorted = inventory.filter((val) => {
      val.tags == 'brown';
    });
    const item = sorted.map((sorted) => sorted.name);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
