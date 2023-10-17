import { handlebars } from 'hbs';

const html = ``;

interface ContractToPrintProps {}

const ContractToPrint = (props: ContractToPrintProps) => {
  const template = handlebars.compile(html);
  return template(props);
};

export default ContractToPrint;
