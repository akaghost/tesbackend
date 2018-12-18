/* tslint:disable */
import {
  Account
} from '../index';

declare var Object: any;
export interface TransactionInterface {
  "id"?: number;
  "accountid"?: number;
  "type"?: string;
  "amount"?: number;
  "date"?: Date;
  rel_account?: Account;
}

export class Transaction implements TransactionInterface {
  "id": number;
  "accountid": number;
  "type": string;
  "amount": number;
  "date": Date;
  rel_account: Account;
  constructor(data?: TransactionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Transaction`.
   */
  public static getModelName() {
    return "Transaction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Transaction for dynamic purposes.
  **/
  public static factory(data: TransactionInterface): Transaction{
    return new Transaction(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Transaction',
      plural: 'Transactions',
      path: 'Transactions',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "accountid": {
          name: 'accountid',
          type: 'number'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
      },
      relations: {
        rel_account: {
          name: 'rel_account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'accountid',
          keyTo: 'id'
        },
      }
    }
  }
}
