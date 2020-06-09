import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const { income, outcome } = this.transactions.reduce(
      (accumlator: Balance, transation: Transaction) => {
        const accumlatorReturn = accumlator; // por causa do erro de resign
        switch (transation.type) {
          case 'income':
            accumlatorReturn.income += transation.value;
            break;
          case 'outcome':
            accumlatorReturn.outcome += transation.value;
            break;
          default:
            break;
        }

        return accumlatorReturn;
      },
      {
        // formato do objeto retornado
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    // TODO

    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
