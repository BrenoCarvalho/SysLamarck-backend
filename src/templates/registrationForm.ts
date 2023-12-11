import { handlebars } from 'hbs';
import { Tenant } from 'src/tenant/tenant.entity';

const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html{
            
        }

        body {
            font-family: monospace;
            font-size: 14px;
            min-height: 50vh;
        }

        .box {
            border: 1px solid #000;
            border-radius: 5px;
        } 
    </style>
</head>

<body>
    <div class="box">
        <p><b>Cód. Locador:</b> {{locator.id}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Nome Locador:</b> {{locator.fullName}}</p>
        <p><b>Endereço:</b> {{locator.address}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Bairro:</b> {{locator.district}}</p>
        <p><b>Cidade:</b> {{locator.city}}&nbsp;&nbsp;&nbsp;&nbsp;<b>CEP:</b> {{locator.cep}}</p>
        <p><b>Contato1:</b> {{locator.contact1}}&nbsp;&nbsp;&nbsp;<b>Contato2:</b>
            {{locator.contact2}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Email:</b> {{locator.email}}</p>
        <p><b>CPF:</b> {{locator.cpf}}&nbsp;&nbsp;&nbsp;&nbsp;<b>RG:</b>
            {{locator.rg}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Data de Nascimento:</b> {{locator.birthDate}}</p>
        <p><b>Tipo de Conta:</b> {{locator.accountType}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Banco:</b> {{locator.bank}}</p>
        <p><b>N° da Conta:</b> {{locator.accountNumber}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Agência:</b>
            {{locator.agency}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Aos Cuidados:</b> {{locator.paymentRemittance}}</p>
    </div>
    
    <div class="box">
        <p><b>Cód. Locatário:</b> {{property.propertyCode}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Nome Locatário:</b>
            {{tenant.fullName}}</p>
        <p><b>Endereço:</b> {{property.address}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Bairro:</b> {{property.district}}</p>
        <p><b>Cidade:</b> {{property.city}}&nbsp;&nbsp;&nbsp;&nbsp;<b>CEP:</b> {{property.cep}}</p>
        <p><b>Contato1:</b> {{tenant.contact1}}&nbsp;&nbsp;&nbsp;<b>Contato2:</b>
            {{tenant.contact2}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Email:</b> {{tenant.email}}</p>
        <p><b>CPF:</b> {{tenant.cpf}}&nbsp;&nbsp;&nbsp;&nbsp;<b>RG:</b> {{tenant.rg}}</p>
        <p><b>Data de Nascimento:</b> {{tenant.birthDate}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Profissão:</b> {{tenant.profession}}</p>
        <p><b>Tipo de Contrato: </b>{{contract.goal}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Início:
            </b>{{contract.start}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Término: </b>{{contract.end}}</p>
        <p><b>Aluguel Integral: </b>{{contract.integralValue}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Aluguel C/Desconto:
            </b>{{contract.leaseAmount}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Desconto: </b>{{contract.applyDiscount}}</p>
        <p><b>Dia de Pagamento: </b>{{contract.payday}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Tempo de Contrato:
            </b>{{contract.duration}}</p>
        <p><b>Reajuste: </b>{{contract.reajust}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Índice:</b> {{contract.index}}</p>
    </div>

    <div class="box">
        <p><b>Tipo de Fiança:</b> {{bail.type}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Nome Fiador:</b> {{bail.fullNameG1}}</p>
        <p><b>Endereço:</b> {{bail.addressG1}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Bairro:</b> {{bail.districtG1}}</p>
        <p><b>Cidade:</b> {{bail.cityG1}}&nbsp;&nbsp;&nbsp;&nbsp;<b>CEP:</b> {{bail.cepG1}}</p>
        <p><b>Contato1:</b> {{bail.contact1G1}}&nbsp;&nbsp;&nbsp;<b>Contato2:</b>
            {{bail.contact2G1}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Email:</b> {{bail.emailG1}}</p>
        <p><b>CPF:</b> {{bail.cpfG1}}&nbsp;&nbsp;&nbsp;&nbsp;<b>RG: </b>{{bail.rgG1}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Data
                de Nascimento:</b> {{bail.birthDateG1}}</p>
        <p><b>Nome do Cônjuge:</b> {{bail.spouseFullNameG1}}</p>
    </div>

    <div class="box">
        <p><b>Nome Fiador2:</b> {{bail.fullNameG2}}</p>
        <p><b>Endereço:</b> {{bail.addressG2}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Bairro:</b> {{bail.districtG2}}</p>
        <p><b>Cidade:</b> {{bail.cityG2}}&nbsp;&nbsp;&nbsp;&nbsp;<b>CEP:</b> {{bail.cepG2}}</p>
        <p><b>Contato1:</b> {{bail.contact1G2}}&nbsp;&nbsp;&nbsp;<b>Contato2:</b>
            {{bail.contact2G2}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Email:</b> {{bail.emailG2}}</p>
        <p><b>CPF:</b> {{bail.cpfG2}}&nbsp;&nbsp;&nbsp;&nbsp;<b>RG:</b> {{bail.rgG2}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Data
                de Nascimento: </b>{{birthDateG2}}</p>
        <p><b>Nome do Cônjuge: </b>{{bail.spouseFullNameG2}}</p>
        <p><b>EDP: </b>{{property.edpInstallation}}&nbsp;&nbsp;&nbsp;&nbsp;<b>RGI:
            </b>{{property.rgi}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Fornecimento:
            </b>{{property.supply}}&nbsp;&nbsp;&nbsp;&nbsp;<b>Data Seguro:</b></p>
    </div>
</body>
</html>`;

interface CustomTenantProps extends Omit<Tenant, 'birthDate'> {
  birthDate: string;
}

interface RegistrationFormProps {
  locator: {
    id: string;
    fullName: string;
    address: string;
    district: string;
    city: string;
    cep: string;
    contact1: string;
    contact2: string;
    email: string;
    cpf: string;
    rg: string;
    birthDate: string;
    accountType: string;
    bank: string;
    accountNumber: string;
    agency: string;
    paymentRemittance: string;
  };
  property: {
    propertyCode: string;
    rgi: string;
    edpInstallation: string;
    supply: string;
    address: string;
    district: string;
    city: string;
    cep: string;
  };
  contract: {
    goal: string;
    start: string;
    end: string;
    integralValue: string;
    leaseAmount: string;
    applyDiscount: string;
    payday: string;
    duration: string;
    reajust: string;
    index: string;
  };
  bail: {
    type: string;
    fullNameG1: string;
    addressG1: string;
    districtG1: string;
    cityG1: string;
    cepG1: string;
    contact1G1: string;
    contact2G1: string;
    emailG1: string;
    cpfG1: string;
    rgG1: string;
    birthDateG1: string;
    spouseFullNameG1: string;
    fullNameG2: string;
    addressG2: string;
    districtG2: string;
    cityG2: string;
    cepG2: string;
    contact1G2: string;
    contact2G2: string;
    emailG2: string;
    cpfG2: string;
    rgG2: string;
    birthDateG2: string;
    spouseFullNameG2: string;
  };
  tenant: CustomTenantProps;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const template = handlebars.compile(html);
  return template({
    ...props,
  });
};

export default RegistrationForm;
