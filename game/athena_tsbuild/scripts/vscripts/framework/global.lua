local __TSTL_FILE_PATH__ = "framework/global"
local ____lualib = require("lualib_bundle")
local __TS__NumberIsFinite = ____lualib.__TS__NumberIsFinite
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__StringSubstring = ____lualib.__TS__StringSubstring
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 455,["19"] = 456,["20"] = 457,["21"] = 458,["22"] = 459,["24"] = 461,["25"] = 455,["31"] = 681,["32"] = 681,["33"] = 681,["35"] = 682,["36"] = 683,["37"] = 684,["39"] = 686,["40"] = 681,["42"] = 6,["43"] = 7,["44"] = 8,["45"] = 9,["46"] = 10,["48"] = 8,["51"] = 22,["52"] = 23,["53"] = 24,["55"] = 27,["56"] = 28,["57"] = 29,["58"] = 30,["59"] = 31,["60"] = 32,["61"] = 33,["64"] = 36,["67"] = 39,["68"] = 22,["69"] = 49,["70"] = 50,["71"] = 49,["72"] = 52,["73"] = 53,["74"] = 54,["75"] = 52,["79"] = 60,["80"] = 61,["81"] = 62,["83"] = 65,["84"] = 66,["85"] = 67,["87"] = 70,["88"] = 60,["89"] = 72,["90"] = 73,["93"] = 74,["96"] = 75,["99"] = 76,["100"] = 77,["101"] = 78,["102"] = 79,["103"] = 81,["104"] = 82,["105"] = 83,["107"] = 85,["108"] = 81,["110"] = 72,["114"] = 93,["115"] = 93,["116"] = 93,["118"] = 93,["119"] = 93,["121"] = 94,["122"] = 95,["124"] = 98,["125"] = 99,["128"] = 103,["129"] = 104,["132"] = 108,["133"] = 109,["134"] = 110,["135"] = 112,["136"] = 114,["137"] = 115,["138"] = 116,["140"] = 118,["141"] = 119,["142"] = 120,["145"] = 123,["146"] = 124,["149"] = 128,["150"] = 129,["152"] = 93,["156"] = 137,["157"] = 138,["160"] = 139,["161"] = 140,["162"] = 140,["163"] = 140,["164"] = 140,["166"] = 142,["168"] = 137,["174"] = 152,["175"] = 152,["176"] = 152,["178"] = 153,["179"] = 154,["180"] = 155,["182"] = 157,["183"] = 152,["188"] = 165,["189"] = 166,["190"] = 167,["191"] = 168,["192"] = 169,["195"] = 172,["196"] = 165,["202"] = 182,["203"] = 183,["204"] = 184,["205"] = 185,["206"] = 186,["207"] = 187,["210"] = 190,["212"] = 192,["213"] = 182,["218"] = 200,["219"] = 201,["220"] = 202,["221"] = 203,["222"] = 204,["223"] = 205,["225"] = 207,["226"] = 207,["227"] = 207,["228"] = 207,["230"] = 209,["232"] = 211,["233"] = 200,["238"] = 219,["240"] = 220,["241"] = 220,["242"] = 221,["243"] = 222,["244"] = 222,["245"] = 222,["246"] = 220,["249"] = 224,["250"] = 219,["255"] = 232,["256"] = 233,["257"] = 232,["263"] = 242,["264"] = 242,["265"] = 242,["267"] = 243,["268"] = 244,["270"] = 246,["271"] = 247,["273"] = 248,["274"] = 248,["275"] = 249,["276"] = 248,["279"] = 251,["280"] = 252,["281"] = 253,["284"] = 256,["285"] = 242,["290"] = 264,["291"] = 265,["292"] = 266,["293"] = 267,["294"] = 268,["295"] = 269,["297"] = 271,["300"] = 274,["303"] = 277,["304"] = 264,["310"] = 286,["311"] = 287,["312"] = 288,["313"] = 289,["314"] = 290,["315"] = 291,["316"] = 292,["318"] = 294,["321"] = 297,["325"] = 301,["326"] = 286,["331"] = 309,["332"] = 310,["333"] = 311,["334"] = 312,["335"] = 313,["336"] = 314,["338"] = 316,["339"] = 309,["345"] = 324,["346"] = 324,["347"] = 324,["349"] = 325,["352"] = 326,["353"] = 326,["354"] = 326,["355"] = 326,["356"] = 327,["357"] = 324,["362"] = 335,["363"] = 336,["364"] = 337,["366"] = 339,["367"] = 335,["373"] = 349,["374"] = 350,["375"] = 351,["376"] = 352,["377"] = 353,["380"] = 349,["381"] = 358,["382"] = 359,["383"] = 360,["384"] = 361,["386"] = 363,["387"] = 358,["393"] = 372,["394"] = 372,["395"] = 372,["397"] = 373,["398"] = 374,["399"] = 375,["400"] = 376,["401"] = 372,["406"] = 384,["407"] = 385,["408"] = 386,["409"] = 386,["410"] = 386,["411"] = 386,["412"] = 386,["413"] = 384,["418"] = 394,["419"] = 394,["420"] = 394,["422"] = 395,["423"] = 396,["425"] = 400,["426"] = 403,["427"] = 404,["428"] = 405,["429"] = 407,["430"] = 408,["431"] = 409,["433"] = 412,["434"] = 412,["435"] = 412,["436"] = 412,["437"] = 412,["438"] = 413,["439"] = 413,["440"] = 413,["441"] = 413,["442"] = 413,["443"] = 414,["444"] = 414,["445"] = 414,["446"] = 414,["447"] = 414,["448"] = 415,["449"] = 394,["453"] = 422,["454"] = 423,["455"] = 422,["457"] = 429,["458"] = 429,["459"] = 429,["461"] = 430,["462"] = 431,["464"] = 433,["465"] = 434,["466"] = 435,["467"] = 436,["468"] = 437,["469"] = 429,["470"] = 440,["471"] = 441,["472"] = 440,["473"] = 444,["474"] = 445,["475"] = 444,["480"] = 469,["481"] = 470,["482"] = 469,["483"] = 473,["484"] = 474,["485"] = 473,["486"] = 477,["487"] = 478,["488"] = 477,["489"] = 481,["490"] = 482,["491"] = 481,["498"] = 492,["499"] = 493,["500"] = 493,["501"] = 493,["502"] = 493,["503"] = 493,["504"] = 492,["509"] = 501,["510"] = 502,["511"] = 501,["512"] = 505,["513"] = 506,["514"] = 507,["516"] = 510,["517"] = 505,["518"] = 513,["519"] = 514,["520"] = 515,["522"] = 518,["523"] = 519,["524"] = 520,["525"] = 513,["531"] = 529,["532"] = 530,["533"] = 531,["534"] = 532,["535"] = 533,["536"] = 534,["537"] = 535,["538"] = 536,["540"] = 538,["542"] = 540,["543"] = 529,["545"] = 543,["546"] = 545,["547"] = 545,["549"] = 547,["550"] = 547,["552"] = 549,["553"] = 543,["555"] = 553,["556"] = 555,["557"] = 555,["559"] = 557,["560"] = 557,["562"] = 559,["563"] = 553,["565"] = 563,["566"] = 565,["567"] = 565,["569"] = 567,["570"] = 567,["572"] = 569,["573"] = 563,["575"] = 573,["576"] = 575,["577"] = 575,["579"] = 577,["580"] = 577,["582"] = 579,["583"] = 580,["584"] = 581,["585"] = 573,["589"] = 589,["590"] = 590,["591"] = 589,["592"] = 594,["593"] = 595,["594"] = 594,["595"] = 597,["596"] = 598,["597"] = 597,["598"] = 601,["599"] = 601,["600"] = 602,["601"] = 603,["602"] = 604,["604"] = 606,["605"] = 601,["606"] = 610,["607"] = 611,["608"] = 610,["609"] = 613,["610"] = 614,["611"] = 613,["612"] = 616,["613"] = 616,["614"] = 617,["615"] = 618,["616"] = 619,["618"] = 621,["619"] = 616,["620"] = 625,["621"] = 626,["622"] = 627,["623"] = 628,["624"] = 629,["626"] = 625,["627"] = 633,["628"] = 634,["629"] = 633,["630"] = 636,["631"] = 636,["632"] = 637,["633"] = 638,["634"] = 639,["636"] = 641,["637"] = 636,["638"] = 645,["639"] = 646,["640"] = 645,["641"] = 648,["642"] = 648,["643"] = 649,["644"] = 650,["645"] = 651,["647"] = 653,["648"] = 648,["649"] = 657,["650"] = 658,["651"] = 659,["653"] = 661,["655"] = 657,["656"] = 664,["657"] = 664,["658"] = 665,["659"] = 666,["660"] = 667,["661"] = 668,["662"] = 669,["665"] = 672,["666"] = 664,["671"] = 694,["672"] = 695,["673"] = 696,["674"] = 694,["681"] = 705,["682"] = 705,["683"] = 705,["685"] = 706,["686"] = 705,["687"] = 709,["688"] = 710,["689"] = 711,["691"] = 713,["692"] = 714,["693"] = 715,["694"] = 716,["697"] = 719,["698"] = 709,["699"] = 722,["700"] = 723,["701"] = 724,["702"] = 725,["704"] = 727,["705"] = 722,["706"] = 730,["707"] = 730,["708"] = 730,["710"] = 730,["711"] = 730,["713"] = 730,["714"] = 730,["716"] = 731,["717"] = 731,["718"] = 731,["719"] = 731,["720"] = 731,["721"] = 731,["722"] = 731,["723"] = 731,["724"] = 731,["725"] = 730,["726"] = 734,["727"] = 734,["728"] = 734,["730"] = 734,["731"] = 734,["733"] = 734,["734"] = 734,["736"] = 735,["740"] = 738,["741"] = 738,["742"] = 739,["743"] = 740,["744"] = 741,["745"] = 742,["746"] = 742,["747"] = 742,["748"] = 742,["749"] = 742,["750"] = 742,["751"] = 742,["752"] = 738,["755"] = 734,["756"] = 746,["757"] = 746,["758"] = 746,["760"] = 746,["761"] = 746,["763"] = 746,["764"] = 746,["766"] = 746,["767"] = 746,["769"] = 747,["772"] = 751,["773"] = 752,["774"] = 753,["776"] = 754,["777"] = 754,["778"] = 755,["779"] = 756,["780"] = 757,["781"] = 758,["782"] = 758,["783"] = 758,["784"] = 758,["785"] = 758,["786"] = 758,["787"] = 758,["789"] = 760,["790"] = 754,["793"] = 746,["794"] = 764,["795"] = 764,["796"] = 764,["798"] = 764,["799"] = 764,["801"] = 764,["802"] = 764,["804"] = 764,["805"] = 764,["807"] = 765,["810"] = 769,["811"] = 770,["812"] = 771,["813"] = 772,["814"] = 773,["815"] = 773,["816"] = 773,["817"] = 773,["818"] = 773,["819"] = 773,["820"] = 773,["821"] = 774,["822"] = 774,["823"] = 774,["824"] = 774,["825"] = 774,["826"] = 774,["827"] = 774,["828"] = 775,["829"] = 775,["830"] = 775,["831"] = 775,["832"] = 775,["833"] = 775,["834"] = 775,["835"] = 775,["836"] = 775,["837"] = 775,["838"] = 764,["839"] = 778,["840"] = 778,["841"] = 778,["843"] = 778,["844"] = 778,["846"] = 778,["847"] = 778,["849"] = 779,["852"] = 783,["853"] = 784,["854"] = 784,["855"] = 784,["856"] = 784,["857"] = 784,["858"] = 785,["859"] = 786,["860"] = 792,["861"] = 778,["862"] = 795,["863"] = 795,["864"] = 795,["866"] = 795,["867"] = 795,["869"] = 795,["870"] = 795,["872"] = 795,["873"] = 795,["875"] = 796,["878"] = 800,["879"] = 801,["880"] = 802,["881"] = 803,["882"] = 804,["883"] = 805,["884"] = 806,["885"] = 807,["886"] = 809,["887"] = 809,["888"] = 809,["889"] = 809,["890"] = 809,["891"] = 809,["892"] = 809,["893"] = 810,["894"] = 810,["895"] = 810,["896"] = 810,["897"] = 810,["898"] = 810,["899"] = 810,["900"] = 811,["901"] = 811,["902"] = 811,["903"] = 811,["904"] = 811,["905"] = 811,["906"] = 811,["907"] = 812,["908"] = 812,["909"] = 812,["910"] = 812,["911"] = 812,["912"] = 812,["913"] = 812,["914"] = 812,["915"] = 812,["916"] = 812,["917"] = 813,["918"] = 813,["919"] = 813,["920"] = 813,["921"] = 813,["922"] = 813,["923"] = 813,["924"] = 814,["925"] = 814,["926"] = 814,["927"] = 814,["928"] = 814,["929"] = 814,["930"] = 814,["931"] = 815,["932"] = 815,["933"] = 815,["934"] = 815,["935"] = 815,["936"] = 815,["937"] = 815,["938"] = 815,["939"] = 795,["952"] = 831,["953"] = 832,["954"] = 833,["955"] = 833,["956"] = 833,["957"] = 833,["958"] = 833,["959"] = 833,["960"] = 833,["961"] = 833,["962"] = 833,["963"] = 833,["964"] = 833,["965"] = 834,["966"] = 835,["967"] = 836,["968"] = 837,["969"] = 838,["970"] = 839,["971"] = 840,["972"] = 841,["975"] = 844,["976"] = 831,["991"] = 862,["992"] = 863,["993"] = 864,["994"] = 865,["996"] = 868,["997"] = 869,["998"] = 870,["999"] = 871,["1000"] = 872,["1001"] = 872,["1002"] = 872,["1003"] = 872,["1004"] = 872,["1005"] = 872,["1006"] = 872,["1007"] = 872,["1008"] = 872,["1009"] = 872,["1010"] = 872,["1011"] = 873,["1013"] = 874,["1014"] = 875,["1015"] = 876,["1016"] = 877,["1017"] = 878,["1018"] = 879,["1019"] = 880,["1021"] = 883,["1022"] = 884,["1023"] = 885,["1024"] = 886,["1025"] = 887,["1030"] = 890,["1031"] = 862,["1044"] = 907,["1045"] = 907,["1046"] = 907,["1048"] = 908,["1049"] = 908,["1050"] = 908,["1051"] = 908,["1052"] = 908,["1053"] = 908,["1054"] = 908,["1055"] = 908,["1056"] = 908,["1057"] = 908,["1058"] = 908,["1059"] = 909,["1060"] = 910,["1061"] = 911,["1062"] = 912,["1065"] = 915,["1068"] = 919,["1069"] = 921,["1070"] = 922,["1071"] = 923,["1072"] = 924,["1073"] = 925,["1074"] = 926,["1075"] = 926,["1077"] = 927,["1078"] = 929,["1079"] = 930,["1080"] = 930,["1081"] = 930,["1082"] = 930,["1083"] = 931,["1087"] = 935,["1088"] = 936,["1089"] = 937,["1092"] = 941,["1093"] = 907,["1106"] = 957,["1107"] = 957,["1108"] = 957,["1110"] = 958,["1111"] = 958,["1112"] = 958,["1113"] = 958,["1114"] = 958,["1115"] = 958,["1116"] = 958,["1117"] = 958,["1118"] = 958,["1119"] = 958,["1120"] = 958,["1121"] = 959,["1122"] = 960,["1123"] = 961,["1124"] = 962,["1127"] = 965,["1130"] = 969,["1131"] = 971,["1132"] = 972,["1133"] = 973,["1134"] = 974,["1135"] = 974,["1136"] = 974,["1137"] = 974,["1138"] = 975,["1139"] = 976,["1140"] = 977,["1141"] = 979,["1142"] = 977,["1143"] = 982,["1144"] = 983,["1145"] = 985,["1146"] = 987,["1147"] = 988,["1148"] = 989,["1149"] = 990,["1150"] = 991,["1151"] = 992,["1152"] = 993,["1153"] = 994,["1155"] = 996,["1156"] = 996,["1157"] = 996,["1158"] = 996,["1159"] = 997,["1160"] = 997,["1161"] = 997,["1162"] = 997,["1163"] = 997,["1164"] = 998,["1165"] = 1002,["1166"] = 1002,["1167"] = 1002,["1168"] = 1003,["1169"] = 1004,["1171"] = 1002,["1172"] = 1002,["1177"] = 1012,["1178"] = 1013,["1179"] = 1014,["1180"] = 1015,["1181"] = 1016,["1182"] = 1018,["1183"] = 1019,["1184"] = 1019,["1185"] = 1019,["1186"] = 1019,["1187"] = 1020,["1190"] = 1023,["1191"] = 1024,["1192"] = 1025,["1195"] = 1029,["1196"] = 1030,["1197"] = 1031,["1198"] = 1032,["1199"] = 1032,["1200"] = 1032,["1201"] = 1032,["1204"] = 1037,["1205"] = 1038,["1207"] = 1041,["1208"] = 957,["1222"] = 1058,["1223"] = 1058,["1224"] = 1058,["1226"] = 1059,["1227"] = 1059,["1228"] = 1059,["1229"] = 1059,["1230"] = 1059,["1231"] = 1059,["1232"] = 1059,["1233"] = 1059,["1234"] = 1059,["1235"] = 1059,["1236"] = 1059,["1237"] = 1060,["1238"] = 1061,["1239"] = 1062,["1240"] = 1063,["1243"] = 1066,["1246"] = 1070,["1247"] = 1072,["1248"] = 1073,["1249"] = 1074,["1250"] = 1075,["1251"] = 1076,["1252"] = 1077,["1253"] = 1078,["1254"] = 1088,["1255"] = 1078,["1256"] = 1090,["1257"] = 1091,["1258"] = 1092,["1259"] = 1094,["1260"] = 1095,["1261"] = 1096,["1262"] = 1097,["1263"] = 1098,["1264"] = 1099,["1265"] = 1100,["1266"] = 1101,["1267"] = 1101,["1268"] = 1101,["1269"] = 1101,["1270"] = 1101,["1271"] = 1102,["1272"] = 1103,["1273"] = 1103,["1274"] = 1103,["1275"] = 1103,["1276"] = 1103,["1277"] = 1103,["1278"] = 1103,["1279"] = 1110,["1280"] = 1110,["1281"] = 1110,["1282"] = 1110,["1283"] = 1110,["1284"] = 1110,["1285"] = 1110,["1286"] = 1110,["1287"] = 1110,["1288"] = 1110,["1289"] = 1110,["1290"] = 1110,["1291"] = 1110,["1292"] = 1111,["1295"] = 1114,["1296"] = 1115,["1297"] = 1116,["1298"] = 1116,["1299"] = 1116,["1300"] = 1116,["1301"] = 1116,["1302"] = 1117,["1303"] = 1118,["1304"] = 1118,["1305"] = 1118,["1306"] = 1118,["1307"] = 1118,["1308"] = 1118,["1309"] = 1118,["1310"] = 1125,["1312"] = 1128,["1313"] = 1129,["1314"] = 1130,["1315"] = 1131,["1316"] = 1132,["1317"] = 1134,["1318"] = 1135,["1319"] = 1135,["1320"] = 1135,["1321"] = 1135,["1322"] = 1135,["1323"] = 1135,["1324"] = 1135,["1325"] = 1136,["1328"] = 1139,["1329"] = 1140,["1330"] = 1141,["1334"] = 1146,["1335"] = 1147,["1337"] = 1150,["1338"] = 1058,["1340"] = 1156,["1341"] = 1157,["1342"] = 1157,["1343"] = 1157,["1344"] = 1157,["1345"] = 1157,["1346"] = 1157,["1347"] = 1157,["1348"] = 1157,["1349"] = 1157,["1350"] = 1157,["1351"] = 1156,["1353"] = 1163,["1354"] = 1164,["1355"] = 1164,["1357"] = 1165,["1358"] = 1166,["1360"] = 1168,["1361"] = 1168,["1362"] = 1168,["1363"] = 1168,["1364"] = 1168,["1365"] = 1168,["1366"] = 1168,["1367"] = 1168,["1368"] = 1168,["1369"] = 1168,["1370"] = 1168,["1371"] = 1163,["1372"] = 1171,["1373"] = 1172,["1374"] = 1172,["1376"] = 1173,["1377"] = 1174,["1379"] = 1176,["1380"] = 1176,["1381"] = 1176,["1382"] = 1176,["1383"] = 1176,["1384"] = 1176,["1385"] = 1176,["1386"] = 1176,["1387"] = 1176,["1388"] = 1176,["1389"] = 1176,["1390"] = 1171,["1391"] = 1179,["1392"] = 1180,["1393"] = 1180,["1395"] = 1181,["1396"] = 1182,["1398"] = 1184,["1399"] = 1184,["1400"] = 1184,["1401"] = 1184,["1402"] = 1184,["1403"] = 1184,["1404"] = 1184,["1405"] = 1184,["1406"] = 1184,["1407"] = 1184,["1408"] = 1184,["1409"] = 1184,["1410"] = 1179,["1411"] = 1187,["1412"] = 1187,["1413"] = 1187,["1415"] = 1187,["1416"] = 1187,["1418"] = 1188,["1419"] = 1188,["1421"] = 1189,["1422"] = 1190,["1423"] = 1190,["1424"] = 1190,["1425"] = 1190,["1426"] = 1190,["1427"] = 1190,["1428"] = 1190,["1429"] = 1190,["1431"] = 1192,["1432"] = 1192,["1433"] = 1192,["1434"] = 1192,["1435"] = 1192,["1436"] = 1192,["1437"] = 1192,["1438"] = 1192,["1439"] = 1192,["1440"] = 1192,["1441"] = 1192,["1442"] = 1187,["1443"] = 1194,["1444"] = 1194,["1445"] = 1194,["1447"] = 1195,["1448"] = 1195,["1450"] = 1196,["1451"] = 1197,["1452"] = 1198,["1453"] = 1198,["1454"] = 1198,["1455"] = 1198,["1456"] = 1198,["1457"] = 1199,["1458"] = 1200,["1459"] = 1201,["1460"] = 1202,["1461"] = 1203,["1462"] = 1205,["1463"] = 1205,["1464"] = 1205,["1465"] = 1205,["1466"] = 1205,["1467"] = 1205,["1468"] = 1205,["1469"] = 1205,["1470"] = 1205,["1471"] = 1206,["1472"] = 1206,["1473"] = 1206,["1474"] = 1206,["1475"] = 1206,["1476"] = 1206,["1477"] = 1206,["1478"] = 1206,["1479"] = 1206,["1480"] = 1207,["1481"] = 1207,["1482"] = 1207,["1483"] = 1207,["1484"] = 1207,["1485"] = 1207,["1486"] = 1207,["1487"] = 1207,["1488"] = 1207,["1489"] = 1208,["1490"] = 1208,["1491"] = 1208,["1492"] = 1208,["1493"] = 1208,["1494"] = 1208,["1495"] = 1208,["1496"] = 1208,["1497"] = 1208,["1499"] = 1210,["1500"] = 1210,["1501"] = 1210,["1502"] = 1210,["1503"] = 1210,["1504"] = 1210,["1505"] = 1210,["1506"] = 1210,["1507"] = 1210,["1508"] = 1210,["1509"] = 1194,["1510"] = 1212,["1511"] = 1212,["1512"] = 1212,["1514"] = 1213,["1515"] = 1213,["1517"] = 1214,["1518"] = 1215,["1519"] = 1215,["1520"] = 1215,["1521"] = 1215,["1522"] = 1215,["1523"] = 1215,["1524"] = 1215,["1525"] = 1215,["1526"] = 1216,["1527"] = 1217,["1528"] = 1217,["1529"] = 1217,["1530"] = 1217,["1531"] = 1217,["1532"] = 1218,["1533"] = 1219,["1534"] = 1220,["1535"] = 1220,["1536"] = 1220,["1537"] = 1220,["1538"] = 1220,["1539"] = 1220,["1540"] = 1220,["1541"] = 1220,["1542"] = 1220,["1543"] = 1221,["1544"] = 1221,["1545"] = 1221,["1546"] = 1221,["1547"] = 1221,["1548"] = 1221,["1549"] = 1221,["1550"] = 1221,["1551"] = 1221,["1553"] = 1223,["1554"] = 1223,["1555"] = 1223,["1556"] = 1223,["1557"] = 1223,["1558"] = 1223,["1559"] = 1223,["1560"] = 1223,["1561"] = 1223,["1562"] = 1223,["1563"] = 1223,["1564"] = 1212,["1565"] = 1226,["1566"] = 1226,["1567"] = 1226,["1569"] = 1227,["1570"] = 1227,["1572"] = 1228,["1573"] = 1229,["1574"] = 1230,["1575"] = 1231,["1576"] = 1232,["1577"] = 1233,["1578"] = 1234,["1579"] = 1235,["1580"] = 1236,["1581"] = 1237,["1582"] = 1238,["1583"] = 1240,["1584"] = 1240,["1585"] = 1240,["1586"] = 1240,["1587"] = 1240,["1588"] = 1240,["1589"] = 1240,["1590"] = 1240,["1591"] = 1240,["1592"] = 1241,["1593"] = 1241,["1594"] = 1241,["1595"] = 1241,["1596"] = 1241,["1597"] = 1241,["1598"] = 1241,["1599"] = 1241,["1600"] = 1241,["1601"] = 1242,["1602"] = 1242,["1603"] = 1242,["1604"] = 1242,["1605"] = 1242,["1606"] = 1242,["1607"] = 1242,["1608"] = 1242,["1609"] = 1242,["1611"] = 1243,["1612"] = 1243,["1613"] = 1244,["1614"] = 1245,["1615"] = 1246,["1616"] = 1247,["1617"] = 1248,["1618"] = 1248,["1619"] = 1248,["1620"] = 1248,["1621"] = 1248,["1622"] = 1248,["1623"] = 1248,["1624"] = 1248,["1625"] = 1248,["1626"] = 1243,["1630"] = 1251,["1631"] = 1251,["1632"] = 1251,["1633"] = 1251,["1634"] = 1251,["1635"] = 1251,["1636"] = 1251,["1637"] = 1251,["1638"] = 1251,["1639"] = 1251,["1640"] = 1251,["1641"] = 1251,["1642"] = 1226,["1655"] = 1267,["1656"] = 1267,["1657"] = 1267,["1659"] = 1267,["1660"] = 1267,["1662"] = 1267,["1663"] = 1267,["1665"] = 1268,["1666"] = 1268,["1667"] = 1268,["1668"] = 1268,["1669"] = 1268,["1670"] = 1268,["1671"] = 1268,["1672"] = 1268,["1673"] = 1268,["1674"] = 1268,["1675"] = 1269,["1676"] = 1270,["1677"] = 1271,["1678"] = 1272,["1679"] = 1274,["1680"] = 1275,["1681"] = 1275,["1682"] = 1275,["1683"] = 1275,["1684"] = 1275,["1685"] = 1276,["1686"] = 1288,["1687"] = 1288,["1688"] = 1288,["1689"] = 1288,["1690"] = 1288,["1691"] = 1288,["1692"] = 1288,["1693"] = 1288,["1694"] = 1288,["1695"] = 1288,["1696"] = 1288,["1697"] = 1289,["1698"] = 1290,["1699"] = 1291,["1700"] = 1292,["1701"] = 1292,["1702"] = 1292,["1703"] = 1292,["1704"] = 1293,["1710"] = 1267,["1711"] = 1300,["1712"] = 1300,["1719"] = 1317,["1720"] = 1318,["1721"] = 1319,["1722"] = 1319,["1723"] = 1319,["1724"] = 1320,["1725"] = 1321,["1727"] = 1323,["1728"] = 1319,["1729"] = 1319,["1730"] = 1325,["1731"] = 1326,["1732"] = 1317,["1738"] = 1345,["1739"] = 1346,["1740"] = 1347,["1741"] = 1347,["1742"] = 1347,["1743"] = 1348,["1744"] = 1349,["1746"] = 1351,["1747"] = 1347,["1748"] = 1347,["1749"] = 1353,["1750"] = 1354,["1751"] = 1345,["1756"] = 1362,["1757"] = 1363,["1758"] = 1364,["1759"] = 1365,["1760"] = 1366,["1765"] = 1371,["1766"] = 1372,["1767"] = 1373,["1769"] = 1362,["1775"] = 1383,["1776"] = 1384,["1777"] = 1385,["1778"] = 1386,["1779"] = 1387,["1780"] = 1388,["1785"] = 1393,["1786"] = 1394,["1787"] = 1395,["1789"] = 1383,["1790"] = 1399,["1791"] = 1400,["1792"] = 1401,["1793"] = 1402,["1795"] = 1399,["1797"] = 1409,["1798"] = 1410,["1799"] = 1411,["1801"] = 1413,["1802"] = 1409,["1804"] = 1419,["1805"] = 1420,["1806"] = 1419,["1808"] = 1426,["1809"] = 1426,["1810"] = 1427,["1811"] = 1428,["1812"] = 1429,["1813"] = 1430,["1814"] = 1431,["1816"] = 1434,["1818"] = 1435,["1819"] = 1435,["1820"] = 1436,["1821"] = 1435,["1824"] = 1438,["1825"] = 1426,["1827"] = 1444,["1828"] = 1444,["1829"] = 1445,["1830"] = 1446,["1831"] = 1447,["1832"] = 1448,["1833"] = 1449,["1835"] = 1452,["1837"] = 1453,["1838"] = 1453,["1839"] = 1454,["1840"] = 1453,["1843"] = 1456,["1844"] = 1444,["1846"] = 1469,["1848"] = 1475,["1849"] = 1476,["1850"] = 1476,["1852"] = 1477,["1853"] = 1478,["1854"] = 1478,["1855"] = 1478,["1856"] = 1478,["1857"] = 1479,["1858"] = 1480,["1859"] = 1481,["1861"] = 1483,["1862"] = 1484,["1863"] = 1486,["1864"] = 1487,["1865"] = 1488,["1866"] = 1489,["1867"] = 1489,["1868"] = 1489,["1869"] = 1489,["1870"] = 1490,["1871"] = 1491,["1872"] = 1492,["1873"] = 1493,["1874"] = 1494,["1875"] = 1494,["1876"] = 1494,["1877"] = 1494,["1878"] = 1495,["1879"] = 1496,["1881"] = 1498,["1882"] = 1499,["1883"] = 1500,["1884"] = 1501,["1885"] = 1502,["1886"] = 1503,["1887"] = 1504,["1891"] = 1508,["1893"] = 1510,["1894"] = 1510,["1895"] = 1510,["1896"] = 1510,["1897"] = 1511,["1898"] = 1512,["1900"] = 1475,["1902"] = 1517,["1903"] = 1517,["1904"] = 1517,["1906"] = 1518,["1909"] = 1519,["1910"] = 1520,["1912"] = 1522,["1913"] = 1523,["1914"] = 1524,["1917"] = 1517,["1919"] = 1530,["1920"] = 1531,["1921"] = 1532,["1922"] = 1533,["1924"] = 1535,["1926"] = 1537,["1927"] = 1530,["1929"] = 1541,["1930"] = 1542,["1931"] = 1542,["1932"] = 1542,["1933"] = 1542,["1934"] = 1542,["1935"] = 1541});
--- 限定数值区间
-- 
-- @param n 数
-- @param a 最小值
-- @param b 最大值
-- @returns 小于最小值返回最小值，大于最大值返回最大值，否则返回自己
function Clamp(val, min, max)
    if val > max then
        val = max
    elseif val < min then
        val = min
    end
    return val
end
--- 转化为有效数字，如不是则返回默认值，默认为0
-- 
-- @param i 任意值
-- @param defaultVar 默认值，默认为0
-- @returns 返回数字
function toFiniteNumber(i, defaultVar)
    if defaultVar == nil then
        defaultVar = 0
    end
    local n = tonumber(i)
    if n ~= nil and __TS__NumberIsFinite(n) then
        return n
    end
    return defaultVar
end
do
    if not _G.print_Engine then
        _G.print_Engine = print
        _G.print = function(...)
            if IsInToolsMode() then
                print_Engine(...)
            end
        end
    end
end
string.split = function(str, delimiter, toNumber)
    if str == nil or str == "" or delimiter == nil then
        return {str or ""}
    end
    local result = {}
    local pattern = "(.-)" .. delimiter
    for match in string.gmatch(str .. delimiter, pattern) do
        if toNumber == true then
            local v = tonumber(match)
            if v ~= nil then
                result[#result + 1] = v
            end
        else
            result[#result + 1] = match
        end
    end
    return result
end
string.replace = function(s, pattern, repl)
    return (string.gsub(s, pattern, repl))
end
function traceback(message)
    print("[Error]: " .. tostring(message))
    return message
end
--- 获取当前文件路径
-- 
-- @deprecated
function getFileScope(scopeName)
    if scopeName ~= nil and scopeName ~= "" then
        return _G, scopeName
    end
    local injectedScope = _G.__TSTL_CURRENT_FILE_SCOPE
    if injectedScope ~= nil and injectedScope ~= "" then
        return _G, injectedScope
    end
    return _G, "@unknown"
end
function EntityConstructor(entity)
    if entity == nil then
        return
    end
    if type(entity.IsNull) ~= "function" then
        return
    end
    if entity:IsNull() then
        return
    end
    local entindex = entity:entindex()
    local scope = entity:GetOrCreatePrivateScriptScope()
    if scope ~= nil then
        local originalUpdateOnRemove = scope.UpdateOnRemove
        scope.UpdateOnRemove = function(...)
            if type(originalUpdateOnRemove) == "function" then
                originalUpdateOnRemove(...)
            end
            FireGameEventLocal("custom_entity_removed", {entindex = entindex})
        end
    end
end
--- 递归打印表格内容（不遍历 metatable）
-- 
-- @noSelf
function PrintTable(____table, depth, maxDepth)
    if depth == nil then
        depth = 0
    end
    if maxDepth == nil then
        maxDepth = 5
    end
    if depth == 0 then
        print("----------------------------------------PrintTable----------------------------------------")
    end
    if depth > maxDepth then
        print(string.rep("  ", depth) .. "[Max depth reached]")
        return
    end
    if type(____table) ~= "table" then
        print(string.rep("  ", depth) .. tostring(____table))
        return
    end
    for k, v in pairs(____table) do
        local indent = string.rep("  ", depth)
        local keyStr = type(k) == "string" and k or ("[" .. tostring(k)) .. "]"
        if type(v) == "table" then
            local mt = getmetatable(v)
            if mt ~= nil then
                print((indent .. keyStr) .. " = <table with metatable>")
            else
                print((indent .. keyStr) .. " = {")
                PrintTable(v, depth + 1, maxDepth)
                print(indent .. "}")
            end
        else
            local valueStr = type(v) == "string" and ("\"" .. tostring(v)) .. "\"" or tostring(v)
            print(((indent .. keyStr) .. " = ") .. valueStr)
        end
    end
    if depth == 0 then
        print("-------------------------------------------End--------------------------------------------")
    end
end
--- 打印长字符串，超过1000字符时使用链接控制台消息
-- 
-- @noSelf
function PrintLongStr(str, key)
    if IsDedicatedServer() then
        return
    end
    if string.len(str) > 1000 then
        PrintLinkedConsoleMessage(
            type(key) == "string" and tostring(key) .. "\n" or "文字过长，鼠标悬浮以查看详情，若想复制请点击最左侧的方块箭头图标\n",
            str
        )
    else
        print(str, key)
    end
end
--- 转化为有效数字，如不是则返回默认值，默认为0
-- 
-- @param i 任意值
-- @param defaultVar 默认值，默认为0
-- @returns 返回数字
function FiniteNumber(i, defaultVar)
    if defaultVar == nil then
        defaultVar = 0
    end
    local n = tonumber(i)
    if n ~= nil and __TS__NumberIsFinite(n) then
        return n
    end
    return defaultVar
end
--- 从数组里移除值
-- 
-- @param t 数组
-- @param v 值
function ArrayRemove(t, v)
    for i = #t - 1, 0, -1 do
        if t[i + 1] == v then
            table.remove(t, i + 1)
            return v, i
        end
    end
    return nil, nil
end
--- 浅拷贝
-- 
-- @param orig 任意值
-- @returns 新值
-- @noSelf
function shallowcopy(orig)
    local copy
    if type(orig) == "table" then
        copy = {}
        for key, value in pairs(orig) do
            copy[key] = value
        end
    else
        copy = orig
    end
    return copy
end
--- 深拷贝，会把表深度复制
-- 
-- @param orig 任意值
-- @returns 新值
function deepcopy(orig)
    local copy
    if type(orig) == "table" then
        copy = {}
        for key, value in pairs(orig) do
            copy[deepcopy(key)] = deepcopy(value)
        end
        setmetatable(
            copy,
            deepcopy(getmetatable(orig))
        )
    else
        copy = orig
    end
    return copy
end
--- 乱序
-- 
-- @param orig_list 数组
-- @returns 数组
function ShuffledList(orig_list)
    do
        local i = #orig_list - 1
        while i > 0 do
            local j = math.random(0, i)
            local ____temp_0 = {orig_list[i + 1], orig_list[j + 1]}
            orig_list[j + 1] = ____temp_0[1]
            orig_list[i + 1] = ____temp_0[2]
            i = i - 1
        end
    end
    return orig_list
end
--- 乱序
-- 
-- @param orig_list 数组
-- @returns 数组
function CopyAndShuffledList(orig_list)
    return ShuffledList(shallowcopy(orig_list))
end
--- 从数组中随机取出几个元素
-- 
-- @param arr 数组
-- @param count 取出数量
-- @param remove 是否从原数组移除取出的元素，默认不移除
function PickList(arr, count, remove)
    if remove == nil then
        remove = false
    end
    if count > #arr then
        return arr
    end
    local copy = remove and ShuffledList(arr) or CopyAndShuffledList(arr)
    local taken = {}
    do
        local i = 0
        while i < count do
            taken[#taken + 1] = copy[i + 1]
            i = i + 1
        end
    end
    if remove then
        for ____, element in ipairs(taken) do
            ArrayRemove(arr, element)
        end
    end
    return taken
end
--- table覆盖，会直接将主表内的值直接覆盖，没有则会新建
-- 
-- @param mainTable
-- @param table
function TableOverride(mainTable, ____table)
    for k in pairs(____table) do
        local v = ____table[k]
        if type(v) == "table" then
            if type(mainTable[k]) == "table" then
                mainTable[k] = TableOverride(mainTable[k], v)
            else
                mainTable[k] = TableOverride({}, v)
            end
        else
            mainTable[k] = v
        end
    end
    return mainTable
end
--- table替换，会检测主表的值是否存在，存在才会进行override
-- 
-- @param mainTable
-- @param table
-- @returns 新表
function TableReplace(mainTable, ____table)
    for k in pairs(____table) do
        if mainTable[k] ~= nil then
            local v = ____table[k]
            if type(v) == "table" then
                if type(mainTable[k]) == "table" then
                    mainTable[k] = TableOverride(mainTable[k], v)
                else
                    mainTable[k] = TableOverride({}, v)
                end
            else
                mainTable[k] = v
            end
        end
    end
    return mainTable
end
--- 获取表里随机一个值
-- 
-- @param t 表
-- @returns 随机值
function RandomValue(t)
    local keys = __TS__ObjectKeys(t)
    if #keys > 0 then
        local i = math.random(0, #keys - 1)
        local k = keys[i + 1]
        return t[k]
    end
    return nil
end
--- 获取表里随机
-- 
-- @param t 表
-- @param num 数量
-- @returns 随机值
function RandomElements(a, num)
    if num == nil then
        num = 1
    end
    if num < 1 then
        return
    end
    __TS__ArraySort(
        a,
        function() return math.random() - 0.5 end
    )
    return __TS__ArraySlice(a, 0, num)
end
--- 获取数组里随机一个值
-- 
-- @param a 数组
-- @returns 值
function GetRandomElement(a)
    if #a > 0 then
        return a[math.random(0, #a - 1) + 1]
    end
    return nil
end
--- 从表里寻找值的键
-- 
-- @param t
-- @param v
-- @returns 找得到的键
function TableFindKey(t, v)
    for key in pairs(t) do
        local _v = t[key]
        if v == _v then
            return key
        end
    end
end
function TableCount(t)
    local n = 0
    for _ in pairs(t) do
        n = n + 1
    end
    return n
end
--- 四舍五入，s为小数点几位
-- 
-- @param fNumber 数
-- @param prec 进度
-- @returns 数
function Round(fNumber, prec)
    if prec == nil then
        prec = 0
    end
    local iSign = fNumber > 0 and 1 or -1
    fNumber = math.abs(fNumber)
    local i = 10 ^ prec
    return iSign * math.floor(fNumber * i + 0.5) / i
end
--- 将c++里传出来的str形式的vector转换为vector
-- 
-- @param str
-- @returns Vector
function StringToVector(str)
    local a = string.split(str, " ")
    return Vector(
        FiniteNumber(a[1]),
        FiniteNumber(a[2]),
        FiniteNumber(a[3])
    )
end
--- 将 "rgb(99, 75, 255)" / "rgba(99, 75, 255, 1)" 解析为 Vector(99, 75, 255)
-- 
-- @param rgbStr 颜色字符串
-- @param defaultValue 解析失败时返回的默认值
function RGBStringToVector(rgbStr, defaultValue)
    if defaultValue == nil then
        defaultValue = Vector(0, 0, 0)
    end
    if rgbStr == nil or rgbStr == "" then
        return defaultValue
    end
    local s = string.replace(rgbStr, "%s+", "")
    s = string.replace(s, "^rgba%(", "")
    s = string.replace(s, "^rgb%(", "")
    s = string.replace(s, "%)$", "")
    local parts = string.split(s, ",", true)
    if #parts < 3 then
        return defaultValue
    end
    local r = Clamp(
        toFiniteNumber(parts[1], 0),
        0,
        255
    )
    local g = Clamp(
        toFiniteNumber(parts[2], 0),
        0,
        255
    )
    local b = Clamp(
        toFiniteNumber(parts[3], 0),
        0,
        255
    )
    return Vector(r, g, b)
end
--- 将vector转为为c++传出来的str形式
-- 
-- @param v 矢量
function VectorToString(v)
    return (((tostring(v.x) .. " ") .. tostring(v.y)) .. " ") .. tostring(v.z)
end
--- 以逆时针方向旋转
function Rotation2D(vector, radian, isDegree)
    if isDegree == nil then
        isDegree = false
    end
    if isDegree then
        radian = math.rad(radian)
    end
    local fLength2D = vector:Length2D()
    local vUnitVector2D = vector / fLength2D
    local fCos = math.cos(radian)
    local fSin = math.sin(radian)
    return Vector(vUnitVector2D.x * fCos - vUnitVector2D.y * fSin, vUnitVector2D.x * fSin + vUnitVector2D.y * fCos, vUnitVector2D.z) * fLength2D
end
function Deg2Rad(deg)
    return deg * (math.pi / 180)
end
function Rad2Deg(rad)
    return rad * (180 / math.pi)
end
--- 检查按位与结果是否等于目标值
-- 
-- @param value 原值
-- @param target 按位与的目标值
function BitAndEquals(value, target)
    return bit.band(value or 0, target) == target
end
function Lerp(t, a, b)
    return a + t * (b - a)
end
function VectorDistanceSq(v1, v2)
    return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) + (v1.z - v2.z) * (v1.z - v2.z)
end
function VectorDistance(v1, v2)
    return math.sqrt(VectorDistanceSq(v1, v2))
end
--- 向量值在[0，1]上的线性插值。跟另一个全局函数LerpVectors功能一样
-- 
-- @param t
-- @param a
-- @param b
-- @returns
function VectorLerp(t, a, b)
    return Vector(
        Lerp(t, a.x, b.x),
        Lerp(t, a.y, b.y),
        Lerp(t, a.z, b.z)
    )
end
--- 是否是零向量
-- 
-- @param v
-- @returns
function VectorIsZero(v)
    return v.x == 0 and v.y == 0 and v.z == 0
end
function RemapVal(v, a, b, c, d)
    if a == b then
        return v >= b and d or c
    end
    return c + (d - c) * (v - a) / (b - a)
end
function RemapValClamped(v, a, b, c, d)
    if a == b then
        return v >= b and d or c
    end
    local t = (v - a) / (b - a)
    t = Clamp(t, 0, 1)
    return c + (d - c) * t
end
--- 判断点是否在不规则图形里（不规则图形里是点集，点集每个都是固定住的）
-- 
-- @param point 检测点
-- @param polygonPoints 点数组
-- @returns 点是否在其中
function IsPointInPolygon(point, polygonPoints)
    local j = #polygonPoints - 1
    local bool = 0
    for i = 0, #polygonPoints - 1, 1 do
        local polygonPoint1 = polygonPoints[j + 1]
        local polygonPoint2 = polygonPoints[i + 1]
        if (polygonPoint2.y < point.y and polygonPoint1.y >= point.y or polygonPoint1.y < point.y and polygonPoint2.y >= point.y) and (polygonPoint2.x <= point.x or polygonPoint1.x <= point.x) then
            bool = bit.bxor(bool, polygonPoint2.x + (point.y - polygonPoint2.y) / (polygonPoint1.y - polygonPoint2.y) * (polygonPoint1.x - polygonPoint2.x) < point.x and 1 or 0)
        end
        j = i
    end
    return bool == 1
end
--- 计算距离
function CalcDistance(v1, v2)
    if v1.GetAbsOrigin ~= nil then
        v1 = v1:GetAbsOrigin()
    end
    if v2.GetAbsOrigin ~= nil then
        v2 = v2:GetAbsOrigin()
    end
    return (v1 - v2):Length2D()
end
--- 计算两个点之间的中点位置
function CalcMidPoint(v1, v2)
    if v1.GetAbsOrigin ~= nil then
        v1 = v1:GetAbsOrigin()
    end
    if v2.GetAbsOrigin ~= nil then
        v2 = v2:GetAbsOrigin()
    end
    return (v1 + v2) / 2
end
--- 计算方向
function CalcDirection(v1, v2)
    if v1.GetAbsOrigin ~= nil then
        v1 = v1:GetAbsOrigin()
    end
    if v2.GetAbsOrigin ~= nil then
        v2 = v2:GetAbsOrigin()
    end
    return (v1 - v2):Normalized()
end
--- 计算方向2D
function CalcDirection2D(v1, v2)
    if v1.GetAbsOrigin ~= nil then
        v1 = v1:GetAbsOrigin()
    end
    if v2.GetAbsOrigin ~= nil then
        v2 = v2:GetAbsOrigin()
    end
    local direction = v1 - v2
    direction.z = 0
    return direction:Normalized()
end
--- 判断一个handle是否有效
-- 
-- @param h handle
function IsValid(h)
    return h ~= nil and not h:IsNull()
end
function CompoundIncreaseSimple(a, b)
    return ((1 + a * 0.01) * (1 + b * 0.01) - 1) * 100
end
function CompoundIncreaseSimple_Reverse(a, b)
    return ((1 + a * 0.01) / (1 + b * 0.01) - 1) * 100
end
function CompoundIncrease(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = ((1 + (V or 0) * 0.01) * (1 + args[i + 1] * 0.01) - 1) * 100
    end
    return V or 0
end
function CompoundDecreaseSimple(a, b)
    return (1 - (1 - a * 0.01) * (1 - b * 0.01)) * 100
end
function CompoundDecreaseSimple_Reverse(a, b)
    return (1 - (1 - a * 0.01) / (1 - b * 0.01)) * 100
end
function CompoundDecrease(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = (1 - (1 - (V or 0) * 0.01) * (1 - args[i + 1] * 0.01)) * 100
    end
    return V or 0
end
function GetReverseSettleFunction(func)
    if func == CompoundIncreaseSimple then
        return CompoundIncreaseSimple_Reverse
    elseif func == CompoundDecreaseSimple then
        return CompoundDecreaseSimple_Reverse
    end
end
function MaximumSimple(a, b)
    return math.max(a, b)
end
function Maximum(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = math.max(V or -math.huge, args[i + 1])
    end
    return V or 0
end
function MinimumSimple(a, b)
    return math.min(a, b)
end
function Minimum(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        V = math.min(V or math.huge, args[i + 1])
    end
    return V or 0
end
function FirstSimple(a, b)
    if a ~= nil then
        return a
    else
        return b
    end
end
function First(...)
    local args = {...}
    local V = args[1]
    for i = 1, #args - 1, 1 do
        local v = args[i + 1]
        if v ~= nil then
            V = v
        end
    end
    return V
end
--- 转化为字符串，仅有number、string和boolean这类变量可以转化为字符串，其余会返回undefined
-- 
-- @param i 任意值
-- @returns 返回字符串
function toString(i)
    local t = type(i)
    return (t == "number" or t == "string" or t == "boolean") and tostring(i) or nil
end
--- 转化为有效字符串，如不是则返回默认值，默认为""。
-- 仅有number、string和boolean这类变量可以算作有效的字符串，其余会返回默认值
-- 
-- @param i 任意值
-- @param defaultVar 默认值，默认为""
-- @returns 返回字符串
function toFiniteString(i, defaultVar)
    if defaultVar == nil then
        defaultVar = ""
    end
    return toString(i) or defaultVar
end
function SimplifyValues(t)
    if #t <= 1 then
        return t
    end
    local first = t[1]
    for ____, v in ipairs(t) do
        if v ~= first then
            return t
        end
    end
    return {first}
end
function GetArrayDefaultLastValidValue(t, index)
    local lastValue = t[#t]
    if index >= #t then
        return lastValue
    end
    return t[index + 1]
end
function DebugDrawLineColor(start, ____end, color, zTest, duration)
    if color == nil then
        color = Vector(255, 0, 0)
    end
    if zTest == nil then
        zTest = false
    end
    if duration == nil then
        duration = 0.5
    end
    DebugDrawLine(
        start,
        ____end,
        color.x,
        color.y,
        color.z,
        zTest,
        duration
    )
end
function DebugDrawPolygonArea(points, color, zTest, duration)
    if color == nil then
        color = Vector(255, 0, 0)
    end
    if zTest == nil then
        zTest = false
    end
    if duration == nil then
        duration = 0.5
    end
    if #points < 2 then
        return
    end
    do
        local i = 0
        while i < #points do
            local start = points[i + 1]
            local nextIndex = i + 1 >= #points and 0 or i + 1
            local ____end = points[nextIndex + 1]
            DebugDrawLineColor(
                start,
                ____end,
                color,
                zTest,
                duration
            )
            i = i + 1
        end
    end
end
function DebugDrawArcArea(position, forwardVector, radius, angle, segments, color, zTest, duration)
    if segments == nil then
        segments = 12
    end
    if color == nil then
        color = Vector(255, 0, 0)
    end
    if zTest == nil then
        zTest = false
    end
    if duration == nil then
        duration = 0.5
    end
    if VectorIsZero(forwardVector) or radius <= 0 or angle <= 0 or segments < 1 then
        return
    end
    local direction = forwardVector:Normalized()
    local halfAngle = angle / 2
    local previousPoint
    do
        local i = 0
        while i <= segments do
            local currentAngle = halfAngle - angle * (i / segments)
            local currentPoint = position + Rotation2D(direction, currentAngle, true) * radius
            if previousPoint ~= nil then
                DebugDrawLineColor(
                    previousPoint,
                    currentPoint,
                    color,
                    zTest,
                    duration
                )
            end
            previousPoint = currentPoint
            i = i + 1
        end
    end
end
function DebugDrawSectorArea(position, radius, forwardVector, angle, color, zTest, duration, segments)
    if color == nil then
        color = Vector(255, 0, 0)
    end
    if zTest == nil then
        zTest = false
    end
    if duration == nil then
        duration = 0.5
    end
    if segments == nil then
        segments = 12
    end
    if VectorIsZero(forwardVector) or radius <= 0 or angle <= 0 then
        return
    end
    local direction = forwardVector:Normalized()
    local halfAngle = angle / 2
    local leftPoint = position + Rotation2D(direction, halfAngle, true) * radius
    local rightPoint = position + Rotation2D(direction, -halfAngle, true) * radius
    DebugDrawLineColor(
        position,
        leftPoint,
        color,
        zTest,
        duration
    )
    DebugDrawLineColor(
        position,
        rightPoint,
        color,
        zTest,
        duration
    )
    DebugDrawArcArea(
        position,
        direction,
        radius,
        angle,
        segments,
        color,
        zTest,
        duration
    )
end
function DebugDrawTrapezoidArea(position, length, forwardVector, startWidth, endWidth, color, zTest, duration)
    if color == nil then
        color = Vector(255, 0, 0)
    end
    if zTest == nil then
        zTest = false
    end
    if duration == nil then
        duration = 0.5
    end
    if VectorIsZero(forwardVector) or length <= 0 then
        return
    end
    local direction = forwardVector:Normalized()
    local side = RotatePosition(
        vec3_zero,
        QAngle(0, 90, 0),
        direction
    )
    local endPosition = position + direction * length
    local polygon = {position + side * startWidth, endPosition + side * endWidth, endPosition - side * endWidth, position - side * startWidth}
    DebugDrawPolygonArea(polygon, color, zTest, duration)
end
function DebugDrawTruncatedSectorArea(position, innerRadius, outerRadius, forwardVector, angle, color, zTest, duration, segments)
    if color == nil then
        color = Vector(255, 0, 0)
    end
    if zTest == nil then
        zTest = false
    end
    if duration == nil then
        duration = 0.5
    end
    if segments == nil then
        segments = 12
    end
    if VectorIsZero(forwardVector) or outerRadius <= 0 or angle <= 0 or innerRadius >= outerRadius then
        return
    end
    local direction = forwardVector:Normalized()
    local halfAngle = angle / 2
    local leftDirection = Rotation2D(direction, halfAngle, true)
    local rightDirection = Rotation2D(direction, -halfAngle, true)
    local outerLeft = position + leftDirection * outerRadius
    local outerRight = position + rightDirection * outerRadius
    local innerLeft = position + leftDirection * innerRadius
    local innerRight = position + rightDirection * innerRadius
    DebugDrawLineColor(
        innerLeft,
        outerLeft,
        color,
        zTest,
        duration
    )
    DebugDrawLineColor(
        innerRight,
        outerRight,
        color,
        zTest,
        duration
    )
    DebugDrawLineColor(
        innerLeft,
        innerRight,
        color,
        zTest,
        duration
    )
    DebugDrawArcArea(
        position,
        direction,
        outerRadius,
        angle,
        segments,
        color,
        zTest,
        duration
    )
    DebugDrawLineColor(
        position,
        position + direction * outerRadius,
        Vector(0, 255, 0),
        zTest,
        duration
    )
    DebugDrawLineColor(
        position,
        position + direction * (innerRadius * math.cos(math.rad(halfAngle))),
        Vector(0, 255, 0),
        zTest,
        duration
    )
    DebugDrawCircle(
        position,
        Vector(255, 255, 0),
        32,
        8,
        zTest,
        duration
    )
end
--- 寻找扇形单位
-- 
-- @param iTeamNumber 队伍
-- @param vPosition 起始点
-- @param fRadius 范围
-- @param vForwardVector 方向
-- @param fAngle 角度
-- @param iTeamFilter 队伍过滤
-- @param iTypeFilter 类型过滤
-- @param iFlagFilter 标记过滤
-- @param iOrder 排序规则
-- @returns 单位组
function FindUnitsInSector(iTeamNumber, vPosition, fRadius, vForwardVector, fAngle, iTeamFilter, iTypeFilter, iFlagFilter, iOrder)
    vForwardVector = Vector(vForwardVector.x, vForwardVector.y, 0)
    local aRadiusGroup = FindUnitsInRadius(
        iTeamNumber,
        vPosition,
        nil,
        fRadius,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        iOrder,
        false
    )
    for i = #aRadiusGroup - 1, 0, -1 do
        local hUnit = aRadiusGroup[i + 1]
        local vTargetPosition = hUnit:GetAbsOrigin()
        local vTargetVector = vTargetPosition - vPosition
        vTargetVector.z = 0
        local theta = math.deg(math.acos(vForwardVector:Normalized():Dot(vTargetVector:Normalized())))
        if theta > fAngle / 2 then
            table.remove(aRadiusGroup, i + 1)
        end
    end
    return aRadiusGroup
end
--- 寻找截扇形范围内的单位
-- 形状为标准扇形去掉近端的小尖角，内侧边界是一条直线（弦），更接近很多地面预警器表现
-- 
-- @param iTeamNumber 队伍
-- @param vPosition 扇形顶点
-- @param fInnerRadius 内半径（用于确定近端直线与两侧边的交点）
-- @param fOuterRadius 外半径
-- @param vForwardVector 朝向
-- @param fAngle 角度
-- @param iTeamFilter 队伍过滤
-- @param iTypeFilter 类型过滤
-- @param iFlagFilter 标记过滤
-- @param iOrder 排序规则
-- @returns 单位组
function FindUnitsInTruncatedSector(iTeamNumber, vPosition, fInnerRadius, fOuterRadius, vForwardVector, fAngle, iTeamFilter, iTypeFilter, iFlagFilter, iOrder)
    vForwardVector = Vector(vForwardVector.x, vForwardVector.y, 0)
    if VectorIsZero(vForwardVector) or fOuterRadius <= 0 or fAngle <= 0 or fInnerRadius >= fOuterRadius then
        return {}
    end
    local direction = vForwardVector:Normalized()
    local halfAngle = fAngle / 2
    local cosHalfAngle = math.cos(math.rad(halfAngle))
    local innerChordDepth = fInnerRadius <= 0 and 0 or fInnerRadius * cosHalfAngle
    local aRadiusGroup = FindUnitsInRadius(
        iTeamNumber,
        vPosition,
        nil,
        fOuterRadius,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        iOrder,
        false
    )
    for i = #aRadiusGroup - 1, 0, -1 do
        do
            local hUnit = aRadiusGroup[i + 1]
            local vTargetPosition = hUnit:GetAbsOrigin()
            local vTargetVector = vTargetPosition - vPosition
            vTargetVector.z = 0
            if VectorIsZero(vTargetVector) then
                table.remove(aRadiusGroup, i + 1)
                goto __continue184
            end
            local radialDistance = vTargetVector:Length2D()
            local theta = math.deg(math.acos(direction:Dot(vTargetVector:Normalized())))
            local forwardDistance = direction:Dot(vTargetVector)
            if radialDistance > fOuterRadius or theta > halfAngle or forwardDistance < innerChordDepth then
                table.remove(aRadiusGroup, i + 1)
            end
        end
        ::__continue184::
    end
    return aRadiusGroup
end
--- 获取某单位范围内单位最多的单位
-- 
-- @param vSearchPosition 搜索点
-- @param fSearchRange 搜索范围
-- @param iTeamNumber 队伍
-- @param fRadius 范围
-- @param iTeamFilter 队伍过滤
-- @param iTypeFilter 类型过滤
-- @param iFlagFilter 特殊过滤
-- @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
-- @param exclude 排除单位，可缺省，可以填单位表或者单位
-- @returns 如果没有则会返回undefined
function GetAOEMostTargetsSpellTarget(vSearchPosition, fSearchRange, iTeamNumber, fRadius, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
    if iOrder == nil then
        iOrder = FIND_ANY_ORDER
    end
    local aTargets = FindUnitsInRadius(
        iTeamNumber,
        vSearchPosition,
        nil,
        fSearchRange + fRadius,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        iOrder,
        false
    )
    if exclude ~= nil then
        if __TS__ArrayIsArray(exclude) then
            for i = 0, #exclude - 1, 1 do
                ArrayRemove(aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(aTargets, exclude)
        end
    end
    local hTarget
    local iMax = 0
    for i = 0, #aTargets - 1, 1 do
        local hFirstTarget = aTargets[i + 1]
        local n = 0
        if hFirstTarget:IsPositionInRange(vSearchPosition, fSearchRange) then
            if hTarget == nil then
                hTarget = hFirstTarget
            end
            for j = 0, #aTargets - 1, 1 do
                local hSecondTarget = aTargets[j + 1]
                if hSecondTarget:IsPositionInRange(
                    hFirstTarget:GetAbsOrigin(),
                    fRadius + hSecondTarget:GetHullRadius()
                ) then
                    n = n + 1
                end
            end
        end
        if n > iMax then
            hTarget = hFirstTarget
            iMax = n
        end
    end
    return hTarget
end
--- 获取一定范围内单位最多的点
-- 
-- @param vSearchPosition 搜索点
-- @param fSearchRange 搜索范围
-- @param iTeamNumber 队伍
-- @param fRadius 范围
-- @param iTeamFilter 队伍过滤
-- @param iTypeFilter 类型过滤
-- @param iFlagFilter 特殊过滤
-- @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
-- @param exclude 排除单位，可缺省，可以填单位表或者单位
-- @returns 如果没有该点则会返回vec3_invalid
function GetAOEMostTargetsPosition(vSearchPosition, fSearchRange, iTeamNumber, fRadius, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
    if iOrder == nil then
        iOrder = FIND_ANY_ORDER
    end
    local aTargets = FindUnitsInRadius(
        iTeamNumber,
        vSearchPosition,
        nil,
        fSearchRange + fRadius,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        iOrder,
        false
    )
    if exclude ~= nil then
        if __TS__ArrayIsArray(exclude) then
            for i = 0, #exclude - 1, 1 do
                ArrayRemove(aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(aTargets, exclude)
        end
    end
    local vTargetPosition = vec3_invalid
    if #aTargets == 1 then
        local vDirection = aTargets[1]:GetAbsOrigin() - vSearchPosition
        vDirection.z = 0
        vTargetPosition = vSearchPosition + vDirection:Normalized() * math.min(
            fSearchRange - 1,
            vDirection:Length2D()
        )
    elseif #aTargets > 1 then
        local aPositions = {}
        local function funcInsertCheckPosition(vPosition)
            aPositions[#aPositions + 1] = vPosition
        end
        for i = 0, #aTargets - 1, 1 do
            local hFirstTarget = aTargets[i + 1]
            for j = i + 1, #aTargets - 1, 1 do
                local hSecondTarget = aTargets[j + 1]
                local vDirection = hSecondTarget:GetAbsOrigin() - hFirstTarget:GetAbsOrigin()
                vDirection.z = 0
                local fDistance = vDirection:Length2D()
                if fDistance <= fRadius * 2 and fDistance > 0 then
                    local vMid = (hSecondTarget:GetAbsOrigin() + hFirstTarget:GetAbsOrigin()) / 2
                    if (vMid - vSearchPosition):Length2D() <= fSearchRange then
                        funcInsertCheckPosition(vMid)
                    else
                        local fHalfLength = math.sqrt(bit.bxor(
                            bit.bxor(fRadius, 2 - fDistance / 2),
                            2
                        ))
                        local v = RotatePosition(
                            vec3_zero,
                            QAngle(0, 90, 0),
                            vDirection:Normalized()
                        ) * fHalfLength
                        local p = {vMid - v, vMid + v}
                        __TS__ArrayForEach(
                            p,
                            function(____, vPosition)
                                if (vPosition - vSearchPosition):Length2D() <= fSearchRange then
                                    funcInsertCheckPosition(vPosition)
                                end
                            end
                        )
                    end
                end
            end
        end
        local iMax = 0
        for i = 0, #aPositions - 1, 1 do
            local vPosition = aPositions[i + 1]
            local n = 0
            for j = 0, #aTargets - 1, 1 do
                local hTarget = aTargets[j + 1]
                if hTarget:IsPositionInRange(
                    vPosition,
                    fRadius + hTarget:GetHullRadius()
                ) then
                    n = n + 1
                end
            end
            if n > iMax then
                vTargetPosition = vPosition
                iMax = n
            end
        end
        if vTargetPosition == vec3_invalid then
            local vDirection = aTargets[2]:GetAbsOrigin() - vSearchPosition
            vDirection.z = 0
            vTargetPosition = vSearchPosition + vDirection:Normalized() * math.min(
                fSearchRange - 1,
                vDirection:Length2D()
            )
        end
    end
    if vTargetPosition ~= vec3_invalid then
        vTargetPosition = GetGroundPosition(vTargetPosition, nil)
    end
    return vTargetPosition
end
--- 获取一条线上单位最多的施法点
-- 
-- @param vSearchPosition 搜索点
-- @param fSearchRange 搜索范围
-- @param iTeamNumber 队伍
-- @param fStartWidth 开始宽度
-- @param fEndWidth 结束宽度
-- @param iTeamFilter 队伍过滤
-- @param iTypeFilter 类型过滤
-- @param iFlagFilter 特殊过滤
-- @param iOrder 排序规则，可缺省，默认FindOrder.FIND_ANY_ORDER
-- @param exclude 排除单位，可缺省，可以填单位表或者单位
-- @returns 如果没有该点则会返回vec3_invalid
function GetLinearMostTargetsPosition(vSearchPosition, fSearchRange, iTeamNumber, fStartWidth, fEndWidth, iTeamFilter, iTypeFilter, iFlagFilter, iOrder, exclude)
    if iOrder == nil then
        iOrder = FIND_ANY_ORDER
    end
    local aTargets = FindUnitsInRadius(
        iTeamNumber,
        vSearchPosition,
        nil,
        fSearchRange + fEndWidth,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        iOrder,
        false
    )
    if exclude ~= nil then
        if __TS__ArrayIsArray(exclude) then
            for i = 0, #exclude - 1, 1 do
                ArrayRemove(aTargets, exclude[i + 1])
            end
        else
            ArrayRemove(aTargets, exclude)
        end
    end
    local vTargetPosition = vec3_invalid
    if #aTargets == 1 then
        local vDirection = aTargets[1]:GetAbsOrigin() - vSearchPosition
        vDirection.z = 0
        vTargetPosition = vSearchPosition + vDirection:Normalized() * (fSearchRange - 1)
    elseif #aTargets > 1 then
        local aPolygons = {}
        local function funcInsertCheckPolygon(pPolygon)
            aPolygons[#aPolygons + 1] = pPolygon
        end
        for i = 0, #aTargets - 1, 1 do
            local hFirstTarget = aTargets[i + 1]
            for j = i + 1, #aTargets - 1, 1 do
                local hSecondTarget = aTargets[j + 1]
                local vDirection1 = hFirstTarget:GetAbsOrigin() - vSearchPosition
                vDirection1.z = 0
                local vDirection2 = hSecondTarget:GetAbsOrigin() - vSearchPosition
                vDirection2.z = 0
                local vDirection = (vDirection1 + vDirection2) / 2
                vDirection.z = 0
                local v = RotatePosition(
                    vec3_zero,
                    QAngle(0, 90, 0),
                    vDirection:Normalized()
                )
                local vEndPosition = vSearchPosition + vDirection:Normalized() * (fSearchRange - 1)
                local pPolygon = {
                    vSearchPosition + v * fStartWidth,
                    vEndPosition + v * fEndWidth,
                    vEndPosition,
                    vEndPosition - v * fEndWidth,
                    vSearchPosition - v * fStartWidth
                }
                if (IsPointInPolygon(
                    hFirstTarget:GetAbsOrigin(),
                    pPolygon
                ) or hFirstTarget:IsPositionInRange(
                    vEndPosition,
                    fEndWidth + hFirstTarget:GetHullRadius()
                )) and (IsPointInPolygon(
                    hSecondTarget:GetAbsOrigin(),
                    pPolygon
                ) or hSecondTarget:IsPositionInRange(
                    vEndPosition,
                    fEndWidth + hSecondTarget:GetHullRadius()
                )) then
                    funcInsertCheckPolygon(pPolygon)
                end
            end
            local vDirection = hFirstTarget:GetAbsOrigin() - vSearchPosition
            vDirection.z = 0
            local v = RotatePosition(
                vec3_zero,
                QAngle(0, 90, 0),
                vDirection:Normalized()
            )
            local vEndPosition = vSearchPosition + vDirection:Normalized() * (fSearchRange - 1)
            local pPolygon = {
                vSearchPosition + v * fStartWidth,
                vEndPosition + v * fEndWidth,
                vEndPosition,
                vEndPosition - v * fEndWidth,
                vSearchPosition - v * fStartWidth
            }
            funcInsertCheckPolygon(pPolygon)
        end
        local iMax = 0
        for i = 0, #aPolygons - 1, 1 do
            local pPolygon = aPolygons[i + 1]
            local n = 0
            for j = 0, #aTargets - 1, 1 do
                local hTarget = aTargets[j + 1]
                if IsPointInPolygon(
                    hTarget:GetAbsOrigin(),
                    pPolygon
                ) or hTarget:IsPositionInRange(
                    pPolygon[4],
                    fEndWidth + hTarget:GetHullRadius()
                ) then
                    n = n + 1
                end
            end
            if n > iMax then
                vTargetPosition = pPolygon[4]
                iMax = n
            end
        end
    end
    if vTargetPosition ~= vec3_invalid then
        vTargetPosition = GetGroundPosition(vTargetPosition, nil)
    end
    return vTargetPosition
end
--- 用技能kv在线上寻找单位
function FindUnitsInLineWithAbility(caster, start, ____end, width, ability)
    return FindUnitsInLine(
        caster:GetTeamNumber(),
        start,
        ____end,
        nil,
        width,
        ability:GetAbilityTargetTeam(),
        ability:GetAbilityTargetType(),
        ability:GetAbilityTargetFlags()
    )
end
--- 用技能kv寻找单位
function FindUnitsInRadiusWithAbility(caster, position, radius, ability, order)
    if not IsValid(caster) or not IsValid(ability) then
        return {}
    end
    if order == nil then
        order = FIND_ANY_ORDER
    end
    return FindUnitsInRadius(
        caster:GetTeamNumber(),
        position,
        nil,
        radius,
        ability:GetAbilityTargetTeam(),
        ability:GetAbilityTargetType(),
        ability:GetAbilityTargetFlags(),
        order,
        false
    )
end
function FindUnitsInSectorWithAbility(caster, position, radius, forwardVector, angle, ability, order)
    if not IsValid(caster) or not IsValid(ability) then
        return {}
    end
    if order == nil then
        order = FIND_ANY_ORDER
    end
    return FindUnitsInSector(
        caster:GetTeamNumber(),
        position,
        radius,
        forwardVector,
        angle,
        ability:GetAbilityTargetTeam(),
        ability:GetAbilityTargetType(),
        ability:GetAbilityTargetFlags(),
        order
    )
end
function FindUnitsInTruncatedSectorWithAbility(caster, position, innerRadius, outerRadius, forwardVector, angle, ability, order)
    if not IsValid(caster) or not IsValid(ability) then
        return {}
    end
    if order == nil then
        order = FIND_ANY_ORDER
    end
    return FindUnitsInTruncatedSector(
        caster:GetTeamNumber(),
        position,
        innerRadius,
        outerRadius,
        forwardVector,
        angle,
        ability:GetAbilityTargetTeam(),
        ability:GetAbilityTargetType(),
        ability:GetAbilityTargetFlags(),
        order
    )
end
function FindEnemiesInRadius(caster, position, radius, order, ____debug)
    if order == nil then
        order = FIND_ANY_ORDER
    end
    if ____debug == nil then
        ____debug = false
    end
    if not IsValid(caster) then
        return {}
    end
    if ____debug then
        DebugDrawCircle(
            position,
            Vector(255, 0, 0),
            32,
            radius,
            false,
            0.5
        )
    end
    return FindUnitsInRadius(
        caster:GetTeamNumber(),
        position,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
        DOTA_UNIT_TARGET_FLAG_NONE,
        order,
        false
    )
end
function FindEnemiesInLine(caster, start, ____end, width, ____debug)
    if ____debug == nil then
        ____debug = false
    end
    if not IsValid(caster) then
        return {}
    end
    if ____debug then
        local direction = CalcDirection2D(____end, start)
        local side = RotatePosition(
            vec3_zero,
            QAngle(0, 90, 0),
            direction
        ) * width
        local startLeft = start + side
        local startRight = start - side
        local endLeft = ____end + side
        local endRight = ____end - side
        local duration = 0.3
        DebugDrawLine(
            startLeft,
            endLeft,
            255,
            0,
            0,
            false,
            duration
        )
        DebugDrawLine(
            endLeft,
            endRight,
            255,
            0,
            0,
            false,
            duration
        )
        DebugDrawLine(
            endRight,
            startRight,
            255,
            0,
            0,
            false,
            duration
        )
        DebugDrawLine(
            startRight,
            startLeft,
            255,
            0,
            0,
            false,
            duration
        )
    end
    return FindUnitsInLine(
        caster:GetTeamNumber(),
        start,
        ____end,
        nil,
        width,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
        DOTA_UNIT_TARGET_FLAG_NONE
    )
end
function FindEnemiesInSector(caster, position, radius, forwardVector, angle, ____debug)
    if ____debug == nil then
        ____debug = false
    end
    if not IsValid(caster) then
        return {}
    end
    if ____debug then
        DebugDrawCircle(
            position,
            Vector(255, 0, 0),
            32,
            radius,
            false,
            0.5
        )
        local direction = forwardVector:Normalized()
        local side = RotatePosition(
            vec3_zero,
            QAngle(0, 90, 0),
            direction
        ) * radius
        local endLeft = position + (direction * radius + side)
        local endRight = position + (direction * radius - side)
        DebugDrawLine(
            position,
            endLeft,
            255,
            0,
            0,
            false,
            0.5
        )
        DebugDrawLine(
            position,
            endRight,
            255,
            0,
            0,
            false,
            0.5
        )
    end
    return FindUnitsInSector(
        caster:GetTeamNumber(),
        position,
        radius,
        forwardVector,
        angle,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER
    )
end
function FindEnemiesInTruncatedSector(caster, position, innerRadius, outerRadius, forwardVector, angle, ____debug)
    if ____debug == nil then
        ____debug = false
    end
    if not IsValid(caster) then
        return {}
    end
    if ____debug and not VectorIsZero(forwardVector) and outerRadius > 0 and angle > 0 then
        local direction = forwardVector:Normalized()
        local halfAngle = angle / 2
        local leftDirection = Rotation2D(direction, halfAngle, true)
        local rightDirection = Rotation2D(direction, -halfAngle, true)
        local outerLeft = position + leftDirection * outerRadius
        local outerRight = position + rightDirection * outerRadius
        local innerLeft = position + leftDirection * innerRadius
        local innerRight = position + rightDirection * innerRadius
        local duration = 0.5
        local segmentCount = 12
        DebugDrawLine(
            innerLeft,
            outerLeft,
            255,
            0,
            0,
            true,
            duration
        )
        DebugDrawLine(
            innerRight,
            outerRight,
            255,
            0,
            0,
            true,
            duration
        )
        DebugDrawLine(
            innerLeft,
            innerRight,
            255,
            0,
            0,
            true,
            duration
        )
        do
            local i = 0
            while i < segmentCount do
                local startAngle = halfAngle - angle * (i / segmentCount)
                local endAngle = halfAngle - angle * ((i + 1) / segmentCount)
                local startPoint = position + Rotation2D(direction, startAngle, true) * outerRadius
                local endPoint = position + Rotation2D(direction, endAngle, true) * outerRadius
                DebugDrawLine(
                    startPoint,
                    endPoint,
                    255,
                    0,
                    0,
                    true,
                    duration
                )
                i = i + 1
            end
        end
    end
    return FindUnitsInTruncatedSector(
        caster:GetTeamNumber(),
        position,
        innerRadius,
        outerRadius,
        forwardVector,
        angle,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HEROES_AND_CREEPS,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER
    )
end
--- 进行分裂
-- 
-- @param hAttacker 操作攻击者
-- @param hTarget 攻击目标
-- @param fStartWidth 开始宽度
-- @param fEndWidth 结束宽度
-- @param fDistance 距离
-- @param func 操作函数
-- @param iTeamFilter 可选队伍过滤，缺省值：DOTA_UNIT_TARGET_TEAM_ENEMY
-- @param iTypeFilter 可选类型过滤，缺省值：DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
-- @param iFlagFilter 可选标记过滤，缺省值：DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES + DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE
-- @param vStartOverride 可选起点，缺省使用攻击者当前位置
function DoCleaveAction(hAttacker, hTarget, fStartWidth, fEndWidth, fDistance, func, iTeamFilter, iTypeFilter, iFlagFilter, vStartOverride)
    if iTeamFilter == nil then
        iTeamFilter = DOTA_UNIT_TARGET_TEAM_ENEMY
    end
    if iTypeFilter == nil then
        iTypeFilter = DOTA_UNIT_TARGET_HEROES_AND_CREEPS
    end
    if iFlagFilter == nil then
        iFlagFilter = DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES + DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE
    end
    local fRadius = math.max(
        fStartWidth / 2,
        math.max(
            fEndWidth / 2,
            math.sqrt(bit.bxor(
                bit.bxor(fDistance, 2 + fEndWidth / 2),
                2
            ))
        )
    )
    local vStart = vStartOverride or hAttacker:GetAbsOrigin()
    local vDirection = hTarget:GetAbsOrigin() - vStart
    vDirection.z = 0
    vDirection = vDirection:Normalized()
    local vEnd = vStart + vDirection * fDistance
    local v = RotatePosition(
        vec3_zero,
        QAngle(0, 90, 0),
        vDirection
    )
    local pPolygon = {vStart + v * fStartWidth, vEnd + v * fEndWidth, vEnd - v * fEndWidth, vStart - v * fStartWidth}
    local aTargets = FindUnitsInRadius(
        hAttacker:GetTeamNumber(),
        vStart,
        nil,
        fRadius + 100,
        iTeamFilter,
        iTypeFilter,
        iFlagFilter,
        FIND_CLOSEST,
        false
    )
    for i = 0, #aTargets - 1, 1 do
        local hUnit = aTargets[i + 1]
        if hUnit ~= hTarget then
            if IsPointInPolygon(
                hUnit:GetAbsOrigin(),
                pPolygon
            ) then
                if func(hUnit) == true then
                    break
                end
            end
        end
    end
end
if TimerEventListenerIDs == nil then
    TimerEventListenerIDs = {}
end
--- 计时器事件
-- 
-- @param fInterval
-- @param func
-- @param context
function TimerEvent(fInterval, func, context)
    local hGameMode = GameRules:GetGameModeEntity()
    local s = hGameMode:Timer(
        fInterval,
        function()
            if context ~= nil then
                return func(context)
            end
            return func()
        end
    )
    TimerEventListenerIDs[#TimerEventListenerIDs + 1] = s
    return s
end
--- 计时器事件，暂停不会计时
-- 
-- @param fInterval
-- @param func
-- @param context
function GameTimerEvent(fInterval, func, context)
    local hGameMode = GameRules:GetGameModeEntity()
    local s = hGameMode:GameTimer(
        fInterval,
        function()
            if context ~= nil then
                return func(context)
            end
            return func()
        end
    )
    TimerEventListenerIDs[#TimerEventListenerIDs + 1] = s
    return s
end
--- 触发实体的Input事件
-- 
-- @param h 实体Index或实体
-- @param sInputName Input事件名
function FireInputNameOnly(h, sInputName)
    if type(h) == "number" then
        local a = EntIndexToHScript(h)
        if IsValid(a) then
            h = a
        else
            return
        end
    end
    if IsValid(h) then
        local e = h:GetEntityHandle()
        FireEntityIOInputNameOnly(e, sInputName)
    end
end
--- 触发实体的Input事件，附带字符串
-- 
-- @param h 实体Index或实体
-- @param sInputName Input事件名
-- @param sString 字符串
function FireInputString(h, sInputName, sString)
    print((((("FireInputString: " .. tostring(h)) .. " ") .. sInputName) .. " ") .. sString)
    if type(h) == "number" then
        local a = EntIndexToHScript(h)
        if a ~= nil then
            h = a
        else
            return
        end
    end
    if h ~= nil then
        local e = h:GetEntityHandle()
        FireEntityIOInputString(e, sInputName, sString)
    end
end
function FindInfoTarget(name)
    local entities = Entities:FindAllByClassname("info_target")
    for i, v in ipairs(entities) do
        return v:GetName() == name and v or nil
    end
end
--- 计算最大公约数（GCD）
function _GreatestCommonDivisor(a, b)
    while b ~= 0 do
        a, b = b, a % b
    end
    return a
end
--- 计算最小公倍数（LCM）
function _LeastCommonMultiple(a, b)
    return math.abs(a * b) / _GreatestCommonDivisor(a, b)
end
--- 计算多个数的最大公约数
function GreatestCommonDivisor(...)
    local numbers = {...}
    local length = #numbers
    if length == 0 then
        return 0 / 0
    elseif length == 1 then
        return numbers[1]
    end
    local result = numbers[1]
    do
        local i = 1
        while i < length do
            result = _GreatestCommonDivisor(result, numbers[i + 1])
            i = i + 1
        end
    end
    return result
end
--- 计算多个数的最小公倍数
function LeastCommonMultiple(...)
    local numbers = {...}
    local length = #numbers
    if length == 0 then
        return 0 / 0
    elseif length == 1 then
        return numbers[1]
    end
    local result = numbers[1]
    do
        local i = 1
        while i < length do
            result = _LeastCommonMultiple(result, numbers[i + 1])
            i = i + 1
        end
    end
    return result
end
--- 附加值计算函数
addedValueFunctionMap = {attack = "GetAttackDamage", health = "GetMaxHealth", shield = "GetShield"}
--- 通用处理获取AbilityValues
function GetAbilityValues(abilityValues, level, caster)
    if level == 0 or abilityValues == nil then
        return 0
    end
    if type(abilityValues) == "table" then
        local valueList = __TS__StringSplit(
            tostring(abilityValues.value),
            " "
        )
        local value = toFiniteNumber(valueList[math.min(level, #valueList)])
        if caster == nil then
            return value
        end
        local pct = 0
        local divisor = 0
        for k, v in pairs(abilityValues) do
            local method = __TS__StringSubstring(k, 0, 1)
            local addedKey = __TS__StringSubstring(k, 1)
            local addedValueList = __TS__StringSplit(
                tostring(v),
                " "
            )
            local addedValue = toFiniteNumber(addedValueList[math.min(level, #addedValueList)])
            if addedValueFunctionMap[addedKey] then
                local func = _G[addedValueFunctionMap[addedKey]]
                if method == "_" or method == "+" then
                    value = value + toFiniteNumber(
                        func(nil, caster) * addedValue,
                        0
                    )
                elseif method == "*" then
                    pct = pct + addedValue
                end
            elseif PROPERTY_FUNCTION_MAP[addedKey] then
                if method == "_" or method == "+" then
                    value = value + PROPERTY_FUNCTION_MAP[addedKey](caster)
                elseif method == "*" then
                    pct = pct + PROPERTY_FUNCTION_MAP[addedKey](caster) * addedValue
                elseif method == "/" then
                    divisor = divisor + PROPERTY_FUNCTION_MAP[addedKey](caster) * addedValue
                end
            end
        end
        return value * (1 + pct / 100) / (1 + divisor / 100)
    else
        local valueList = __TS__StringSplit(
            tostring(abilityValues),
            " "
        )
        local value = toFiniteNumber(valueList[math.min(level, #valueList)])
        return value
    end
end
--- 弹出错误信息
function ErrorMessage(message, playerID, sound, vars)
    if sound == nil then
        sound = "General.Cancel"
    end
    if message == nil then
        return
    end
    if playerID == nil then
        CustomGameEventManager:Send_ServerToAllClients("error_message", {message = message, sound = sound, vars = vars})
    else
        local player = PlayerResource:GetPlayer(playerID)
        if player ~= nil then
            CustomGameEventManager:Send_ServerToPlayer(player, "error_message", {message = message, sound = sound, vars = vars})
        end
    end
end
--- 从物品 ID 获取物品类型（前 1-2 位）
function GetItemPropType(itemID)
    local propType = tostring(itemID)
    if #propType == 6 then
        propType = string.sub(propType, 1, 1)
    else
        propType = string.sub(propType, 1, 2)
    end
    return propType
end
--- 从物品 ID 获取装备部位（第 5 位）
function GetItemEquipmentPart(itemID)
    return string.sub(
        tostring(itemID),
        5,
        5
    )
end
