import { handlebars } from 'hbs';

const htmlTenantVersion = `<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style media="print">
        @page {
            margin: 0;
            size: auto;
        }

        body {
            font: normal 12px Arial;
            margin: 0;
            padding: 0;

        }

        div,
        p {
            margin: 1px 0;
        }

        p {
            text-align: justify;

        }

        .linha {
            width: 100%;
            border-bottom: 1px solid #000000;
            border-top: 1px solid #000000;
        }

        .linhaBaixo {
            width: 100%;
            border-bottom: 1px solid #000000;

        }

        .cabeça {
            display: flex;
            align-items: center;
        }

        img {
            width: 100px;
        }
    </style>
</head>

<body>
    <header>
        <div class="cabeça">
            <img src="https://i.imgur.com/Roi8Q9V.png" />
            <p style="text-align: center;">Rua Dr. Carlos Autran N 15 - Centro, LORENA/SP. CEP. 12600-160 TEL .: (12)
                3152-1099 / 3152-1541 CRECI- 30558-J
            </p>
        </div>
    </header>
    <div class="linha">
        <p style="text-align: center;"> <b>RECIBO DE ALUGUEL</b></p>
    </div>
    <p><b>Locatário:</b> {{tenant.fullName}}</p>
    <p><b>Imóvel:</b> {{property.address}}</p>
    <p><b>Locador:</b> {{locator.fullName}}</p>
    <div class="linhaBaixo"></div>
    <p><b>Mês de Referência:</b> {{installment.referenceMonth}}</p>
    <p><b>Data de vencimento:</b> {{installment.dueDate}}</p>
    <p><b>Data Pagamento:</b> {{installment.paymentDate}}</p>
    <p><b>N° PARCELA:</b> {{installment.currentInstallment}}&nbsp;<b>CÓD:</b>{{property.propertyCode}}</p>
    <div class="linhaBaixo"></div>
    <p><b>Aluguel:</b> {{creditTransaction.rent}} <b>Desconto</b>: 10%</p>
    <p><b>IPTU:</b> {{creditTransaction.iptu}}</p>
    <p><b>Água:</b> {{creditTransaction.water}}</p>
    <p><b>Luz:</b> {{creditTransaction.eletricity}}</p>
    <p><b>Condomínio:</b> {{creditTransaction.condominium}}</p>
    <p><b>Imposto de renda:</b> {{creditTransaction.incomeTax}}</p>
    <p><b>Desconto especial:</b> {{creditTransaction.specialDiscount}}</p>
    <p><b>Multa recisória:</b> {{creditTransaction.breachOfContractFine}}</p>
    <p><b>Diversos:</b> {{creditTransaction.sundry}}</p>
    <div class="linha">
        <p style="text-align: center;"> <b>TOTAL: {{creditTransaction.amount}}</b></p>
    </div>
</body>

</html>`;

const htmlLocatorVersion = `<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style media="print">
    @page {
      margin: 0;
      size: auto;
    }

    body,
    html {
      font: 11px normal, arial;
      margin: 0;
      padding: 0;
    }

    div,
    p {
      margin: 1px 0;
    }

    img {
      width: 100px;
    }

    p {
      margin-left: 5px;
    }

    .cabeca {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .container {
      padding: 0;
      margin: 0;
      height: 50vh;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .section {
      flex: 1;
      max-width: 49%;
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
  <div class="container">
    <section class="section">
      <header class="cabeca">
        <img src="https://i.imgur.com/Roi8Q9V.png" />
        <p>
          Rua Dr. Carlos Autran N 15 - Centro, LORENA/SP. CEP. 12600-160 TEL
          .: (12) 3152-1099 / 3152-1541 CRECI- 30558-J
        </p>
      </header>
      <div class="linha">
        <p style="text-align: center"><b>EXTRATO MENSAL</b></p>
      </div>
      <p><b>Locador:</b> {{locator.fullName}}</p>
      <p><b>Imóvel:</b> {{property.address}}</p>
      <p><b>Locatário:</b> {{tenant.fullName}}</p>
      <div class="linhaBaixo"></div>
      <p><b>Mês de Referência:</b> {{installment.referenceMonth}} / <b>Data de vencimento:</b> {{installment.dueDate}}
      </p>
      <p><b>Data Pagamento:</b> {{installment.paymentDate}} / <b>N° PARCELA:</b> {{installment.currentInstallment}} /
        <b>CÓD:</b>{{property.propertyCode}}</p>
      <div class="linha">
        <p style="text-align: center"><b>IDENTIFICAÇÃO DOS ITENS</b></p>
      </div>
      <div class="containerItens">
        <div>
          <p><b><u>CRÉDITO</b></u></p>
          <p><b>Aluguel:</b> {{creditTransaction.rent}}</p>
          <p><b>IPTU:</b> {{creditTransaction.iptu}}</p>
          <p><b>Água:</b> {{creditTransaction.water}}</p>
          <p><b>Luz:</b> {{creditTransaction.eletricity}}</p>
          <p><b>Condomínio:</b> {{creditTransaction.condominium}}</p>
          <p><b>Imposto de renda:</b> {{creditTransaction.incomeTax}}</p>
          <p><b>Diversos*:</b> {{creditTransaction.sundry}}</p>
          <p><b>Multa recisória:</b> {{creditTransaction.breachOfContractFine}}</p>
        </div>
        <div>
          <p><b><u>DÉBITO</b></u></p>
          <p><b>IPTU:</b> {{debitTransaction.iptu}}</p>
          <p><b>Água:</b> {{debitTransaction.water}}</p>
          <p><b>Luz:</b> {{debitTransaction.eletricity}}</p>
          <p><b>Condomínio:</b> {{debitTransaction.condominium}}</p>
          <p><b>Imposto de renda:</b> {{debitTransaction.incomeTax}}</p>
          <p><b>Diversos*:</b> {{debitTransaction.sundry}}</p>
          <p><b>Taxa ADM:</b> {{debitTransaction.administrationFee}}</p>
          <p><b>Taxa Locação:</b> {{debitTransaction.rentalFee}}</p>
        </div>
      </div>
      <br />
      <div class="containerItens">
        <div class="caixa">
          <p>{{creditTransaction.sundryDescription}}</p>
        </div>
        <div class="caixa">
          <p>{{debitTransaction.sundryDescription}}</p>
        </div>
      </div>
      <div class="linha">
        <p style="text-align: center"><b>TOTAL CRÉDITO:</b> {{creditTransaction.amount}}</p>
        <p style="text-align: center"><b>TOTAL DÉBITO:</b> {{debitTransaction.amount}}</p>
        <p style="text-align: center"><b>SALDO:</b> {{creditTransaction.amount}} - {{debitTransaction.amount}}</p>
      </div>
      <br />
      <div class="caixa">
        <p style="text-align: center">
          <b>BANCO:</b> {{locator.bank}} / <b>AGÊNCIA:</b> {{locator.agency}} /
          <b>CONTA:</b> {{locator.accountNumber}}
        </p>
      </div>
    </section>
    <section class="section">
      <header class="cabeca">
        <img src="https://i.imgur.com/Roi8Q9V.png" />
        <p>
          Rua Dr. Carlos Autran N 15 - Centro, LORENA/SP. CEP. 12600-160 TEL
          .: (12) 3152-1099 / 3152-1541 CRECI- 30558-J
        </p>
      </header>
      <div class="linha">
        <p style="text-align: center"><b>EXTRATO MENSAL</b></p>
      </div>
      <p><b>Locador:</b> {{locator.fullName}}</p>
      <p><b>Imóvel:</b> {{property.address}}</p>
      <p><b>Locatário:</b> {{tenant.fullName}}</p>
      <div class="linhaBaixo"></div>
      <p><b>Mês de Referência:</b> {{installment.referenceMonth}} / <b>Data de vencimento:</b> {{installment.dueDate}}
      </p>
      <p><b>Data Pagamento:</b> {{installment.paymentDate}} / <b>N° PARCELA:</b> {{installment.currentInstallment}} /
        <b>CÓD:</b>{{property.propertyCode}}</p>
      <div class="linha">
        <p style="text-align: center"><b>IDENTIFICAÇÃO DOS ITENS</b></p>
      </div>
      <div class="containerItens">
        <div>
          <p><b><u>CRÉDITO</b></u></p>
          <p><b>Aluguel:</b> {{creditTransaction.rent}}</p>
          <p><b>IPTU:</b> {{creditTransaction.iptu}}</p>
          <p><b>Água:</b> {{creditTransaction.water}}</p>
          <p><b>Luz:</b> {{creditTransaction.eletricity}}</p>
          <p><b>Condomínio:</b> {{creditTransaction.condominium}}</p>
          <p><b>Imposto de renda:</b> {{creditTransaction.incomeTax}}</p>
          <p><b>Diversos*:</b> {{creditTransaction.sundry}}</p>
          <p><b>Multa recisória:</b> {{creditTransaction.breachOfContractFine}}</p>
        </div>
        <div>
          <p><b><u>DÉBITO</b></u></p>
          <p><b>IPTU:</b> {{debitTransaction.iptu}}</p>
          <p><b>Água:</b> {{debitTransaction.water}}</p>
          <p><b>Luz:</b> {{debitTransaction.eletricity}}</p>
          <p><b>Condomínio:</b> {{debitTransaction.condominium}}</p>
          <p><b>Imposto de renda:</b> {{debitTransaction.incomeTax}}</p>
          <p><b>Diversos*:</b> {{debitTransaction.sundry}}</p>
          <p><b>Taxa ADM:</b> {{debitTransaction.administrationFee}}</p>
          <p><b>Taxa Locação:</b> {{debitTransaction.rentalFee}}</p>
        </div>
      </div>
      <br />
      <div class="containerItens">
        <div class="caixa">
          <p>{{creditTransaction.sundryDescription}}</p>
        </div>
        <div class="caixa">
          <p>{{debitTransaction.sundryDescription}}</p>
        </div>
      </div>
      <div class="linha">
        <p style="text-align: center"><b>TOTAL CRÉDITO:</b> {{creditTransaction.amount}}</p>
        <p style="text-align: center"><b>TOTAL DÉBITO:</b> {{debitTransaction.amount}}</p>
        <p style="text-align: center"><b>SALDO:</b> {{creditTransaction.amount}} - {{debitTransaction.amount}}</p>
      </div>
      <br />
      <div class="caixa">
        <p style="text-align: center">
          <b>BANCO:</b> {{locator.bank}} / <b>AGÊNCIA:</b> {{locator.agency}} /
          <b>CONTA:</b> {{locator.accountNumber}}
        </p>
      </div>
    </section>
  </div>
</body>

</html>`;

interface RentReceiptDefaultProps {
  tenant: {
    fullName: string;
  };
  locator: {
    fullName: string;
  };
  property: {
    address: string;
    propertyCode: string;
  };
  installment: {
    referenceMonth: string;
    dueDateMonth: string;
    dueDate: string;
    paymentDate: string;
    currentInstallment: string;
  };
}

interface CreditTransaction {
  amount: string;
  rent: string;
  iptu: string;
  water: string;
  eletricity: string;
  condominium: string;
  incomeTax: string;
  specialDiscount: string;
  breachOfContractFine: string;
  sundry: string;
  sundryDescription: string;
}

interface RentReceiptForTenantProps extends RentReceiptDefaultProps {
  creditTransaction: CreditTransaction;
}

interface RentReceiptForLocatorProps extends RentReceiptDefaultProps {
  creditTransaction: CreditTransaction;
  debitTransaction: {
    amount: string;
    water: string;
    rent: string;
    eletricity: string;
    iptu: string;
    incomeTax: string;
    condominium: string;
    administrationFee: string;
    leaseFee: string;
    sundry: string;
    sundryDescription: string;
  };
}

const RentReceiptForTenant = (props: RentReceiptForTenantProps) => {
  const template = handlebars.compile(htmlTenantVersion);
  return template(props);
};

const RentReceiptForLocator = (props: RentReceiptForLocatorProps) => {
  const template = handlebars.compile(htmlLocatorVersion);
  return template(props);
};

export { RentReceiptForTenant, RentReceiptForLocator, RentReceiptDefaultProps };
