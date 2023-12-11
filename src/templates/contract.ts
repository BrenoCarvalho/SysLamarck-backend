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
      Fiador: `<!DOCTYPE html>
      <html lang="pt-br">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font: normal 12px Arial;
            padding-left: 25px;
          }
      
          p {
            text-align: justify;
      
          }
      
          h2 {
            text-align: center;
          }
      
          .box {
            border: 1px solid #000;
            display: flex;
            align-items: center;
          }
      
          .sign_section {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
      
            margin-bottom: 100px;
          }
      
          .sign_block {
            max-width: 45%;
            flex: 1;
      
            text-align: center;
          }
      
          img {
            width: 200px;
          }
        </style>
      </head>
      
      <body>
        <header>
          <div class="box">
            <img src="https://i.imgur.com/Roi8Q9V.png" />
            <p style="text-align: center;">{{#if provisionServiceIsImobiliaria}}IMOBILIÁRIA LAMARCK
              LTDA.
              CRECI – 30558-J CÓD.: {{property.propertyCode}} {{else}}LEOMAR DENIS
              GONÇALVES
              CRECI – 19.117 CÓD.: {{property.propertyCode}}{{/if}}</p>
            <p style="text-align: center;">RUA DR. CARLOS AUTRAN NO 15, CENTRO, LORENA/SP. CEP. 12600-160 TEL .: (12)
              3152-1099 / 3152-1541
            </p>
          </div>
        </header>
      
        <h2><u><b>CONTRATO DE LOCAÇÃO</b></u></h2>
      
        <p>Os signatários deste instrumento, de um lado, e assim denominado, como:</p>
      
        <div class="box">
          <p>{{#if provisionServiceIsImobiliaria}}<b><u>LOCADOR(A,ES):</b></u> <b>{{locator.fullName}}</b>, brasileiro(a),
            {{locator.maritalStatus}}, {{locator.profession}},
            portador(a) da
            cédula de identidade sob o RG – {{locator.rg}}, inscrito(a) no CPF/MF – {{locator.cpf}}, neste ato representado
            por <b>IMOBILIÁRIA
              LAMARCK LTDA. - ME</b>, inscrita no CNPJ/MF – 27.149.867/0001-60, neste ato representada por suas sócias
            <b>LUIZA LEITE GONÇALVES</b>, brasileira, solteira, corretora de imóveis, registrada no CRECI sob nº 30558-J,
            portadora da cédula de identidade sob o RG - 32.992.946-X, inscrita no CPF/MF - 357.621.188-86 e <b>GLAUCIA
              BARBOSA LEITE GONÇALVES</b>, brasileira, casada corretora de imóveis, registrada no CRECI sob nº 30558-J,
            portadora da cédula de identidade sob o RG – 9.713.757, inscrita no CPF/MF – 975.382.058-53, estabelecida
            comercialmente à Rua Dr. Carlos Autran, nº. 15, Centro, Lorena/SP.{{else}}<b><u>LOCADOR(A,ES):</b></u>
            <b>{{locator.fullName}}</b>, brasileiro(a), {{locator.maritalStatus}},
            {{locator.profession}}, portador(a) da
            cédula de identidade sob o RG – {{locator.rg}}, inscrito(a) no CPF/MF – {{locator.cpf}}, neste ato representado
            por seu
            procurador Sr. <b>LEOMAR DENIS GONÇALVES</b>, brasileiro, casado, corretor de imóveis, registrado no CRECI
            sob nº 19.117, portador da cédula de identidade sob o RG – 8.471.637, inscrito no CPF/MF – 435.922.447-87,
            estabelecido comercialmente a Rua Dr. Carlos Autran, nº. 15, Centro, Lorena/SP.{{/if}}
          </p>
        </div>
      
        <p>e de outro, de agora em diante, denominado:</p>
      
        <div class="box">
          <p><b><u>LOCATÁRIO(A,S):</b></u> <b>{{tenant.fullName}}</b>, brasileiro(a), {{tenant.maritalStatus}},
            {{tenant.profession}}, portador(a) da cédula de identidade sob o RG – {{tenant.rg}}, inscrito(a) no CPF/MF –
            {{tenant.cpf}}, email: {{tenant.email}}.{{#if haveTwoTenant}}e<b>{{tenant.fullNameT2}}</b>,
            brasileiro(a), {{tenant.maritalStatusT2}}, {{tenant.professionT2}}, portador(a) da cédula de identidade sob o RG –
            {{tenant.rgT2}},
            inscrito(a) no CPF/MF – {{tenant.cpfT2}}, email: {{tenant.email}}.{{/if}}</p>
        </div>
      
        </br>
      
        <div class="box">
          <p>{{#if haveOneFiadorSemEsposa}}<b><u>FIADOR(A,ES):</u></b> <b>{{bail.fullNameG1}}</b>, brasileiro(a),
            {{bail.maritalStatusG1}}, {{bail.professionG1}},
            portador(a) da cédula de identidade sob o RG – {{bail.rgG1}}, inscrito(a) no CPF/MF – {{bail.cpfG1}}, email:
            {{bail.emailG1}}, residente e domiciliado à {{bail.addressG1}} – {{bail.districtG1}}, na cidade de
            {{bail.cityG1}}, CEP:
            {{bail.cepG1}}.{{else}}<b><u>FIADOR(A,ES):</b></u> <b>{{bail.fullNameG1}}</b>,
            brasileiro(a), {{bail.maritalStatusG1}}, {{bail.professionG1}},
            portador(a) da cédula de identidade sob o RG – {{bail.rgG1}}, inscrito(a) no CPF/MF – {{bail.cpfG1}}, email:
            {{bail.emailG1}} e s/m <b>{{bail.spouseFullNameG1}}</b>, brasileira, {{bail.spouseMaritalStatusG1}},
            {{bail.spouseProfessionG1}},
            portadora da cédula de identidade sob o RG – {{bail.spouseRgG1}}, inscrita no CPF/MF – {{bail.spouseCpfG1}}, ambos
            residentes e domiciliados à {{bail.addressG1}} – {{bail.districtG1}}, na cidade de {{bail.cityG1}}, CEP:
            {{bail.cepG1}}.{{/if}}</p>
        </div>
      
        <p>Têm justo e contratado a locação do:</p>
      
        <div class="box">
          <p><b>IMÓVEL RESIDENCIAL</b>, sito à {{property.address}} – {{property.district}}, CEP – {{property.cep}}, nesta
            cidade de Lorena/SP.</p>
        </div>
      
        <p>Conforme as cláusulas e condições seguintes:</p>
      
        <p><b><u>PRIMEIRA:</u></b> O presente contrato de locação se regerá pela Lei nº. 8245/91 com alterações introduzidas
          pela Lei nº. 12.112/09.</p>
      
        <p><b><u>SEGUNDA:</u></b> O imóvel objeto desta locação, destina-se única e exclusivamente ao uso <b>RESIDENCIAL</b>,
          não podendo, a sua destinação, ser mudada sem o consentimento por escrito do Locador, sob pena de cometer infração
          legal e contratual;</p>
      
        <p><b><u>TERCEIRA:</u></b> O prazo do presente contrato é de <b>{{contract.duration}} (VALOR POR EXTENSO) MESES</b> a
          iniciar
          em <b>{{contract.start}}</b> e a terminar em <b>{{contract.end}}</b>, data em que o Locatário se obriga a restituir
          o imóvel
          completamente desocupado nas condições previstas neste contrato e conforme Laudo de Vistoria que faz parte
          integrante deste contrato, independente de qualquer aviso judicial ou extra judicial, ficando desde logo notificado.
          Permanecendo o LOCATÁRIO no imóvel após escoado o prazo para a desocupação voluntária, nos casos de denúncia
          condicionada, pagará ele o aluguel-pena que vier a ser arbitrado na notificação premonitória, na forma do que dispõe
          a legislação em vigor;</p>
      
        <p><b><u>QUARTA:</u></b> O aluguel mensal é de <b>R$ {{contract.integralValue}} (VALOR POR EXTENSO)</b>, e será
          reajustado
          anualmente pelo índice acumulado do <b>IGP-M (FGV)</b>, que sendo pago até seu vencimento, dia
          <b>{{contract.payday}} (VALOR
            POR EXTENSO)</b> de cada mês subsequente ao vencido, a na Imobiliária Lamarck, mediante a apresentação do último
          recibo do Condomínio quitado, quando houver, será concedido ao Locatário o desconto especial de 10% (Dez por cento).
          Sendo extinto o índice de reajuste ora adotado, o(a,s) locador(a,es) poderá(ao) escolher um outro, dentre os
          permitidos pela legislação em vigor à época;
        </p>
      
        <p><b><u>QUINTA:</u></b> Na hipótese de a Legislação pátria permitir reajuste em periodicidade inferior a anual, será
          esta, aplicada ao presente contrato tão logo a referida lei entre em vigor;</p>
      
        <p><b><u>SEXTA:</u></b> Os reajustes do aluguel ora pactuado se farão na forma estabelecida, independentemente de
          qualquer aviso ou notificação, prevalecendo referidos reajustes até a efetiva desocupação do imóvel, com a retomada
          da posse pelo(a,s) locador(a,es);</p>
      
        <p><b><u>SÉTIMA:</u></b> Se o(a,s) Locatário(a,s) não efetuar(em) o pagamento até o dia <b>{{contract.payday}} (VALOR
            POR
            EXTENSO)</b> de cada mês subsequente ao vencido, o(a,s) mesmo(a,s) perderá(ão) o desconto de 10% (Dez por cento) e
          se o atraso for superior a 30 (trinta) dias o(a,s) LOCATÁRIO(A,S) pagará(ão) juros de 0,5% (meio por cento) ao mês e
          atualização monetária em conformidade com a legislação em vigor, podendo neste caso, a Administradora, registrar o
          débito no SCPC (Serviço Central de Proteção ao Crédito) e enviar o débito para cobrança judicial, respondendo o(a,s)
          LOCATÁRIO(A,S) pelos honorários advocatícios e custas processuais e quando as responsabilidades do(a,s)
          LOCATÁRIO(A,S) e FIADOR(A,ES), não cumpridas nos prazos estipulados, forem liquidadas amigavelmente, perante
          intervenção dos advogados do(a,s) LOCADOR(A,ES), ficam os mesmos obrigados ao pagamento de 10% (dez por cento) sobre
          e valor do débito;</p>
      
        <p><b><u>OITAVA:</u></b> O recebimento fora do prazo acordado sem os encargos supramencionado será mera tolerância do
          Locador, sem que signifique revogação de qualquer cláusula contratual e sem evocar novação;</p>
      
        <p><b><u>NONA:</u></b> Mensal e juntamente com o aluguel serão pagas pelo Locatário as taxas referentes ao condomínio,
          quando houver sendo que as mesmas estarão sujeitas a correção quando necessário;</p>
      
        <p><b><u>DÉCIMA:</u></b> Os impostos municipais (I.P.T.U.) serão pagos pelo Locatário juntamente com o aluguel;</p>
      
        <p><b><u>DÉCIMA PRIMEIRA:</u></b> Os consumos de água e luz, assim como todos os encargos, condomínio e tributos que
          incidam ou venham a incidir sobre o imóvel, conservação, seguro com cobertura contra incêndio, raios, vendaval e
          perdas com aluguel e outras decorrentes de lei, assim como suas respectivas majorações, ficam a cargo do Locatário e
          seu não pagamento na época determinada acarretará a rescisão deste contrato;</p>
      
        <p><b><u>DÉCIMA SEGUNDA:</u></b> Não é permitida a transferência deste contrato, nem a sublocação, cessão ou
          empréstimo total ou parcial do imóvel, sem prévio consentimento por escrito do Locador. Igualmente não permitido
          fazer modificações ou transformações no imóvel, sem prévia autorização por escrito do Locador;</p>
      
        <p><b><u>DÉCIMA TERCEIRA:</u></b> Fica estipulada a multa de 03 (três) aluguéis brutos vigentes na qual incorrerá a
          parte que infringir qualquer cláusula deste contrato com a faculdade, para a parte inocente, de poder considerar
          simultaneamente rescindida a locação independentemente de qualquer formalidade. Fica estipulada ainda igual multa
          para os casos de rescisão antecipada da locação aplicável segundo a proporção prevista na Lei nº. 12.112/09;</p>
      
        <p><b><u>DÉCIMA QUARTA:</u></b> O(a,s) Locatário(a,s) fica(m) desde logo obrigado(a,s) a transferir ou pedir ligação
          para o seu nome , junto as concessionárias de energia elétrica e água, dentro de 3 (três) dias a contar desta data,
          arcando com as despesas decorrentes, bem como, por eventuais prejuízos pela demora de tal providência. Fica pactuado
          ainda, que o(a,s) locatário(a,s), no final do contrato, deverá(ão) providenciar junto as concessionárias de consumo,
          o desligamento de tais serviços e o cancelamento das titularidades, apresentando os respectivos protocolos de
          cancelamento e as 03 (três) últimas contas pagas no ato da entrega das chaves;</p>
      
        <p><b><u>DÉCIMA QUINTA:</u></b> O Locatário, salvo as obras que importem na segurança do imóvel, obriga-se por todas
          as outras, devendo trazer o imóvel locado em boas condições de higiene e limpeza, com os aparelhos sanitários e de
          iluminação, papéis, vidraças, mármores, fechos, fechaduras, torneiras, pias, banheiros, ralos e demais acessórios em
          perfeito estado de conservação e funcionamento, para assim restituí-los quando findo ou rescindido este contrato sem
          direito a retenção ou indenização por quaisquer benfeitorias ou edificações, ainda que necessárias, as quais ficarão
          desde logo incorporadas ao imóvel;</p>
      
        <p><b><u>DÉCIMA SEXTA:</u></b> O(A,S) Locatário(a,s) é(são) responsável(eis) pela integridade, conservação e
          manutenção dos ítens relacionados no Relatório de Vistoria em anexo;</p>
      
        <p><b><u>DÉCIMA SÉTIMA:</u></b> Fica(m) o(s) LOCATÁRIO(S) desde já ciente do estado em que se encontra o imóvel ora
          locado, correndo pôr sua conta todos os gastos necessários com reparos, consertos ou melhoramentos a serem
          executados no imóvel durante a locação, sem direito a qualquer indenização, reembolso ou retenção;</p>
      
        <p><b><u>DÉCIMA OTIVA:</u></b> O(s) Locatário(s), obriga(m)-se neste ato, a segurar imóvel contra fogo pelo valor
          arbitrado pela CIA seguradora, extraindo a apólice em nome do Locador;</p>
      
        <p><b><u>DÉCIMA NONA:</u></b> Fica expressamente proibido a aplicação de produtos químicos, em especial a cera do tipo
          “Brilho Fácil” ou similar no piso do imóvel que venham a deteriorar ou alterar a tonalidade do mesmo, sendo
          constatado a aplicação no final da locação, arcará o(a) LOCATÁRIO(A) com toda a despesa necessária para a remoção do
          produto;</p>
      
        <p><b><u>VIGÉSIMA:</u></b> O(A,S) Locatário(a,s), não poderá(ão) instalar antena para rádio, TV, ou outro instrumento
          qualquer, no telhado do imóvel;</p>
      
        <p><b><u>VIGÉSIMA PRIMEIRA:</u></b> O(s) LOCATÁRIO(S) não pode(rão) modificar a estrutura e dimensões do imóvel locado
          e nem fazer modificação alguma, sem prévio consentimento, pôr escrito, do(s) LOCADOR(ES) a quem ficarão pertencendo
          desde logo, todas e quaisquer benfeitorias e melhoramentos feitas pelo(s) LOCATÁRIO(S), que não terá direito a
          qualquer indenização ou retenção do imóvel, sob pena de responder pela competente ação de despejo, pôr infração
          legal e contratual;</p>
      
        <p><b><u>VIGÉSIMA SEGUNDA:</u></b> Obriga(m)-se o(a,s) Locatário(a,s) no curso da locação, a satisfazer a todas as
          exigências dos Poderes Públicos a que der causa, não motivando ele à rescisão deste contrato;</p>
      
        <p><b><u>VIGÉSIMA TERCEIRA:</u></b> No caso de desapropriação do imóvel locado, ficará o Locador desobrigado por todas
          as cláusulas deste contrato, ressalvado ao Locatário, a defesa de seus direitos junto ao Poder Público atuante;</p>
      
        <p><b><u>VIGÉSIMA QUARTA:</u></b> O(A,S) Locatário(a,s) desde já faculta(m) ao(s) Locador(a,es) ou a Imobiliária
          Lamarck a examinar(em) ou vistoriar(em) o imóvel locado quando entender(em) conveniente, com prévio aviso a(ao,s)
          Locatário(a,s);</p>
      
        <p><b><u>VIGÉSIMA QUINTA:</u></b> O(A,S) Locatário(a,s) fica(m) obrigado(a,s) a controlar(em) o recebimento do Imposto
          Predial, condomínios e taxas, bem como, todas e quaisquer notificações e comunicações dos Poderes Públicos que forem
          entregues no imóvel locado, sob pena de ocorrerem por sua conta as perdas de abatimentos, descontos, majorações,
          acréscimos e/ou multas que venham ocorrer sobre os mesmos;</p>
      
        <p><b><u>VIGÉSIMA SEXTA:</u></b> Nenhuma intimação do Serviço Sanitário será motivo para o Locatário abandonar o
          imóvel ou pedir rescisão deste contrato, salvo procedendo vistoria judicial, que apure estar a construção ameaçando
          ruir;</p>
      
        <p><b><u>VIGÉSIMA SÉTIMA:</u></b> Quaisquer estragos ocasionados ao imóvel e suas instalações, bem como despesas que o
          proprietário for obrigado por eventuais modificações feitas no imóvel, pelo locatário, não ficam compreendidas na
          multa da cláusula 13ª (décima terceira), mas serão pagas a parte;</p>
      
        <p><b><u>VIGÉSIMA OITAVA:</u></b> O(a,s) Locatário(a,s) é(são) obrigado(s) a respeitar(em) os direitos de vizinhança,
          evitando a prática de quaisquer atos que venham a perturbar a tranqüilidade e as condições de saúde pública, bem
          como a observar o regulamento do edifício e respectiva convenção de condomínio, quando houver;</p>
      
        <p><b><u>VIGÉSIMA NONA:</u></b> O(A,S) FIADOR(ES) assinam o presente contrato de locação, na qualidade de fiadores e
          principais pagadores, solidariamente com o(a) LOCATÁRIO(A) por todas as obrigações desta locação, assumindo plena
          responsabilidade pelo exato e pontual pagamento doa aluguéis e encargos, bem como, de todas as demais obrigações,
          inclusive quanto a conservação do imóvel e seus pertences, multas e etc., responsabilidade essa que somente cessará
          com a efetiva restituição do imóvel locado ao(a,s) locador(a,es) e que perdurará, portanto mesmo quando findo o
          prazo do presente contrato, motivo pelo qual o (a,s) fiador(a,es), desde logo, renúncia(m) aos benefício previstos
          nos artigos 821, 834, 835, 837, 838 e 839 do Código Civil em vigor;</p>
      
          {{#if haveBailPropertyG1}}<p><b><u>PARÁGRAFO PRIMEIRO:</u></b> O (a,s) fiador (a,as,es) como, suporte à fiança prestada e prove de sua
            capacidade financeira, declara(m) ser proprietário (a,s) do(s) seguinte(s) imóvel(eis):
            {{bail.bailPropertyAddressG1}},
            na cidade de {{bail.bailPropertyCityG1}}, devidamente registrado no Cartório de Registro de Imóveis da cidade de
            {{bail.bailPropertyCityG1}}, sob a Matrícula nº {{bail.bailPropertyRegistrationNumberG1}}.</p>{{/if}}
        
            {{#if haveBailPropertyG2}}<p><b><u>PARÁGRAFO PRIMEIRO:</u></b> O (a,s) fiador (a,as,es) como, suporte à fiança prestada e prove de sua
              capacidade financeira, declara(m) ser proprietário (a,s) do(s) seguinte(s) imóvel(eis):
              {{bail.bailPropertyAddressG2}},
              na cidade de {{bail.bailPropertyCityG2}}, devidamente registrado no Cartório de Registro de Imóveis da cidade de
              {{bail.bailPropertyCityG2}}, sob a Matrícula nº {{bail.bailPropertyRegistrationNumberG2}}.</p>{{/if}}
      
        <p><b><u>PARÁGRAFO SEGUNDO:</u></b> O(a,s) fiador(a,as,es) responsabiliza(m)-se civil e criminalmente pela declaração
          de seu estado civil, bem como, pela declaração de que não mantem qualquer relacionamento que possa ser considerado
          como união estável e que possa diminuir a garantia prestada à locação ora pactuada.</p>
      
        <p><b><u>PARÁGRAFO TERCEIRO:</u></b> A moratória eventualmente concedida ao (ão,s,) locatário(a,s) pelo(a,s)
          locador(a,es), ainda que sem o consentimento do(a,s) fiador(a,es), não o(a,s) desobrigará(ã,o) das responsabilidades
          ora assumidas, tão pouco as composições amigáveis de majorações do aluguel entre locador(a,es) e locatário(a,s), ou
          ainda eventual parcelamento de dívida deste(a,s), sem o consentimento do(a,s) fiador(a,es), o(a,s) exonerará(ão) da
          fiança, motivo pelo qual renuncia(m), também aos benefícios previstos nos incisos I e III do Art. 838 do Código
          Civil.</p>
      
        <p><b><u>TRIGÉSIMA:</u></b> No caso de morte, falência, insolvência ou mudança de domicílio do(a,s) FIADOR(A,ES),
          o(a,s) Locatário(a,s) se obriga(m), a dar substituto idôneo, a juízo do(a,s) Locador(a,es), no prazo máximo de 30
          (TRINTA) dias contados daqueles eventos, sob pena de ficar rescindido o presente contrato;</p>
      
        <p><b><u>TRIGÉSIMA PRIMEIRA:</u></b> O(A,S) Locatário(a,s) nomeia(m) e constitui(em) o(a,s) fiador(a,es),
          solidário(a,s) e principal(ais) pagador(es), como seu(s) procurador(es), com os poderes da Cláusula “Ad-judícia”
          para receberem citações, inclusive pelo correio, via postal, aviso, intimações, contestar ações, confessar,
          transigir, entregar o imóvel e constituir advogado para acompanhar quaisquer ações relacionadas com o presente
          contrato. A renovação ou renúncia da procuração ora outorgada implicará necessariamente na rescisão do presente
          contrato e na incidência do Locatário no pagamento da multa contratual e demais obrigações nas quais são solidários
          os fiadores. Se o Locatário for casado, o cônjuge fica constituído o seu bastante procurado com idênticos poderes
          outorgados aos Fiadores, independentemente da ordem estabelecida;</p>
      
        <p><b><u>TRIGÉSIMA SEGUNDA:</u></b> O Locatário se obriga a entregar o imóvel interna e externamente no término da
          locação, limpo e com o lixo posto fora, caso contrário serão devolvidas as chaves para a referida limpeza e o
          aluguel será cobrado até a entrega definitiva das chaves;
        </p>
      
        <p><b><u>TRIGÉSIMA TERCEIRA:</u></b> Para a devolução do imóvel, o(a,s) Locatário(a,s), deverá(m) comunicar por
          escrito a Locadora, com 30 (trinta) dias de antecedência, à data da devolução do imóvel e apresentar as 03 (três)
          últimas contas quitadas referentes ao consumo de água, energia elétrica e despesas de condomínio, sendo que o
          aluguel e encargos locatícios continuará a correr pôr conta do(a,s) Locatário(a,s) até que este devolva o referido
          imóvel nas condições previstas neste contrato e conforme Relatório de Vistoria que faz parte integrante deste
          contrato;</p>
      
        <p><b><u>TRIGÉSIMA QUARTA:</u></b> Tudo quanto for devido em razão deste contrato e que não comportem processo
          executivo será cobrado em ação competente, ficando a cargo do devedor, em qualquer caso, os honorários do advogado
          que o credor constituir para ressalva dos seus direitos;</p>
      
        <p><b><u>TRIGÉSIMA QUINTA:</u></b> O imóvel objeto deste contrato está sendo entregue recém pintado internamente em
          tinta látex de boa qualidade, obrigando-se o(a) LOCATÁRIO(A), antes da entrega definitiva das chaves, a restituí-lo
          da mesma forma e pintá-lo em sua totalidade, nas cores e tintas existentes, independentemente de seu estado de
          conservação;</p>
      
        <p><b><u>TRIGÉSIMA SEXTA:</u></b> O(s) LOCATÁRIO(s) e FIADOR(es) declara(m) expresso CONSENTIMENTO que o LOCADOR irá
          coletar, tratar e compartilhar os dados necessários ao cumprimento do contrato, nos termos do Art. 7°, inc. V da
          LGPD, os dados necessários para cumprimento de obrigações legais, nos termos do Art. 7°, inc. II da LGPD, bem como
          os dados, se necessários para proteção ao crédito, conforme autorizado pelo Art. 7°, inc. V da LGPD;</p>
      
        <p><b><u>TRIGÉSIMA SÉTIMA:</u></b> O(A) Locatário(a) fica desde já ciente que à partir de 05 (cinco) dias úteis da
          retirada ou envio do contrato já começará correr o aluguel, independentemente da entrega das chaves, que só será
          feita mediante a transferência para seu nome das contas de energia elétrica e água nas respectivas empresas
          fornecedoras, transferências estas que não poderão ser feitas em nome de terceiros e ainda pagamento de seguro
          contra incêndio;</p>
      
        <p><b><u>TRIGÉSIMA OITAVA:</u></b> Em caso de ser necessário o ajuizamento de ação para fazer cumprir as normas deste
          contrato, os contratantes concordam em que, tanto a notificação premonitória, quanto a ação principal, o aviso e a
          citação sejam feitos através de carta registrada, desde que venha acompanhada de aviso de recebimento, para os fins
          de direito;</p>
      
        <p><b><u>TRIGÉSIMA NONA:</u></b> Para todas as questões oriundas deste contrato, será o foro desta cidade de
          Lorena/SP., com renúncia de outro por mais especial que se apresente;</p>
      
          {{#if clasulaPrimeiraLocacao}}<p><b><u>QUADRAGÉSIMA:</u></b> O imóvel objeto deste contrato está sendo entregue em 1ª (Primeira) locação após construção, com todos os itens relacionados no Laudo de Vistoria que faz parte integrante deste contrato, novos e recém pintado internamente em tinta látex de boa qualidade, obrigando-se o(a) LOCATÁRIO(A), antes da entrega definitiva das chaves, a pintá-lo em sua totalidade, nas cores e tintas existentes, independentemente de seu estado de conservação;</p>{{/if}}
      
          {{#if clasulaCarencia}}<p><b><u>QUADRAGÉSIMA:</u></b> Fica combinado e aceito entre as partes contratantes, que por mera liberalidade por parte do(a) LOCADOR(A), a mesma concede a(o) LOCATÁRIO(A), carência de {{mesesDeCarencia}} (dias ou meses), a partir do recebimento das chaves;</p>{{/if}}
      
          {{#if clasulaDescontoEspecial}}<p><b><u>QUADRAGÉSIMA:</u></b> O (A) LOCADOR(A), por mera liberalidade concede a(o) LOCATÁRIO(A), além do desconto de 10% (dez por cento) estipulado na cláusula VERIFICAR O NUMERO DA CLAUSULA do presente contrato, o desconto especial de R$ {{valorDescontoEspecial}} (VALOR POR EXTENSO) para os {{quantidadeDeMeses}} (VALOR POR EXTENSO) primeiros meses de locação, ou seja, ESCREVER OS MESES POR EXTENSO CONCEDIDOS DE DESCONTO ESPECIAL;</p>{{/if}}
      
          {{#if clasulaLiberacaoDeMulta}}<p><b><u>QUADRAGÉSIMA:</u></b> Fica combinado e aceito entre as partes contratantes que se o LOCATÁRIO(A) desocupar o imóvel, após o primeiro ano de locação, ou seja, a partir de {{dataDeUmAnoAposInicioContrato}} nas condições previstas neste contrato e conforme Laudo de Vistoria em anexo que faz parte integrante deste contrato, por mera liberalidade por parte do LOCADOR(A), ficará o LOCATÁRIO(A), isento da multa contratual constante na cláusula VERIFICAR O NUMERO DA CLAUSULA DE MULTA DE 03 ALUGUEIS, desde que, comunique por escrito, à Imobiliária Lamarck, sua intenção de desocupar o imóvel com 30 (TRINTA) dias de antecedência a referida desocupação;</p>{{/if}}
      
          {{#if clasulaMoradores}}<p><b><u>QUADRAGÉSIMA:</u></b> O imóvel objeto deste contrato está sendo locado para uso exclusivamente de: {{residentsFullName}}, não podendo a mesma permitir que outros residam no imóvel sem prévio consentimento por parte do(a) LOCADOR(A);</p>{{/if}}
      
          {{#if clasulaImovelReformado}}<p><b><u>QUADRAGÉSIMA:</u></b> O imóvel objeto deste contrato está sendo entregue em 1ª (Primeira) locação após reforma total, com todos os itens relacionados no Laudo de Vistoria que faz parte integrante deste contrato novos e recém pintado externa e internamente em tinta látex de boa qualidade, obrigando-se o(a) LOCATÁRIO(A), antes da entrega definitiva das chaves, a pintá-lo em sua totalidade, nas cores e tintas existentes, independentemente de seu estado de conservação;</p>{{/if}}
      
          {{#if clasulaReformaComAprovacao}}<p><b><u>QUADRAGÉSIMA:</u></b> Fica combinado e aceito entre as partes contratantes, que por mera liberalidade por parte do(a) LOCADOR(A), a(o) LOCATÁRIO(A), fica desde já autorizada a efetuar adequações no imóvel conforme projeto apresentado e em anexo, correndo por conta do(a) Locatário(a), todas as despesas sem direito a qualquer indenização ou retenção e ainda quando da devolução do imóvel, o(a) LOCATÁRIO(A) terá o direito de fazê-la sem a necessidade de que esteja da mesma forma de quando a efetivação da locação, ou seja, com as adequações ficando incorporadas ao imóvel;</p>{{/if}}
      
        <p><b>O(A) LOCATÁRIO(A) assume a responsabilidade civil e criminal pela autenticidade das assinaturas dos
            fiadores.</b></p>
      
        <p>E, pôr assim terem contratados, assinam o presente contrato em duas vias, de igual teor, digitadas em 05 páginas,
          de um só lado, sendo esta última datada e assinada, em presença das testemunhas abaixo.</p>
        </br>
      
        <p style="text-align: center;">Lorena/SP, ___ de _____________ de 2.023.</p>
        </br></br>
      
        <p style="text-align: center;">________________________________________________________</p>
        <p style="text-align: center;">{{locator.fullName}}</p>
      
        </br></br></br>
      
        <section class="sign_section">
          <div class="sign_block">
            <hr />
            <p style="text-align: center;">{{tenant.fullName}}</p>
          </div>
      
          <div class="sign_block">
            <hr />
            <p style="text-align: center;">{{tenant.fullNameT2}}</p>
          </div>
        </section>
      
        <section class="sign_section">
          <div class="sign_block">
            <hr />
            <p style="text-align: center;">{{bail.fullNameG1}}</p>
          </div>
      
          <div class="sign_block">
            <hr />
            <p style="text-align: center;">{{bail.spouseFullNameG1}}</p>
          </div>
        </section>
      
        <section class="sign_section">
          <div class="sign_block">
            <hr />
            <p style="text-align: center;">TESTEMUNHA</p>
          </div>
      
          <div class="sign_block">
            <hr />
            <p style="text-align: center;">TESTEMUNHA</p>
          </div>
        </section>
      </body>
      
      </html>`,
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

  const provisionServiceIsImobiliaria =
    props.locator.provisionService === 'Imobiliária';

  const template = handlebars.compile(html);
  return template({ ...props, provisionServiceIsImobiliaria });
};

export default ContractToPrint;
