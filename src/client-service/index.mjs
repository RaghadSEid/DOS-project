

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import axios from "axios"


  const program = new Command();
program.name('DOS Project').description('DOS Project 2025').version('1.0.0');
  let questionSearch = [
    {
      type: 'input',
      name: 'bookTitle',
          message: 'Enter the topic of the book to view its details :',
    },
  ];

  let questionInfo=[{
    type: 'number',
    name: 'itemNumber',
    message: 'Enter the item number of the book to get information about it: ',
  },]

  let questionPurchase = [{
    type: 'number',
    name: 'itemNumber',
      message: ' Enter the item number of the book to purchase it: ',
  },
  {
    type: 'number',
    name: 'money',
      message: 'Please enter the payment amount:  ',
  },
]
  
  program
    .command('search-about-book')
    .alias('sb')
    .description('search about specific book using book topic')
    .action(() => {
      inquirer
        .prompt(questionSearch)
        .then(async (answers) => {
          try {
            const result = await axios.get(`http://localhost:8083/catalog-server/search/${answers.bookTitle}`);
            console.log('Response Data:', result.data);
          } catch (error) {
            console.error('Error during request:', error.message);
          }

        })
        .catch((error) => {
          if (error.isTtyError) {
          } else {
          }
        });
    });
  
    program
    .command('information-about-book')
    .alias('ib')
    .description('information about specific book using item number')
    .action(() => {
      inquirer
        .prompt(questionInfo)
        .then(async (answers) => {
          try {
            const result = await axios.get(`http://localhost:8083/catalog-server/info/${answers.itemNumber}`);
            console.log('Response Data:', result.data);
          } catch (error) {
            console.error('Error during request:', error.message);
          }
        })
        .catch((error) => {
          if (error.isTtyError) {
          } else {
          }
        });
    });
    
    program
    .command('purchase-about-book ')
    .alias('pb')
    .description('purchase specific book using item number')
    .action(() => {
      inquirer
        .prompt(questionPurchase)
        .then(async (answers) => {
            try {
              const result = await axios.post(`http://localhost:8083/order-server/purch`,{id:answers.itemNumber,orderCost:answers.money})
              console.log('Response Data:', result.data);
            } catch (error) {
              console.error('Error during request:', error.message);
            }
        })
        .catch((error) => {
          if (error.isTtyError) {
          } else {
          }
        });
    });
  
  program.parse();