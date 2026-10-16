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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 3,["19"] = 3,["20"] = 29,["21"] = 30,["22"] = 33,["23"] = 33,["24"] = 34,["26"] = 34,["27"] = 36,["28"] = 37,["29"] = 38,["30"] = 41,["31"] = 33,["32"] = 43,["33"] = 44,["34"] = 45,["35"] = 47,["36"] = 48,["37"] = 49,["38"] = 50,["39"] = 51,["41"] = 53,["43"] = 56,["45"] = 58,["47"] = 60,["48"] = 61,["49"] = 43,["50"] = 64,["51"] = 65,["52"] = 64,["53"] = 68,["54"] = 69,["55"] = 68,["56"] = 74,["57"] = 75,["58"] = 76,["59"] = 76,["60"] = 76,["61"] = 76,["62"] = 76,["63"] = 76,["64"] = 76,["65"] = 76,["66"] = 76,["68"] = 74,["69"] = 97,["70"] = 99,["71"] = 100,["72"] = 101,["73"] = 101,["74"] = 101,["76"] = 102,["77"] = 103,["78"] = 103,["79"] = 103,["81"] = 98,["82"] = 98,["83"] = 98,["84"] = 98,["85"] = 98,["86"] = 98,["87"] = 98,["88"] = 107,["89"] = 110,["90"] = 112,["91"] = 113,["93"] = 115,["94"] = 116,["95"] = 116,["96"] = 116,["97"] = 116,["98"] = 120,["101"] = 124,["103"] = 97,["104"] = 133,["105"] = 134,["106"] = 135,["108"] = 133,["109"] = 149,["110"] = 156,["111"] = 157,["112"] = 157,["114"] = 159,["115"] = 160,["116"] = 162,["117"] = 163,["118"] = 164,["120"] = 168,["121"] = 168,["122"] = 168,["123"] = 168,["124"] = 169,["125"] = 171,["126"] = 172,["127"] = 173,["128"] = 174,["129"] = 175,["130"] = 176,["131"] = 177,["132"] = 177,["133"] = 177,["134"] = 177,["135"] = 177,["136"] = 177,["137"] = 177,["140"] = 187,["141"] = 188,["142"] = 188,["143"] = 188,["144"] = 188,["145"] = 188,["146"] = 188,["147"] = 194,["148"] = 195,["149"] = 196,["150"] = 197,["151"] = 197,["152"] = 197,["153"] = 197,["154"] = 197,["155"] = 197,["156"] = 197,["159"] = 207,["160"] = 208,["162"] = 211,["163"] = 211,["164"] = 212,["165"] = 149,["166"] = 221,["167"] = 226,["168"] = 227,["170"] = 230,["171"] = 231,["172"] = 232,["173"] = 233,["176"] = 236,["178"] = 221,["179"] = 240,["180"] = 245,["181"] = 245,["183"] = 247,["184"] = 248,["185"] = 249,["186"] = 251,["187"] = 251,["189"] = 254,["190"] = 254,["191"] = 254,["192"] = 254,["193"] = 256,["194"] = 258,["195"] = 259,["196"] = 261,["197"] = 262,["198"] = 263,["200"] = 265,["202"] = 268,["203"] = 269,["204"] = 270,["205"] = 270,["206"] = 270,["207"] = 270,["208"] = 270,["209"] = 270,["210"] = 270,["212"] = 279,["213"] = 280,["215"] = 283,["217"] = 286,["218"] = 240,["219"] = 312,["220"] = 320,["221"] = 321,["222"] = 321,["224"] = 322,["225"] = 323,["226"] = 323,["227"] = 323,["228"] = 323,["229"] = 323,["230"] = 323,["231"] = 323,["232"] = 312,["233"] = 348,["234"] = 354,["235"] = 356,["236"] = 358,["237"] = 359,["238"] = 359,["240"] = 360,["241"] = 361,["243"] = 364,["245"] = 365,["246"] = 366,["247"] = 367,["248"] = 367,["250"] = 370,["251"] = 371,["252"] = 372,["257"] = 375,["259"] = 348,["260"] = 391,["261"] = 392,["262"] = 393,["263"] = 394,["264"] = 395,["265"] = 396,["266"] = 397,["268"] = 399,["270"] = 402,["271"] = 403,["272"] = 391,["273"] = 407,["274"] = 408,["275"] = 409,["276"] = 409,["278"] = 411,["279"] = 412,["280"] = 414,["281"] = 414,["282"] = 415,["283"] = 416,["284"] = 416,["286"] = 421,["287"] = 407,["288"] = 424,["289"] = 425,["290"] = 426,["293"] = 428,["294"] = 429,["295"] = 431,["296"] = 432,["299"] = 439,["300"] = 441,["301"] = 442,["303"] = 445,["304"] = 424,["305"] = 450,["306"] = 457,["307"] = 457,["309"] = 459,["310"] = 460,["311"] = 460,["313"] = 461,["314"] = 462,["315"] = 463,["317"] = 466,["318"] = 466,["320"] = 467,["321"] = 467,["323"] = 468,["324"] = 470,["325"] = 471,["326"] = 472,["328"] = 475,["329"] = 475,["330"] = 475,["331"] = 475,["332"] = 476,["333"] = 477,["334"] = 478,["336"] = 480,["337"] = 480,["338"] = 480,["339"] = 480,["340"] = 480,["341"] = 480,["343"] = 488,["344"] = 489,["345"] = 450,["346"] = 492,["347"] = 497,["348"] = 497,["350"] = 499,["351"] = 500,["353"] = 503,["354"] = 504,["355"] = 505,["356"] = 506,["359"] = 509,["360"] = 492,["361"] = 512,["362"] = 513,["363"] = 513,["365"] = 514,["366"] = 512,["367"] = 517,["368"] = 518,["371"] = 519,["372"] = 520,["373"] = 517,["374"] = 523,["375"] = 528,["376"] = 528,["377"] = 529,["378"] = 529,["380"] = 531,["381"] = 531,["382"] = 531,["383"] = 531,["384"] = 532,["385"] = 532,["387"] = 534,["388"] = 535,["389"] = 536,["390"] = 537,["392"] = 537,["394"] = 537,["396"] = 539,["398"] = 542,["399"] = 523,["400"] = 545,["401"] = 546,["402"] = 547,["405"] = 549,["406"] = 549,["408"] = 550,["409"] = 550,["410"] = 552,["411"] = 553,["414"] = 557,["415"] = 558,["416"] = 559,["418"] = 562,["419"] = 545,["420"] = 576,["421"] = 581,["422"] = 581,["424"] = 584,["425"] = 584,["427"] = 586,["428"] = 587,["429"] = 588,["430"] = 590,["431"] = 591,["432"] = 592,["434"] = 595,["435"] = 595,["436"] = 595,["437"] = 595,["438"] = 596,["439"] = 598,["440"] = 599,["441"] = 600,["443"] = 603,["444"] = 603,["445"] = 603,["446"] = 603,["447"] = 603,["448"] = 603,["449"] = 603,["451"] = 612,["452"] = 612,["453"] = 612,["454"] = 612,["455"] = 613,["456"] = 614,["457"] = 615,["458"] = 618,["459"] = 619,["460"] = 619,["461"] = 619,["462"] = 619,["463"] = 619,["464"] = 619,["465"] = 619,["467"] = 628,["468"] = 629,["470"] = 632,["471"] = 632,["472"] = 633,["473"] = 576,["474"] = 642,["475"] = 647,["476"] = 648,["478"] = 651,["479"] = 652,["480"] = 653,["481"] = 654,["484"] = 657,["486"] = 642,["487"] = 661,["488"] = 666,["489"] = 666,["491"] = 668,["492"] = 669,["493"] = 670,["494"] = 672,["495"] = 672,["497"] = 675,["498"] = 675,["499"] = 675,["500"] = 675,["501"] = 676,["502"] = 677,["503"] = 678,["504"] = 680,["505"] = 681,["507"] = 684,["508"] = 685,["509"] = 686,["510"] = 687,["511"] = 687,["512"] = 687,["513"] = 687,["514"] = 687,["515"] = 687,["516"] = 687,["518"] = 696,["519"] = 697,["521"] = 700,["523"] = 703,["524"] = 661,["525"] = 707,["526"] = 708,["527"] = 709,["528"] = 709,["530"] = 711,["531"] = 714,["532"] = 715,["533"] = 716,["534"] = 718,["535"] = 719,["536"] = 720,["537"] = 721,["538"] = 721,["539"] = 722,["540"] = 722,["541"] = 723,["545"] = 729,["546"] = 732,["547"] = 733,["548"] = 733,["549"] = 733,["550"] = 733,["551"] = 733,["553"] = 740,["554"] = 740,["555"] = 741,["556"] = 707,["557"] = 748,["558"] = 749,["559"] = 750,["560"] = 750,["562"] = 752,["563"] = 753,["564"] = 757,["565"] = 748,["566"] = 760,["567"] = 761,["568"] = 762,["569"] = 762,["571"] = 764,["572"] = 765,["573"] = 767,["574"] = 768,["576"] = 774,["577"] = 776,["580"] = 783,["583"] = 778,["584"] = 779,["585"] = 780,["593"] = 787,["594"] = 760,["595"] = 791,["596"] = 792,["597"] = 794,["598"] = 795,["600"] = 797,["602"] = 791,["603"] = 810,["604"] = 815,["605"] = 816,["606"] = 817,["607"] = 818,["608"] = 822,["609"] = 823,["610"] = 826,["611"] = 826,["613"] = 826,["614"] = 826,["618"] = 826,["620"] = 826,["622"] = 826,["624"] = 826,["625"] = 829,["626"] = 830,["627"] = 831,["629"] = 833,["630"] = 834,["632"] = 837,["634"] = 810,["635"] = 848,["636"] = 849,["637"] = 850,["638"] = 850,["640"] = 851,["641"] = 852,["642"] = 848,["643"] = 860,["644"] = 861,["645"] = 862,["646"] = 862,["648"] = 863,["649"] = 860,["650"] = 880,["651"] = 881,["652"] = 882,["653"] = 882,["655"] = 884,["656"] = 887,["657"] = 888,["658"] = 889,["659"] = 889,["660"] = 892,["661"] = 893,["662"] = 895,["663"] = 880,["664"] = 900,["665"] = 901,["666"] = 901,["667"] = 901,["668"] = 901,["669"] = 901,["670"] = 901,["671"] = 901,["672"] = 901,["673"] = 906,["674"] = 906,["675"] = 906,["676"] = 907,["677"] = 908,["678"] = 906,["679"] = 906,["680"] = 911,["681"] = 900,["682"] = 914,["683"] = 915,["684"] = 916,["685"] = 916,["687"] = 917,["690"] = 919,["691"] = 922,["692"] = 924,["694"] = 925,["695"] = 925,["696"] = 925,["697"] = 925,["698"] = 925,["699"] = 926,["700"] = 927,["701"] = 928,["702"] = 929,["704"] = 932,["705"] = 934,["706"] = 935,["708"] = 937,["709"] = 937,["713"] = 941,["714"] = 942,["715"] = 943,["716"] = 944,["717"] = 944,["718"] = 944,["719"] = 945,["720"] = 945,["721"] = 945,["722"] = 945,["723"] = 945,["724"] = 946,["725"] = 946,["726"] = 946,["727"] = 946,["728"] = 946,["729"] = 948,["730"] = 949,["731"] = 951,["732"] = 952,["733"] = 954,["734"] = 944,["735"] = 944,["736"] = 958,["738"] = 961,["739"] = 962,["740"] = 963,["741"] = 963,["742"] = 914,["743"] = 966,["744"] = 967,["745"] = 968,["747"] = 971,["748"] = 972,["749"] = 966,["750"] = 978,["751"] = 979,["752"] = 980,["753"] = 980,["754"] = 980,["756"] = 980,["758"] = 980,["759"] = 981,["760"] = 982,["761"] = 982,["762"] = 982,["763"] = 982,["764"] = 982,["765"] = 983,["766"] = 984,["767"] = 987,["768"] = 988,["770"] = 991,["771"] = 978,["772"] = 1060,["773"] = 1061,["774"] = 1062,["775"] = 1064,["776"] = 1065,["778"] = 1068,["779"] = 1060,["780"] = 1072,["781"] = 1078,["782"] = 1079,["783"] = 1080,["785"] = 1083,["786"] = 1085,["787"] = 1085,["788"] = 1085,["789"] = 1086,["790"] = 1087,["791"] = 1088,["792"] = 1089,["794"] = 1091,["795"] = 1085,["796"] = 1085,["797"] = 1072,["798"] = 1102,["799"] = 1104,["800"] = 1107,["801"] = 1102,["802"] = 1111,["803"] = 1112,["806"] = 1114,["807"] = 1115,["808"] = 1117,["809"] = 1118,["810"] = 1119,["812"] = 1111,["813"] = 1124,["814"] = 1125,["815"] = 1126,["816"] = 1127,["817"] = 1124,["818"] = 1131,["819"] = 1132,["822"] = 1133,["823"] = 1131,["824"] = 1136,["825"] = 1137,["826"] = 1141,["827"] = 1142,["828"] = 1143,["829"] = 1144,["830"] = 1145,["831"] = 1146,["832"] = 1147,["834"] = 1136,["835"] = 1151,["836"] = 1152,["837"] = 1153,["838"] = 1154,["839"] = 1155,["840"] = 1155,["841"] = 1155,["842"] = 1155,["843"] = 1155,["844"] = 1156,["847"] = 1151,["848"] = 1161,["849"] = 1162,["852"] = 1166,["853"] = 1167,["854"] = 1161,["855"] = 1171,["856"] = 1172,["857"] = 1174,["858"] = 1175,["860"] = 1178,["861"] = 1179,["863"] = 1182,["864"] = 1183,["866"] = 1186,["867"] = 1171,["868"] = 1189,["869"] = 1193,["870"] = 1189,["871"] = 1197,["872"] = 1198,["873"] = 1200,["874"] = 1201,["875"] = 1202,["876"] = 1203,["879"] = 1207,["880"] = 1208,["881"] = 1209,["882"] = 1209,["883"] = 1209,["885"] = 1209,["887"] = 1209,["888"] = 1210,["889"] = 1211,["890"] = 1212,["891"] = 1213,["892"] = 1214,["893"] = 1215,["894"] = 1216,["895"] = 1217,["898"] = 1221,["899"] = 1197,["900"] = 1224,["901"] = 1225,["902"] = 1226,["903"] = 1226,["905"] = 1227,["906"] = 1228,["907"] = 1228,["909"] = 1229,["910"] = 1230,["911"] = 1230,["913"] = 1231,["914"] = 1232,["915"] = 1232,["917"] = 1233,["918"] = 1224,["919"] = 1237,["920"] = 1238,["921"] = 1238,["922"] = 1238,["923"] = 1239,["924"] = 1240,["925"] = 1241,["926"] = 1238,["927"] = 1238,["928"] = 1244,["929"] = 1237,["930"] = 1248,["931"] = 1249,["932"] = 1249,["933"] = 1249,["936"] = 1250,["937"] = 1251,["938"] = 1252,["939"] = 1253,["940"] = 1248,["941"] = 1264,["942"] = 1265,["943"] = 1266,["944"] = 1269,["945"] = 1270,["946"] = 1271,["948"] = 1275,["949"] = 1276,["950"] = 1277,["952"] = 1280,["953"] = 1264,["954"] = 1284,["955"] = 1285,["956"] = 1286,["957"] = 1287,["958"] = 1290,["959"] = 1291,["960"] = 1292,["961"] = 1293,["962"] = 1294,["963"] = 1295,["964"] = 1297,["965"] = 1298,["968"] = 1303,["969"] = 1304,["970"] = 1305,["971"] = 1306,["972"] = 1307,["973"] = 1308,["974"] = 1310,["975"] = 1311,["978"] = 1315,["979"] = 1284,["980"] = 1323,["981"] = 1323,["982"] = 1334,["983"] = 1335,["984"] = 1336,["987"] = 1338,["988"] = 1341,["989"] = 1342,["990"] = 1347,["991"] = 1348,["992"] = 1348,["993"] = 1348,["994"] = 1348,["995"] = 1348,["996"] = 1348,["997"] = 1348,["1000"] = 1334,["1001"] = 1362,["1002"] = 1364,["1003"] = 1364,["1004"] = 1364,["1005"] = 1365,["1006"] = 1364,["1007"] = 1364,["1008"] = 1364,["1009"] = 1364,["1010"] = 1369,["1011"] = 1369,["1012"] = 1369,["1013"] = 1370,["1014"] = 1369,["1015"] = 1369,["1016"] = 1369,["1017"] = 1369,["1018"] = 1374,["1019"] = 1374,["1020"] = 1374,["1021"] = 1375,["1022"] = 1381,["1023"] = 1374,["1024"] = 1374,["1025"] = 1374,["1026"] = 1374,["1027"] = 1385,["1028"] = 1385,["1029"] = 1385,["1030"] = 1386,["1031"] = 1387,["1032"] = 1388,["1033"] = 1389,["1035"] = 1385,["1036"] = 1385,["1037"] = 1385,["1038"] = 1385,["1039"] = 1394,["1040"] = 1394,["1041"] = 1394,["1042"] = 1395,["1043"] = 1396,["1044"] = 1397,["1045"] = 1394,["1046"] = 1394,["1047"] = 1394,["1048"] = 1394,["1049"] = 1401,["1050"] = 1401,["1051"] = 1401,["1052"] = 1402,["1053"] = 1403,["1054"] = 1404,["1055"] = 1405,["1056"] = 1407,["1057"] = 1408,["1058"] = 1409,["1059"] = 1410,["1062"] = 1415,["1063"] = 1416,["1064"] = 1417,["1066"] = 1419,["1067"] = 1419,["1068"] = 1419,["1069"] = 1419,["1070"] = 1420,["1072"] = 1421,["1073"] = 1421,["1074"] = 1422,["1075"] = 1421,["1078"] = 1401,["1079"] = 1401,["1080"] = 1401,["1081"] = 1401,["1082"] = 1426,["1083"] = 1362,["1084"] = 1429,["1085"] = 1430,["1086"] = 1431,["1087"] = 1431,["1089"] = 1432,["1090"] = 1433,["1091"] = 1433,["1093"] = 1434,["1094"] = 1435,["1095"] = 1435,["1097"] = 1437,["1098"] = 1438,["1099"] = 1438,["1101"] = 1440,["1102"] = 1441,["1103"] = 1442,["1104"] = 1443,["1105"] = 1444,["1106"] = 1445,["1107"] = 1429,["1108"] = 1448,["1109"] = 1449,["1110"] = 1450,["1111"] = 1454,["1112"] = 1455,["1113"] = 1456,["1114"] = 1457,["1115"] = 1458,["1116"] = 1448,["1117"] = 1463,["1118"] = 1464,["1119"] = 1468,["1120"] = 1469,["1121"] = 1470,["1122"] = 1476,["1124"] = 1479,["1125"] = 1463,["1126"] = 1482,["1127"] = 1483,["1128"] = 1482,["1129"] = 1486,["1130"] = 1487,["1131"] = 1488,["1132"] = 1486,["1133"] = 1492,["1134"] = 1493,["1135"] = 1494,["1136"] = 1495,["1138"] = 1497,["1139"] = 1492,["1140"] = 1500,["1141"] = 1501,["1142"] = 1502,["1143"] = 1503,["1145"] = 1505,["1146"] = 1500,["1147"] = 1514,["1148"] = 1515,["1149"] = 1515,["1151"] = 1518,["1152"] = 1519,["1153"] = 1520,["1155"] = 1524,["1156"] = 1525,["1157"] = 1525,["1158"] = 1525,["1159"] = 1525,["1161"] = 1528,["1162"] = 1514,["1163"] = 1531,["1165"] = 1532,["1166"] = 1533,["1168"] = 1534,["1170"] = 1535,["1172"] = 1536,["1174"] = 1537,["1176"] = 1538,["1178"] = 1539,["1180"] = 1540,["1182"] = 1541,["1184"] = 1542,["1186"] = 1543,["1188"] = 1544,["1190"] = 1545,["1192"] = 1546,["1194"] = 1547,["1196"] = 1548,["1197"] = 1549,["1199"] = 1551,["1202"] = 1553,["1205"] = 1531,["1206"] = 1557,["1208"] = 1558,["1209"] = 1559,["1211"] = 1560,["1213"] = 1561,["1215"] = 1562,["1217"] = 1563,["1219"] = 1565,["1222"] = 1567,["1225"] = 1557,["1226"] = 1571,["1227"] = 1573,["1228"] = 1571,["1229"] = 1576,["1230"] = 1577,["1231"] = 1578,["1232"] = 1576,["1233"] = 1581,["1234"] = 1582,["1235"] = 1581,["1236"] = 1585,["1237"] = 1586,["1238"] = 1585,["1239"] = 1592,["1240"] = 1593,["1243"] = 1595,["1244"] = 1596,["1245"] = 1596,["1247"] = 1597,["1250"] = 1599,["1251"] = 1600,["1252"] = 1601,["1253"] = 1602,["1254"] = 1602,["1256"] = 1603,["1257"] = 1592,["1258"] = 33,["1259"] = 1630,["1260"] = 1630});
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
        local ____switch248 = strategy
        local ____cond248 = ____switch248 == AggregationStrategy.SUM
        if ____cond248 then
            return current + value
        end
        ____cond248 = ____cond248 or ____switch248 == AggregationStrategy.MULTIPLY
        if ____cond248 then
            return ((1 + current * 0.01) * (1 + value * 0.01) - 1) * 100
        end
        ____cond248 = ____cond248 or ____switch248 == AggregationStrategy.DECMUL
        if ____cond248 then
            return (1 - (1 - current * 0.01) * (1 - value * 0.01)) * 100
        end
        ____cond248 = ____cond248 or ____switch248 == AggregationStrategy.MAX
        if ____cond248 then
            return math.max(current, value)
        end
        ____cond248 = ____cond248 or ____switch248 == AggregationStrategy.MIN
        if ____cond248 then
            return math.min(current, value)
        end
        ____cond248 = ____cond248 or ____switch248 == AggregationStrategy.FIRST
        if ____cond248 then
            return current ~= 0 and current or value
        end
        ____cond248 = ____cond248 or ____switch248 == AggregationStrategy.LAST
        if ____cond248 then
            return value
        end
        ____cond248 = ____cond248 or ____switch248 == AggregationStrategy.CUSTOM
        if ____cond248 then
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
        local ____switch251 = strategy
        local ____cond251 = ____switch251 == AggregationStrategy.MAX
        if ____cond251 then
            return -math.huge
        end
        ____cond251 = ____cond251 or ____switch251 == AggregationStrategy.MIN
        if ____cond251 then
            return math.huge
        end
        ____cond251 = ____cond251 or (____switch251 == AggregationStrategy.FIRST or ____switch251 == AggregationStrategy.LAST)
        if ____cond251 then
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
