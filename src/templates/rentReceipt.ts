import { handlebars } from 'hbs';

const htmlTenantVersion = `<!DOCTYPE html>
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
            <div class="t m2 x7 h4 y8 ff3 fs2 fc1 sc0 ls0 ws7">Locatário: {{tenant.fullName}}</div>
            <div class="t m2 x7 h4 y9 ff3 fs2 fc1 sc0 ls0 ws7">Imóvel: {{property.address}}</div>
            <div class="t m2 x7 h4 ya ff3 fs2 fc1 sc0 ls0 ws7">Locador: {{locator.fullName}}</div>
            <div class="t m2 xb h8 y12 ff3 fs5 fc1 sc0 ls0 ws4">------------------------------------------------------------------------------------------------------</div>
            <div class="t m2 x7 h4 yb ff3 fs2 fc1 sc0 ls0 ws7">Mês de Referência: {{installment.referenceMonth}}</div>
            <div class="t m3 x7 h4 yc ff3 fs2 fc1 sc0 ls0 ws7">Mês de Vencimento: {{installment.dueDateMonth}}</div>
            <div class="t m2 x9 h4 ye ff3 fs2 fc1 sc0 ls0 ws2">Vencimento: {{installment.dueDate}}</div>
            <div class="t m3 x9 h4 yc ff3 fs2 fc1 sc0 ls0 ws7">Data Pagamento: {{installment.paymentDate}}</div>
            <div class="t m2 x7 h4 y11 ff3 fs2 fc1 sc0 ls0 ws7">N° PARCELA: {{installment.currentInstallment}}</div>
            <div class="t m3 x9 h4 y11 ff3 fs2 fc1 sc0 ls0 ws7">CÓD: {{property.propertyCode}}</div>
            <div class="t m2 xb h8 y13 ff3 fs5 fc1 sc0 ls0 ws4">------------------------------------------------------------------------------------------------------</div>
            <div class="t m2 x7 h4 y14 ff3 fs2 fc1 sc0 ls0">Aluguel:</div>
            <div class="t m3 x8 h4 y1f ff3 fs2 fc1 sc0 ls0">{{creditTransaction.rent}}</div>
            <div class="t m2 xc h4 y18 ff3 fs2 fc1 sc0 ls0 ws5">Desconto: 10%</div>
            <div class="t m2 x7 h4 y15 ff3 fs2 fc1 sc0 ls0">IPTU:</div>
            <div class="t m3 x8 h4 y1e ff3 fs2 fc1 sc0 ls0">{{creditTransaction.iptu}}</div>
            <div class="t m2 x7 h4 y16 ff3 fs2 fc1 sc0 ls0">Água:</div>
            <div class="t m3 x8 h4 y17 ff3 fs2 fc1 sc0 ls0">{{creditTransaction.water}}</div>
            <div class="t m2 x7 h4 y19 ff3 fs2 fc1 sc0 ls0">Luz:</div>
            <div class="t m3 x8 h4 y1a ff3 fs2 fc1 sc0 ls0">{{creditTransaction.eletricity}}</div>
            <div class="t m2 x7 h4 y1b ff3 fs2 fc1 sc0 ls0 ws2">Condominio:</div>
            <div class="t m3 x8 h4 y1b ff3 fs2 fc1 sc0 ls0">{{creditTransaction.condominium}}</div>
            <div class="t m2 x7 h4 y1c ff3 fs2 fc1 sc0 ls0 ws7">Imposto de renda:</div>
            <div class="t m3 x8 h4 y1c ff3 fs2 fc1 sc0 ls0">{{creditTransaction.incomeTax}}</div>
            <div class="t m2 x7 h4 y1d ff3 fs2 fc1 sc0 ls0 ws7">Desconto especial:</div>
            <div class="t m3 x8 h4 y1d ff3 fs2 fc1 sc0 ls0">{{creditTransaction.specialDiscount}}</div>
            <div class="t m2 x7 h4 y22 ff3 fs2 fc1 sc0 ls0 ws7">Multa por atraso:</div>
            <div class="t m3 x8 h4 y23 ff3 fs2 fc1 sc0 ls0">{{creditTransaction.breachOfContractFine}}</div>
            <div class="t m2 x7 h4 y24 ff3 fs2 fc1 sc0 ls0 ws7">Multa recisória:</div>
            <div class="t m3 x8 h4 y24 ff3 fs2 fc1 sc0 ls0">R$00,00</div>
            <div class="t m2 xb h8 y20 ff3 fs5 fc1 sc0 ls0 ws4">------------------------------------------------------------------------------------------------------</div>
            <div class="t m2 xd h4 y21 ff3 fs2 fc1 sc0 ls2 ws6">TOTAL: {{creditTransaction.amount}}</div>  
         </div>
         <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
   </div>
</body>
</html>`;

const htmlLocatorVersion = `
<!DOCTYPE html>
<head>
   <meta charset="utf-8"/>
   <style type="text/css">
      #sidebar{position:absolute;top:0;left:0;bottom:0;width:250px;padding:0;margin:0;overflow:auto}#page-container{position:absolute;top:0;left:0;margin:0;padding:0;border:0}@media screen{#sidebar.opened+#page-container{left:250px}#page-container{bottom:0;right:0;overflow:auto}.loading-indicator{display:none}.loading-indicator.active{display:block;position:absolute;width:64px;height:64px;top:50%;left:50%;margin-top:-32px;margin-left:-32px}.loading-indicator img{position:absolute;top:0;left:0;bottom:0;right:0}}@media print{@page{margin:0}html{margin:0}body{margin:0;-webkit-print-color-adjust:exact}#sidebar{display:none}#page-container{width:auto;height:auto;overflow:visible;background-color:transparent}.d{display:none}}.pf{position:relative;background-color:white;overflow:hidden;margin:0;border:0}.pc{position:absolute;border:0;padding:0;margin:0;top:0;left:0;width:100%;height:100%;overflow:hidden;display:block;transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0}.pc.opened{display:block}.bf{position:absolute;border:0;margin:0;top:0;bottom:0;width:100%;height:100%;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}.bi{position:absolute;border:0;margin:0;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;user-select:none}@media print{.pf{margin:0;box-shadow:none;page-break-after:always;page-break-inside:avoid}@-moz-document url-prefix(){.pf{overflow:visible;border:1px solid #fff}.pc{overflow:visible}}}.c{position:absolute;border:0;padding:0;margin:0;overflow:hidden;display:block}.t{position:absolute;white-space:pre;font-size:1px;transform-origin:0 100%;-ms-transform-origin:0 100%;-webkit-transform-origin:0 100%;unicode-bidi:bidi-override;-moz-font-feature-settings:"liga" 0}.t:after{content:''}.t:before{content:'';display:inline-block}.t span{position:relative;unicode-bidi:bidi-override}._{display:inline-block;color:transparent;z-index:-1}::selection{background:rgba(127,255,255,0.4)}::-moz-selection{background:rgba(127,255,255,0.4)}.pi{display:none}.d{position:absolute;transform-origin:0 100%;-ms-transform-origin:0 100%;-webkit-transform-origin:0 100%}.it{border:0;background-color:rgba(255,255,255,0.0)}.ir:hover{cursor:pointer}
   </style>
   <style type="text/css">
      .ff0{font-family:sans-serif;visibility:hidden;}
      @font-face{font-family:ff1;src:url('data:application/font-woff;base64,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')format("woff");}.ff1{font-family:ff1;line-height:0.712000;font-style:normal;font-weight:normal;visibility:visible;}
      @font-face{font-family:ff2;src:url('data:application/font-woff;base64,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')format("woff");}.ff2{font-family:ff2;line-height:0.830000;font-style:normal;font-weight:normal;visibility:visible;}
      @font-face{font-family:ff3;src:url('data:application/font-woff;base64,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')format("woff");}.ff3{font-family:ff3;line-height:1.127441;font-style:normal;font-weight:normal;visibility:visible;}
      .m6{transform:matrix(0.000000,-0.245050,0.250000,0.000000,0,0);-ms-transform:matrix(0.000000,-0.245050,0.250000,0.000000,0,0);-webkit-transform:matrix(0.000000,-0.245050,0.250000,0.000000,0,0);}
      .m0{transform:matrix(0.183883,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.183883,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.183883,0.000000,0.000000,0.250000,0,0);}
      .m9{transform:matrix(0.196143,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.196143,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.196143,0.000000,0.000000,0.250000,0,0);}
      .m8{transform:matrix(0.228219,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.228219,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.228219,0.000000,0.000000,0.250000,0,0);}
      .m4{transform:matrix(0.239784,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.239784,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.239784,0.000000,0.000000,0.250000,0,0);}
      .m3{transform:matrix(0.239785,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.239785,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.239785,0.000000,0.000000,0.250000,0,0);}
      .m2{transform:matrix(0.239786,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.239786,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.239786,0.000000,0.000000,0.250000,0,0);}
      .m5{transform:matrix(0.245050,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.245050,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.245050,0.000000,0.000000,0.250000,0,0);}
      .m1{transform:matrix(0.248215,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.248215,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.248215,0.000000,0.000000,0.250000,0,0);}
      .m7{transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);}
      .v3{vertical-align:-7.093429px;}
      .v5{vertical-align:-3.980122px;}
      .v0{vertical-align:0.000000px;}
      .v4{vertical-align:1.990061px;}
      .v1{vertical-align:48.612312px;}
      .v2{vertical-align:53.523148px;}
      .ls1{letter-spacing:-2.111014px;}
      .ls0{letter-spacing:0.000000px;}
      .sc_{text-shadow:none;}
      .sc0{text-shadow:-0.015em 0 transparent,0 0.015em transparent,0.015em 0 transparent,0 -0.015em  transparent;}
      @media screen and (-webkit-min-device-pixel-ratio:0){
      .sc_{-webkit-text-stroke:0px transparent;}
      .sc0{-webkit-text-stroke:0.015em transparent;text-shadow:none;}
      }
      .ws4{word-spacing:-15.121988px;}
      .ws2{word-spacing:-12.153078px;}
      .wsa{word-spacing:-4.960440px;}
      .ws8{word-spacing:0.000000px;}
      .ws9{word-spacing:2.111014px;}
      .ws1{word-spacing:4.840440px;}
      .ws0{word-spacing:17.860699px;}
      .ws6{word-spacing:25.706426px;}
      .ws7{word-spacing:57.890061px;}
      .ws5{word-spacing:59.509363px;}
      .ws3{word-spacing:185.074016px;}
      ._12{margin-left:-7.715300px;}
      ._a{margin-left:-5.988680px;}
      ._f{margin-left:-3.808189px;}
      ._8{margin-left:-2.609560px;}
      ._9{margin-left:-1.461982px;}
      ._3{width:1.231340px;}
      ._6{width:2.254626px;}
      ._7{width:3.732234px;}
      ._e{width:4.965400px;}
      ._4{width:6.666220px;}
      ._5{width:8.024940px;}
      ._b{width:10.525466px;}
      ._13{width:11.728296px;}
      ._2{width:19.435757px;}
      ._0{width:22.608480px;}
      ._1{width:25.396859px;}
      ._d{width:30.952295px;}
      ._15{width:37.728280px;}
      ._c{width:60.116602px;}
      ._14{width:63.482008px;}
      ._11{width:72.124798px;}
      ._10{width:94.471580px;}
      .fc1{color:rgb(35,31,32);}
      .fc0{color:rgb(121,70,96);}
      .fs9{font-size:35.432000px;}
      .fs6{font-size:36.145200px;}
      .fs1{font-size:42.460000px;}
      .fs3{font-size:44.915200px;}
      .fs8{font-size:49.604400px;}
      .fs5{font-size:50.603200px;}
      .fs2{font-size:52.400800px;}
      .fsb{font-size:58.531200px;}
      .fs4{font-size:59.886800px;}
      .fsa{font-size:61.722400px;}
      .fs0{font-size:75.361600px;}
      .fs7{font-size:80.136400px;}
      .y0{bottom:-0.500000px;}
      .yd{bottom:211.509800px;}
      .y3d{bottom:226.090261px;}
      .y77{bottom:226.782561px;}
      .y3c{bottom:242.966428px;}
      .y76{bottom:243.658728px;}
      .y3b{bottom:259.918500px;}
      .y75{bottom:260.610800px;}
      .y3a{bottom:282.888298px;}
      .y74{bottom:283.580698px;}
      .y38{bottom:293.050800px;}
      .y72{bottom:293.743200px;}
      .y37{bottom:310.627900px;}
      .y36{bottom:310.628900px;}
      .y71{bottom:311.321300px;}
      .y35{bottom:328.881800px;}
      .y70{bottom:329.574200px;}
      .y39{bottom:343.733900px;}
      .y73{bottom:344.426300px;}
      .y78{bottom:468.091300px;}
      .y34{bottom:469.091300px;}
      .y27{bottom:489.693400px;}
      .y26{bottom:489.694300px;}
      .y33{bottom:489.700536px;}
      .y63{bottom:490.385700px;}
      .y62{bottom:490.386700px;}
      .y6f{bottom:490.392936px;}
      .y25{bottom:505.956100px;}
      .y61{bottom:506.648400px;}
      .y24{bottom:506.715800px;}
      .y32{bottom:506.967377px;}
      .y60{bottom:507.408200px;}
      .y6e{bottom:507.659777px;}
      .y21{bottom:523.736300px;}
      .y20{bottom:523.737300px;}
      .y2f{bottom:523.740439px;}
      .y5d{bottom:524.428700px;}
      .y5c{bottom:524.429700px;}
      .y6b{bottom:524.432839px;}
      .y1f{bottom:540.758800px;}
      .y1e{bottom:540.759800px;}
      .y2e{bottom:540.760391px;}
      .y5b{bottom:541.451200px;}
      .y5a{bottom:541.452100px;}
      .y6a{bottom:541.452791px;}
      .y1d{bottom:557.779300px;}
      .y1c{bottom:557.780300px;}
      .y2d{bottom:557.780343px;}
      .y59{bottom:558.471700px;}
      .y58{bottom:558.472700px;}
      .y69{bottom:558.472743px;}
      .y2c{bottom:574.800295px;}
      .y1b{bottom:574.801800px;}
      .y68{bottom:575.492695px;}
      .y57{bottom:575.494100px;}
      .y1a{bottom:576.210900px;}
      .y56{bottom:576.903300px;}
      .y19{bottom:591.587900px;}
      .y2b{bottom:591.588787px;}
      .y55{bottom:592.280300px;}
      .y67{bottom:592.281187px;}
      .y18{bottom:596.005037px;}
      .y54{bottom:596.697337px;}
      .y22{bottom:608.851490px;}
      .y30{bottom:608.855629px;}
      .y5e{bottom:609.543890px;}
      .y6c{bottom:609.548029px;}
      .y17{bottom:613.256448px;}
      .y53{bottom:613.948748px;}
      .y23{bottom:625.871441px;}
      .y31{bottom:625.875581px;}
      .y5f{bottom:626.563841px;}
      .y6d{bottom:626.567981px;}
      .y16{bottom:630.276400px;}
      .y52{bottom:630.968700px;}
      .y2a{bottom:645.148400px;}
      .y66{bottom:645.840800px;}
      .y29{bottom:659.071800px;}
      .y65{bottom:659.764200px;}
      .y28{bottom:664.566400px;}
      .y64{bottom:665.258800px;}
      .y15{bottom:675.533700px;}
      .y51{bottom:676.226100px;}
      .y14{bottom:683.781762px;}
      .y50{bottom:684.474162px;}
      .y13{bottom:698.204242px;}
      .y10{bottom:698.501868px;}
      .y4f{bottom:698.896642px;}
      .y12{bottom:698.997912px;}
      .yf{bottom:699.084720px;}
      .y4c{bottom:699.194268px;}
      .y4e{bottom:699.690312px;}
      .y4b{bottom:699.777120px;}
      .ye{bottom:712.391100px;}
      .y4a{bottom:713.083500px;}
      .y11{bottom:713.532001px;}
      .y4d{bottom:714.224401px;}
      .yc{bottom:723.849600px;}
      .y49{bottom:724.542000px;}
      .ya{bottom:729.198286px;}
      .y47{bottom:729.890686px;}
      .y9{bottom:743.645500px;}
      .y46{bottom:744.337900px;}
      .yb{bottom:758.206571px;}
      .y48{bottom:758.898971px;}
      .y8{bottom:771.903300px;}
      .y45{bottom:772.595700px;}
      .y7{bottom:789.572800px;}
      .y44{bottom:790.265100px;}
      .y2{bottom:799.737800px;}
      .y3f{bottom:800.430200px;}
      .y5{bottom:805.034200px;}
      .y6{bottom:805.034700px;}
      .y42{bottom:805.726600px;}
      .y43{bottom:805.727100px;}
      .y1{bottom:810.967300px;}
      .y3e{bottom:811.659700px;}
      .y4{bottom:817.779257px;}
      .y41{bottom:818.471657px;}
      .y3{bottom:827.132800px;}
      .y40{bottom:827.825200px;}
      .hd{height:30.068758px;}
      .h8{height:30.674003px;}
      .h3{height:34.817200px;}
      .h5{height:38.116512px;}
      .ha{height:42.095921px;}
      .h7{height:42.943536px;}
      .h4{height:44.469038px;}
      .hf{height:49.671497px;}
      .h6{height:50.821904px;}
      .h10{height:51.661558px;}
      .he{height:52.379654px;}
      .h2{height:52.753120px;}
      .h9{height:68.006379px;}
      .hb{height:90.708233px;}
      .hc{height:95.619069px;}
      .h0{height:841.890000px;}
      .h1{height:842.500000px;}
      .w0{width:595.276000px;}
      .w1{width:596.000000px;}
      .x0{left:0.000000px;}
      .x9{left:3.517600px;}
      .xb{left:5.504400px;}
      .x8{left:8.091300px;}
      .x14{left:35.886700px;}
      .x1{left:48.530300px;}
      .x10{left:59.377000px;}
      .x7{left:89.026900px;}
      .xc{left:99.095502px;}
      .x11{left:119.182600px;}
      .x4{left:122.831100px;}
      .xf{left:123.874500px;}
      .xd{left:148.017841px;}
      .x28{left:151.740200px;}
      .x2{left:156.278800px;}
      .x5{left:166.814900px;}
      .x6{left:170.138700px;}
      .x3{left:197.391480px;}
      .x12{left:213.334761px;}
      .xe{left:225.623925px;}
      .x13{left:240.340800px;}
      .xa{left:298.904300px;}
      .x1d{left:300.428200px;}
      .x1e{left:302.415000px;}
      .x1c{left:305.002000px;}
      .x27{left:332.796900px;}
      .x15{left:345.440900px;}
      .x23{left:356.287600px;}
      .x1b{left:385.937500px;}
      .x1f{left:396.006102px;}
      .x24{left:416.093300px;}
      .x18{left:419.741700px;}
      .x22{left:420.785200px;}
      .x20{left:444.928441px;}
      .x16{left:453.189500px;}
      .x19{left:463.725600px;}
      .x1a{left:467.049300px;}
      .x17{left:494.302180px;}
      .x25{left:510.245461px;}
      .x21{left:522.534525px;}
      .x26{left:537.251500px;}
      @media print{
      .v3{vertical-align:-9.457906pt;}
      .v5{vertical-align:-5.306829pt;}
      .v0{vertical-align:0.000000pt;}
      .v4{vertical-align:2.653414pt;}
      .v1{vertical-align:64.816416pt;}
      .v2{vertical-align:71.364197pt;}
      .ls1{letter-spacing:-2.814686pt;}
      .ls0{letter-spacing:0.000000pt;}
      .ws4{word-spacing:-20.162651pt;}
      .ws2{word-spacing:-16.204104pt;}
      .wsa{word-spacing:-6.613920pt;}
      .ws8{word-spacing:0.000000pt;}
      .ws9{word-spacing:2.814686pt;}
      .ws1{word-spacing:6.453920pt;}
      .ws0{word-spacing:23.814266pt;}
      .ws6{word-spacing:34.275234pt;}
      .ws7{word-spacing:77.186748pt;}
      .ws5{word-spacing:79.345818pt;}
      .ws3{word-spacing:246.765355pt;}
      ._12{margin-left:-10.287067pt;}
      ._a{margin-left:-7.984907pt;}
      ._f{margin-left:-5.077585pt;}
      ._8{margin-left:-3.479413pt;}
      ._9{margin-left:-1.949310pt;}
      ._3{width:1.641787pt;}
      ._6{width:3.006168pt;}
      ._7{width:4.976312pt;}
      ._e{width:6.620534pt;}
      ._4{width:8.888293pt;}
      ._5{width:10.699920pt;}
      ._b{width:14.033954pt;}
      ._13{width:15.637728pt;}
      ._2{width:25.914342pt;}
      ._0{width:30.144640pt;}
      ._1{width:33.862479pt;}
      ._d{width:41.269727pt;}
      ._15{width:50.304373pt;}
      ._c{width:80.155469pt;}
      ._14{width:84.642677pt;}
      ._11{width:96.166397pt;}
      ._10{width:125.962106pt;}
      .fs9{font-size:47.242667pt;}
      .fs6{font-size:48.193600pt;}
      .fs1{font-size:56.613333pt;}
      .fs3{font-size:59.886933pt;}
      .fs8{font-size:66.139200pt;}
      .fs5{font-size:67.470933pt;}
      .fs2{font-size:69.867733pt;}
      .fsb{font-size:78.041600pt;}
      .fs4{font-size:79.849067pt;}
      .fsa{font-size:82.296533pt;}
      .fs0{font-size:100.482133pt;}
      .fs7{font-size:106.848533pt;}
      .y0{bottom:-0.666667pt;}
      .yd{bottom:282.013067pt;}
      .y3d{bottom:301.453681pt;}
      .y77{bottom:302.376748pt;}
      .y3c{bottom:323.955237pt;}
      .y76{bottom:324.878304pt;}
      .y3b{bottom:346.558000pt;}
      .y75{bottom:347.481067pt;}
      .y3a{bottom:377.184397pt;}
      .y74{bottom:378.107597pt;}
      .y38{bottom:390.734400pt;}
      .y72{bottom:391.657600pt;}
      .y37{bottom:414.170533pt;}
      .y36{bottom:414.171867pt;}
      .y71{bottom:415.095067pt;}
      .y35{bottom:438.509067pt;}
      .y70{bottom:439.432267pt;}
      .y39{bottom:458.311867pt;}
      .y73{bottom:459.235067pt;}
      .y78{bottom:624.121733pt;}
      .y34{bottom:625.455067pt;}
      .y27{bottom:652.924533pt;}
      .y26{bottom:652.925733pt;}
      .y33{bottom:652.934047pt;}
      .y63{bottom:653.847600pt;}
      .y62{bottom:653.848933pt;}
      .y6f{bottom:653.857247pt;}
      .y25{bottom:674.608133pt;}
      .y61{bottom:675.531200pt;}
      .y24{bottom:675.621067pt;}
      .y32{bottom:675.956503pt;}
      .y60{bottom:676.544267pt;}
      .y6e{bottom:676.879703pt;}
      .y21{bottom:698.315067pt;}
      .y20{bottom:698.316400pt;}
      .y2f{bottom:698.320586pt;}
      .y5d{bottom:699.238267pt;}
      .y5c{bottom:699.239600pt;}
      .y6b{bottom:699.243786pt;}
      .y1f{bottom:721.011733pt;}
      .y1e{bottom:721.013067pt;}
      .y2e{bottom:721.013855pt;}
      .y5b{bottom:721.934933pt;}
      .y5a{bottom:721.936133pt;}
      .y6a{bottom:721.937055pt;}
      .y1d{bottom:743.705733pt;}
      .y1c{bottom:743.707067pt;}
      .y2d{bottom:743.707124pt;}
      .y59{bottom:744.628933pt;}
      .y58{bottom:744.630267pt;}
      .y69{bottom:744.630324pt;}
      .y2c{bottom:766.400393pt;}
      .y1b{bottom:766.402400pt;}
      .y68{bottom:767.323593pt;}
      .y57{bottom:767.325467pt;}
      .y1a{bottom:768.281200pt;}
      .y56{bottom:769.204400pt;}
      .y19{bottom:788.783867pt;}
      .y2b{bottom:788.785050pt;}
      .y55{bottom:789.707067pt;}
      .y67{bottom:789.708250pt;}
      .y18{bottom:794.673383pt;}
      .y54{bottom:795.596450pt;}
      .y22{bottom:811.801986pt;}
      .y30{bottom:811.807505pt;}
      .y5e{bottom:812.725186pt;}
      .y6c{bottom:812.730705pt;}
      .y17{bottom:817.675264pt;}
      .y53{bottom:818.598331pt;}
      .y23{bottom:834.495255pt;}
      .y31{bottom:834.500774pt;}
      .y5f{bottom:835.418455pt;}
      .y6d{bottom:835.423974pt;}
      .y16{bottom:840.368533pt;}
      .y52{bottom:841.291600pt;}
      .y2a{bottom:860.197867pt;}
      .y66{bottom:861.121067pt;}
      .y29{bottom:878.762400pt;}
      .y65{bottom:879.685600pt;}
      .y28{bottom:886.088533pt;}
      .y64{bottom:887.011733pt;}
      .y15{bottom:900.711600pt;}
      .y51{bottom:901.634800pt;}
      .y14{bottom:911.709016pt;}
      .y50{bottom:912.632216pt;}
      .y13{bottom:930.938989pt;}
      .y10{bottom:931.335824pt;}
      .y4f{bottom:931.862189pt;}
      .y12{bottom:931.997216pt;}
      .yf{bottom:932.112960pt;}
      .y4c{bottom:932.259024pt;}
      .y4e{bottom:932.920416pt;}
      .y4b{bottom:933.036160pt;}
      .ye{bottom:949.854800pt;}
      .y4a{bottom:950.778000pt;}
      .y11{bottom:951.376002pt;}
      .y4d{bottom:952.299202pt;}
      .yc{bottom:965.132800pt;}
      .y49{bottom:966.056000pt;}
      .ya{bottom:972.264382pt;}
      .y47{bottom:973.187582pt;}
      .y9{bottom:991.527333pt;}
      .y46{bottom:992.450533pt;}
      .yb{bottom:1010.942094pt;}
      .y48{bottom:1011.865294pt;}
      .y8{bottom:1029.204400pt;}
      .y45{bottom:1030.127600pt;}
      .y7{bottom:1052.763733pt;}
      .y44{bottom:1053.686800pt;}
      .y2{bottom:1066.317067pt;}
      .y3f{bottom:1067.240267pt;}
      .y5{bottom:1073.378933pt;}
      .y6{bottom:1073.379600pt;}
      .y42{bottom:1074.302133pt;}
      .y43{bottom:1074.302800pt;}
      .y1{bottom:1081.289733pt;}
      .y3e{bottom:1082.212933pt;}
      .y4{bottom:1090.372343pt;}
      .y41{bottom:1091.295543pt;}
      .y3{bottom:1102.843733pt;}
      .y40{bottom:1103.766933pt;}
      .hd{height:40.091677pt;}
      .h8{height:40.898670pt;}
      .h3{height:46.422933pt;}
      .h5{height:50.822017pt;}
      .ha{height:56.127895pt;}
      .h7{height:57.258048pt;}
      .h4{height:59.292051pt;}
      .hf{height:66.228662pt;}
      .h6{height:67.762538pt;}
      .h10{height:68.882077pt;}
      .he{height:69.839539pt;}
      .h2{height:70.337493pt;}
      .h9{height:90.675171pt;}
      .hb{height:120.944311pt;}
      .hc{height:127.492092pt;}
      .h0{height:1122.520000pt;}
      .h1{height:1123.333333pt;}
      .w0{width:793.701333pt;}
      .w1{width:794.666667pt;}
      .x0{left:0.000000pt;}
      .x9{left:4.690133pt;}
      .xb{left:7.339200pt;}
      .x8{left:10.788400pt;}
      .x14{left:47.848933pt;}
      .x1{left:64.707067pt;}
      .x10{left:79.169333pt;}
      .x7{left:118.702533pt;}
      .xc{left:132.127336pt;}
      .x11{left:158.910133pt;}
      .x4{left:163.774800pt;}
      .xf{left:165.166000pt;}
      .xd{left:197.357122pt;}
      .x28{left:202.320267pt;}
      .x2{left:208.371733pt;}
      .x5{left:222.419867pt;}
      .x6{left:226.851600pt;}
      .x3{left:263.188640pt;}
      .x12{left:284.446348pt;}
      .xe{left:300.831900pt;}
      .x13{left:320.454400pt;}
      .xa{left:398.539067pt;}
      .x1d{left:400.570933pt;}
      .x1e{left:403.220000pt;}
      .x1c{left:406.669333pt;}
      .x27{left:443.729200pt;}
      .x15{left:460.587867pt;}
      .x23{left:475.050133pt;}
      .x1b{left:514.583333pt;}
      .x1f{left:528.008136pt;}
      .x24{left:554.791067pt;}
      .x18{left:559.655600pt;}
      .x22{left:561.046933pt;}
      .x20{left:593.237922pt;}
      .x16{left:604.252667pt;}
      .x19{left:618.300800pt;}
      .x1a{left:622.732400pt;}
      .x17{left:659.069573pt;}
      .x25{left:680.327281pt;}
      .x21{left:696.712700pt;}
      .x26{left:716.335333pt;}
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
            <img class="bi x0 y0 w1 h1" alt="" src="data:image/png;base64,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ABB+AAAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAED4eQoAAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAAAg/AAAABB+AAAACD8AAACE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AOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAADCzy4AAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAABA+AEAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAAIQfAAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAACD8AAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAIDwAwAAQPgBAAAg/AAAABB+AAAACD8AAACEHwAAAMIPAAAA4QcAACD8AAAAEH4AAAAIPwAAAIQfAAAAwg8AAADhBwAAgPADAAAQfgAAAAg/AAAAhB8AAADCDwAAAOEHAACA8AMAAED4AQAAIPwAAACEHwAAAMIPAAAA4QcAAIDwAwAAQPgBAAAg/AAAABB+AAAAwg8AAADhBwAAgPADAABA+AEAACD8AAAAEH4AAAAIPwAAAOEHAACA8AMAAED4AQAAIPwAAAAQfgAAAAg/AAAAhB8AAADCDwAAAAAAgDIY+8mqiIjoH6B3zF//+a1xf/3np8dGPD024tdj06+3jYloHRvRNibi36si3hp3ZP+1vW87A8UJESdXRcQJES+fENFalf75vf+9dWy6zf7+/v7Wqoj4x4h//YeIt05I30N/f3//5SdEvDwu4vJ3f8bLJ6RfX3DCB2+3uP1x6ffGuIhfj4t4a2zEgrERl7+7L94a8N7fGhPx9Lvbevnd//977/H/ATiORKJrwLQmAAAAAElFTkSuQmCC"/>
            <div class="t m0 x1 h2 y1 ff1 fs0 fc0 sc0 ls0 ws0"><span class="_"> </span><span class="_ _0"> </span><span class="_ _1"> </span><span class="_ _0"> </span><span class="_ _2"> </span><span class="_ _0"> </span></div>
            <div class="t m1 x1 h3 y2 ff2 fs1 fc1 sc0 ls0 ws1"><span class="_ _3"></span><span class="_ _3"></span><span class="_ _4"> </span><span class="_ _3"></span><span class="_ _5"> </span><span class="_ _3"></span><span class="_"> </span><span class="_ _3"></span><span class="_ _3"></span><span class="_ _6"></span><span class="_ _7"></span><span class="_ _3"></span><span class="_ _3"></span><span class="_ _6"></span><span class="_"> </span><span class="_ _6"></span><span class="_"> </span><span class="_ _3"></span><span class="_ _6"></span></div>
            <div class="t m2 x2 h4 y3 ff3 fs2 fc1 sc0 ls0 ws8">Rua Dr. Carlos Autran,</div>
            <div class="t m2 x3 h4 y4 ff3 fs2 fc1 sc0 ls0">n°15</div>
            <div class="t m2 x4 h4 y5 ff3 fs2 fc1 sc0 ls0">Contatos:</div>
            <div class="t m3 x5 h5 y6 ff3 fs3 fc1 sc0 ls1">(12)3152-1099/(12)99251-8477</div>
            <div class="t m2 x6 h4 y7 ff3 fs2 fc1 sc0 ls0 ws8">CRECI-J : 30558</div>
            
            <div class="t m4 x7 h6 y8 ff3 fs4 fc1 sc0 ls0 ws8">EXTRATO MENSAL</div>
            <div class="t m5 x8 h7 yb ff3 fs5 fc1 sc0 ls0 ws8">Locador: {{locator.fullName}}</div>
            <div class="t m5 x8 h7 y9 ff3 fs5 fc1 sc0 ls0 ws8">Locatário: {{tenant.fullName}}</div>
            <div class="t m5 x8 h7 ya ff3 fs5 fc1 sc0 ls0 ws8">Imóvel: {{property.address}}</div>
            <div class="t m7 xb ha ye ff3 fs8 fc1 sc0 ls0 ws8">Mês de Referência: {{installment.referenceMonth}}</div>
            <div class="t m7 xb hb yf ff3 fs8 fc1 sc0 ls0 wsa">Mês de Vencimento:<span class="v1"></span></div><div class="t m7 xc ha y10 ff3 fs8 fc1 sc0 ls0">{{installment.dueDateMonth}}</div>
            <div class="t m7 xd ha y11 ff3 fs8 fc1 sc0 ls0 ws2">Vencimento: {{installment.dueDate}}</div>
            <div class="t m7 xd hc y12 ff3 fs8 fc1 sc0 ls0 ws8">Data Pagamento: {{installment.paymentDate}}<span class="v2"></span></div>
            <div class="t m7 xb ha y14 ff3 fs8 fc1 sc0 ls0 ws8">N° PARCELA: {{installment.currentInstallment}}<span class="_ _11"> </span><span class="ws3 v3">CÓD: {{property.propertyCode}}</span></div>
            <div class="t m7 x9 hd y15 ff3 fs9 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m4 x10 h6 y28 ff3 fs4 fc1 sc0 ls0 ws8">IDENTIFICAÇÃO DOS ITENS</div>
            <div class="t m7 x9 hd y29 ff3 fs9 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m8 x11 he y2a ff3 fsa fc1 sc0 ls0 ws4">CRÉDITO</div>
            <div class="t m8 x12 he y2a ff3 fsa fc1 sc0 ls0 ws4">DÉBITO</div>
            <div class="t m7 xb he y16 ff3 fsa fc1 sc0 ls0">Aluguel:</div>
            <div class="t m8 xf he y23 ff3 fsa fc1 sc0 ls0">{{creditTransaction.rent}}</div>
            <div class="t m8 x12 he y31 ff3 fsa fc1 sc0 ls0">{{debitTransaction.rent}}</div>
            <div class="t m7 xb he y17 ff3 fsa fc1 sc0 ls0">IPTU:</div>
            <div class="t m8 xf he y22 ff3 fsa fc1 sc0 ls0">{{creditTransaction.iptu}}</div>
            <div class="t m8 x12 he y30 ff3 fsa fc1 sc0 ls0">{{debitTransaction.iptu}}</div>
            <div class="t m7 xb he y18 ff3 fsa fc1 sc0 ls0">Água:</div>
            <div class="t m8 xf he y19 ff3 fsa fc1 sc0 ls0">{{creditTransaction.water}}</div>
            <div class="t m8 x12 he y2b ff3 fsa fc1 sc0 ls0">{{debitTransaction.water}}</div>
            <div class="t m7 x9 he y1a ff3 fsa fc1 sc0 ls0">Luz:</div>
            <div class="t m8 xf he y1b ff3 fsa fc1 sc0 ls0">{{creditTransaction.eletricity}}</div>
            <div class="t m8 x12 he y2c ff3 fsa fc1 sc0 ls0">{{debitTransaction.eletricity}}</div>
            <div class="t m7 x9 he y1c ff3 fsa fc1 sc0 ls0">Condominio:</div>
            <div class="t m8 xf he y1d ff3 fsa fc1 sc0 ls0">{{creditTransaction.condominium}}</div>
            <div class="t m8 x12 he y2d ff3 fsa fc1 sc0 ls0">{{debitTransaction.condominium}}</div>
            <div class="t m7 x9 he y1e ff3 fsa fc1 sc0 ls0 ws8">Imposto de renda:</div>
            <div class="t m8 xf he y1f ff3 fsa fc1 sc0 ls0">{{creditTransaction.incomeTax}}</div>
            <div class="t m8 x12 he y2e ff3 fsa fc1 sc0 ls0">{{debitTransaction.incomeTax}}</div>
            <div class="t m7 x9 he y20 ff3 fsa fc1 sc0 ls0 ws8">Desconto especial:</div>
            <div class="t m8 xf he y21 ff3 fsa fc1 sc0 ls0">{{creditTransaction.specialDiscount}}</div>
            <div class="t m8 x12 he y2f ff3 fsa fc1 sc0 ls0">R$0,00</div>
            <div class="t m7 x9 he y24 ff3 fsa fc1 sc0 ls0 ws4">Diversos*:</div>
            <div class="t m8 xf he y25 ff3 fsa fc1 sc0 ls0">{{creditTransaction.sundry}}</div>
            <div class="t m8 x12 he y32 ff3 fsa fc1 sc0 ls0">{{debitTransaction.sundry}}</div>
            <div class="t m7 x9 he y26 ff3 fsa fc1 sc0 ls0 ws8">Multa recisória:</div>
            <div class="t m8 xf he y27 ff3 fsa fc1 sc0 ls0">R$00,00</div>
            <div class="t m8 x12 he y33 ff3 fsa fc1 sc0 ls0">R$00,00</div>
            <div class="t m9 x9 h10 y34 ff3 fsb fc1 sc0 ls0 ws8">*Descrição de crédito em diversos<br>teste</br></br></div>
            <div class="t m9 x28 h10 y78 ff3 fsb fc1 sc0 ls0 ws8">*Descrição de dédito em diversos<br>teste</br></div>
            <div class="t m7 xb hd y39 ff3 fs9 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m7 x9 he y35 ff3 fsa fc1 sc0 ls0 ws8">Total Crédito:</div>
            <div class="t m8 x13 he y35 ff3 fsa fc1 sc0 ls0">{{creditTransaction.amount}}</div>
            <div class="t m7 x9 he y36 ff3 fsa fc1 sc0 ls0 ws8">Total Débito</div>
            <div class="t m8 x13 he y37 ff3 fsa fc1 sc0 ls0">{{debitTransaction.amount}}</div>
            <div class="t m7 x9 he y38 ff3 fsa fc1 sc0 ls0">Saldo:</div>
            <div class="t m8 x13 he y38 ff3 fsa fc1 sc0 ls0">R$00,00</div>
            <div class="t m7 xb hd y3a ff3 fs9 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m5 x14 h7 y3b ff3 fs5 fc1 sc0 ls0 ws5">Banco: Santander</div>
            <div class="t m5 x14 h7 y3c ff3 fs5 fc1 sc0 ls0 ws6">Agência: 0000</div>
            <div class="t m5 x14 h7 y3d ff3 fs5 fc1 sc0 ls0 ws7">Conta: 000000-00</div>
            <div class="t m6 xa h9 yd ff3 fs7 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <!-- Lado DIREITO do extrato -->
            <div class="t m0 x15 h2 y3e ff1 fs0 fc0 sc0 ls0 ws0"><span class="_"> </span><span class="_ _0"> </span><span class="_ _1"> </span><span class="_ _0"> </span><span class="_ _2"> </span><span class="_ _0"> </span></div>
            <div class="t m1 x15 h3 y3f ff2 fs1 fc1 sc0 ls0 ws1"><span class="_ _3"></span><span class="_ _3"></span><span class="_ _4"> </span><span class="_ _3"></span><span class="_ _5"> </span><span class="_ _3"></span><span class="_"> </span><span class="_ _3"></span><span class="_ _3"></span><span class="_ _6"></span><span class="_ _7"></span><span class="_ _3"></span><span class="_ _3"></span><span class="_ _6"></span><span class="_"> </span><span class="_ _6"></span><span class="_"> </span><span class="_ _3"></span><span class="_ _6"></span></div>
            <div class="t m2 x16 h4 y40 ff3 fs2 fc1 sc0 ls0 ws8">Rua Dr. Carlos Autran,</div>
            <div class="t m2 x17 h4 y41 ff3 fs2 fc1 sc0 ls0">n°15</div>
            <div class="t m2 x18 h4 y42 ff3 fs2 fc1 sc0 ls0">Contatos:</div>
            <div class="t m3 x19 h5 y43 ff3 fs3 fc1 sc0 ls1">(12)3152-1099/(12)99251-8477</div>
            <div class="t m2 x1a h4 y44 ff3 fs2 fc1 sc0 ls0 ws8">CRECI-J : 30558</div>
            <div class="t m4 x1b h6 y45 ff3 fs4 fc1 sc0 ls0 ws8">EXTRATO MENSAL</div>
            <div class="t m5 x1c h7 y46 ff3 fs5 fc1 sc0 ls0 ws8">Locatário: {{tenant.fullName}}</div>
            <div class="t m5 x1c h7 y47 ff3 fs5 fc1 sc0 ls0 ws8">Imóvel: {{property.address}}</div>
            <div class="t m5 x1d h8 y49 ff3 fs6 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m5 x1c h7 y48 ff3 fs5 fc1 sc0 ls0 ws8">Locador: {{locator.fullName}}</div>
            <div class="t m7 x1e ha y4a ff3 fs8 fc1 sc0 ls0 ws8">Mês de Referência: {{installment.referenceMonth}}</div>
            <div class="t m7 x1e hb y4b ff3 fs8 fc1 sc0 ls0 wsa">Mês de Vencimento: {{installment.dueDateMonth}}<span class="v1"></span></div>
            <div class="t m7 x20 ha y4d ff3 fs8 fc1 sc0 ls0 ws2">Vencimento: {{installment.dueDate}}</div>
            <div class="t m7 x20 hc y4e ff3 fs8 fc1 sc0 ls0 ws8">Data Pagamento: {{installment.paymentDate}}<span class="v2"></span></div>
            <div class="t m7 x1e ha y50 ff3 fs8 fc1 sc0 ls0 ws8">N° PARCELA: {{installment.currentInstallment}}<span class="_ _11"> </span><span class="ws3 v3">CÓD: {{property.propertyCode}}</span></div>
            <div class="t m7 x1d hd y51 ff3 fs9 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m4 x23 h6 y64 ff3 fs4 fc1 sc0 ls0 ws8">IDENTIFICAÇÃO DOS ITENS</div>
            <div class="t m7 x1d hd y65 ff3 fs9 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m8 x24 he y66 ff3 fsa fc1 sc0 ls0 ws4">CRÉDITO</div>
            <div class="t m8 x25 he y66 ff3 fsa fc1 sc0 ls0 ws4">DÉBITO</div>
            <div class="t m7 x1e he y52 ff3 fsa fc1 sc0 ls0">Aluguel:</div>
            <div class="t m8 x22 he y5f ff3 fsa fc1 sc0 ls0">{{creditTransaction.rent}}</div>
            <div class="t m8 x25 he y6d ff3 fsa fc1 sc0 ls0">{{debitTransaction.rent}}</div>
            <div class="t m7 x1e he y53 ff3 fsa fc1 sc0 ls0">IPTU:</div>
            <div class="t m8 x22 he y5e ff3 fsa fc1 sc0 ls0">{{creditTransaction.iptu}}</div>
            <div class="t m8 x25 he y6c ff3 fsa fc1 sc0 ls0">{{debitTransaction.iptu}}</div>
            <div class="t m7 x1e he y54 ff3 fsa fc1 sc0 ls0">Água:</div>
            <div class="t m8 x22 he y55 ff3 fsa fc1 sc0 ls0">{{creditTransaction.water}}</div>
            <div class="t m8 x25 he y67 ff3 fsa fc1 sc0 ls0">{{debitTransaction.water}}</div>
            <div class="t m7 x1e he y56 ff3 fsa fc1 sc0 ls0">Luz:</div>
            <div class="t m8 x22 he y57 ff3 fsa fc1 sc0 ls0">{{creditTransaction.eletricity}}</div>
            <div class="t m8 x25 he y68 ff3 fsa fc1 sc0 ls0">{{debitTransaction.eletricity}}</div>
            <div class="t m7 x1e he y58 ff3 fsa fc1 sc0 ls0">Condominio:</div>
            <div class="t m8 x22 he y59 ff3 fsa fc1 sc0 ls0">{{creditTransaction.condominium}}</div>
            <div class="t m8 x25 he y69 ff3 fsa fc1 sc0 ls0">{{debitTransaction.condominium}}</div>
            <div class="t m7 x1e he y5a ff3 fsa fc1 sc0 ls0 ws8">Imposto de renda:</div>
            <div class="t m8 x22 he y5b ff3 fsa fc1 sc0 ls0">{{creditTransaction.incomeTax}}</div>
            <div class="t m8 x25 he y6a ff3 fsa fc1 sc0 ls0">{{debitTransaction.incomeTax}}</div>
            <div class="t m7 x1e he y5c ff3 fsa fc1 sc0 ls0 ws8">Desconto especial:</div>
            <div class="t m8 x22 he y5d ff3 fsa fc1 sc0 ls0">{{creditTransaction.specialDiscount}}</div>
            <div class="t m8 x25 he y6b ff3 fsa fc1 sc0 ls0">R$ 0,00</div>
            <div class="t m7 x1e he y60 ff3 fsa fc1 sc0 ls0 ws4">Diversos*:</div>
            <div class="t m8 x22 he y61 ff3 fsa fc1 sc0 ls0">{{creditTransaction.sundry}}</div>
            <div class="t m8 x25 he y6e ff3 fsa fc1 sc0 ls0">{{debitTransaction.sundry}}</div>
            <div class="t m7 x1e he y62 ff3 fsa fc1 sc0 ls0 ws8">Multa recisória:</div>
            <div class="t m8 x22 he y63 ff3 fsa fc1 sc0 ls0">R$00,00</div>
            <div class="t m8 x25 he y6f ff3 fsa fc1 sc0 ls0">R$00,00</div>
            <div class="t m9 x1e h10 y34 ff3 fsb fc1 sc0 ls0 ws8">*Descrição de crédito em diversos<br> teste</br></div>
            <div class="t m9 x20 h10 y34 ff3 fsb fc1 sc0 ls0 ws8">*Descrição de dédito em diversos<br> teste</br></br></div>
            <div class="t m7 x1e hd y73 ff3 fs9 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m7 x1d he y70 ff3 fsa fc1 sc0 ls0 ws8">Total Crédito:</div>
            <div class="t m8 x26 he y70 ff3 fsa fc1 sc0 ls0">{{creditTransaction.amount}}</div>
            <div class="t m7 x1d he y71 ff3 fsa fc1 sc0 ls0 ws8">Total Débito</div>
            <div class="t m8 x26 he y71 ff3 fsa fc1 sc0 ls0">{{debitTransaction.amount}}</div>
            <div class="t m7 x1d he y72 ff3 fsa fc1 sc0 ls0">Saldo:</div>
            <div class="t m8 x26 he y72 ff3 fsa fc1 sc0 ls0">R$00,00</div>
            <div class="t m7 x1e hd y74 ff3 fs9 fc1 sc0 ls0">------------------------------------------------------------------------------------------------------</div>
            <div class="t m5 x27 h7 y75 ff3 fs5 fc1 sc0 ls0 ws5">Banco: Santander</div>
            <div class="t m5 x27 h7 y76 ff3 fs5 fc1 sc0 ls0 ws6">Agência: 0000</div>
            <div class="t m5 x27 h7 y77 ff3 fs5 fc1 sc0 ls0 ws7">Conta: 000000-00</div> 
         </div>
         <div class="pi" data-data='{"ctm":[1.000000,0.000000,0.000000,1.000000,0.000000,0.000000]}'></div>
      </div>
   </div>
   <div class="loading-indicator">
      <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAwAACAEBDAIDFgQFHwUIKggLMggPOgsQ/w1x/Q5v/w5w9w9ryhBT+xBsWhAbuhFKUhEXUhEXrhJEuxJKwBJN1xJY8hJn/xJsyhNRoxM+shNF8BNkZxMfXBMZ2xRZlxQ34BRb8BRk3hVarBVA7RZh8RZi4RZa/xZqkRcw9Rdjihgsqxg99BhibBkc5hla9xli9BlgaRoapho55xpZ/hpm8xpfchsd+Rtibxsc9htgexwichwdehwh/hxk9Rxedx0fhh4igB4idx4eeR4fhR8kfR8g/h9h9R9bdSAb9iBb7yFX/yJfpCMwgyQf8iVW/iVd+iVZ9iVWoCYsmycjhice/ihb/Sla+ylX/SpYmisl/StYjisfkiwg/ixX7CxN9yxS/S1W/i1W6y1M9y1Q7S5M6S5K+i5S6C9I/i9U+jBQ7jFK/jFStTIo+DJO9zNM7TRH+DRM/jRQ8jVJ/jZO8DhF9DhH9jlH+TlI/jpL8jpE8zpF8jtD9DxE7zw9/z1I9j1A9D5C+D5D4D8ywD8nwD8n90A/8kA8/0BGxEApv0El7kM5+ENA+UNAykMp7kQ1+0RB+EQ+7EQ2/0VCxUUl6kU0zkUp9UY8/kZByUkj1Eoo6Usw9Uw3300p500t3U8p91Ez11Ij4VIo81Mv+FMz+VM0/FM19FQw/lQ19VYv/lU1/1cz7Fgo/1gy8Fkp9lor4loi/1sw8l0o9l4o/l4t6l8i8mAl+WEn8mEk52Id9WMk9GMk/mMp+GUj72Qg8mQh92Uj/mUn+GYi7WYd+GYj6mYc62cb92ch8Gce7mcd6Wcb6mcb+mgi/mgl/Gsg+2sg+Wog/moj/msi/mwh/m0g/m8f/nEd/3Ic/3Mb/3Qb/3Ua/3Ya/3YZ/3cZ/3cY/3gY/0VC/0NE/0JE/w5wl4XsJQAAAPx0Uk5TAAAAAAAAAAAAAAAAAAAAAAABCQsNDxMWGRwhJioyOkBLT1VTUP77/vK99zRpPkVmsbbB7f5nYabkJy5kX8HeXaG/11H+W89Xn8JqTMuQcplC/op1x2GZhV2I/IV+HFRXgVSN+4N7n0T5m5RC+KN/mBaX9/qp+pv7mZr83EX8/N9+5Nip1fyt5f0RQ3rQr/zo/cq3sXr9xrzB6hf+De13DLi8RBT+wLM+7fTIDfh5Hf6yJMx0/bDPOXI1K85xrs5q8fT47f3q/v7L/uhkrP3lYf2ryZ9eit2o/aOUmKf92ILHfXNfYmZ3a9L9ycvG/f38+vr5+vz8/Pv7+ff36M+a+AAAAAFiS0dEQP7ZXNgAAAj0SURBVFjDnZf/W1J5Fsf9D3guiYYwKqglg1hqplKjpdSojYizbD05iz5kTlqjqYwW2tPkt83M1DIm5UuomZmkW3bVrmupiCY1mCNKrpvYM7VlTyjlZuM2Y+7nXsBK0XX28xM8957X53zO55z3OdcGt/zi7Azbhftfy2b5R+IwFms7z/RbGvI15w8DdkVHsVi+EGa/ZZ1bYMDqAIe+TRabNv02OiqK5b8Z/em7zs3NbQO0GoD0+0wB94Ac/DqQEI0SdobIOV98Pg8AfmtWAxBnZWYK0vYfkh7ixsVhhMDdgZs2zc/Pu9HsVwc4DgiCNG5WQoJ/sLeXF8070IeFEdzpJh+l0pUB+YBwRJDttS3cheJKp9MZDMZmD5r7+vl1HiAI0qDtgRG8lQAlBfnH0/Miqa47kvcnccEK2/1NCIdJ96Ctc/fwjfAGwXDbugKgsLggPy+csiOZmyb4LiEOjQMIhH/YFg4TINxMKxxaCmi8eLFaLJVeyi3N2eu8OTctMzM9O2fjtsjIbX5ewf4gIQK/5gR4uGP27i5LAdKyGons7IVzRaVV1Jjc/PzjP4TucHEirbUjEOyITvQNNH+A2MLj0NYDAM1x6RGk5e9raiQSkSzR+XRRcUFOoguJ8NE2kN2XfoEgsUN46DFoDlZi0DA3Bwiyg9TzpaUnE6kk/OL7xgdE+KBOgKSkrbUCuHJ1bu697KDrGZEoL5yMt5YyPN9glo9viu96GtEKQFEO/34tg1omEVVRidBy5bUdJXi7R4SIxWJzPi1cYwMMV1HO10gqnQnLFygPEDxSaPPuYPlEiD8B3IIrqDevvq9ytl1JPjhhrMBdIe7zaHG5oZn5sQf7YirgJqrV/aWHLPnPCQYis2U9RthjawHIFa0NnZcpZbCMTbRmnszN3mz5EwREJmX7JrQ6nU0eyFvbtX2dyi42/yqcQf40fnIsUsfSBIJIixhId7OCA7aA8nR3sTfF4EHn3d5elaoeONBEXXR/hWdzgZvHMrMjXWwtVczxZ3nwdm76fBvJfAvtajUgKPfxO1VHHRY5f6PkJBCBwrQcSor8WFIQFgl5RFQw/RuWjwveDGjr16jVvT3UBmXPYgdw0jPFOyCgEem5fw06BMqTu/+AGMeJjtrA8aGRFhJpqEejvlvl2qeqJC2J3+nSRHwhWlyZXvTkrLSEhAQuRxoW5RXA9aZ/yESUkMrv7IpffIWXbhSW5jkVlhQUpHuxHdbQt0b6ZcWF4vdHB9MjWNs5cgsAatd0szvu9rguSmFxWUVZSUmM9ERocbarPfoQ4nETNtofiIvzDIpCFUJqzgPFYI+rVt3k9MH2ys0bOFw1qG+R6DDelnmuYAcGF38vyHKxE++M28BBu47PbrE5kR62UB6qzSFQyBtvVZfDdVdwF2tO7jsrugCK93Rxoi1mf+QHtgNOyo3bxgsEis9i+a3BAA8GWlwHNRlYmTdqkQ64DobhHwNuzl0mVctKGKhS5jGBfW5mdjgJAs0nbiP9KyCVUSyaAwAoHvSPXGYMDgjRGCq0qgykE64/WAffrP5bPVl6ToJeZFFJDMCkp+/BUjUpwYvORdXWi2IL8uDR2NjIdaYJAOy7UpnlqlqHW3A5v66CgbsoQb3PLT2MB1mR+BkWiqTvACAuOnivEwFn82TixYuxsWYTQN6u7hI6Qg3KWvtLZ6/xy2E+rrqmCHhfiIZCznMyZVqSAAV4u4Dj4GwmpiYBoYXxeKSWgLvfpRaCl6qV4EbK4MMNcKVt9TVZjCWnIcjcgAV+9K+yXLCY2TwyTk1OvrjD0I4027f2DAgdwSaNPZ0xQGFq+SAQDXPvMe/zPBeyRFokiPwyLdRUODZtozpA6GeMj9xxbB24l4Eo5Di5VtUMdajqHYHOwbK5SrAVz/mDUoqzj+wJSfsiwJzKvJhh3aQxdmjsnqdicGCgu097X3G/t7tDq2wiN5bD1zIOL1aZY8fTXZMFAtPwguYBHvl5Soj0j8VDSEb9vQGN5hbS06tUqapIuBuHDzoTCItS/ER+DiUpU5C964Ootk3cZj58cdsOhycz4pvvXGf23W3q7I4HkoMnLOkR0qKCUDo6h2TtWgAoXvYz/jXZH4O1MQIzltiuro0N/8x6fygsLmYHoVOEIItnATyZNg636V8Mm3eDcK2avzMh6/bSM6V5lNwCjLAVMlfjozevB5mjk7qF0aNR1x27TGsoLC3dx88uwOYQIGsY4PmvM2+mnyO6qVGL9sq1GqF1By6dE+VRThQX54RG7qESTUdAfns7M/PGwHs29WrI8t6DO6lWW4z8vES0l1+St5dCsl9j6Uzjs7OzMzP/fnbKYNQjlhcZ1lt0dYWkinJG9JeFtLIAAEGPIHqjoW3F0fpKRU0e9aJI9Cfo4/beNmwwGPTv3hhSnk4bf16JcOXH3yvY/CIJ0LlP5gO8A5nsHDs8PZryy7TRgCxnLq+ug2V7PS+AWeiCvZUx75RhZjzl+bRxYkhuPf4NmH3Z3PsaSQXfCkBhePuf8ZSneuOrfyBLEYrqchXcxPYEkwwg1Cyc4RPA7Oyvo6cQw2ujbhRRLDLXdimVVVQgUjBGqFy7FND2G7iMtwaE90xvnHr18BekUSHHhoe21vY+Za+yZZ9zR13d5crKs7JrslTiUsATFDD79t2zU8xhvRHIlP7xI61W+3CwX6NRd7WkUmK0SuVBMpHo5PnncCcrR3g+a1rTL5+mMJ/f1r1C1XZkZASITEttPCWmoUel6ja1PwiCrATxKfDgXfNR9lH9zMtxJIAZe7QZrOu1wng2hTGk7UHnkI/b39IgDv8kdCXb4aFnoDKmDaNPEITJZDKY/KEObR84BTqH1JNX+mLBOxCxk7W9ezvz5vVr4yvdxMvHj/X94BT11+8BxN3eJvJqPvvAfaKE6fpa3eQkFohaJyJzGJ1D6kmr+m78J7iMGV28oz0ygRHuUG1R6e3TqIXEVQHQ+9Cz0cYFRAYQzMMXLz6Vgl8VoO0lsMeMoPGpqUmdZfiCbPGr/PRF4i0je6PBaBSS/vjHN35hK+QnoTP+//t6Ny+Cw5qVHv8XF+mWyZITVTkAAAAASUVORK5CYII="/>
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
