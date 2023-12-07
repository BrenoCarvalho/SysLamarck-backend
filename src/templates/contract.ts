import { handlebars } from 'hbs';
import { Locator } from 'src/locator/locator.entity';
import { Property } from 'src/property/property.entity';
import { Bail } from 'src/tenant/contract/bail/bail.entity';
import { Contract } from 'src/tenant/contract/contract.entity';
import { Tenant } from 'src/tenant/tenant.entity';

const contracts = {
  withDiscount: {
    Comercial: {
      Calção: ``,
      Fiador: ``,
      'Título de capitalização': ``,
    },
    Residencial: {
      Calção: ``,
      Fiador: ``,
      'Título de capitalização': ``,
      'Termo de garantia': ``,
    },
  },
  withoutDiscount: {
    Comercial: {
      Calção: ``,
      Fiador: ``,
      'Título de capitalização': ``,
    },
    Residencial: {
      Calção: ``,
      Fiador: ``,
      'Título de capitalização': ``,
      'Termo de garantia': ``,
    },
  },
};

interface ContractToPrintProps {
  tenant: Tenant;
  property: Property;
  contract: Contract;
  bail: Bail;
  locator: Locator;
}

const ContractToPrint = (props: ContractToPrintProps) => {
  const html = props.contract.applyDiscount
    ? contracts.withDiscount[props.contract.goal][props.bail.type]
    : contracts.withoutDiscount[props.contract.goal][props.bail.type];

  const template = handlebars.compile(html);
  return template({ ...props });
};

export default ContractToPrint;
