'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));
const DATASOURCE_NAME = 'training';
const dataSourceConfig = require('./datasources.json');
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);

discover().then(
    success => process.exit(),
    error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1); },
);

async function discover() {
    // It's important to pass the same "options" object to all calls
    // of dataSource.discoverSchemas(), it allows the method to cache
    // discovered related models
    const options = { relations: true };

    // Discover models and relations
    const transaction = await db.discoverSchemas('transaction', options);
    const account = await db.discoverSchemas('account', options);
   

    // console.log(inventorySchemas)
    // Create model definition files
    await mkdirp('../common/models');

    await writeFile(
        '../common/models/transaction.json',
        JSON.stringify(transaction['training.transaction'], null, 2)
    );

    await writeFile(
        '../common/models/account.json',
        JSON.stringify(account['training.account'], null, 2)
    );

    

    // Expose models via REST API
    const configJson = await readFile('./model-config.json', 'utf-8');
    console.log('MODEL CONFIG', configJson);
    const config = JSON.parse(configJson);
    config.Transaction = { dataSource: DATASOURCE_NAME, public: true };
    config.Account = { dataSource: DATASOURCE_NAME, public: true };
   
    // config.Product = { dataSource: DATASOURCE_NAME, public: true };
    await writeFile(
        './model-config.json',
        JSON.stringify(config, null, 2)
    );
}