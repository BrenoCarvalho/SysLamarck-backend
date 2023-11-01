import { handlebars } from 'hbs';

const html = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        body,
        html {
          font: 11px normal, arial;
          margin: 0;
          padding: 0;
        }

        img {
            width: 150px;
          }

        p {
            margin-left: 5px;
        }

        .cabeca {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
        .containerItens {
          display: flex;
          justify-content: space-between;
        }
  
        .linha {
          width: 100%;
          margin: 5px 0px;
          border-bottom: 1px solid #000000;
          border-top: 1px solid #000000;
        }
  
        .linhaBaixo {
          width: 100%;
          border-bottom: 1px solid #000000;
        }
  
        .caixa {
          flex: 1;
          margin: 0 5px;
          border: 1px solid #000000;
        }
      </style>
</head>
<body>
    <header class="cabeca">
            <img src="https://i.imgur.com/Roi8Q9V.png" />
            <p>
              <b>FLUXO DE CAIXA PARA SIMPLES CONFERÊNCIA</b>
            </p>
    </header>
    <br/>
    <div class="linha">
        <p style="text-align: center;"> <b>Movimentações no Caixa</b>&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp; 
            <b>Data:</b> {{cashier.closedAt}}&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;
            <b>Horário do Fechamento:</b> {{cashier.name}}
        </p>
    </div>
    <div class="containerItens">
        <div>
          <p><b><u>HISTÓRICO</b></u></p>
          {{#each cashier.genericTransactions}}
            <p>{{this.description}}</p>
          {{/each}}
        </div>
        <div>
          <p><b><u>TIPO</b></u></p>
          {{#each cashier.genericTransactions}}
            <p>{{this.type}}</p>
          {{/each}}
        </div>
        <div>
          <p><b><u>VALOR</b></u></p>
          {{#each cashier.genericTransactions}}
            <p>{{this.amount}}</p>
          {{/each}}
        </div>
        <div>
          <p><b><u>FORMA DE PAGAMENTO</b></u></p>
          {{#each cashier.genericTransactions}}
            <p>{{this.formOfPayment}}</p>
          {{/each}}
        </div>
    </div>
    
    <div class="caixa">
        <div class="containerItens">
            <div>
                <p><b>SUBTOTAL:</b></p>
            </div>
            <div>
                <p><b>ENTRADAS - {{cashier.totalGenericTransactions.credit}}</b></p>
            </div>
            <div>
                <p><b>SAÍDAS - {{cashier.totalGenericTransactions.debit}}</b></p>
            </div>
        </div>
    </div>
    <br />
    <div class="linha">
        <p style="text-align: center;"> <b>Recebimento de Alugueis</b>
        </p>
    </div>
    <div class="containerItens">
        <div>
          <p><b><u>HISTÓRICO</b></u></p>
          {{#each cashier.rentTransactions}}
            <p>{{this.tenant.fullName}}</p>
          {{/each}}
        </div>
        <div>
          <p><b><u>TIPO</b></u></p>
          {{#each cashier.rentTransactions}}
            <p>{{this.type}}</p>
          {{/each}}
        </div>
        <div>
          <p><b><u>VALOR</b></u></p>
          {{#each cashier.rentTransactions}}
            <p>{{this.amount}}</p>
          {{/each}}
        </div>
        <div>
          <p><b><u>FORMA DE PAGAMENTO</b></u></p>
          {{#each cashier.rentTransactions}}
            <p>{{this.formOfPayment}}</p>
          {{/each}}
        </div>
    </div>
    <div class="caixa">
        <div class="containerItens">
            <div>
                <p><b>SUBTOTAL:</b></p>
            </div>
            <div>
                <p><b>ENTRADAS - {{cashier.totalRentTransactions.credit}}</b></p>
            </div>
            <div>
                <p><b>SAÍDAS - {{cashier.totalRentTransactions.debit}}</b></p>
            </div>
            
        </div>
    </div>
    <br />
    <div class="linhaBaixo">
      <p><b>TOTAL GERAL DO FLUXO DE CAIXA</b></p>  
    </div>
    <p><b>Total de <u>taxa de administração</u> sobre alugueis:</b> {{cashier.adiministrationFee}}</p>
    <p><b>Total de <u>entradas</u>:</b> {{cashier.totalCredit}}</p>
    <p><b>Total de <u>saídas</u>:</b> {{cashier.totalDebit}}</p>
    <p><b>SALDO FINAL:</b> {{cashier.balance}} </p>    
</body>
</html>
`;

interface GenericTransaction {
  description: string;
  type: string;
  amount: string;
  formOfPayment: string;
}

interface RentTransaction {
  tenant: {
    fullName: string;
  };
  type: string;
  amount: string;
  formOfPayment: string;
}

interface CashFlowReportProps {
  cashier: {
    closedAt: string;
    name: string;

    genericTransactions: GenericTransaction[];
    totalGenericTransactions: {
      debit: string;
      credit: string;
    };

    rentTransactions: RentTransaction[];
    totalRentTransactions: {
      debit: string;
      credit: string;
    };

    administrationFee: string;
    totalCredit: string;
    totalDebit: string;
    balance: string;
  };
}

const CashFlowReport = (props: CashFlowReportProps) => {
  const template = handlebars.compile(html);
  return template({
    ...props,
  });
};

export default CashFlowReport;
