local __TSTL_FILE_PATH__ = "framework/property_system/property_system"
local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__Number = ____lualib.__TS__Number
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["19"] = 3,["20"] = 3,["21"] = 28,["22"] = 29,["23"] = 32,["24"] = 32,["25"] = 33,["27"] = 33,["28"] = 35,["29"] = 36,["30"] = 37,["31"] = 40,["32"] = 32,["33"] = 42,["34"] = 43,["35"] = 44,["36"] = 46,["37"] = 47,["38"] = 48,["39"] = 49,["40"] = 50,["42"] = 52,["44"] = 55,["46"] = 57,["48"] = 59,["49"] = 60,["50"] = 42,["51"] = 63,["52"] = 64,["53"] = 63,["54"] = 67,["55"] = 68,["56"] = 67,["57"] = 73,["58"] = 74,["59"] = 75,["60"] = 75,["61"] = 75,["62"] = 75,["63"] = 75,["64"] = 75,["65"] = 75,["66"] = 75,["67"] = 75,["69"] = 73,["70"] = 96,["71"] = 98,["72"] = 99,["73"] = 100,["74"] = 100,["75"] = 100,["77"] = 101,["78"] = 102,["79"] = 102,["80"] = 102,["82"] = 97,["83"] = 97,["84"] = 97,["85"] = 97,["86"] = 97,["87"] = 97,["88"] = 97,["89"] = 106,["90"] = 109,["91"] = 111,["92"] = 112,["94"] = 114,["95"] = 115,["96"] = 115,["97"] = 115,["98"] = 115,["99"] = 119,["102"] = 123,["104"] = 96,["105"] = 132,["106"] = 133,["107"] = 134,["109"] = 132,["110"] = 148,["111"] = 155,["112"] = 156,["113"] = 156,["115"] = 158,["116"] = 159,["117"] = 161,["118"] = 162,["119"] = 163,["121"] = 167,["122"] = 167,["123"] = 167,["124"] = 167,["125"] = 168,["126"] = 170,["127"] = 171,["128"] = 172,["129"] = 173,["130"] = 174,["131"] = 175,["132"] = 176,["133"] = 176,["134"] = 176,["135"] = 176,["136"] = 176,["137"] = 176,["138"] = 176,["141"] = 186,["142"] = 187,["143"] = 187,["144"] = 187,["145"] = 187,["146"] = 187,["147"] = 187,["148"] = 193,["149"] = 194,["150"] = 195,["151"] = 196,["152"] = 196,["153"] = 196,["154"] = 196,["155"] = 196,["156"] = 196,["157"] = 196,["160"] = 206,["161"] = 207,["163"] = 210,["164"] = 210,["165"] = 211,["166"] = 148,["167"] = 220,["168"] = 225,["169"] = 226,["171"] = 229,["172"] = 230,["173"] = 231,["174"] = 232,["177"] = 235,["179"] = 220,["180"] = 239,["181"] = 244,["182"] = 244,["184"] = 246,["185"] = 247,["186"] = 248,["187"] = 250,["188"] = 250,["190"] = 253,["191"] = 253,["192"] = 253,["193"] = 253,["194"] = 255,["195"] = 257,["196"] = 258,["197"] = 260,["198"] = 261,["199"] = 262,["201"] = 264,["203"] = 267,["204"] = 268,["205"] = 269,["206"] = 269,["207"] = 269,["208"] = 269,["209"] = 269,["210"] = 269,["211"] = 269,["213"] = 278,["214"] = 279,["216"] = 282,["218"] = 285,["219"] = 239,["220"] = 311,["221"] = 319,["222"] = 320,["223"] = 320,["225"] = 321,["226"] = 322,["227"] = 322,["228"] = 322,["229"] = 322,["230"] = 322,["231"] = 322,["232"] = 322,["233"] = 311,["234"] = 347,["235"] = 353,["236"] = 355,["237"] = 357,["238"] = 358,["239"] = 358,["241"] = 359,["242"] = 360,["244"] = 363,["246"] = 364,["247"] = 365,["248"] = 366,["249"] = 366,["251"] = 369,["252"] = 370,["253"] = 371,["258"] = 374,["260"] = 347,["261"] = 390,["262"] = 391,["263"] = 392,["264"] = 393,["265"] = 394,["266"] = 395,["267"] = 396,["269"] = 398,["271"] = 401,["272"] = 402,["273"] = 390,["274"] = 406,["275"] = 407,["276"] = 408,["277"] = 408,["279"] = 410,["280"] = 411,["281"] = 413,["282"] = 413,["283"] = 414,["284"] = 415,["285"] = 415,["287"] = 420,["288"] = 406,["289"] = 423,["290"] = 424,["291"] = 425,["294"] = 427,["295"] = 428,["296"] = 430,["297"] = 431,["300"] = 438,["301"] = 440,["302"] = 441,["304"] = 444,["305"] = 423,["306"] = 449,["307"] = 456,["308"] = 456,["310"] = 458,["311"] = 459,["312"] = 459,["314"] = 460,["315"] = 461,["316"] = 462,["318"] = 465,["319"] = 465,["321"] = 466,["322"] = 466,["324"] = 467,["325"] = 469,["326"] = 470,["327"] = 471,["329"] = 474,["330"] = 474,["331"] = 474,["332"] = 474,["333"] = 475,["334"] = 476,["335"] = 477,["337"] = 479,["338"] = 479,["339"] = 479,["340"] = 479,["341"] = 479,["342"] = 479,["344"] = 487,["345"] = 488,["346"] = 449,["347"] = 491,["348"] = 496,["349"] = 496,["351"] = 498,["352"] = 499,["354"] = 502,["355"] = 503,["356"] = 504,["357"] = 505,["360"] = 508,["361"] = 491,["362"] = 511,["363"] = 512,["364"] = 512,["366"] = 513,["367"] = 511,["368"] = 516,["369"] = 517,["372"] = 518,["373"] = 519,["374"] = 516,["375"] = 522,["376"] = 527,["377"] = 527,["378"] = 528,["379"] = 528,["381"] = 530,["382"] = 530,["383"] = 530,["384"] = 530,["385"] = 531,["386"] = 531,["388"] = 533,["389"] = 534,["390"] = 535,["391"] = 536,["393"] = 536,["395"] = 536,["397"] = 538,["399"] = 541,["400"] = 522,["401"] = 544,["402"] = 545,["403"] = 546,["406"] = 548,["407"] = 548,["409"] = 549,["410"] = 549,["411"] = 551,["412"] = 552,["415"] = 556,["416"] = 557,["417"] = 558,["419"] = 561,["420"] = 544,["421"] = 575,["422"] = 580,["423"] = 580,["425"] = 583,["426"] = 583,["428"] = 585,["429"] = 586,["430"] = 587,["431"] = 589,["432"] = 590,["433"] = 591,["435"] = 594,["436"] = 594,["437"] = 594,["438"] = 594,["439"] = 595,["440"] = 597,["441"] = 598,["442"] = 599,["444"] = 602,["445"] = 602,["446"] = 602,["447"] = 602,["448"] = 602,["449"] = 602,["450"] = 602,["452"] = 611,["453"] = 611,["454"] = 611,["455"] = 611,["456"] = 612,["457"] = 612,["458"] = 612,["459"] = 612,["460"] = 612,["461"] = 612,["462"] = 614,["463"] = 615,["465"] = 618,["466"] = 618,["467"] = 619,["468"] = 575,["469"] = 628,["470"] = 633,["471"] = 634,["473"] = 637,["474"] = 638,["475"] = 639,["476"] = 640,["479"] = 643,["481"] = 628,["482"] = 647,["483"] = 652,["484"] = 652,["486"] = 654,["487"] = 655,["488"] = 656,["489"] = 658,["490"] = 658,["492"] = 661,["493"] = 661,["494"] = 661,["495"] = 661,["496"] = 662,["497"] = 663,["498"] = 665,["499"] = 666,["501"] = 669,["502"] = 669,["503"] = 669,["504"] = 669,["505"] = 669,["506"] = 669,["507"] = 671,["508"] = 672,["510"] = 675,["512"] = 678,["513"] = 647,["514"] = 682,["515"] = 683,["516"] = 684,["517"] = 684,["519"] = 686,["520"] = 689,["521"] = 690,["522"] = 691,["523"] = 693,["524"] = 694,["525"] = 695,["526"] = 696,["527"] = 696,["528"] = 697,["529"] = 697,["530"] = 698,["534"] = 704,["535"] = 707,["536"] = 707,["538"] = 709,["539"] = 709,["540"] = 710,["541"] = 682,["542"] = 714,["543"] = 715,["544"] = 716,["545"] = 717,["546"] = 718,["547"] = 718,["548"] = 718,["549"] = 718,["550"] = 718,["551"] = 719,["552"] = 720,["555"] = 721,["556"] = 721,["558"] = 722,["559"] = 722,["560"] = 722,["561"] = 722,["562"] = 722,["563"] = 722,["564"] = 722,["565"] = 722,["567"] = 714,["568"] = 725,["569"] = 726,["570"] = 727,["571"] = 727,["573"] = 729,["574"] = 730,["575"] = 732,["576"] = 733,["578"] = 739,["579"] = 741,["582"] = 748,["585"] = 743,["586"] = 744,["587"] = 745,["595"] = 752,["596"] = 725,["597"] = 756,["598"] = 757,["599"] = 759,["600"] = 760,["602"] = 762,["604"] = 756,["605"] = 775,["606"] = 780,["607"] = 781,["608"] = 782,["609"] = 783,["610"] = 787,["611"] = 788,["612"] = 791,["613"] = 791,["615"] = 791,["616"] = 791,["620"] = 791,["622"] = 791,["624"] = 791,["626"] = 791,["627"] = 794,["628"] = 795,["629"] = 796,["631"] = 798,["632"] = 799,["634"] = 802,["636"] = 775,["637"] = 813,["638"] = 814,["639"] = 815,["640"] = 815,["642"] = 816,["643"] = 817,["644"] = 813,["645"] = 825,["646"] = 826,["647"] = 827,["648"] = 827,["650"] = 828,["651"] = 825,["652"] = 845,["653"] = 846,["654"] = 847,["655"] = 847,["657"] = 849,["658"] = 852,["659"] = 853,["660"] = 854,["661"] = 854,["662"] = 857,["663"] = 858,["664"] = 860,["665"] = 845,["666"] = 865,["667"] = 866,["668"] = 866,["669"] = 866,["670"] = 866,["671"] = 866,["672"] = 866,["673"] = 866,["674"] = 866,["675"] = 871,["676"] = 871,["677"] = 871,["678"] = 872,["679"] = 873,["680"] = 871,["681"] = 871,["682"] = 876,["683"] = 865,["684"] = 879,["685"] = 880,["686"] = 881,["687"] = 882,["688"] = 882,["690"] = 883,["693"] = 885,["694"] = 888,["695"] = 890,["697"] = 892,["698"] = 893,["699"] = 893,["700"] = 893,["701"] = 893,["702"] = 893,["703"] = 894,["704"] = 895,["705"] = 896,["706"] = 897,["708"] = 900,["709"] = 902,["710"] = 903,["712"] = 905,["713"] = 905,["717"] = 909,["718"] = 910,["719"] = 911,["720"] = 912,["721"] = 912,["722"] = 912,["723"] = 913,["724"] = 913,["725"] = 913,["726"] = 913,["727"] = 913,["728"] = 914,["729"] = 914,["730"] = 914,["731"] = 914,["732"] = 914,["733"] = 916,["734"] = 917,["735"] = 919,["736"] = 920,["737"] = 922,["738"] = 912,["739"] = 912,["740"] = 926,["742"] = 929,["743"] = 930,["744"] = 930,["745"] = 879,["746"] = 934,["747"] = 935,["748"] = 936,["749"] = 937,["751"] = 938,["752"] = 939,["753"] = 939,["755"] = 940,["756"] = 941,["757"] = 941,["758"] = 941,["765"] = 934,["766"] = 947,["767"] = 948,["768"] = 949,["770"] = 952,["771"] = 953,["772"] = 947,["773"] = 959,["774"] = 960,["775"] = 961,["776"] = 961,["777"] = 961,["779"] = 961,["781"] = 961,["782"] = 962,["783"] = 963,["784"] = 964,["785"] = 964,["786"] = 964,["787"] = 964,["788"] = 964,["789"] = 965,["790"] = 966,["791"] = 969,["792"] = 970,["793"] = 970,["794"] = 970,["797"] = 973,["798"] = 973,["800"] = 959,["801"] = 1042,["802"] = 1043,["803"] = 1044,["804"] = 1046,["805"] = 1047,["807"] = 1050,["808"] = 1042,["809"] = 1054,["810"] = 1060,["811"] = 1061,["812"] = 1062,["814"] = 1065,["815"] = 1067,["816"] = 1067,["817"] = 1067,["818"] = 1068,["819"] = 1069,["820"] = 1070,["821"] = 1071,["823"] = 1073,["824"] = 1067,["825"] = 1067,["826"] = 1054,["827"] = 1084,["828"] = 1086,["829"] = 1089,["830"] = 1084,["831"] = 1093,["832"] = 1094,["835"] = 1096,["836"] = 1097,["837"] = 1099,["838"] = 1100,["839"] = 1101,["841"] = 1093,["842"] = 1106,["843"] = 1107,["844"] = 1108,["845"] = 1109,["846"] = 1106,["847"] = 1113,["848"] = 1114,["851"] = 1115,["852"] = 1113,["853"] = 1118,["854"] = 1119,["855"] = 1123,["856"] = 1124,["857"] = 1125,["858"] = 1126,["859"] = 1127,["860"] = 1128,["861"] = 1129,["863"] = 1118,["864"] = 1133,["865"] = 1134,["866"] = 1135,["867"] = 1136,["868"] = 1137,["869"] = 1137,["870"] = 1137,["871"] = 1137,["872"] = 1137,["873"] = 1138,["876"] = 1133,["877"] = 1143,["878"] = 1144,["881"] = 1148,["882"] = 1149,["883"] = 1143,["884"] = 1153,["885"] = 1154,["886"] = 1156,["887"] = 1157,["889"] = 1160,["890"] = 1161,["892"] = 1164,["893"] = 1165,["895"] = 1168,["896"] = 1153,["897"] = 1171,["898"] = 1175,["899"] = 1171,["900"] = 1179,["901"] = 1180,["902"] = 1182,["903"] = 1183,["904"] = 1184,["905"] = 1185,["908"] = 1189,["909"] = 1190,["910"] = 1191,["911"] = 1191,["912"] = 1191,["914"] = 1191,["916"] = 1191,["917"] = 1192,["918"] = 1193,["919"] = 1194,["920"] = 1195,["921"] = 1196,["922"] = 1197,["923"] = 1198,["924"] = 1199,["927"] = 1203,["928"] = 1179,["929"] = 1206,["930"] = 1207,["931"] = 1208,["932"] = 1208,["934"] = 1209,["935"] = 1210,["936"] = 1210,["938"] = 1211,["939"] = 1212,["940"] = 1212,["942"] = 1213,["943"] = 1214,["944"] = 1214,["946"] = 1215,["947"] = 1206,["948"] = 1219,["949"] = 1220,["950"] = 1220,["951"] = 1220,["952"] = 1221,["953"] = 1222,["954"] = 1223,["955"] = 1220,["956"] = 1220,["957"] = 1226,["958"] = 1219,["959"] = 1230,["960"] = 1231,["961"] = 1231,["962"] = 1231,["965"] = 1232,["966"] = 1233,["967"] = 1234,["968"] = 1235,["969"] = 1230,["970"] = 1246,["971"] = 1247,["972"] = 1248,["973"] = 1251,["974"] = 1252,["975"] = 1253,["977"] = 1257,["978"] = 1258,["979"] = 1259,["981"] = 1262,["982"] = 1246,["983"] = 1266,["984"] = 1267,["985"] = 1268,["986"] = 1269,["987"] = 1272,["988"] = 1273,["989"] = 1274,["990"] = 1275,["991"] = 1276,["992"] = 1277,["993"] = 1279,["994"] = 1280,["997"] = 1285,["998"] = 1286,["999"] = 1287,["1000"] = 1288,["1001"] = 1289,["1002"] = 1290,["1003"] = 1292,["1004"] = 1293,["1007"] = 1297,["1008"] = 1266,["1009"] = 1305,["1010"] = 1305,["1011"] = 1316,["1012"] = 1317,["1013"] = 1318,["1016"] = 1320,["1017"] = 1323,["1018"] = 1324,["1019"] = 1329,["1020"] = 1330,["1021"] = 1330,["1022"] = 1330,["1023"] = 1330,["1024"] = 1330,["1025"] = 1330,["1026"] = 1330,["1029"] = 1316,["1030"] = 1344,["1031"] = 1346,["1032"] = 1346,["1033"] = 1346,["1034"] = 1347,["1035"] = 1346,["1036"] = 1346,["1037"] = 1346,["1038"] = 1346,["1039"] = 1351,["1040"] = 1351,["1041"] = 1351,["1042"] = 1352,["1043"] = 1351,["1044"] = 1351,["1045"] = 1351,["1046"] = 1351,["1047"] = 1356,["1048"] = 1356,["1049"] = 1356,["1050"] = 1357,["1051"] = 1363,["1052"] = 1356,["1053"] = 1356,["1054"] = 1356,["1055"] = 1356,["1056"] = 1367,["1057"] = 1367,["1058"] = 1367,["1059"] = 1368,["1060"] = 1369,["1061"] = 1370,["1062"] = 1371,["1064"] = 1367,["1065"] = 1367,["1066"] = 1367,["1067"] = 1367,["1068"] = 1376,["1069"] = 1376,["1070"] = 1376,["1071"] = 1377,["1072"] = 1378,["1073"] = 1379,["1074"] = 1376,["1075"] = 1376,["1076"] = 1376,["1077"] = 1376,["1078"] = 1383,["1079"] = 1383,["1080"] = 1383,["1081"] = 1384,["1082"] = 1385,["1083"] = 1386,["1084"] = 1387,["1085"] = 1389,["1086"] = 1390,["1087"] = 1391,["1088"] = 1392,["1091"] = 1397,["1092"] = 1398,["1093"] = 1399,["1095"] = 1401,["1096"] = 1401,["1097"] = 1401,["1098"] = 1401,["1099"] = 1402,["1101"] = 1403,["1102"] = 1403,["1103"] = 1404,["1104"] = 1403,["1107"] = 1383,["1108"] = 1383,["1109"] = 1383,["1110"] = 1383,["1111"] = 1408,["1112"] = 1344,["1113"] = 1411,["1114"] = 1412,["1115"] = 1413,["1116"] = 1413,["1118"] = 1414,["1119"] = 1415,["1120"] = 1415,["1122"] = 1416,["1123"] = 1417,["1124"] = 1417,["1126"] = 1419,["1127"] = 1420,["1128"] = 1420,["1130"] = 1422,["1131"] = 1423,["1132"] = 1424,["1133"] = 1425,["1134"] = 1426,["1135"] = 1427,["1136"] = 1411,["1137"] = 1430,["1138"] = 1431,["1139"] = 1432,["1140"] = 1436,["1141"] = 1437,["1142"] = 1438,["1143"] = 1439,["1144"] = 1440,["1145"] = 1430,["1146"] = 1445,["1147"] = 1446,["1148"] = 1450,["1149"] = 1451,["1150"] = 1452,["1151"] = 1458,["1153"] = 1461,["1154"] = 1445,["1155"] = 1464,["1156"] = 1465,["1157"] = 1464,["1158"] = 1468,["1159"] = 1469,["1160"] = 1470,["1161"] = 1468,["1162"] = 1474,["1163"] = 1475,["1164"] = 1476,["1165"] = 1477,["1167"] = 1479,["1168"] = 1474,["1169"] = 1482,["1170"] = 1483,["1171"] = 1484,["1172"] = 1485,["1174"] = 1487,["1175"] = 1482,["1176"] = 1496,["1177"] = 1497,["1178"] = 1497,["1180"] = 1500,["1181"] = 1501,["1182"] = 1502,["1184"] = 1506,["1185"] = 1507,["1186"] = 1507,["1187"] = 1507,["1188"] = 1507,["1190"] = 1510,["1191"] = 1496,["1192"] = 1513,["1194"] = 1514,["1195"] = 1515,["1197"] = 1516,["1199"] = 1517,["1201"] = 1518,["1203"] = 1519,["1205"] = 1520,["1207"] = 1521,["1209"] = 1522,["1211"] = 1523,["1213"] = 1524,["1215"] = 1525,["1217"] = 1526,["1219"] = 1527,["1221"] = 1528,["1223"] = 1529,["1225"] = 1530,["1226"] = 1531,["1228"] = 1533,["1231"] = 1535,["1234"] = 1513,["1235"] = 1539,["1237"] = 1540,["1238"] = 1541,["1240"] = 1542,["1242"] = 1543,["1244"] = 1544,["1246"] = 1545,["1248"] = 1547,["1251"] = 1549,["1254"] = 1539,["1255"] = 1553,["1256"] = 1555,["1257"] = 1553,["1258"] = 1558,["1259"] = 1559,["1260"] = 1560,["1261"] = 1558,["1262"] = 1563,["1263"] = 1564,["1264"] = 1563,["1265"] = 1567,["1266"] = 1568,["1267"] = 1567,["1268"] = 1574,["1269"] = 1575,["1272"] = 1577,["1273"] = 1578,["1274"] = 1578,["1276"] = 1579,["1277"] = 1580,["1278"] = 1581,["1279"] = 1582,["1280"] = 1582,["1282"] = 1583,["1283"] = 1574,["1284"] = 32,["1285"] = 1610,["1286"] = 1610});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
require("framework.property_system.property_system_types")
require("framework.property_system.properties_tool")
local MPropertySystem = __TS__Class()
MPropertySystem.name = "MPropertySystem"
__TS__ClassExtends(MPropertySystem, CModule)
function MPropertySystem.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.NETTABLE_NAME = "property_system"
    self.SYNC_INTERVAL = 0.2
    self.MAX_NETTABLE_SIZE = 14000
    self.autoCleanupInterval = 30
end
function MPropertySystem.prototype.init(self, reload)
    if not reload then
        self:InitializeCore()
        if IsServer() then
            self:InitializeNetTableSync()
            self:StartAutoCleanup()
            if IsInToolsMode() then
                self:RegisterDebugCommands()
            end
            self:RegisterEventPropertyResponses()
        end
        self:print("Property System initialized")
    else
        self:print("Property System reloaded")
    end
    require("framework.property_system.properties")
    require("framework.property_system.athena_property_map")
end
function MPropertySystem.prototype.initPriority(self)
    return 10
end
function MPropertySystem.prototype.reset(self)
    self:ResetSystem()
end
function MPropertySystem.prototype.InitializeCore(self)
    if not PropertyData then
        PropertyData = {
            configs = {},
            playerStorage = {},
            unitStorage = {},
            dirtyKeys = {},
            lastSyncTime = 0,
            stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0},
            eventPropertyResponses = {}
        }
    end
end
function MPropertySystem.prototype.RegisterProperty(self, config)
    local ____config_2 = config
    local ____temp_3 = config.defaultValue or 0
    local ____config_syncToClient_0 = config.syncToClient
    if ____config_syncToClient_0 == nil then
        ____config_syncToClient_0 = true
    end
    local ____temp_4 = config.syncPriority or 100
    local ____config_enableCache_1 = config.enableCache
    if ____config_enableCache_1 == nil then
        ____config_enableCache_1 = true
    end
    local finalConfig = __TS__ObjectAssign({}, ____config_2, {
        defaultValue = ____temp_3,
        syncToClient = ____config_syncToClient_0,
        syncPriority = ____temp_4,
        enableCache = ____config_enableCache_1,
        cacheDuration = config.cacheDuration or 0
    })
    PropertyData.configs[config.id] = finalConfig
    if config.event_name ~= nil and config.event_name ~= "" and config.event_link_id ~= nil and config.event_link_id ~= "" then
        if not PropertyData.eventPropertyResponses[config.event_name] then
            PropertyData.eventPropertyResponses[config.event_name] = {}
        end
        local responseList = PropertyData.eventPropertyResponses[config.event_name]
        local existingIndex = __TS__ArrayFindIndex(
            responseList,
            function(____, response) return response.sourcePropertyId == config.id and response.targetPropertyId == config.event_link_id end
        )
        if existingIndex ~= -1 then
            return
        end
        responseList[#responseList + 1] = {sourcePropertyId = config.id, targetPropertyId = config.event_link_id}
    end
end
function MPropertySystem.prototype.RegisterProperties(self, configs)
    for ____, config in ipairs(configs) do
        self:RegisterProperty(config)
    end
end
function MPropertySystem.prototype.AddStaticProperty(self, key, propertyId, sourceId, value, metadata)
    local config = self:GetConfig(propertyId)
    if config == nil then
        return false
    end
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.static[propertyId]
    if not propertyList then
        propertyList = {}
        storage.static[propertyId] = propertyList
    end
    local existingIndex = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if existingIndex ~= -1 then
        local oldValue = self:GetStaticPropertyValue(config.scope, key, propertyId)
        propertyList[existingIndex + 1].value = value
        propertyList[existingIndex + 1].metadata = metadata
        self:RecalculateStaticProperty(config.scope, key, propertyId)
        local newValue = self:GetStaticPropertyValue(config.scope, key, propertyId)
        if config.notify and oldValue ~= newValue then
            Event:Fire("property_changed", {
                scope = config.scope,
                key = key,
                propertyId = propertyId,
                oldValue = oldValue,
                newValue = newValue
            })
        end
    else
        local oldValue = self:GetStaticPropertyValue(config.scope, key, propertyId)
        propertyList[#propertyList + 1] = {
            sourceId = sourceId,
            value = value,
            addedTime = self:GetCurrentTime(),
            metadata = metadata
        }
        self:RecalculateStaticProperty(config.scope, key, propertyId)
        local newValue = self:GetStaticPropertyValue(config.scope, key, propertyId)
        if config.notify and oldValue ~= newValue then
            Event:Fire("property_changed", {
                scope = config.scope,
                key = key,
                propertyId = propertyId,
                oldValue = oldValue,
                newValue = newValue
            })
        end
    end
    if config.syncToClient then
        self:MarkDirty(config.scope, key, propertyId)
    end
    local ____PropertyData_stats_5, ____totalWrites_6 = PropertyData.stats, "totalWrites"
    ____PropertyData_stats_5[____totalWrites_6] = ____PropertyData_stats_5[____totalWrites_6] + 1
    return true
end
function MPropertySystem.prototype.RemoveStaticProperty(self, key, sourceId, propertyId)
    if propertyId then
        return self:RemoveSingleStaticProperty(key, sourceId, propertyId)
    else
        local removed = false
        for pid in pairs(PropertyData.configs) do
            if self:RemoveSingleStaticProperty(key, sourceId, pid) then
                removed = true
            end
        end
        return removed
    end
end
function MPropertySystem.prototype.RemoveSingleStaticProperty(self, key, sourceId, propertyId)
    if not self:ValidateProperty(propertyId) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.static[propertyId]
    if not propertyList then
        return false
    end
    local index = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if index ~= -1 then
        local oldValue = self:GetStaticPropertyValue(config.scope, key, propertyId)
        __TS__ArraySplice(propertyList, index, 1)
        if #propertyList == 0 then
            __TS__Delete(storage.static, propertyId)
            __TS__Delete(storage.staticCache, propertyId)
        else
            self:RecalculateStaticProperty(config.scope, key, propertyId)
        end
        local newValue = self:GetStaticPropertyValue(config.scope, key, propertyId)
        if config.notify and oldValue ~= newValue then
            Event:Fire("property_changed", {
                scope = config.scope,
                key = key,
                propertyId = propertyId,
                oldValue = oldValue,
                newValue = newValue
            })
        end
        if config.syncToClient then
            self:MarkDirty(config.scope, key, propertyId)
        end
        return true
    end
    return false
end
function MPropertySystem.prototype.AddStaticPropertyEx(self, propertyId, sourceId, value, playerId, unitIndex, metadata)
    local config = self:GetConfig(propertyId)
    if config == nil then
        return false
    end
    local key = self:SelectKeyFromContext(config.scope, playerId, unitIndex)
    return self:AddStaticProperty(
        key,
        propertyId,
        sourceId,
        value,
        metadata
    )
end
function MPropertySystem.prototype.RemoveStaticPropertyEx(self, sourceId, playerId, unitIndex, propertyId)
    local removed = false
    if propertyId then
        local config = self:GetConfig(propertyId)
        if config == nil then
            return false
        end
        local key = self:SelectKeyFromContext(config.scope, playerId, unitIndex)
        return self:RemoveStaticProperty(key, sourceId, propertyId)
    else
        for pid in pairs(PropertyData.configs) do
            do
                local propId = pid
                local config = self:GetConfig(propId)
                if config == nil then
                    goto __continue48
                end
                local key = self:SelectKeyFromContext(config.scope, playerId, unitIndex)
                if self:RemoveSingleStaticProperty(key, sourceId, propId) then
                    removed = true
                end
            end
            ::__continue48::
        end
        return removed
    end
end
function MPropertySystem.prototype.SelectKeyFromContext(self, scope, playerID, unitIndex)
    if scope == PropertyScope.PLAYER then
        return playerID
    elseif scope == PropertyScope.UNIT then
        if not unitIndex then
            self:print("[PropertySystem] Error: UNIT scope property requires unit in context")
            return playerID
        end
        return unitIndex
    end
    self:print("[PropertySystem] Error: Unknown scope " .. tostring(scope))
    return playerID
end
function MPropertySystem.prototype.GetStaticPropertyValue(self, scope, key, propertyId)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    local cachedValue = storage.staticCache[propertyId]
    local ____PropertyData_stats_7, ____totalReads_8 = PropertyData.stats, "totalReads"
    ____PropertyData_stats_7[____totalReads_8] = ____PropertyData_stats_7[____totalReads_8] + 1
    if cachedValue ~= nil then
        local ____PropertyData_stats_9, ____cacheHits_10 = PropertyData.stats, "cacheHits"
        ____PropertyData_stats_9[____cacheHits_10] = ____PropertyData_stats_9[____cacheHits_10] + 1
    end
    return cachedValue or 0
end
function MPropertySystem.prototype.RecalculateStaticProperty(self, scope, key, propertyId)
    local config = self:GetConfig(propertyId)
    if not config then
        return
    end
    local storage = self:GetStorage(scope, key)
    local propertyList = storage.static[propertyId]
    if not propertyList or #propertyList == 0 then
        __TS__Delete(storage.staticCache, propertyId)
        return
    end
    local result = self:GetAggregationInitialValue(config.aggregation, 0)
    for ____, data in ipairs(propertyList) do
        result = self:AggregateValues(config.aggregation, result, data.value, config.customAggregator)
    end
    storage.staticCache[propertyId] = result
end
function MPropertySystem.prototype.AddAbilityStaticProperty(self, ability, propertyId, sourceId, value, metadata)
    if not IsValid(ability) then
        return false
    end
    local config = self:GetConfig(propertyId)
    if config == nil then
        return false
    end
    if config.scope ~= PropertyScope.UNIT then
        self:print("[PropertySystem] Ability extra property only supports UNIT scope: " .. propertyId)
        return false
    end
    if ability.__ExtraStaticPropertyList == nil then
        ability.__ExtraStaticPropertyList = {}
    end
    if ability.__ExtraStaticPropertyCache == nil then
        ability.__ExtraStaticPropertyCache = {}
    end
    local propertyList = ability.__ExtraStaticPropertyList[propertyId]
    if not propertyList then
        propertyList = {}
        ability.__ExtraStaticPropertyList[propertyId] = propertyList
    end
    local existingIndex = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if existingIndex ~= -1 then
        propertyList[existingIndex + 1].value = value
        propertyList[existingIndex + 1].metadata = metadata
    else
        propertyList[#propertyList + 1] = {
            sourceId = sourceId,
            value = value,
            addedTime = self:GetCurrentTime(),
            metadata = metadata
        }
    end
    self:RecalculateAbilityStaticProperty(ability, propertyId)
    return true
end
function MPropertySystem.prototype.RemoveAbilityStaticProperty(self, ability, sourceId, propertyId)
    if not IsValid(ability) or ability.__ExtraStaticPropertyList == nil then
        return false
    end
    if propertyId ~= nil then
        return self:RemoveSingleAbilityStaticProperty(ability, sourceId, propertyId)
    end
    local removed = false
    for pid in pairs(ability.__ExtraStaticPropertyList) do
        if self:RemoveSingleAbilityStaticProperty(ability, sourceId, pid) then
            removed = true
        end
    end
    return removed
end
function MPropertySystem.prototype.GetAbilityExtraPropertyTable(self, ability)
    if not IsValid(ability) then
        return nil
    end
    return ability.__ExtraStaticPropertyCache
end
function MPropertySystem.prototype.ClearAbilityStaticProperties(self, ability)
    if not IsValid(ability) then
        return
    end
    ability.__ExtraStaticPropertyList = nil
    ability.__ExtraStaticPropertyCache = nil
end
function MPropertySystem.prototype.RemoveSingleAbilityStaticProperty(self, ability, sourceId, propertyId)
    local ____opt_11 = ability.__ExtraStaticPropertyList
    local propertyList = ____opt_11 and ____opt_11[propertyId]
    if not propertyList then
        return false
    end
    local index = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if index == -1 then
        return false
    end
    __TS__ArraySplice(propertyList, index, 1)
    if #propertyList == 0 then
        __TS__Delete(ability.__ExtraStaticPropertyList, propertyId)
        local ____opt_13 = ability.__ExtraStaticPropertyCache
        if ____opt_13 ~= nil then
            __TS__Delete(____opt_13, propertyId)
        end
        local ____ = true
    else
        self:RecalculateAbilityStaticProperty(ability, propertyId)
    end
    return true
end
function MPropertySystem.prototype.RecalculateAbilityStaticProperty(self, ability, propertyId)
    local config = self:GetConfig(propertyId)
    if not config then
        return
    end
    if ability.__ExtraStaticPropertyCache == nil then
        ability.__ExtraStaticPropertyCache = {}
    end
    local ____opt_15 = ability.__ExtraStaticPropertyList
    local propertyList = ____opt_15 and ____opt_15[propertyId]
    if not propertyList or #propertyList == 0 then
        __TS__Delete(ability.__ExtraStaticPropertyCache, propertyId)
        return
    end
    local result = self:GetAggregationInitialValue(config.aggregation, 0)
    for ____, data in ipairs(propertyList) do
        result = self:AggregateValues(config.aggregation, result, data.value, config.customAggregator)
    end
    ability.__ExtraStaticPropertyCache[propertyId] = result
end
function MPropertySystem.prototype.RegisterDynamicProperty(self, key, propertyId, sourceId, callback, priority, metadata)
    if priority == nil then
        priority = 0
    end
    if not self:ValidateProperty(propertyId) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.dynamic[propertyId]
    if not propertyList then
        propertyList = {}
        storage.dynamic[propertyId] = propertyList
    end
    local existingIndex = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if existingIndex ~= -1 then
        propertyList[existingIndex + 1].callback = callback
        propertyList[existingIndex + 1].priority = priority
        propertyList[existingIndex + 1].metadata = metadata
    else
        propertyList[#propertyList + 1] = {
            sourceId = sourceId,
            callback = callback,
            priority = priority,
            addedTime = self:GetCurrentTime(),
            metadata = metadata
        }
    end
    __TS__ArraySort(
        propertyList,
        function(____, a, b) return a.priority - b.priority end
    )
    self:StoreDynamicSnapshot(
        config.scope,
        key,
        propertyId,
        self:CalculateDynamicPropertyValue(config.scope, key, propertyId)
    )
    if config.syncToClient then
        self:MarkDirty(config.scope, key, propertyId)
    end
    local ____PropertyData_stats_17, ____totalWrites_18 = PropertyData.stats, "totalWrites"
    ____PropertyData_stats_17[____totalWrites_18] = ____PropertyData_stats_17[____totalWrites_18] + 1
    return true
end
function MPropertySystem.prototype.UnregisterDynamicProperty(self, key, sourceId, propertyId)
    if propertyId then
        return self:UnregisterSingleDynamicProperty(key, sourceId, propertyId)
    else
        local removed = false
        for pid in pairs(PropertyData.configs) do
            if self:UnregisterSingleDynamicProperty(key, sourceId, pid) then
                removed = true
            end
        end
        return removed
    end
end
function MPropertySystem.prototype.UnregisterSingleDynamicProperty(self, key, sourceId, propertyId)
    if not self:ValidateProperty(propertyId) then
        return false
    end
    local config = self:GetConfig(propertyId)
    local storage = self:GetStorage(config.scope, key)
    local propertyList = storage.dynamic[propertyId]
    if not propertyList then
        return false
    end
    local index = __TS__ArrayFindIndex(
        propertyList,
        function(____, d) return d.sourceId == sourceId end
    )
    if index ~= -1 then
        __TS__ArraySplice(propertyList, index, 1)
        if #propertyList == 0 then
            __TS__Delete(storage.dynamic, propertyId)
        end
        self:StoreDynamicSnapshot(
            config.scope,
            key,
            propertyId,
            self:CalculateDynamicPropertyValue(config.scope, key, propertyId)
        )
        if config.syncToClient then
            self:MarkDirty(config.scope, key, propertyId)
        end
        return true
    end
    return false
end
function MPropertySystem.prototype.GetDynamicPropertyValue(self, scope, key, propertyId, params)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    if config.enableCache and params == nil then
        local cached = storage.runtimeCache[propertyId]
        local currentFrame = self:GetCurrentFrame()
        if cached ~= nil then
            local frameAge = currentFrame - cached.frame
            if frameAge <= (config.cacheDuration or 0) then
                local ____PropertyData_stats_19, ____totalReads_20 = PropertyData.stats, "totalReads"
                ____PropertyData_stats_19[____totalReads_20] = ____PropertyData_stats_19[____totalReads_20] + 1
                local ____PropertyData_stats_21, ____cacheHits_22 = PropertyData.stats, "cacheHits"
                ____PropertyData_stats_21[____cacheHits_22] = ____PropertyData_stats_21[____cacheHits_22] + 1
                return cached.value
            end
        end
    end
    local value = self:CalculateDynamicPropertyValue(scope, key, propertyId, params)
    if params == nil then
        self:StoreDynamicSnapshot(scope, key, propertyId, value)
    end
    local ____PropertyData_stats_23, ____totalReads_24 = PropertyData.stats, "totalReads"
    ____PropertyData_stats_23[____totalReads_24] = ____PropertyData_stats_23[____totalReads_24] + 1
    return value
end
function MPropertySystem.prototype.StoreDynamicSnapshot(self, scope, key, propertyId, value)
    local config = self:GetConfig(propertyId)
    local oldValue = self:GetPropertyValueInternal(scope, key, propertyId)
    local storage = self:GetStorage(scope, key)
    storage.runtimeCache[propertyId] = {
        value = value,
        frame = self:GetCurrentFrame(),
        time = self:GetCurrentTime()
    }
    local newValue = self:GetPropertyValueInternal(scope, key, propertyId)
    if oldValue == newValue then
        return
    end
    if config.syncToClient then
        self:MarkDirty(scope, key, propertyId)
    end
    if config.notify then
        Event:Fire("property_changed", {
            scope = scope,
            key = key,
            propertyId = propertyId,
            oldValue = oldValue,
            newValue = newValue
        })
    end
end
function MPropertySystem.prototype.CalculateDynamicPropertyValue(self, scope, key, propertyId, params)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    local propertyList = storage.dynamic[propertyId]
    if not propertyList or #propertyList == 0 then
        return 0
    end
    local result = self:GetAggregationInitialValue(config.aggregation, 0)
    for ____, data in ipairs(propertyList) do
        do
            local function ____catch(____error)
                self:print((((("Error in callback for " .. propertyId) .. " (sourceId: ") .. data.sourceId) .. "): ") .. tostring(____error))
            end
            local ____try, ____hasReturned = pcall(function()
                local value = data:callback(params)
                if value ~= nil then
                    result = self:AggregateValues(config.aggregation, result, value, config.customAggregator)
                end
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
    end
    return result
end
function MPropertySystem.prototype.ClearDynamicPropertyCache(self, scope, key, propertyId)
    local storage = self:GetStorage(scope, key)
    if propertyId then
        __TS__Delete(storage.runtimeCache, propertyId)
    else
        storage.runtimeCache = {}
    end
end
function MPropertySystem.prototype.GetPropertyValueCore(self, config, key, params)
    local scope = config.scope
    if IsServer() then
        local defaultValue = config and config.defaultValue or 0
        local staticValue = self:GetStaticPropertyValue(scope, key, config.id)
        local dynamicProperties = self:GetStorage(scope, key).dynamic[config.id]
        local dynamicValue = dynamicProperties ~= nil and #dynamicProperties > 0 and self:GetDynamicPropertyValue(scope, key, config.id, params) or 0
        local ____temp_33
        if scope == PropertyScope.UNIT then
            local ____opt_result_31
            if params ~= nil then
                ____opt_result_31 = params.extraProperties
            end
            local ____opt_result_32
            if ____opt_result_31 ~= nil then
                ____opt_result_32 = ____opt_result_31[config.id]
            end
            ____temp_33 = ____opt_result_32
        else
            ____temp_33 = nil
        end
        local extraValue = ____temp_33
        local result = self:AggregateValues(config.aggregation, dynamicValue, staticValue, config.customAggregator)
        if extraValue ~= nil then
            result = self:AggregateValues(config.aggregation, result, extraValue, config.customAggregator)
        end
        result = self:AggregateValues(config.aggregation, result, defaultValue, config.customAggregator)
        return result
    else
        return self:GetPropertyValueFromNetTable(scope, key, config.id)
    end
end
function MPropertySystem.prototype.GetPropertyValueEx(self, propertyId, playerId, unitIndex, params)
    local config = self:GetConfig(propertyId)
    if config == nil then
        return 0
    end
    local key = self:SelectKeyFromContext(config.scope, playerId, unitIndex)
    return self:GetPropertyValueCore(config, key, params)
end
function MPropertySystem.prototype.GetPropertyValue(self, key, propertyId, params)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    return self:GetPropertyValueCore(config, key, params)
end
function MPropertySystem.prototype.GetPropertyValueInternal(self, scope, key, propertyId)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    local defaultValue = config and config.defaultValue or 0
    local staticValue = storage.staticCache[propertyId] or 0
    local ____opt_36 = storage.runtimeCache[propertyId]
    local dynamicValue = ____opt_36 and ____opt_36.value or 0
    local result = self:AggregateValues(config.aggregation, dynamicValue, staticValue, config.customAggregator)
    result = self:AggregateValues(config.aggregation, result, defaultValue, config.customAggregator)
    return result
end
function MPropertySystem.prototype.InitializeNetTableSync(self)
    CustomNetTables:SetTableValue(
        self.NETTABLE_NAME,
        "init",
        {
            version = 1,
            time = self:GetCurrentTime()
        }
    )
    Timer:GameTimer(
        self.SYNC_INTERVAL,
        function()
            self:SyncDirtyProperties()
            return self.SYNC_INTERVAL
        end
    )
    self:print("NetTable sync initialized")
end
function MPropertySystem.prototype.SyncDirtyProperties(self)
    self:RefreshDynamicSyncSnapshots()
    local dirtyKeysCount = 0
    for _ in pairs(PropertyData.dirtyKeys) do
        dirtyKeysCount = dirtyKeysCount + 1
    end
    if dirtyKeysCount == 0 then
        return
    end
    local dirtyArray = __TS__ObjectKeys(PropertyData.dirtyKeys)
    local groupedByEntity = {}
    for ____, dirtyKey in ipairs(dirtyArray) do
        do
            __TS__Delete(PropertyData.dirtyKeys, dirtyKey)
            local scopeStr, keyStr = unpack(
                __TS__StringSplit(dirtyKey, "|"),
                1,
                2
            )
            local scope = __TS__ParseInt(scopeStr)
            local key = __TS__ParseInt(keyStr)
            if not self:ShouldSyncEntityToClient(scope, key) then
                goto __continue147
            end
            local entityKey = (scopeStr .. "_") .. keyStr
            if groupedByEntity[entityKey] == nil then
                groupedByEntity[entityKey] = {}
            end
            local ____groupedByEntity_entityKey_38 = groupedByEntity[entityKey]
            ____groupedByEntity_entityKey_38[#____groupedByEntity_entityKey_38 + 1] = dirtyKey
        end
        ::__continue147::
    end
    for entityKey, keys in pairs(groupedByEntity) do
        local ek = entityKey
        local keysArray = keys
        __TS__ArraySort(
            keysArray,
            function(____, a, b)
                local ____, ____, propIdA = unpack(
                    __TS__StringSplit(a, "|"),
                    1,
                    3
                )
                local ____, ____, propIdB = unpack(
                    __TS__StringSplit(b, "|"),
                    1,
                    3
                )
                local configA = self:GetConfig(propIdA)
                local configB = self:GetConfig(propIdB)
                local priorityA = configA and configA.syncPriority or 100
                local priorityB = configB and configB.syncPriority or 100
                return priorityA - priorityB
            end
        )
        self:SyncEntityBatch(ek, keysArray)
    end
    PropertyData.lastSyncTime = self:GetCurrentTime()
    local ____PropertyData_stats_43, ____syncCount_44 = PropertyData.stats, "syncCount"
    ____PropertyData_stats_43[____syncCount_44] = ____PropertyData_stats_43[____syncCount_44] + 1
end
function MPropertySystem.prototype.RefreshDynamicSyncSnapshots(self)
    for ____, scope in ipairs({PropertyScope.UNIT, PropertyScope.PLAYER}) do
        local storages = scope == PropertyScope.UNIT and PropertyData.unitStorage or PropertyData.playerStorage
        for ____, keyString in ipairs(__TS__ObjectKeys(storages)) do
            do
                local key = __TS__Number(keyString)
                if not self:ShouldSyncEntityToClient(scope, key) then
                    goto __continue155
                end
                for ____, id in ipairs(__TS__ObjectKeys(self:GetStorage(scope, key).dynamic)) do
                    local ____opt_45 = self:GetConfig(id)
                    if ____opt_45 and ____opt_45.syncToClient then
                        self:GetDynamicPropertyValue(scope, key, id)
                    end
                end
            end
            ::__continue155::
        end
    end
end
function MPropertySystem.prototype.ShouldSyncEntityToClient(self, scope, key)
    if scope ~= PropertyScope.UNIT then
        return true
    end
    local unit = EntIndexToHScript(key)
    return IsValid(unit) and unit:IsRealHero()
end
function MPropertySystem.prototype.SyncEntityBatch(self, entityKey, dirtyKeys)
    local existingData = CustomNetTables:GetTableValue(self.NETTABLE_NAME, entityKey)
    local ____existingData_47
    if existingData then
        ____existingData_47 = __TS__ObjectAssign({}, existingData)
    else
        ____existingData_47 = {}
    end
    local update = ____existingData_47
    local changed = false
    for ____, dirtyKey in ipairs(dirtyKeys) do
        local scopeStr, keyStr, propertyId = unpack(
            __TS__StringSplit(dirtyKey, "|"),
            1,
            3
        )
        local scope = __TS__ParseInt(scopeStr)
        local key = __TS__ParseInt(keyStr)
        local value = self:GetPropertyValueInternal(scope, key, propertyId)
        if update[propertyId] ~= value then
            update[propertyId] = value
            changed = true
        end
    end
    if changed then
        CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, update)
    end
end
function MPropertySystem.prototype.GetPropertyValueFromNetTable(self, scope, key, propertyId)
    local entityKey = (tostring(scope) .. "_") .. tostring(key)
    local data = CustomNetTables:GetTableValue(self.NETTABLE_NAME, entityKey)
    if data and data[propertyId] ~= nil then
        return toFiniteNumber(data[propertyId], 0)
    end
    return 0
end
function MPropertySystem.prototype.ListenPropertyChange(self, scope, key, propertyId, callback)
    if IsServer() then
        self:print("Warning: ListenPropertyChange should only be called on client")
        return nil
    end
    local lastValue = self:GetPropertyValueFromNetTable(scope, key, propertyId)
    return Timer:GameTimer(
        0.1,
        function()
            local newValue = self:GetPropertyValueFromNetTable(scope, key, propertyId)
            if newValue ~= lastValue then
                callback(lastValue, newValue)
                lastValue = newValue
            end
            return 0.1
        end
    )
end
function MPropertySystem.prototype.CleanupSourceProperties(self, key, sourceId)
    self:RemoveStaticProperty(key, sourceId)
    self:UnregisterDynamicProperty(key, sourceId)
end
function MPropertySystem.prototype.CleanupUnitProperties(self, unit)
    if not unit then
        return
    end
    local entIndex = unit:GetEntityIndex()
    self:CleanupUnitPropertiesByIndex(entIndex)
    local playerID = unit:GetPlayerOwnerID()
    if playerID ~= -1 then
        self:ClearDynamicPropertyCache(PropertyScope.PLAYER, playerID)
    end
end
function MPropertySystem.prototype.CleanupUnitPropertiesByIndex(self, entIndex)
    self:ClearEntityDirtyKeys(PropertyScope.UNIT, entIndex)
    self:ClearEntityNetTable(PropertyScope.UNIT, entIndex)
    self:CleanupStorage(PropertyScope.UNIT, entIndex)
end
function MPropertySystem.prototype.CleanupPlayerProperties(self, playerID)
    if playerID < 0 then
        return
    end
    self:CleanupStorage(PropertyScope.PLAYER, playerID)
end
function MPropertySystem.prototype.CleanupStorage(self, scope, key)
    local storageMap = scope == PropertyScope.PLAYER and PropertyData.playerStorage or PropertyData.unitStorage
    local storage = storageMap[key]
    if storage ~= nil then
        storage.static = {}
        storage.dynamic = {}
        storage.staticCache = {}
        storage.runtimeCache = {}
        __TS__Delete(storageMap, key)
    end
end
function MPropertySystem.prototype.ClearEntityDirtyKeys(self, scope, key)
    local prefix = ((tostring(scope) .. "|") .. tostring(key)) .. "|"
    for dirtyKey in pairs(PropertyData.dirtyKeys) do
        local currentDirtyKey = dirtyKey
        if string.sub(
            currentDirtyKey,
            1,
            string.len(prefix)
        ) == prefix then
            __TS__Delete(PropertyData.dirtyKeys, currentDirtyKey)
        end
    end
end
function MPropertySystem.prototype.ClearEntityNetTable(self, scope, key)
    if not IsServer() then
        return
    end
    local entityKey = (tostring(scope) .. "_") .. tostring(key)
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, {})
end
function MPropertySystem.prototype.CleanupInvalidModifiers(self)
    local cleanedCount = 0
    for ____, storage in pairs(PropertyData.playerStorage) do
        cleanedCount = cleanedCount + self:CleanupStorageInvalidModifiers(storage)
    end
    for ____, storage in pairs(PropertyData.unitStorage) do
        cleanedCount = cleanedCount + self:CleanupStorageInvalidModifiers(storage)
    end
    if cleanedCount > 0 then
        self:print(("Cleaned up " .. tostring(cleanedCount)) .. " invalid modifiers")
    end
    return cleanedCount
end
function MPropertySystem.prototype.CleanupStorageInvalidModifiers(self, storage)
    return 0
end
function MPropertySystem.prototype.CleanupEmptyStorages(self)
    local cleanedCount = 0
    for key, storage in pairs(PropertyData.playerStorage) do
        if self:IsStorageEmpty(storage) then
            __TS__Delete(PropertyData.playerStorage, key)
            cleanedCount = cleanedCount + 1
        end
    end
    for key, storage in pairs(PropertyData.unitStorage) do
        local entIndex = toFiniteNumber(key, -1)
        local ____temp_48
        if entIndex ~= -1 then
            ____temp_48 = EntIndexToHScript(entIndex)
        else
            ____temp_48 = nil
        end
        local entity = ____temp_48
        if not IsValid(entity) then
            self:ClearEntityDirtyKeys(PropertyScope.UNIT, entIndex)
            self:ClearEntityNetTable(PropertyScope.UNIT, entIndex)
            __TS__Delete(PropertyData.unitStorage, key)
            cleanedCount = cleanedCount + 1
        elseif self:IsStorageEmpty(storage) then
            __TS__Delete(PropertyData.unitStorage, key)
            cleanedCount = cleanedCount + 1
        end
    end
    return cleanedCount
end
function MPropertySystem.prototype.IsStorageEmpty(self, storage)
    local staticCount = 0
    for _ in pairs(storage.static) do
        staticCount = staticCount + 1
    end
    local dynamicCount = 0
    for _ in pairs(storage.dynamic) do
        dynamicCount = dynamicCount + 1
    end
    local cacheCount = 0
    for _ in pairs(storage.staticCache) do
        cacheCount = cacheCount + 1
    end
    local runtimeCount = 0
    for _ in pairs(storage.runtimeCache) do
        runtimeCount = runtimeCount + 1
    end
    return staticCount == 0 and dynamicCount == 0 and cacheCount == 0 and runtimeCount == 0
end
function MPropertySystem.prototype.StartAutoCleanup(self)
    Timer:GameTimer(
        self.autoCleanupInterval,
        function()
            self:CleanupInvalidModifiers()
            self:CleanupEmptyStorages()
            return self.autoCleanupInterval
        end
    )
    self:print(("Auto cleanup started (" .. tostring(self.autoCleanupInterval)) .. "s)")
end
function MPropertySystem.prototype.ResetSystem(self)
    if IsServer() then
        for ____, key in ipairs(CustomNetTables:GetAllTableKeys("property_system")) do
            CustomNetTables:SetTableValue("property_system", key, {})
        end
    end
    PropertyData.playerStorage = {}
    PropertyData.unitStorage = {}
    PropertyData.dirtyKeys = {}
    PropertyData.stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0}
end
function MPropertySystem.prototype.EstimateEntityNetTableSize(self, scope, key)
    local storage = self:GetStorage(scope, key)
    local size = 50
    for propertyId in pairs(storage.static) do
        local pid = propertyId
        size = size + (#pid + 10)
    end
    for propertyId in pairs(storage.dynamic) do
        local pid = propertyId
        size = size + (#pid + 10)
    end
    return size
end
function MPropertySystem.prototype.GetNetTableSizeStats(self)
    local entities = {}
    local warnings = {}
    local total = 0
    for playerID in pairs(PropertyData.playerStorage) do
        local pid = playerID
        local size = self:EstimateEntityNetTableSize(PropertyScope.PLAYER, pid)
        local key = "PLAYER_" .. tostring(pid)
        entities[key] = size
        total = total + size
        if size > self.MAX_NETTABLE_SIZE then
            warnings[#warnings + 1] = ((key .. " exceeds size limit: ") .. tostring(size)) .. " bytes"
        end
    end
    for entIndex in pairs(PropertyData.unitStorage) do
        local eid = entIndex
        local size = self:EstimateEntityNetTableSize(PropertyScope.UNIT, eid)
        local key = "UNIT_" .. tostring(eid)
        entities[key] = size
        total = total + size
        if size > self.MAX_NETTABLE_SIZE then
            warnings[#warnings + 1] = ((key .. " exceeds size limit: ") .. tostring(size)) .. " bytes"
        end
    end
    return {total = total, entities = entities, warnings = warnings}
end
function MPropertySystem.prototype.RegisterEventPropertyResponses(self)
end
function MPropertySystem.prototype.ProcessPropertyEventResponse(self, eventName, eventData, playerId, unitIndex)
    local responses = PropertyData.eventPropertyResponses[eventName]
    if not responses or #responses == 0 then
        return
    end
    local sourceId = (eventName .. "_") .. tostring(eventData)
    for ____, response in ipairs(responses) do
        local sourceValue = self:GetPropertyValueEx(response.sourcePropertyId, playerId, unitIndex)
        if sourceValue > 0 then
            self:AddStaticPropertyEx(
                response.targetPropertyId,
                sourceId,
                sourceValue,
                playerId,
                unitIndex
            )
        end
    end
end
function MPropertySystem.prototype.RegisterDebugCommands(self)
    Convars:RegisterCommand(
        "property_status",
        function()
            self:PrintSystemStatus()
        end,
        "Print property system status",
        0
    )
    Convars:RegisterCommand(
        "property_stats",
        function()
            self:PrintPerformanceStats()
        end,
        "Print performance statistics",
        0
    )
    Convars:RegisterCommand(
        "property_reset_stats",
        function()
            PropertyData.stats = {totalReads = 0, cacheHits = 0, totalWrites = 0, syncCount = 0}
            self:print("Stats reset")
        end,
        "Reset performance statistics",
        0
    )
    Convars:RegisterCommand(
        "property_list",
        function()
            self:print("=== Registered Properties ===")
            for id, config in pairs(PropertyData.configs) do
                local propId = id
                self:print((((propId .. ": scope=") .. PropertyScope[config.scope]) .. ", type=") .. PropertyValueType[config.valueType])
            end
        end,
        "List all registered properties",
        0
    )
    Convars:RegisterCommand(
        "property_cleanup",
        function()
            local count = self:CleanupInvalidModifiers()
            local storageCount = self:CleanupEmptyStorages()
            self:print(((("Cleaned: " .. tostring(count)) .. " modifiers, ") .. tostring(storageCount)) .. " storages")
        end,
        "Force cleanup invalid modifiers",
        0
    )
    Convars:RegisterCommand(
        "property_nettable_size",
        function()
            local stats = self:GetNetTableSizeStats()
            self:print("=== NetTable Size Stats ===")
            self:print(("Total: " .. tostring(stats.total)) .. " bytes")
            self:print("Entities: " .. tostring(stats.entities.size))
            if #stats.warnings > 0 then
                self:print("⚠️ WARNINGS:")
                for ____, warning in ipairs(stats.warnings) do
                    self:print("  " .. warning)
                end
            end
            local entitiesArray = {}
            for k, v in pairs(stats.entities) do
                entitiesArray[#entitiesArray + 1] = {k, v}
            end
            local sorted = __TS__ArraySort(
                entitiesArray,
                function(____, a, b) return b[2] - a[2] end
            )
            self:print("\nTop 10 largest entities:")
            do
                local i = 0
                while i < math.min(10, #sorted) do
                    self:print(((("  " .. sorted[i + 1][1]) .. ": ") .. tostring(sorted[i + 1][2])) .. " bytes")
                    i = i + 1
                end
            end
        end,
        "Show NetTable size statistics",
        0
    )
    self:print("Debug commands registered")
end
function MPropertySystem.prototype.PrintSystemStatus(self)
    local configCount = 0
    for _ in pairs(PropertyData.configs) do
        configCount = configCount + 1
    end
    local playerCount = 0
    for _ in pairs(PropertyData.playerStorage) do
        playerCount = playerCount + 1
    end
    local unitCount = 0
    for _ in pairs(PropertyData.unitStorage) do
        unitCount = unitCount + 1
    end
    local dirtyKeysCount = 0
    for _ in pairs(PropertyData.dirtyKeys) do
        dirtyKeysCount = dirtyKeysCount + 1
    end
    self:print("=== Property System Status ===")
    self:print("Registered Properties: " .. tostring(configCount))
    self:print("Player Storages: " .. tostring(playerCount))
    self:print("Unit Storages: " .. tostring(unitCount))
    self:print("Dirty Keys: " .. tostring(dirtyKeysCount))
    self:print(("Last Sync: " .. __TS__NumberToFixed(PropertyData.lastSyncTime, 2)) .. "s")
end
function MPropertySystem.prototype.PrintPerformanceStats(self)
    local stats = PropertyData.stats
    local hitRate = stats.totalReads > 0 and __TS__NumberToFixed(stats.cacheHits / stats.totalReads * 100, 2) or "0.00"
    self:print("=== Performance Stats ===")
    self:print("Total Reads: " .. tostring(stats.totalReads))
    self:print(((("Cache Hits: " .. tostring(stats.cacheHits)) .. " (") .. hitRate) .. "%)")
    self:print("Total Writes: " .. tostring(stats.totalWrites))
    self:print("Sync Count: " .. tostring(stats.syncCount))
end
function MPropertySystem.prototype.GetStorage(self, scope, key)
    local storageMap = scope == PropertyScope.PLAYER and PropertyData.playerStorage or PropertyData.unitStorage
    local storage = storageMap[key]
    if not storage then
        storage = {static = {}, dynamic = {}, staticCache = {}, runtimeCache = {}}
        storageMap[key] = storage
    end
    return storage
end
function MPropertySystem.prototype.GetConfig(self, propertyId)
    return PropertyData.configs[propertyId]
end
function MPropertySystem.prototype.GetScopeOfProperty(self, propertyId)
    local config = self:GetConfig(propertyId)
    return config and config.scope or nil
end
function MPropertySystem.prototype.AggregatePropertyValues(self, propertyId, current, value)
    local config = PropertyData.configs[propertyId]
    if config == nil then
        return current + value
    end
    return self:AggregateValues(config.aggregation, current, value, config.customAggregator)
end
function MPropertySystem.prototype.ValidateProperty(self, propertyId)
    if PropertyData.configs[propertyId] == nil then
        self:print(("Error: Property " .. propertyId) .. " not registered")
        return false
    end
    return true
end
function MPropertySystem.prototype.GetEntityContext(self, entity)
    if not entity or not IsValid(entity) then
        return nil
    end
    if entity.IsPlayer and entity:IsPlayer() then
        local playerID = entity:GetPlayerID()
        return {PropertyScope.PLAYER, playerID}
    end
    if entity.IsBaseNPC and entity:IsBaseNPC() then
        return {
            PropertyScope.UNIT,
            entity:GetEntityIndex()
        }
    end
    return nil
end
function MPropertySystem.prototype.AggregateValues(self, strategy, current, value, customAggregator)
    repeat
        local ____switch259 = strategy
        local ____cond259 = ____switch259 == AggregationStrategy.SUM
        if ____cond259 then
            return current + value
        end
        ____cond259 = ____cond259 or ____switch259 == AggregationStrategy.MULTIPLY
        if ____cond259 then
            return ((1 + current * 0.01) * (1 + value * 0.01) - 1) * 100
        end
        ____cond259 = ____cond259 or ____switch259 == AggregationStrategy.DECMUL
        if ____cond259 then
            return (1 - (1 - current * 0.01) * (1 - value * 0.01)) * 100
        end
        ____cond259 = ____cond259 or ____switch259 == AggregationStrategy.MAX
        if ____cond259 then
            return math.max(current, value)
        end
        ____cond259 = ____cond259 or ____switch259 == AggregationStrategy.MIN
        if ____cond259 then
            return math.min(current, value)
        end
        ____cond259 = ____cond259 or ____switch259 == AggregationStrategy.FIRST
        if ____cond259 then
            return current ~= 0 and current or value
        end
        ____cond259 = ____cond259 or ____switch259 == AggregationStrategy.LAST
        if ____cond259 then
            return value
        end
        ____cond259 = ____cond259 or ____switch259 == AggregationStrategy.CUSTOM
        if ____cond259 then
            if customAggregator then
                return customAggregator(nil, current, value)
            end
            return current + value
        end
        do
            return current + value
        end
    until true
end
function MPropertySystem.prototype.GetAggregationInitialValue(self, strategy, defaultValue)
    repeat
        local ____switch262 = strategy
        local ____cond262 = ____switch262 == AggregationStrategy.MAX
        if ____cond262 then
            return -math.huge
        end
        ____cond262 = ____cond262 or ____switch262 == AggregationStrategy.MIN
        if ____cond262 then
            return math.huge
        end
        ____cond262 = ____cond262 or (____switch262 == AggregationStrategy.FIRST or ____switch262 == AggregationStrategy.LAST)
        if ____cond262 then
            return defaultValue
        end
        do
            return defaultValue
        end
    until true
end
function MPropertySystem.prototype.GetDirtyKey(self, scope, key, propertyId)
    return (((tostring(scope) .. "|") .. tostring(key)) .. "|") .. propertyId
end
function MPropertySystem.prototype.MarkDirty(self, scope, key, propertyId)
    local dirtyKey = self:GetDirtyKey(scope, key, propertyId)
    PropertyData.dirtyKeys[dirtyKey] = true
end
function MPropertySystem.prototype.GetCurrentFrame(self)
    return GameRules:GetDOTATime(false, false)
end
function MPropertySystem.prototype.GetCurrentTime(self)
    return GameRules:GetGameTime()
end
function MPropertySystem.prototype.ForceSyncAllDirty(self)
    if not IsServer() then
        return
    end
    local dirtyCount = 0
    for _ in pairs(PropertyData.dirtyKeys) do
        dirtyCount = dirtyCount + 1
    end
    self:print(("[ForceSyncAllDirty] Syncing " .. tostring(dirtyCount)) .. " dirty properties...")
    self:SyncDirtyProperties()
    local remainingCount = 0
    for _ in pairs(PropertyData.dirtyKeys) do
        remainingCount = remainingCount + 1
    end
    self:print("[ForceSyncAllDirty] Sync completed, remaining: " .. tostring(remainingCount))
end
MPropertySystem = __TS__DecorateLegacy({reloadable}, MPropertySystem)
if PropertySystem == nil then
    PropertySystem = __TS__New(MPropertySystem)
end
return ____exports
