/* tslint:disable */

declare var Object: any;
export interface AccountInterface {
  "id": number;
  "userid": number;
  "accountnumber": string;
}

export class Account implements AccountInterface {
  "id": number;
  "userid": number;
  "accountnumber": string;
  constructor(data?: AccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Account for dynamic purposes.
  **/
  public static factory(data: AccountInterface): Account{
    return new Account(data);
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
      name: 'Account',
      plural: 'Accounts',
      path: 'Accounts',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "userid": {
          name: 'userid',
          type: 'number'
        },
        "accountnumber": {
          name: 'accountnumber',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
