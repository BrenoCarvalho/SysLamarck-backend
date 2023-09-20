const hbs = require('hbs');

const html = `<!DOCTYPE html>
<head>
   <meta charset="utf-8"/>
   <style type="text/css">
      #sidebar{position:absolute;top:0;left:0;bottom:0;width:250px;padding:0;margin:0;overflow:auto}#page-container{position:absolute;top:0;left:0;margin:0;padding:0;border:0}@media screen{#sidebar.opened+#page-container{left:250px}#page-container{bottom:0;right:0;overflow:auto}.loading-indicator{display:none}.loading-indicator.active{display:block;position:absolute;width:64px;height:64px;top:50%;left:50%;margin-top:-32px;margin-left:-32px}.loading-indicator img{position:absolute;top:0;left:0;bottom:0;right:0}}@media print{@page{margin:0}html{margin:0}body{margin:0;-webkit-print-color-adjust:exact}#sidebar{display:none}#page-container{width:auto;height:auto;overflow:visible;background-color:transparent}.d{display:none}}.pf{position:relative;background-color:white;overflow:hidden;margin:0;border:0}.pc{position:absolute;border:0;padding:0;margin:0;top:0;left:0;width:100%;height:100%;overflow:hidden;display:block;transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0}.pc.opened{display:block}.bf{position:absolute;border:0;margin:0;top:0;bottom:0;width:100%;height:100%;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}.bi{position:absolute;border:0;margin:0;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}@media print{.pf{margin:0;box-shadow:none;page-break-after:always;page-break-inside:avoid}@-moz-document url-prefix(){.pf{overflow:visible;border:1px solid #fff}.pc{overflow:visible}}}.c{position:absolute;border:0;padding:0;margin:0;overflow:hidden;display:block}.t{position:absolute;white-space:pre;font-size:1px;transform-origin:0 100%;-ms-transform-origin:0 100%;-webkit-transform-origin:0 100%;unicode-bidi:bidi-override;-moz-font-feature-settings:"liga" 0}.t:after{content:''}.t:before{content:'';display:inline-block}.t span{position:relative;unicode-bidi:bidi-override}._{display:inline-block;color:transparent;z-index:-1}::selection{background:rgba(127,255,255,0.4)}::-moz-selection{background:rgba(127,255,255,0.4)}.pi{display:none}.d{position:absolute;transform-origin:0 100%;-ms-transform-origin:0 100%;-webkit-transform-origin:0 100%}.it{border:0;background-color:rgba(255,255,255,0.0)}.ir:hover{cursor:pointer}
   </style>
   <style type="text/css">
      .ff0{font-family:sans-serif;visibility:hidden;}
      @font-face{font-family:ff1;src:url('data:application/font-woff;base64,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')format("woff");}.ff1{font-family:ff1;line-height:0.712000;font-style:normal;font-weight:normal;visibility:visible;}
      @font-face{font-family:ff2;src:url('data:application/font-woff;base64,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')format("woff");}.ff2{font-family:ff2;line-height:0.830000;font-style:normal;font-weight:normal;visibility:visible;}
      .m0{transform:matrix(0.191714,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.191714,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.191714,0.000000,0.000000,0.250000,0,0);}
      .m3{transform:matrix(0.228218,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.228218,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.228218,0.000000,0.000000,0.250000,0,0);}
      .m2{transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);}
      .m1{transform:matrix(0.258784,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.258784,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.258784,0.000000,0.000000,0.250000,0,0);}
      .v3{vertical-align:-4.004000px;}
      .v0{vertical-align:0.000000px;}
      .v1{vertical-align:27.440000px;}
      .v2{vertical-align:30.212000px;}
      .ls1{letter-spacing:-1.128000px;}
      .ls2{letter-spacing:-0.784000px;}
      .ls0{letter-spacing:0.000000px;}
      .sc_{text-shadow:none;}
      .sc0{text-shadow:-0.015em 0 transparent,0 0.015em transparent,0.015em 0 transparent,0 -0.015em  transparent;}
      @media screen and (-webkit-min-device-pixel-ratio:0){
      .sc_{-webkit-text-stroke:0px transparent;}
      .sc0{-webkit-text-stroke:0.015em transparent;text-shadow:none;}
      }
      .ws2{word-spacing:-6.860000px;}
      .ws6{word-spacing:-6.076000px;}
      .ws4{word-spacing:-4.900000px;}
      .ws9{word-spacing:-2.800000px;}
      .ws5{word-spacing:-1.716400px;}
      .ws7{word-spacing:0.000000px;}
      .ws8{word-spacing:1.128000px;}
      .ws1{word-spacing:2.584209px;}
      .ws0{word-spacing:9.543706px;}
      .ws3{word-spacing:104.468000px;}
      ._9{margin-left:-3.917200px;}
      ._a{margin-left:-2.867200px;}
      ._4{margin-left:-1.394400px;}
      ._3{width:1.020978px;}
      ._8{width:2.816800px;}
      ._2{width:4.612552px;}
      ._5{width:5.824000px;}
      ._0{width:12.080640px;}
      ._1{width:13.566559px;}
      ._7{width:16.787022px;}
      ._6{width:33.264000px;}
      ._c{width:40.712000px;}
      ._b{width:53.530400px;}
      .fc1{color:rgb(35,31,32);}
      .fc0{color:rgb(121,70,96);}
      .fs5{font-size:20.000000px;}
      .fs1{font-size:22.688400px;}
      .fs3{font-size:24.000000px;}
      .fs2{font-size:28.000000px;}
      .fs4{font-size:32.000000px;}
      .fs0{font-size:40.268800px;}
      .y0{bottom:-0.500000px;}
      .y21{bottom:422.795900px;}
      .y20{bottom:429.818400px;}
      .y24{bottom:433.369100px;}
      .y23{bottom:440.747100px;}
      .y22{bottom:441.090800px;}
      .y1d{bottom:448.812500px;}
      .y1c{bottom:456.534200px;}
      .y1b{bottom:464.255900px;}
      .y1a{bottom:471.977500px;}
      .y19{bottom:472.980600px;}
      .y17{bottom:479.592800px;}
      .y16{bottom:481.596600px;}
      .y1e{bottom:487.424500px;}
      .y15{bottom:489.422600px;}
      .y18{bottom:495.142600px;}
      .y1f{bottom:495.145500px;}
      .y14{bottom:497.143600px;}
      .y13{bottom:503.404600px;}
      .y11{bottom:508.618900px;}
      .y10{bottom:515.632900px;}
      .yd{bottom:515.807900px;}
      .yf{bottom:516.087900px;}
      .yc{bottom:516.129900px;}
      .yb{bottom:523.640900px;}
      .ye{bottom:524.291900px;}
      .y12{bottom:529.809600px;}
      .ya{bottom:532.096900px;}
      .y9{bottom:539.509900px;}
      .y8{bottom:547.503900px;}
      .y7{bottom:555.348600px;}
      .y6{bottom:567.804700px;}
      .y2{bottom:574.070300px;}
      .y5{bottom:576.066400px;}
      .y1{bottom:580.070800px;}
      .y4{bottom:582.875500px;}
      .y3{bottom:587.873500px;}
      .h8{height:16.972656px;}
      .h3{height:18.604488px;}
      .h4{height:23.761719px;}
      .h5{height:27.156250px;}
      .h2{height:28.188160px;}
      .h6{height:51.201719px;}
      .h7{height:53.973719px;}
      .h0{height:595.276000px;}
      .h1{height:596.000000px;}
      .w0{width:164.409000px;}
      .w1{width:165.000000px;}
      .x0{left:0.000000px;}
      .xb{left:2.392600px;}
      .x7{left:4.336400px;}
      .x1{left:27.384800px;}
      .x6{left:46.788100px;}
      .x8{left:56.437400px;}
      .xd{left:58.872100px;}
      .x4{left:69.630400px;}
      .x9{left:84.052400px;}
      .x2{left:88.264200px;}
      .xc{left:92.690900px;}
      .x5{left:95.984900px;}
      .x3{left:111.168200px;}
      .xa{left:127.858400px;}
      @media print{
      .v3{vertical-align:-5.338667pt;}
      .v0{vertical-align:0.000000pt;}
      .v1{vertical-align:36.586667pt;}
      .v2{vertical-align:40.282667pt;}
      .ls1{letter-spacing:-1.504000pt;}
      .ls2{letter-spacing:-1.045333pt;}
      .ls0{letter-spacing:0.000000pt;}
      .ws2{word-spacing:-9.146667pt;}
      .ws6{word-spacing:-8.101333pt;}
      .ws4{word-spacing:-6.533333pt;}
      .ws9{word-spacing:-3.733333pt;}
      .ws5{word-spacing:-2.288533pt;}
      .ws7{word-spacing:0.000000pt;}
      .ws8{word-spacing:1.504000pt;}
      .ws1{word-spacing:3.445612pt;}
      .ws0{word-spacing:12.724941pt;}
      .ws3{word-spacing:139.290667pt;}
      ._9{margin-left:-5.222933pt;}
      ._a{margin-left:-3.822933pt;}
      ._4{margin-left:-1.859200pt;}
      ._3{width:1.361304pt;}
      ._8{width:3.755733pt;}
      ._2{width:6.150069pt;}
      ._5{width:7.765333pt;}
      ._0{width:16.107520pt;}
      ._1{width:18.088745pt;}
      ._7{width:22.382696pt;}
      ._6{width:44.352000pt;}
      ._c{width:54.282667pt;}
      ._b{width:71.373867pt;}
      .fs5{font-size:26.666667pt;}
      .fs1{font-size:30.251200pt;}
      .fs3{font-size:32.000000pt;}
      .fs2{font-size:37.333333pt;}
      .fs4{font-size:42.666667pt;}
      .fs0{font-size:53.691733pt;}
      .y0{bottom:-0.666667pt;}
      .y21{bottom:563.727867pt;}
      .y20{bottom:573.091200pt;}
      .y24{bottom:577.825467pt;}
      .y23{bottom:587.662800pt;}
      .y22{bottom:588.121067pt;}
      .y1d{bottom:598.416667pt;}
      .y1c{bottom:608.712267pt;}
      .y1b{bottom:619.007867pt;}
      .y1a{bottom:629.303333pt;}
      .y19{bottom:630.640800pt;}
      .y17{bottom:639.457067pt;}
      .y16{bottom:642.128800pt;}
      .y1e{bottom:649.899333pt;}
      .y15{bottom:652.563467pt;}
      .y18{bottom:660.190133pt;}
      .y1f{bottom:660.194000pt;}
      .y14{bottom:662.858133pt;}
      .y13{bottom:671.206133pt;}
      .y11{bottom:678.158533pt;}
      .y10{bottom:687.510533pt;}
      .yd{bottom:687.743867pt;}
      .yf{bottom:688.117200pt;}
      .yc{bottom:688.173200pt;}
      .yb{bottom:698.187867pt;}
      .ye{bottom:699.055867pt;}
      .y12{bottom:706.412800pt;}
      .ya{bottom:709.462533pt;}
      .y9{bottom:719.346533pt;}
      .y8{bottom:730.005200pt;}
      .y7{bottom:740.464800pt;}
      .y6{bottom:757.072933pt;}
      .y2{bottom:765.427067pt;}
      .y5{bottom:768.088533pt;}
      .y1{bottom:773.427733pt;}
      .y4{bottom:777.167333pt;}
      .y3{bottom:783.831333pt;}
      .h8{height:22.630208pt;}
      .h3{height:24.805984pt;}
      .h4{height:31.682292pt;}
      .h5{height:36.208333pt;}
      .h2{height:37.584213pt;}
      .h6{height:68.268958pt;}
      .h7{height:71.964958pt;}
      .h0{height:793.701333pt;}
      .h1{height:794.666667pt;}
      .w0{width:219.212000pt;}
      .w1{width:220.000000pt;}
      .x0{left:0.000000pt;}
      .xb{left:3.190133pt;}
      .x7{left:5.781867pt;}
      .x1{left:36.513067pt;}
      .x6{left:62.384133pt;}
      .x8{left:75.249867pt;}
      .xd{left:78.496133pt;}
      .x4{left:92.840533pt;}
      .x9{left:112.069867pt;}
      .x2{left:117.685600pt;}
      .xc{left:123.587867pt;}
      .x5{left:127.979867pt;}
      .x3{left:148.224267pt;}
      .xa{left:170.477867pt;}
      }
   </style>
   <title></title>
</head>
<body>
   <div id="sidebar">
      <div id="outline"></div>
   </div>
   <div id="page-container">
      <div id="pf1" class="pf w0 h0" data-page-no="1">
         <div class="pc pc1 w0 h0">
            <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,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"/>
            <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0"><span class="_"> </span><span class="_ _0"> </span><span class="_ _1"> </span><span class="_ _0"> </span><span class="_"> </span><span class="_ _0"> </span></div>
            <div class="t m1 x1 h3 y2 ff2 fs1 fc1 sc0 ls0 ws1"><span class="_"> </span><span class="_"> </span><span class="_ _2"> </span><span class="_ _3"></span><span class="_"> </span><span class="_ _3"></span><span class="_ _3"></span><span class="_"> </span><span class="_ _3"></span><span class="_ _3"></span><span class="_"> </span><span class="_ _3"></span><span class="_"> </span><span class="_ _3"></span><span class="_ _3"></span></div>
            <div class="t m2 x2 h4 y3 ff3 fs2 fc1 sc0 ls0 ws7">Rua Dr. Carlos Autran, </div>
            <div class="t m2 x3 h4 y4 ff3 fs2 fc1 sc0 ls0">n°15</div>
            <div class="t m2 x4 h4 y5 ff3 fs2 fc1 sc0 ls0 ws2">Contatos:<span class="fs1 ls1">(12)3152-1099/(12)99251-8477</span></div>
            <div class="t m2 x5 h4 y6 ff3 fs2 fc1 sc0 ls0 ws7">CRECI-J : 30558</div>
            <div class="t m2 x6 h5 y7 ff3 fs4 fc1 sc0 ls0 ws7">RECIBO DE ALUGUEL</div>
            <div class="t m2 x7 h4 y8 ff3 fs2 fc1 sc0 ls0 ws7">Locatário: {{tenantFullName}}</div>
            <div class="t m2 x7 h4 y9 ff3 fs2 fc1 sc0 ls0 ws7">Imóvel: {{propertyAddress}}</div>
            <div class="t m2 x7 h4 ya ff3 fs2 fc1 sc0 ls0 ws7">Locador: {{locatorFullName}}</div>
            <div class="t m2 xb h8 y12 ff3 fs5 fc1 sc0 ls0 ws4">------------------------------------------------------------------------------------------------------</div>
            <div class="t m2 x7 h4 yb ff3 fs2 fc1 sc0 ls0 ws7">Mês de Referência: {{referenceMonth}}</div>
            <div class="t m3 x7 h4 yc ff3 fs2 fc1 sc0 ls0 ws7">Mês de Vencimento: {{dueDateMonth}}</div>
            <div class="t m2 x9 h4 ye ff3 fs2 fc1 sc0 ls0 ws2">Vencimento: {{dueDate}}</div>
            <div class="t m3 x9 h4 yc ff3 fs2 fc1 sc0 ls0 ws7">Data Pagamento: {{paymentDate}}</div>
            <div class="t m2 x7 h4 y11 ff3 fs2 fc1 sc0 ls0 ws7">N° PARCELA: {{currentInstallment}}</div>
            <div class="t m3 x9 h4 y11 ff3 fs2 fc1 sc0 ls0 ws7">CÓD: {{propertyCode}}</div>
            <div class="t m2 xb h8 y13 ff3 fs5 fc1 sc0 ls0 ws4">------------------------------------------------------------------------------------------------------</div>
            <div class="t m2 x7 h4 y14 ff3 fs2 fc1 sc0 ls0">Aluguel:</div>
            <div class="t m3 x8 h4 y1f ff3 fs2 fc1 sc0 ls0">{{rent}}</div>
            <div class="t m2 xc h4 y18 ff3 fs2 fc1 sc0 ls0 ws5">Desconto: 10%</div>
            <div class="t m2 x7 h4 y15 ff3 fs2 fc1 sc0 ls0">IPTU:</div>
            <div class="t m3 x8 h4 y1e ff3 fs2 fc1 sc0 ls0">{{iptu}}</div>
            <div class="t m2 x7 h4 y16 ff3 fs2 fc1 sc0 ls0">Água:</div>
            <div class="t m3 x8 h4 y17 ff3 fs2 fc1 sc0 ls0">{{water}}</div>
            <div class="t m2 x7 h4 y19 ff3 fs2 fc1 sc0 ls0">Luz:</div>
            <div class="t m3 x8 h4 y1a ff3 fs2 fc1 sc0 ls0">{{eletricity}}</div>
            <div class="t m2 x7 h4 y1b ff3 fs2 fc1 sc0 ls0 ws2">Condominio:</div>
            <div class="t m3 x8 h4 y1b ff3 fs2 fc1 sc0 ls0">{{condominium}}</div>
            <div class="t m2 x7 h4 y1c ff3 fs2 fc1 sc0 ls0 ws7">Imposto de renda:</div>
            <div class="t m3 x8 h4 y1c ff3 fs2 fc1 sc0 ls0">{{incomeTax}}</div>
            <div class="t m2 x7 h4 y1d ff3 fs2 fc1 sc0 ls0 ws7">Desconto especial:</div>
            <div class="t m3 x8 h4 y1d ff3 fs2 fc1 sc0 ls0">{{specialDiscount}}</div>
            <div class="t m2 x7 h4 y22 ff3 fs2 fc1 sc0 ls0 ws7">Multa por atraso:</div>
            <div class="t m3 x8 h4 y23 ff3 fs2 fc1 sc0 ls0">{{breachOfContractFine}}</div>
            <div class="t m2 x7 h4 y24 ff3 fs2 fc1 sc0 ls0 ws7">Multa recisória:</div>
            <div class="t m3 x8 h4 y24 ff3 fs2 fc1 sc0 ls0">R$00,00</div>
            <div class="t m2 xb h8 y20 ff3 fs5 fc1 sc0 ls0 ws4">------------------------------------------------------------------------------------------------------</div>
            <div class="t m2 xd h4 y21 ff3 fs2 fc1 sc0 ls2 ws6">TOTAL: {{installmentTransactionAmount}}</div>  
         </div>
         <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
   </div>
</body>
</html>`;

const RentReceipt = (props: {
  tenantFullName: string;
  propertyAddress: string;
  locatorFullName: string;
  referentialMonth: string;
  dueDateMonth: string;
  dueDate: string;
  paymentDate: string;
  currentInstallment: string;
  propertyCode: string;
  installmentTransactionAmount: string;
  rent: string;
  iptu: string;
  water: string;
  eletricity: string;
  condominium: string;
  incomeTax: string;
  specialDiscount: string;
  breachOfContractFine: string;
}) => {
  const template = hbs.compile(html);
  return template(props);
};

export default RentReceipt;
