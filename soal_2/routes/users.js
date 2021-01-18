const express = require('express');
const router = express.Router();
const fs = require('fs');

const data = fs.readFileSync('./profile_list.json');
const profile = JSON.parse(data);

router.get('/', (req, res) => {
  try {
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/noPhone', (req, res) => {
  try {
    const sorted = profile.filter((pr) => pr.profile.phones == 0);
    const name = sorted.map((sorted) => sorted.username);
    res.json(name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/hasArticles', (req, res) => {
  try {
    const sorted = profile.filter((pr) => pr.articles != 0);
    const name = sorted.map((sorted) => sorted.username);
    res.json(name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/annis', (req, res) => {
  try {
    const sorted = profile.filter((val) => {
      if (val.profile.full_name.includes('annis')) {
        return val.profile.full_name;
      }
    });
    res.json(sorted);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/hasArticles/2020', (req, res) => {
  try {
    const sorted = profile.filter((pr) => pr.articles.published_at == '2020');
    const name = sorted.map((sorted) => sorted.username);
    res.json(name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/birthday/1986', (req, res) => {
  try {
    const sorted = profile.filter((pr) => pr.profile.birthday == '1986');
    const name = sorted.map((sorted) => sorted.username);
    res.json(name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/hasArticles/tips', (req, res) => {
  try {
    const sorted = profile.filter((pr) => pr.articles.title == 'tips');
    const articles = sorted.map((sorted) => sorted.articles);
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/hasArticles/beforeAugust', (req, res) => {
  try {
    const sorted = profile.filter((pr) => pr.articles.published_at <= 'August');
    const articles = sorted.map((sorted) => sorted.articles);
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
