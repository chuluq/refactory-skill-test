'use strict';
const inquirer = require('inquirer');

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const tanggal = today.toLocaleString();

console.log('Hi, welcome to Warung Makan Sederhana');

const questions = [
  {
    type: 'list',
    name: 'namaKasir',
    message: 'Siapa nama anda?',
    choices: ['Salim', 'Agus', 'John'],
  },
  {
    type: 'list',
    name: 'nasi',
    message: 'Pilihan nasi?',
    choices: ['Nasi putih', 'Nasi uduk', 'Nasi kuning'],
  },
  {
    type: 'checkbox',
    name: 'lauk',
    message: 'Pilihan lauk?',
    choices: [
      {
        name: 'Ayam goreng',
      },
      {
        name: 'Bebek goreng',
      },
      {
        name: 'Telur dadar',
      },
      {
        name: 'Tempe goreng',
      },
      {
        name: 'Tahu goreng',
      },
    ],
    validate: (answer) => {
      if (answer.length < 1) {
        return 'Kamu harus memilih minimal 1 lauk.';
      }

      return true;
    },
  },
  {
    type: 'list',
    name: 'minuman',
    message: 'Anda juga dapat minuman gratis',
    choices: ['Es teh', 'Es jeruk', 'Teh panas', 'Jeruk panas'],
  },
];

inquirer.prompt(questions).then((answers) => {
  let prize = 10000; // harga nasi + minuman

  if (answers.lauk.length > 3) {
    prize += 35000;
  } else if (answers.lauk.length == 3) {
    prize += 30000;
  } else if (answers.lauk.length == 2) {
    prize += 20000;
  } else if (answers.lauk.length == 1) {
    prize += 10000;
  }

  console.log('\nWarung Makan Sederhana');
  console.log(`\n${tanggal}`);
  console.log('\nOrder receipt: ');
  console.log(JSON.stringify(answers, null, ' '));
  console.log('-'.repeat(30));
  console.log(`Total harga: ${prize}`);
});
