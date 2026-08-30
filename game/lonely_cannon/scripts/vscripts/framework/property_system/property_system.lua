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
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 3,["19"] = 3,["20"] = 29,["21"] = 30,["22"] = 33,["23"] = 33,["24"] = 34,["26"] = 34,["27"] = 36,["28"] = 37,["29"] = 38,["30"] = 41,["31"] = 33,["32"] = 43,["33"] = 44,["34"] = 45,["35"] = 47,["36"] = 48,["37"] = 49,["38"] = 50,["39"] = 51,["41"] = 53,["43"] = 56,["45"] = 58,["47"] = 60,["48"] = 43,["49"] = 63,["50"] = 64,["51"] = 63,["52"] = 67,["53"] = 68,["54"] = 67,["55"] = 73,["56"] = 74,["57"] = 75,["58"] = 75,["59"] = 75,["60"] = 75,["61"] = 75,["62"] = 75,["63"] = 75,["64"] = 75,["65"] = 75,["67"] = 73,["68"] = 96,["69"] = 98,["70"] = 99,["71"] = 100,["72"] = 100,["73"] = 100,["75"] = 101,["76"] = 102,["77"] = 102,["78"] = 102,["80"] = 97,["81"] = 97,["82"] = 97,["83"] = 97,["84"] = 97,["85"] = 97,["86"] = 97,["87"] = 106,["88"] = 109,["89"] = 111,["90"] = 112,["92"] = 114,["93"] = 115,["94"] = 115,["95"] = 115,["96"] = 115,["97"] = 119,["100"] = 123,["102"] = 96,["103"] = 132,["104"] = 133,["105"] = 134,["107"] = 132,["108"] = 148,["109"] = 155,["110"] = 156,["111"] = 156,["113"] = 158,["114"] = 159,["115"] = 161,["116"] = 162,["117"] = 163,["119"] = 167,["120"] = 167,["121"] = 167,["122"] = 167,["123"] = 168,["124"] = 170,["125"] = 171,["126"] = 172,["127"] = 173,["128"] = 174,["129"] = 175,["130"] = 176,["131"] = 176,["132"] = 176,["133"] = 176,["134"] = 176,["135"] = 176,["136"] = 176,["139"] = 186,["140"] = 187,["141"] = 187,["142"] = 187,["143"] = 187,["144"] = 187,["145"] = 187,["146"] = 193,["147"] = 194,["148"] = 195,["149"] = 196,["150"] = 196,["151"] = 196,["152"] = 196,["153"] = 196,["154"] = 196,["155"] = 196,["158"] = 206,["159"] = 207,["161"] = 210,["162"] = 210,["163"] = 211,["164"] = 148,["165"] = 220,["166"] = 225,["167"] = 226,["169"] = 229,["170"] = 230,["171"] = 231,["172"] = 232,["175"] = 235,["177"] = 220,["178"] = 239,["179"] = 244,["180"] = 244,["182"] = 246,["183"] = 247,["184"] = 248,["185"] = 250,["186"] = 250,["188"] = 253,["189"] = 253,["190"] = 253,["191"] = 253,["192"] = 255,["193"] = 257,["194"] = 258,["195"] = 260,["196"] = 261,["197"] = 262,["199"] = 264,["201"] = 267,["202"] = 268,["203"] = 269,["204"] = 269,["205"] = 269,["206"] = 269,["207"] = 269,["208"] = 269,["209"] = 269,["211"] = 278,["212"] = 279,["214"] = 282,["216"] = 285,["217"] = 239,["218"] = 311,["219"] = 319,["220"] = 320,["221"] = 320,["223"] = 321,["224"] = 322,["225"] = 322,["226"] = 322,["227"] = 322,["228"] = 322,["229"] = 322,["230"] = 322,["231"] = 311,["232"] = 347,["233"] = 353,["234"] = 355,["235"] = 357,["236"] = 358,["237"] = 358,["239"] = 359,["240"] = 360,["242"] = 363,["244"] = 364,["245"] = 365,["246"] = 366,["247"] = 366,["249"] = 369,["250"] = 370,["251"] = 371,["256"] = 374,["258"] = 347,["259"] = 390,["260"] = 391,["261"] = 392,["262"] = 393,["263"] = 394,["264"] = 395,["265"] = 396,["267"] = 398,["269"] = 401,["270"] = 402,["271"] = 390,["272"] = 406,["273"] = 407,["274"] = 408,["275"] = 408,["277"] = 410,["278"] = 411,["279"] = 413,["280"] = 413,["281"] = 414,["282"] = 415,["283"] = 415,["285"] = 420,["286"] = 406,["287"] = 423,["288"] = 424,["289"] = 425,["292"] = 427,["293"] = 428,["294"] = 430,["295"] = 431,["298"] = 438,["299"] = 440,["300"] = 441,["302"] = 444,["303"] = 423,["304"] = 449,["305"] = 456,["306"] = 456,["308"] = 458,["309"] = 459,["310"] = 459,["312"] = 460,["313"] = 461,["314"] = 462,["316"] = 465,["317"] = 465,["319"] = 466,["320"] = 466,["322"] = 467,["323"] = 469,["324"] = 470,["325"] = 471,["327"] = 474,["328"] = 474,["329"] = 474,["330"] = 474,["331"] = 475,["332"] = 476,["333"] = 477,["335"] = 479,["336"] = 479,["337"] = 479,["338"] = 479,["339"] = 479,["340"] = 479,["342"] = 487,["343"] = 488,["344"] = 449,["345"] = 491,["346"] = 496,["347"] = 496,["349"] = 498,["350"] = 499,["352"] = 502,["353"] = 503,["354"] = 504,["355"] = 505,["358"] = 508,["359"] = 491,["360"] = 511,["361"] = 512,["362"] = 512,["364"] = 513,["365"] = 511,["366"] = 516,["367"] = 517,["370"] = 518,["371"] = 519,["372"] = 516,["373"] = 522,["374"] = 527,["375"] = 527,["376"] = 528,["377"] = 528,["379"] = 530,["380"] = 530,["381"] = 530,["382"] = 530,["383"] = 531,["384"] = 531,["386"] = 533,["387"] = 534,["388"] = 535,["389"] = 536,["391"] = 536,["393"] = 536,["395"] = 538,["397"] = 541,["398"] = 522,["399"] = 544,["400"] = 545,["401"] = 546,["404"] = 548,["405"] = 548,["407"] = 549,["408"] = 549,["409"] = 551,["410"] = 552,["413"] = 556,["414"] = 557,["415"] = 558,["417"] = 561,["418"] = 544,["419"] = 575,["420"] = 580,["421"] = 580,["423"] = 583,["424"] = 583,["426"] = 585,["427"] = 586,["428"] = 587,["429"] = 589,["430"] = 590,["431"] = 591,["433"] = 594,["434"] = 594,["435"] = 594,["436"] = 594,["437"] = 595,["438"] = 597,["439"] = 598,["440"] = 599,["442"] = 602,["443"] = 602,["444"] = 602,["445"] = 602,["446"] = 602,["447"] = 602,["448"] = 602,["450"] = 611,["451"] = 611,["452"] = 611,["453"] = 611,["454"] = 612,["455"] = 613,["456"] = 614,["457"] = 617,["458"] = 618,["459"] = 618,["460"] = 618,["461"] = 618,["462"] = 618,["463"] = 618,["464"] = 618,["466"] = 627,["467"] = 628,["469"] = 631,["470"] = 631,["471"] = 632,["472"] = 575,["473"] = 641,["474"] = 646,["475"] = 647,["477"] = 650,["478"] = 651,["479"] = 652,["480"] = 653,["483"] = 656,["485"] = 641,["486"] = 660,["487"] = 665,["488"] = 665,["490"] = 667,["491"] = 668,["492"] = 669,["493"] = 671,["494"] = 671,["496"] = 674,["497"] = 674,["498"] = 674,["499"] = 674,["500"] = 675,["501"] = 676,["502"] = 677,["503"] = 679,["504"] = 680,["506"] = 683,["507"] = 684,["508"] = 685,["509"] = 686,["510"] = 686,["511"] = 686,["512"] = 686,["513"] = 686,["514"] = 686,["515"] = 686,["517"] = 695,["518"] = 696,["520"] = 699,["522"] = 702,["523"] = 660,["524"] = 706,["525"] = 707,["526"] = 708,["527"] = 708,["529"] = 710,["530"] = 713,["531"] = 714,["532"] = 715,["533"] = 717,["534"] = 718,["535"] = 719,["536"] = 720,["537"] = 720,["538"] = 721,["539"] = 721,["540"] = 722,["544"] = 728,["545"] = 731,["546"] = 732,["547"] = 732,["548"] = 732,["549"] = 732,["550"] = 732,["552"] = 739,["553"] = 739,["554"] = 740,["555"] = 706,["556"] = 747,["557"] = 748,["558"] = 749,["559"] = 749,["561"] = 751,["562"] = 752,["563"] = 756,["564"] = 747,["565"] = 759,["566"] = 760,["567"] = 761,["568"] = 761,["570"] = 763,["571"] = 764,["572"] = 766,["573"] = 767,["575"] = 773,["576"] = 775,["579"] = 782,["582"] = 777,["583"] = 778,["584"] = 779,["592"] = 786,["593"] = 759,["594"] = 790,["595"] = 791,["596"] = 793,["597"] = 794,["599"] = 796,["601"] = 790,["602"] = 809,["603"] = 814,["604"] = 815,["605"] = 816,["606"] = 817,["607"] = 821,["608"] = 822,["609"] = 825,["610"] = 825,["612"] = 825,["613"] = 825,["617"] = 825,["619"] = 825,["621"] = 825,["623"] = 825,["624"] = 828,["625"] = 829,["626"] = 830,["628"] = 832,["629"] = 833,["631"] = 836,["633"] = 809,["634"] = 847,["635"] = 848,["636"] = 849,["637"] = 849,["639"] = 850,["640"] = 851,["641"] = 847,["642"] = 859,["643"] = 860,["644"] = 861,["645"] = 861,["647"] = 862,["648"] = 859,["649"] = 879,["650"] = 880,["651"] = 881,["652"] = 881,["654"] = 883,["655"] = 886,["656"] = 887,["657"] = 888,["658"] = 888,["659"] = 891,["660"] = 892,["661"] = 894,["662"] = 879,["663"] = 899,["664"] = 900,["665"] = 900,["666"] = 900,["667"] = 900,["668"] = 900,["669"] = 900,["670"] = 900,["671"] = 900,["672"] = 905,["673"] = 905,["674"] = 905,["675"] = 906,["676"] = 907,["677"] = 905,["678"] = 905,["679"] = 910,["680"] = 899,["681"] = 913,["682"] = 914,["683"] = 915,["684"] = 915,["686"] = 916,["689"] = 918,["690"] = 921,["691"] = 923,["693"] = 924,["694"] = 924,["695"] = 924,["696"] = 924,["697"] = 924,["698"] = 925,["699"] = 926,["700"] = 927,["701"] = 928,["703"] = 931,["704"] = 933,["705"] = 934,["707"] = 936,["708"] = 936,["712"] = 940,["713"] = 941,["714"] = 942,["715"] = 943,["716"] = 943,["717"] = 943,["718"] = 944,["719"] = 944,["720"] = 944,["721"] = 944,["722"] = 944,["723"] = 945,["724"] = 945,["725"] = 945,["726"] = 945,["727"] = 945,["728"] = 947,["729"] = 948,["730"] = 950,["731"] = 951,["732"] = 953,["733"] = 943,["734"] = 943,["735"] = 957,["737"] = 960,["738"] = 961,["739"] = 962,["740"] = 962,["741"] = 913,["742"] = 965,["743"] = 966,["744"] = 967,["746"] = 970,["747"] = 971,["748"] = 965,["749"] = 977,["750"] = 978,["751"] = 979,["752"] = 979,["753"] = 979,["755"] = 979,["757"] = 979,["758"] = 980,["759"] = 981,["760"] = 981,["761"] = 981,["762"] = 981,["763"] = 981,["764"] = 982,["765"] = 983,["766"] = 986,["767"] = 987,["769"] = 990,["770"] = 977,["771"] = 1059,["772"] = 1060,["773"] = 1061,["774"] = 1063,["775"] = 1064,["777"] = 1067,["778"] = 1059,["779"] = 1071,["780"] = 1077,["781"] = 1078,["782"] = 1079,["784"] = 1082,["785"] = 1084,["786"] = 1084,["787"] = 1084,["788"] = 1085,["789"] = 1086,["790"] = 1087,["791"] = 1088,["793"] = 1090,["794"] = 1084,["795"] = 1084,["796"] = 1071,["797"] = 1101,["798"] = 1103,["799"] = 1106,["800"] = 1101,["801"] = 1110,["802"] = 1111,["805"] = 1113,["806"] = 1114,["807"] = 1115,["808"] = 1116,["809"] = 1118,["810"] = 1119,["811"] = 1120,["813"] = 1110,["814"] = 1125,["815"] = 1126,["818"] = 1127,["819"] = 1125,["820"] = 1130,["821"] = 1131,["822"] = 1135,["823"] = 1136,["824"] = 1137,["825"] = 1138,["826"] = 1139,["827"] = 1140,["828"] = 1141,["830"] = 1130,["831"] = 1145,["832"] = 1146,["833"] = 1147,["834"] = 1148,["835"] = 1149,["836"] = 1149,["837"] = 1149,["838"] = 1149,["839"] = 1149,["840"] = 1150,["843"] = 1145,["844"] = 1155,["845"] = 1156,["848"] = 1160,["849"] = 1161,["850"] = 1155,["851"] = 1165,["852"] = 1166,["853"] = 1168,["854"] = 1169,["856"] = 1172,["857"] = 1173,["859"] = 1176,["860"] = 1177,["862"] = 1180,["863"] = 1165,["864"] = 1183,["865"] = 1187,["866"] = 1183,["867"] = 1191,["868"] = 1192,["869"] = 1194,["870"] = 1195,["871"] = 1196,["872"] = 1197,["875"] = 1201,["876"] = 1202,["877"] = 1203,["878"] = 1203,["879"] = 1203,["881"] = 1203,["883"] = 1203,["884"] = 1204,["885"] = 1205,["886"] = 1206,["887"] = 1207,["888"] = 1208,["889"] = 1209,["890"] = 1210,["891"] = 1211,["894"] = 1215,["895"] = 1191,["896"] = 1218,["897"] = 1219,["898"] = 1220,["899"] = 1220,["901"] = 1221,["902"] = 1222,["903"] = 1222,["905"] = 1223,["906"] = 1224,["907"] = 1224,["909"] = 1225,["910"] = 1226,["911"] = 1226,["913"] = 1227,["914"] = 1218,["915"] = 1231,["916"] = 1232,["917"] = 1232,["918"] = 1232,["919"] = 1233,["920"] = 1234,["921"] = 1235,["922"] = 1232,["923"] = 1232,["924"] = 1238,["925"] = 1231,["926"] = 1242,["927"] = 1243,["928"] = 1244,["929"] = 1245,["930"] = 1246,["931"] = 1242,["932"] = 1257,["933"] = 1258,["934"] = 1259,["935"] = 1262,["936"] = 1263,["937"] = 1264,["939"] = 1268,["940"] = 1269,["941"] = 1270,["943"] = 1273,["944"] = 1257,["945"] = 1277,["946"] = 1278,["947"] = 1279,["948"] = 1280,["949"] = 1283,["950"] = 1284,["951"] = 1285,["952"] = 1286,["953"] = 1287,["954"] = 1288,["955"] = 1290,["956"] = 1291,["959"] = 1296,["960"] = 1297,["961"] = 1298,["962"] = 1299,["963"] = 1300,["964"] = 1301,["965"] = 1303,["966"] = 1304,["969"] = 1308,["970"] = 1277,["971"] = 1316,["972"] = 1316,["973"] = 1327,["974"] = 1328,["975"] = 1329,["978"] = 1331,["979"] = 1334,["980"] = 1335,["981"] = 1340,["982"] = 1341,["983"] = 1341,["984"] = 1341,["985"] = 1341,["986"] = 1341,["987"] = 1341,["988"] = 1341,["991"] = 1327,["992"] = 1355,["993"] = 1357,["994"] = 1357,["995"] = 1357,["996"] = 1358,["997"] = 1357,["998"] = 1357,["999"] = 1357,["1000"] = 1357,["1001"] = 1362,["1002"] = 1362,["1003"] = 1362,["1004"] = 1363,["1005"] = 1362,["1006"] = 1362,["1007"] = 1362,["1008"] = 1362,["1009"] = 1367,["1010"] = 1367,["1011"] = 1367,["1012"] = 1368,["1013"] = 1374,["1014"] = 1367,["1015"] = 1367,["1016"] = 1367,["1017"] = 1367,["1018"] = 1378,["1019"] = 1378,["1020"] = 1378,["1021"] = 1379,["1022"] = 1380,["1023"] = 1381,["1024"] = 1382,["1026"] = 1378,["1027"] = 1378,["1028"] = 1378,["1029"] = 1378,["1030"] = 1387,["1031"] = 1387,["1032"] = 1387,["1033"] = 1388,["1034"] = 1389,["1035"] = 1390,["1036"] = 1387,["1037"] = 1387,["1038"] = 1387,["1039"] = 1387,["1040"] = 1394,["1041"] = 1394,["1042"] = 1394,["1043"] = 1395,["1044"] = 1396,["1045"] = 1397,["1046"] = 1398,["1047"] = 1400,["1048"] = 1401,["1049"] = 1402,["1050"] = 1403,["1053"] = 1408,["1054"] = 1409,["1055"] = 1410,["1057"] = 1412,["1058"] = 1412,["1059"] = 1412,["1060"] = 1412,["1061"] = 1413,["1063"] = 1414,["1064"] = 1414,["1065"] = 1415,["1066"] = 1414,["1069"] = 1394,["1070"] = 1394,["1071"] = 1394,["1072"] = 1394,["1073"] = 1419,["1074"] = 1355,["1075"] = 1422,["1076"] = 1423,["1077"] = 1424,["1078"] = 1424,["1080"] = 1425,["1081"] = 1426,["1082"] = 1426,["1084"] = 1427,["1085"] = 1428,["1086"] = 1428,["1088"] = 1430,["1089"] = 1431,["1090"] = 1431,["1092"] = 1433,["1093"] = 1434,["1094"] = 1435,["1095"] = 1436,["1096"] = 1437,["1097"] = 1438,["1098"] = 1422,["1099"] = 1441,["1100"] = 1442,["1101"] = 1443,["1102"] = 1447,["1103"] = 1448,["1104"] = 1449,["1105"] = 1450,["1106"] = 1451,["1107"] = 1441,["1108"] = 1456,["1109"] = 1457,["1110"] = 1461,["1111"] = 1462,["1112"] = 1463,["1113"] = 1469,["1115"] = 1472,["1116"] = 1456,["1117"] = 1475,["1118"] = 1476,["1119"] = 1475,["1120"] = 1479,["1121"] = 1480,["1122"] = 1481,["1123"] = 1479,["1124"] = 1485,["1125"] = 1486,["1126"] = 1487,["1127"] = 1488,["1129"] = 1490,["1130"] = 1485,["1131"] = 1493,["1132"] = 1494,["1133"] = 1495,["1134"] = 1496,["1136"] = 1498,["1137"] = 1493,["1138"] = 1507,["1139"] = 1508,["1140"] = 1508,["1142"] = 1511,["1143"] = 1512,["1144"] = 1513,["1146"] = 1517,["1147"] = 1518,["1148"] = 1518,["1149"] = 1518,["1150"] = 1518,["1152"] = 1521,["1153"] = 1507,["1154"] = 1524,["1156"] = 1525,["1157"] = 1526,["1159"] = 1527,["1161"] = 1528,["1163"] = 1529,["1165"] = 1530,["1167"] = 1531,["1169"] = 1532,["1171"] = 1533,["1173"] = 1534,["1175"] = 1535,["1177"] = 1536,["1179"] = 1537,["1181"] = 1538,["1183"] = 1539,["1185"] = 1540,["1187"] = 1541,["1188"] = 1542,["1190"] = 1544,["1193"] = 1546,["1196"] = 1524,["1197"] = 1550,["1199"] = 1551,["1200"] = 1552,["1202"] = 1553,["1204"] = 1554,["1206"] = 1555,["1208"] = 1556,["1210"] = 1558,["1213"] = 1560,["1216"] = 1550,["1217"] = 1564,["1218"] = 1566,["1219"] = 1564,["1220"] = 1569,["1221"] = 1570,["1222"] = 1571,["1223"] = 1569,["1224"] = 1574,["1225"] = 1575,["1226"] = 1574,["1227"] = 1578,["1228"] = 1579,["1229"] = 1578,["1230"] = 1585,["1231"] = 1586,["1234"] = 1588,["1235"] = 1589,["1236"] = 1589,["1238"] = 1590,["1241"] = 1592,["1242"] = 1593,["1243"] = 1594,["1244"] = 1595,["1245"] = 1595,["1247"] = 1596,["1248"] = 1585,["1249"] = 33,["1250"] = 1623,["1251"] = 1623});
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
    local oldValue = self:GetDynamicPropertyValueInternal(config.scope, key, propertyId)
    __TS__Delete(storage.runtimeCache, propertyId)
    local newValue = self:GetDynamicPropertyValueInternal(config.scope, key, propertyId)
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
        local oldValue = self:GetDynamicPropertyValueInternal(config.scope, key, propertyId)
        __TS__ArraySplice(propertyList, index, 1)
        if #propertyList == 0 then
            __TS__Delete(storage.dynamic, propertyId)
        end
        __TS__Delete(storage.runtimeCache, propertyId)
        local newValue = self:GetDynamicPropertyValueInternal(config.scope, key, propertyId)
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
function MPropertySystem.prototype.GetDynamicPropertyValue(self, scope, key, propertyId, params)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    if config.enableCache then
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
    if config.enableCache then
        storage.runtimeCache[propertyId] = {
            value = value,
            frame = self:GetCurrentFrame(),
            time = self:GetCurrentTime()
        }
    end
    local ____PropertyData_stats_23, ____totalReads_24 = PropertyData.stats, "totalReads"
    ____PropertyData_stats_23[____totalReads_24] = ____PropertyData_stats_23[____totalReads_24] + 1
    return value
end
function MPropertySystem.prototype.GetDynamicPropertyValueInternal(self, scope, key, propertyId)
    local config = self:GetConfig(propertyId)
    if not config then
        return 0
    end
    local storage = self:GetStorage(scope, key)
    local cached = storage.runtimeCache[propertyId]
    return cached and cached.value or 0
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
        local ____temp_35
        if scope == PropertyScope.UNIT then
            local ____opt_result_33
            if params ~= nil then
                ____opt_result_33 = params.extraProperties
            end
            local ____opt_result_34
            if ____opt_result_33 ~= nil then
                ____opt_result_34 = ____opt_result_33[config.id]
            end
            ____temp_35 = ____opt_result_34
        else
            ____temp_35 = nil
        end
        local extraValue = ____temp_35
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
    local ____opt_38 = storage.runtimeCache[propertyId]
    local dynamicValue = ____opt_38 and ____opt_38.value or 0
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
            local ____groupedByEntity_entityKey_40 = groupedByEntity[entityKey]
            ____groupedByEntity_entityKey_40[#____groupedByEntity_entityKey_40 + 1] = dirtyKey
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
    PropertyData.dirtyKeys = {}
    PropertyData.lastSyncTime = self:GetCurrentTime()
    local ____PropertyData_stats_45, ____syncCount_46 = PropertyData.stats, "syncCount"
    ____PropertyData_stats_45[____syncCount_46] = ____PropertyData_stats_45[____syncCount_46] + 1
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
    for ____, dirtyKey in ipairs(dirtyKeys) do
        local scopeStr, keyStr, propertyId = unpack(
            __TS__StringSplit(dirtyKey, "|"),
            1,
            3
        )
        local scope = __TS__ParseInt(scopeStr)
        local key = __TS__ParseInt(keyStr)
        local value = self:GetPropertyValueInternal(scope, key, propertyId)
        update[propertyId] = value
    end
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, update)
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
    self:ClearEntityDirtyKeys(PropertyScope.UNIT, entIndex)
    self:ClearEntityNetTable(PropertyScope.UNIT, entIndex)
    self:CleanupStorage(PropertyScope.UNIT, entIndex)
    local playerID = unit:GetPlayerOwnerID()
    if playerID ~= -1 then
        self:ClearDynamicPropertyCache(PropertyScope.PLAYER, playerID)
    end
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
    CustomNetTables:SetTableValue(self.NETTABLE_NAME, entityKey, nil)
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
        local ____switch244 = strategy
        local ____cond244 = ____switch244 == AggregationStrategy.SUM
        if ____cond244 then
            return current + value
        end
        ____cond244 = ____cond244 or ____switch244 == AggregationStrategy.MULTIPLY
        if ____cond244 then
            return ((1 + current * 0.01) * (1 + value * 0.01) - 1) * 100
        end
        ____cond244 = ____cond244 or ____switch244 == AggregationStrategy.DECMUL
        if ____cond244 then
            return (1 - (1 - current * 0.01) * (1 - value * 0.01)) * 100
        end
        ____cond244 = ____cond244 or ____switch244 == AggregationStrategy.MAX
        if ____cond244 then
            return math.max(current, value)
        end
        ____cond244 = ____cond244 or ____switch244 == AggregationStrategy.MIN
        if ____cond244 then
            return math.min(current, value)
        end
        ____cond244 = ____cond244 or ____switch244 == AggregationStrategy.FIRST
        if ____cond244 then
            return current ~= 0 and current or value
        end
        ____cond244 = ____cond244 or ____switch244 == AggregationStrategy.LAST
        if ____cond244 then
            return value
        end
        ____cond244 = ____cond244 or ____switch244 == AggregationStrategy.CUSTOM
        if ____cond244 then
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
        local ____switch247 = strategy
        local ____cond247 = ____switch247 == AggregationStrategy.MAX
        if ____cond247 then
            return -math.huge
        end
        ____cond247 = ____cond247 or ____switch247 == AggregationStrategy.MIN
        if ____cond247 then
            return math.huge
        end
        ____cond247 = ____cond247 or (____switch247 == AggregationStrategy.FIRST or ____switch247 == AggregationStrategy.LAST)
        if ____cond247 then
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
    if dirtyCount == 0 then
        return
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
