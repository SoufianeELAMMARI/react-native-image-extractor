/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Button,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RNCamera} from 'react-native-camera';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ImgToBase64 from 'react-native-image-base64';
import axios from 'axios';

let img = '';
  card =async(imageUri) => {
  ImgToBase64.getBase64String(imageUri)
  .then(base64String => {img = base64String;})
  .catch(err => console.log("eror"));
  //var list=img.split('/');
  var list=[
    "iVBORw0KGgoAAAANSUhEUgAAAlgAAAE7CAIAAACOjGjiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw",
    "eHBhY2tldCBiZWdpbj0i77u",
    "IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNTg3MzJiNy03YTJiLTFiNDYtODA3OS05MTIwNmQyNmRiN2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODU4NkI2ODkzNjBGMTFFODlFRjI5MUY4OUFBNDExQ0UiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODU4NkI2ODgzNjBGMTFFODlFRjI5MUY4OUFBNDExQ0UiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmU1NzkyNDEtYTYyZi00NjQ2LTgwOGYtMTQ0MmIzMTI3YmVkIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZmIwMDliNjUtMTFmNC0xMWU4LWFiZTMtZWZkY2FjN2EzNDhlIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H5xjtgAAXHdJREFUeNrsnQd4VUXax9PLTe8JCSmkEUoSCDXSpImgKCI2FFdR195x110L+7mrrqjrrljXsqBYsYNSBGlCQk8oCUkghYRU0nv93nvfZO7k3JKbBgT+v+c+9zn33HPmTDln",
    "vPOvDPHvK2tzQwAAAC4VLFAFgAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAADQB1ghCwDT0tp6KL34eHZpTlFVdV2Tg52Vu5PdsGD3UWHero62yB8AwMWKeVtbG3LhEqe1tW3j",
    "uxvdmRU1jbqaStZmE+LDVg0NdzNyQ55BQCAEIKLjYqahn9+sT8jr8L4Yc4qmwevjYkN80KOAQAghODioby64ZmPdheV14k9vu6qoYPdXBxsG5paMgsq03PLWjtuEAtz8ydvGD0m0ueiSf7bPyRvS8qljWkxAfdfEy3",
    "VVPftGpjyr4ThV6u9nPHB9MB599wr6k+++6rtft22wSHuiy8TTU2Hjdwz6CSXZ+YSRvDgz2eXzIeGQIghJcuzS2ty1clpOWW809XB5v7r1HafEVltV9uS9t55Az",
    "tLa0+Oc9lwV4OV0EyScJJCEUP0kIZbV76v1dWQWV4ueyG+LGDj3PLYD8P9",
    "XmHVS",
    "PR6Yjm0sAdQsVLhGip3cGkCr9FLl037c4QKhvm7vHzPJN2eT2831UMLYu+aO5x",
    "NrW0vv1j8sXReCqW7GDFT6orZRUkft6bdX5jSxIoq6DaZt2xCfdwDyAr38htACCE4BKisbll7Y503nZW2Txz6zh3w74ws8cELZgUytsZeRVHTpUgA88xrbXVyAQAIISgLzmUXlxd18Tbt8yIVNlaGz9+4ZQwD+d2pfz10OmLO3OCfZ3pI++ZGuN",
    "fqNkNyzGyqtT36zDlNkXYNZtS8r9env6+sTMmvomPGUAQgguaA6mF",
    "GGr5tqWmzXYyQ2VpZCDFKySy",
    "6",
    "Fl2Q9zwYA+13thZL5oafiEMI3k9sZzkUP3QOji6Lbn3AhwgJAl8+4dk+l61MeXVrw7iKQMDBUyov0TJK2nvaose4mlhbm7KKUMHu5uZqYepKmoaV29KIZspwNNxkKeDnc1FeBd5udpfaP6ENsGhPs+tuJAz7bjUQjqWdRZPGYAQgguRgtIaqq3IpDuV3+4M4uFi6jR5b1d7sb0uIVNsB3o7jQjxGBniQZpqbWWJTAYAQAjBhUVbW1tabvnuY2cSUwpKqxoU",
    "5ouXYYsv5yiKvr8nJjlaGc9aeSgueODfd0dehzbrIJKMbzk7aryktRXL3Qwe3hyT6aZxg+wqLyWt8lsdbCz7llMRDgiZN1",
    "5RjKMdd7iiFk48n4ic3Fhc3FBWaaIUPdfxuzTrbWVluoHMl2VBxPyPu7hE+kAK28fC0cHOTL1e7bTVfRHbOkVCjGBUW6uswNuciovBQDtKaXVM9O18u+1MKswkr2KaUiDvZxPu",
    "zZwCEEPSEpuaW3w7n",
    "rj7VJFhH",
    "HGphYTQ7Ox1kqmp4t9ZU1DY3OrfEB1fdOGfdm",
    "HsghLbxpeqSVZTdGoKnG+Xp7+r4ThYrKlOezzxsfYkg1",
    "7Y6kU+ZFhMwNcZ",
    "1aYUxcwH2r9oaniXgmokZKoBl90QJ",
    "8rz0G8",
    "5poOozaAbIjPlXHFG26rvFL0Fk8o9+UCJMsFb6wrLVG3aftOHW2x31Pdsr87ZvOvvNqu5V",
    "35M2QaFlq9+tP57U6Wn38nG5",
    "jY610isSOcqvvlEMVXDwsFRNSbebcm9FAH+i",
    "b4PLuClVXOKxnaKbYNTddbn5ipyDrOvbGRPl2WGmc7ZaDu6XSt66eG9awNRMlZ8dUB3WkVFBqFaehWBAMaTKi",
    "aDmYVvT++iO6JiDpU7i",
    "y+niavYaXTAp9ObpkSbK6uIXN",
    "L2UzfGjY7wLiqrzcgrT80pO5RRXFzRqeKICnT7y+JxttYmmZtUl63amGLEz5Da+PfPj9Zt6YulYYxDVdjzS8YrTifdpY",
    "4SdWurFuKkF+5Z5J8+gP",
    "+c2U+Wd0Cp2o9y",
    "F1XXRVY7i15aTSomffi+",
    "I1t4p5dexxrJKiW29TRogkNJw+gY3b9ISklQDZ2oCJY01fX622iDZIPspy6L4OOnZpmiN",
    "Ipt18RZchNqcenGy93Q6IuN1MUixCBiwB4jV6cfLo55eUv9ssq6OpgM3tM4DOLx",
    "7vT7P+9oeJgzzaey9P5VecrazrUgJ3Hzvz",
    "P8SxJ6GphYLc3Nfd4dJI",
    "3vmjfirUcuf",
    "nuy2aMGmxl0e53k5JTtmrjcRNVkFTHuLc9V08KU0+tDRUmzYamwN",
    "+Mbl7vW2dQ1ZEz8RZ2BRhvWpHqm9cBfVqfGtNTaefnWcWyhJlRAWFZdldFTQSrINttw0vLlDj2aguNQMNnV6eboRVm1KM34q6Bii4CEDX6EXItzszftyjdWYJ83e5Nj40LtLb0kLb7hH9nEknS+5",
    "47dQf5eYIV5kwfh7OqrsrMiSo+qgpKI+t7jqaNbZ5JMltQ3NnXoSdPxMh",
    "i5",
    "PHqkddcNuRfaw9lahTrt8O5t84cqjLaPXUs66y8zpnxeo0sADKwetzfRVbLuR",
    "m+Tkxa+74YDnOFA1e6FK2XSjnKduPZ5XKtTDp5dhInx6PcRrXwvK1n7A9x9QfT9KrgnbDYpqLC5qLjRl8lMBj2We7NM4URWniREO6Pbxc7OVRRjrRuNGmOD3Yx9n0UUOFsysblIrUUUmhkoEQggua8uqGtTsyOiogq7vnjYgfPkj3MKodjma2P",
    "NtmvViunwBBePuZLt45lC9YZqp1+x2uGPOsOc0tmNLaxtFxrgQiqjKVc",
    "UGH+quUgVft6bJVdMVBmRrhgfeCOpWzQlnGpentkt",
    "3U8u7T",
    "hJDnGlLt",
    "PWOdLmfkH155Hr8f5uOK9JLIsFqxyt9CyOGftJ2jwelbIJDna5cQEpGllzt",
    "t0Vaz+R",
    "6365TvnKxeIDtKKtZ8qTndbcq",
    "z3OuETJatflcxcKi9l3yd33r4cjPNoKBcXl89N9dQ40ChmpQ",
    "c8cFDwt2p7zanpSnMOPoJpEzkE5XqKDx08nIM3EmjK4Kil5Qarus3Z5B16U9",
    "dE0ARBC0JccySxpblH7sJDN9vySCYbawktmR40b6rMuIXP",
    "iaJW08aJB3s5XjE26PLYACOOphU1DR9taK",
    "oLS3Mvd1Uxq00RdUjD4yRaNFH0btF20aEUPZq4cNkLcwqrOynPCclY7nyMrOnCCgW7CYBFvU47Zc1QD32KQ04seUkp5dKp2dC2Gkg0MuHfqrGxOf",
    "+T5xAKsjO87QtsKtxuO+J2WfGlJTCi3v4SXGO11NRCFUst5QRtGHJE3uJ6CbhPJN3MkkhN09nfLcFG8pxcPC8WSfHSoFuMlACMGAwUZSqeq6RiNHDg10p09lbePhjGKqLOij61zq6mAzyNMxNsyLVHOQh6OR0JqaW7Yeyv1qW1pVx8pt6iFDo46jiuWPqQrTdW0gYZBdSalGk+tEpTUZ3en0YUHu5ybPFdEeG+mjO5ypN8mkfLqDhVTtCrE0FE6XuCy8TeEOQ1pI2ib3fzZln+KNxuxOpp6Vl4+uZymFRjsrf",
    "62l3mlaAooek1FfpJhJzeSKN+40OU5KqafvvdEgSkyRqHRTSifSFpIH2pgkcXZrSkxAEIIzidRQe4kP2QUkpX34pp98y8bctWEIY72BjtznFU2U6L96WOmeTFTZU1jeU1DbX2Tk8rGx01lyqoxVDf9fvQM1RcVNVrdjQhwvW12VLdirnc9Tx4",
    "k+smI4ND52vwxvS+MkWXILc",
    "jBzf4xU79S7AZj8mXhZCQ12deicpak6f2HshVKTI0ERPuhn05ozidDL+9J5ObSD59Nr6ZlON+9lRugOQ+1IL6UNCSP",
    "2ySRFACEE",
    "QsJ2y3TI1ZvTlULW2vbtztPrtuTSTbKuCjfkSEejvY2xu4GSwt3Zzt3567Xmikqrz15piL5ZMmhjCLdGRrTYvyXzh1h4twJrSXkYt+t",
    "QMRE91cZZ3ow6tbOJi00IEh1xjjLjM9FGwDbRcTC93bRX",
    "fe3enjcoZ",
    "vyS8XonZpCykkbqzsMBEEJwIXLVxCHm5uafbE7lwb",
    "G5tbfj+XTx0yzxHboIJcQPxdvV3uqLKi6IcvP3PBao2QjUuuYTL2isloSv6KyutyS6lP5FeLNFQrIELzp8ogRIZ49iPb+E0V6e5",
    "6b2zv3BPs42z6IpxUQPfP7+GUtdaaat2ZggolE7pooep0ZGP2Sb2nNxxP7vMMMeRrSjeDKacfy9afmdkFVT0vI43vDztbKaLH",
    "q7sGQQghOBCZ96EkNgwr8+2nNh",
    "olD2hCkoq6UPiyJjrlk7zd6WPpaWFhaknRrUK86Q2tWbtu6MnY3lhCi",
    "GaMHRw5265YqyD+p6tFdDYQdJeQ9A3qoxtPVrrPp3F+zs6u3bxI+n9p6fPtm+ad1UPt8fJvgUHmyPG2UrX5XsXKNofkVRiDZ0O23VBQfO0wpdrK7rN5bRWGNdfd006GioQ8FvnZHhsJ1WfeKAEIILlD8PR2X3RhHlhxVCiSHWYX628gkk3WNzfQx62YbmhTU38sxNtRrdLjX0ED3bi2oxvAAjxiP4flhy26IE",
    "1aVOMo3uYz0Nd7HBfpu2pjiqz9YyN9dBO1L7WwpqGpN+9+qvjmU7thMfLSM2ffeVXhGmo3TKvBqs7Dh7RN5qOTen6F2mqs27+nB6OD+04U6k0CpVeeYUJF",
    "OQNo+WlYhWzDOkmoVtFbCv8WUw53cTbRqycN298CPvgsBsqFZli6ieAEIKBhLeb6oZpEfQpq6pPzy1PyyvPzK8oKK0tqajr7tp6ro62Pm4qH1f7IF",
    "nUD91",
    "yrZkb2JGy",
    "I2WmGQ0HlA",
    "",
    "5jSu1ovJa3X6zueOCB3RxkMaTNsj2CtXaPHXS21VFSc4qrBTT7EhIFGucmg5Zdfl",
    "vs9x6mxLzdLYdft3K1xjrLx8ZKcYl+tvq92",
    "W54dQaqpEM4uUQz4kX5kF1TxTtJ7YcxRISqmWlIDSHjN6HYdK1YkuH5KmMJ5qsvTTYy",
    "aKOQ7O09UbBoavjwIA8qFEMdsABCCAYYbk5246J86cM",
    "m1taSQtr69W2YF1Dx3dDc0NTi6WFhaWluY2VpaO9taOdtYO9tZO9taeLvY21ZWtrm4WFeR",
    "Giuoaqu4VnZ+GRtHUFdPA75LiJMsmC",
    "vo67GoUnvrnGKkM9NtyX0KXXRbcq9YtrtnkNopFE4YUtTcIVFny4wKkUwuhY1laKIIKZxi5mi3TqeDja",
    "AICMXCrVF9K55xCYp6hMIIbgoCt7Sgl+WtOd4Punf5JGDunwf07s",
    "Jm89nDthmO9jC0eZm",
    "eZHD6",
    "ZLzedUQV8DsZLoKc51f+mrJIWI9dH7uELEXd+RW000LlePbdVw3Nmje+ljeXka6DiVarCitFF+XtV0TpjuTpVUG9i8KYfvqTN4w2PVt09VUX0+1LMIDAotuXNFsPnf7X2kPv",
    "nRkzZYTYmdrW9t7Px159K3t26WKprK2kVSQNhKOF8gvIu89",
    "GoIEjlDs",
    "FID8iY0OtUopgy7+2qUlgDcpgKj3yFA4Xxn4qQZZcNXblSxEr3AK7fjXvhU+R73C",
    "KFp6hv1yuv03hCCMgdfT",
    "z2o6QB5cVL+DaWy8z3MrnK5c0OV15SFeZeCdO06pQI0cTAVHt4SRpWV7fDqZrYZKh",
    "TV+ApqF01rDMAiBFoSU9rf2irea0oczyrdcug0bXz4y7Ep0f5s",
    "DnaWzurbEgOWQv7tneIqy1qa+87UUhXF5PtSI1IVIx4OtAppMrclUpVmG61SFUbv+CJVEexBAkFKywA2lBc5fqpYWTBUMi8doki5PvnR",
    "NUM",
    "pXV67kvjt2PtRrrFA1vS+1cFtyrrzWNjuGTIsO6KVbkN",
    "L71Rv31SzY7MYGiRpVI29jMTMkEY2FxfW7vudJNC14",
    "1KCnTXIzWULo1",
    "VpHo4uaRUd21XXgVPcoEKkQxSYbaK5QDpqw23rPTKYZGSod+0rk",
    "J2bJPfZcKFhc5iIG7yO8dCHL785XNvNrJW66POK6yWG8",
    "2B60cuf7+ft1X+eLRaXeX",
    "dkV8PqgXS1dH23cemW5ibIw",
    "PXWHVVCuW+iQTTfZ2yb6p06JoQV90b6oDqWD+n+",
    "j8Mn+c1tyn0Ivy9d+oli2WxEBAGARgoFHdkGleLmS3JsnrwjT2NQihHDCMD8WwvLqhrTTZUMD3ZGH",
    "Q3Zc7X71S",
    "jrevs0mlmeCG0nkG2oAi",
    "dt9u+pAciomGNZrZFJ0qjs5OpwBACMGAJCWnfajP2tIizN9VrxA2NLWK7eHB7o721rymTMLxAghhf1N",
    "PKnw",
    "5bp",
    "esciBBpodm+3Yb+ddHXdwrAAAXOMpcuwuclPMBVng5v00kItSvLWFpYCEeDxNQCdKr3vxAmG9ahW",
    "v2Wo5TZ8sOMl0erPt6CgAghGDgkZpTxhsKL0dF16j814SOaYhnK+vT88qRh",
    "37cKr0r5Htcd+TuhahLGOmS5r2Wg6Ofi+",
    "Q3ae7hKjuragIadTAAYo6Bq9RMktrmYXUCIq0KAQNnQWwpFDPFW2VjyymJhSEBHghpzsP5znXtdaWyPG59TTGMbEO0ydpbdf1OPeJ4tfW05HWnn50HbPruh6",
    "W3OVy6o3b+bV6KRxwXpovZjJqrGXmZkYgYAEEIwkBADhJYW5hGdV8q2sbYwJIRWlhZjIn12JOfRdmZBJbKxvzE0k0EXsgL93",
    "ykD8xQzQt40fMJLinQNXqJUtfhLxo52E3x4kAjXaPEwslhziobC3Pz3iwJDQAAsAjBeWb6qIDj2aX1jc13zhmm+Eu91qiFueYV92YNzUoh9PNweO",
    "x6XUNLUbeeg8AABBCcKHjaG",
    "z55vHGPqXjEIeCGzQ9z5CUkpHe",
    "QlAAAuElCdAT2ISfStrZgjAQCAEIJLj",
    "jhfvRtb2M1IgSLKwIALnKw1ijQT3ZhpZuTnbPKBlkBAIAQAgAAABct6BoFAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAADQr1ghCwC4YMnIKUnNLqaNQF",
    "X8EBPe1tr5EkvySuqOJFVXNvQ5OnqEBHo6e6iQp4ACCHoIet2pqz8MZm3N6y4Ueyfs+xL3nhwfvRVk6MuhBhOHub71zumDqzsrWtoWv7BtqSsUrFn5UMzwgI9+6nUzovGP",
    "jmlj5Mmin8+4s9vxzIET",
    "P+y0KIISge",
    "UXbwwN8jo3VQY4vyhUkPD3cUG29IYvNyXLKshPE7IFQAgHBnlFFaIVf2Vc4CMQwoud5PR8oYJU4vPiw2sbmtAv2ksL++PN7a3JmGD3xbNHoG0BIIQDiUMnzojthNSCR5AjEkZ6YuOjg7jJb283wCQkp6BcbN+zYEwfSqDIk0uuNVlYIbbvvnoUulUAhHCAsTM5V2yX1TSSuRAd7ods6RJ3F9UAdYVIyijijcnDfPvWEBy4edJL2OeIgQoCBZg+caFTWlGrGCvadzwP2QIAALAILxUOS",
    "2izP60wqU9Ckr44nfpOE7qS9etbWgy6wf3HLJoueuPohET4WfE4hGe7rQ9KnKQv3cfj+jI4ZuYTJEzPZvP0K8Z27MUGQqHO+QV2S7KLj46qEvLUhzcs7KjvErLKSkprzE7tz5inHaVrfX0cWHy",
    "rqGpqS0fI4Plb7xXhmRgRRObOQgTNKAEIJeceRUe5fOokmhX+86SRuZRdX0mHWrZqEq6Z3vD9KJ8s47ZkXNnxqlqMrpaX",
    "",
    "u",
    "0K5zo3B5unF0",
    "ofX8sKfFrXyYqoqHXhZ0S+L",
    "1h3ceL5ATMXmY7x",
    "mxYqEi9FBZuWPyexSJGYFGJk+QZXsO9",
    "u6xy+WYi34xM3jldUuP",
    "4eDsf9so9U1Iyi4XDBR",
    "",
    "zO2TTCwIytjXP9ute8X7rh0tZ6y4HEPbnMwuHf31hq9bcF1OeqFk",
    "rQrTQonWe2fddNEKpG",
    "r9olyo4CofvnxtnRhvJqzaajUk+GuuwevyXe9HaDHM8e5LbxoDix4q4QB1BKQ",
    "1dxcGyECYcyfn3NwfKahq7fCj03boH6OG9ZU4M3J0uWNA1ekFDtZvQpDkTw2OC3Xl71+HsbqngU+",
    "vUMgPQXU6VZ2Kyy3",
    "YJtCBc00A5MUAtUFvVTBB9",
    "cohsNqnfE5BChUk++vVVRp7Mq0P46jbnTGyj8B",
    "61UTd8ihvFkOKp96yX1iTIKsjHkzaYWI6UsXqv2PuMNRI+FxzdAKYHRclUhEP3w5ebkmUVFPePoZDpoor+fAqTYmhiHD78Yb9CujivqPRJZvrvcUtILRDXJZ0T+7fuzVi+eo+sgiJvFXeLoVuXmrDUvkSFBiEEPSEpLV88ltQWnhwdwD8PpheaXkVS1SYCWb5k4sqHZlDLV1RPci384",
    "YUUX9RG5aOpONFjUAtYnrOe1xTP",
    "vRTjkaZDQIXafaRw6ZbDVR6ZAlRNGgb1H7fLYhibepRU8f2WJQ7DGEbvhyMslm1au1dApdgqItx5xqZ1NkjOJsPGPFFcP83SgJ4i",
    "a4ER5ujoYCX9PUrYIXzdF73x",
    "0PSSomTS7aEIgTSPUkqpprSbGDIfLOcVxdCUvCJx5Z4PNtHkmFDcyNjq7r1HWUcZSGUn9nCWUlbrpl3cSNfGhwoL75WvD8iJUtwtxm8t8axRe6JbLRJwLkHX6AVN4rF2v5iZowabacZaqKLgOoWUw5SBB6oixZP56v3TuWfpkUDP6rpGbrfSJSaMDDTrPNGKKuul14xR18tmZoN9XJau2MDVxObEDEVvmInI0Xjhzsnc",
    "Rge6HnnS+t4",
    "+ETZ7gnitIlGtSiP5CP59Y61ZIcN+7XEn168yYMMWWVEKrX9IRP1aWLihc6oRqf2h+cJ4puxtcfns29W3LMj50q0j1YYSWIml10JyoydsveDI4J",
    "yv6GEcEuZuyJs6ejvuEanCRIoLsGLNu9qVTCI",
    "cNJFDKCmvERYSycPyu6Zx8sV+ClnvfSgfLOfVdztOGM8rYs2moyIQERORFsoWE+98AV2RPnIHqZEsFXe+YMOedG0DriNR8t0ivLjlW+upRXF8P9OzduZsNTdTfjuQBX9vWISgJ301vDF8iDd9U10mGra6TjTGq0hqzMpV4YwxIYpLCOuTWDBtmNims0SrdlvS6Z4lRI6GGISjOoUFXj5ATtcMaZBG3jbUe2kKhwyET7EStsuW",
    "Zm6J5KJIMZ4aIMkircLSmuMX1FO0azxYXozVp4h0xt83bWGIwktmz6mWMlaSy7MW2xrGl7tTIsZLJIvz0TU20lAjRI5r4R1RXpgvGdb9pG+fc5IWczEdlovSr9LbpkTo9urqXsD0N0inkQx6VMMWJBkyuOLV4wNEUYh6jQIIege1NIUVlRMRHtDckyED28IJxrjHM1ur1ZGh",
    "vI+0UtKSp0dofjlriixT1yiJfoCexZWkRLWfTuMj4dFXduSXvImfnlQjJl5wLaFtV6bybIG5miJ7JIZJqMg32ng3U71gxRXF5rKGND",
    "V2FQvTmVhGRoVpbDLiS0JLpw5+eOdzKZ3m5quRGg9iuNWHINm6oVlDlie16hVC+RTspdLDyRu0PFLeEPCQpp4II8GwXwpN57XdsRl4Zb4hnign0dUVtdoGDrtELFzFfUJaEscP8uYlKrUtT1hwRUqqox7mW1KsQ4gnX+yR3t2NKwfqEU+JCnfSvQ2KFgeWsslGc298LZ4ssUrhFGD+4S0T9qJuxfbXICxma3+8+ydFe+WMyZfKiqZETY4L60E3RkOCRPdRld5",
    "pDZcSSQgVw4E5xdXn",
    "hmsq9em+r8",
    "HZLvSdFaqq5r1G19",
    "uPj7eJnZW2jrKx9PgsIQAgvZvanFepaUeFSY1zvUFZ",
    "00shJMHrsVkJDEEl8ur904VjJ32",
    "8vUBt5+PLJ4xdMa4sPPutW961S9be7q+l+cX0612apEYirysrABCCLqAWo7ynC1db3IzE9w0wKUDic3rD8",
    "esjdjzZZUNg3pm26bncm5wsUDAAAhHEiYMlPw10OnFR5u58b46M3peANc",
    "0FqR3lLn4QjOas2HOGGFNkxr3+2e6C8jlElCfb5fV2iLqa",
    "NFF3qQEAIQQ9QcwUDPF21B1b4o4XUxbgdnOw0TviVVpRuzu5XWtZmWLCvDlYXVcR+WUI",
    "b1YlPB7lEdWmK17M3ikypT1vXpATV2TyLQ+DDbM340zVgyICuSVoPuQCSMDYyL8xApBdPXzOzRlupdvH45Gn0fEqDCAEIKeIzuRK5bgat+5Yj2391Myi40L4Yggd66FdybnyqZYrvSOQ94vpmyTcCrqIOGhKs9K7haTh",
    "lyNJIyioxbhCF+WkfKus4v4RPzmocGefW4ihR6T9+K8EXjQ+H110uEv6XurDvhcNjjjGXEZEphtVC6brsyRvjrn9+hKdkFxrjjjJw5aTkl573nXzYBD6SeMW4RihaPXq9jcCGD6RMXIvLMM706Ny2mffpdlxP7Jg73F7oi+4L",
    "diBLSBRvREgP+XfbjottOkvUp+K63UVEg2oKhX1A4X+5STsCGivNXduyN0M2B",
    "VWT91llIHwKVai8SFi2yfIKdqcmNG3GWvExOz9WnQ9Zn3CKfnqqzYcEaa2ccOUhFC0CegsRRISjnRanIWKbN3OFPr0fo06I4i5nt",
    "vPqmYNEmRkW9LMb+CmpKKVQMpIR",
    "+gCXWYBGC7iAvFKL3gKgQL7IGzUxYNGRiTJDbz0e4d",
    "TJt7c+sjDO00W1fne6qILFzHqqg8S63vw9dVQwteXlWkyeD949IZSi8exHOxfPGMozB7YfyuJrUSXC8kbREOYj26x0JNXva7akclAUyU4WXrA7CxhVvtyxZvylEOqV6nTCp2T++5sDIpkU2z4sTTljP96cUl3XyBkrX7HHGSsqay5QOUWd5OfcvoqdbsvlH2xbPHuEytaabjbh9kXl3uW59107+qn3d4hAFkyJpDuWkrNlfyaVGsnkO8vmCdUXi6r3n+04Lz6c85bu3r++",
    "9vtc0ZSfGobmvYdz6My5buF7ze6geVbq7C0hgqaTUme3DJ8iDe82yCEwCSo8Sh8rw2ZJvIkikMnzhgRQnpEn148gWsWehR5nSqBoga5ZU5MWm4Z6wo95GJNDYZEtMcdkopo6DrB5hSUCzvvvuvGHs3eKGbFyYdRvaNY+2NydABHmBewNjPBqcFI+GaaFeD63Mey",
    "zKWue3KmITUAkMpunvuyHPvNUqJTdIUh4A0bMa4rvU+OtxPtBvUgWR1umPLdfrt+xu6l9SrhnYsKad4gngcQTyA8q2lW9BiOUNwoYGu0QsOeamzyGAvQ7oijMUuV+eimuWVe6bojkLdMSvq8VviFcEuv2uarhlK8kMh9PIZpmiQROlGQ70u5ZKJ8pJUPCtONxq0563HrlDU6VS3ijVHhKZ2aaLpDZ9iYrpnYHfbAf2XsUZSxOubTx8Xdo7vYbJQFQVNZfTM7ZNM1OOl14wh7dF1WaIEUjLPvQfNVZOj5IW2FTeM3AyluNEtqrcgKEW8dCq4ADFva2tDLlxQUANTDEUYqZRNPEymWy",
    "m7fKdqIYiIIYAKXy9lxDRMOvqhaviNbMqW2tqExgxfMU7YOUARQzt7az1nmvKa2zpGPY0USSny8ANZawpL+YVF+1W4KakqLul1q39Yq1wniSjt1Dkng+x3Jq",
    "j4uuRtIB6Tkl4h3OunesuBypVJeNCSPPi+mPkkhRlzekoiD0JhBACAEAFxsKIezvy928",
    "LuymkYytj5fvgCZD3oDukYBAAOy44SH4kxxwAEAQggAuAiFkDdmnPMRUHDxAa9RAMDAIyzQ80Jbgw3AIgQAAAAGJHCWAQD0DYY8bAGAEAIAAAAXLugaBQAAACEEAAAAIIQAAAAAhBAAAACAEAIAAACXDJhQf6kg1oGcPMz3r3dMRYaAi4x1O1PEK6jkufZ6V0DNyCl58M0tvG36K0fwEEEIAQADFfnFI",
    "KLGhKO5PA7RnQx",
    "mIQM83bIbbszUjKKBKvzyR5CPN3mzU+DJMIAYQQAHBhYehl7vzad0NnuTnY3D13pN7XGSan57+0JoGXvRZQUPT5eHOKKe9FAgBCCED",
    "MmfZl7zx1KK46ViXuUeQzr3y9YHM",
    "PKl14xR2JdPSW+fD",
    "F2DPB0rKxtTMoq5T3LV+955R7r6HC",
    "Po+S6Jy8Mi5Q8Z7b+OggsmJNDMffx2XlQzPEtol3zh",
    "mxd44o",
    "09kbg9IIQADBj45ajAODHB7ndfPUr8LKmoXbXhSGZRNW1",
    "vevk1FHBcjfpa18mCpPx6cUThOCRQD770U42E9",
    "5",
    "uA7y+b1X4Sr6xoVe7q1rpu9rXWX44K6d063XpIMBhDwGgUAmDmrbEgYxGfCyMB",
    "3HM56Rz",
    "u353ujgy4UgOCyTxyMI42eyjE1+4czJv0zHiLfYAwCIExsgrqjiRVUxtT5WtdWSwlylNzuT0",
    "JyCctoYFTnIyPEmHtZX0SutqE3LKWHPi0BfVyPdYnUNTek5JRw3T1eHiEDP8+VbIVJnZoJvSO",
    "pVsJ7cGP0LRS3a+NDP96cQtu",
    "HMgR",
    "ZCJx",
    "J4I8TbUXcgkPKQ5JONwtTs4v7O0gvwcT504gxtUKnFRg4yUr7Cfel8lS+AEF4oz8x",
    "vt4rhlWYycN8",
    "zAvVn4qZD",
    "vD5fN+fuqXaI9TmK3aFKoYvyGK9zlH2yTQk6mYCtrG7tba7",
    "+2W6FJwWF8",
    "gt8fa21oojP9uQ9PWuk",
    "JORaeZbE",
    "8+5sDCieLK+MC71kwhoOlA5av3sP7X7lnihyC",
    "JcRdwwxxsOs",
    "DGZ",
    "URkl3q9qaOa",
    "b5rR5sysmXIU9+IU",
    "7WvRn",
    "",
    "fmIIuF3zIqaPzVKNz9NzPn+JirEy8wsRbFT9EmOifDRexbJZ0ZeGYt9l5cQhaXILt2JCmIPQ9t8rsh",
    "Q4ViSId0S0rvnSPPlDAyfYIagu98u69zqR2Qb2y5harrZ3ReyhcI0DV63lTwybe3KlSQH2",
    "aX2dgWKuzCqoh+aHnX3FYZxVsD1b3WsZVkALR9SekPbRf93IKFTTT+Fk89f4OeuYVKkhKpqgC2OAQwUZItWFKZrF82LFTRWI7ohemhqHUUd7qxrlPoDJ65esDugkne+v97",
    "b3OOf7G5W+evlodvuN5OOuX+dunB1NIkGfS8dxlErtgX9t1C01urGpTaNQQbrHdO8ELt86jGdDCC8p",
    "rf+MD8MZDk9tSiO2qTUeBQSsmVvht6zqKYmE5AOJntIO36TcEohNkLzKEzFwSby4",
    "YUEciD86MpEPrmn7Rfll4ydIxc7p3vD8rBki0obC+y9uRUUyAUc+6Riwl2550H0wvl0",
    "entf+kA4x0OlHjmj6ynafYQ",
    "arInVynKm13rf1EYUmLBWKOSWcPiKNVFfK0mt6zp8DuO9Ot4lzXh6ZMH83KkRRTLShKNbeo",
    "fOoet2eSKpncgWLjVxY5PC8Y2teCIo",
    "nTXKR6BPUnZqBvPC+gaPT",
    "tR9F4FPO0Hgn0rK5r5P07k3PFEhiKnjRqbqsrBTOzkvIarl5JHcm+FL2p3+04IR5j7pahgwf7uCxdscHE6JVW1PLIEF+RYxIW6Hkyr5xqbZZeEb09HSNGVGXwMBJdrrZO7XaviFtGTomoLJ64cTx3RlGqU0+XspmbeCyPbYgrxoawGNA35RX3F1E4whqeHB1gJP7cZyW6ueZNGCJnJqVO2K9iqRE5i7ghojf",
    "e2j9F1aI7T",
    "dehlLeHig550vreMMySko5",
    "5YOeepxSNyvrC0huMs5",
    "w5uEtFG0vI9nmE73zROTkiyL3P13YxfucY6d0Rj7O4o+THWdzYVL7iHhYDB",
    "IjQE8TpvrAIrxUoOeB2570iQzWznyKCfMWbUO9J8YNHSS2R0Vqt",
    "m14Fx5iXMXTY0UQw4kRaa3ndMkZ79Z47WP5eVxwcIwpSTI7XT6zBgTIo6M1Rc3GdmemxYzmEPw7ehqk",
    "MkvSMyJ7KK9aa9uxzW+DIwM6RKR84iaoj0U9GL+WdUNNfGh3LCa+qadHN+wbRhYnvsMH",
    "dnO",
    "vW",
    "T97",
    "aLWnvBlMguj6eGjuJzbqJ63jlk4I4STwQ3HzmX9IZw+5yRfCeYYn0CWIQXCVTn9r4xKzvUkEnBBpZsfAT6uvYsZLHmFtmUsmJ5SNv0SPNf3E43onPaCEvTlv",
    "56e8PLxrHSdANgfbTpbkWTsks5obzkVPFIla9cbHLzC8XVo7CN4EaItyE79Z4quniZ6YZTxVGoW7CDeV8gJRekfN9i",
    "A90YUyqsvRvt3J2aL7VyCv7XkRk5RRJDpF5DvKU+d5kV1q12w6quqYy0jZi4V4IISXLmTAkXSJkRjxRHUXMfO3RGpy9thzXUSjvKbxHx9vN",
    "EseSqCfj2wtb5jVhR3",
    "ZHSLF2xYdGkUMVMbdlMzNQceTC98MbZ6j0JqQXir97keUFpu9g4q5TjpqZ4OfasyXJlXCCbBZTwW",
    "7+EyV8zsRwXTnvWc73K+z3iEfVFI5ml8qlJvtpi+bL4hlDucVAd8KDb24h7bxxxvBLbZIJhBBoWbczZc2W1L51PTC0gHLPoLgZWYhSkJFT8tqXiQp3Vr2wDSSGwb7edZI+euuCSbFBQjK5uSAySuPT3y949tt0RtISR3trMTYpEq6YKtPdnO9DyFIZEeSusI9Nn4E6NMhLOPWsTzhlys1w8WFKqbGJLKxnXp01xNtRjJoDCOElxJebkoUeDGjk+VimQFoYN3TQl1uOiSqD6wLFvECqf0UnkpiEzvV1f6xg2d+QNbz0mjFk",
    "uokfMMFsj51L31PeD0aYddemkJoIqSF8dFB3207LhpGlF30EAlXOAAhvCTIK6oQKkg1+yML49gW2X4oS3dC3nnElJeuiWUnzTSOjlTX87YRdaQak4ItraiV64Llq",
    "esfEglN4pnjhrM",
    "6ZkFvMEbWLCUN",
    "+S29JPzt3cMKp9NduPS4cKHQTbtaL192JVc38fVz6aXZ2TLA7j6EKHx",
    "Q3VJzd1FRw2jBtGHyI0B1QpCfKwYLzwvwGj0PyG5mL9w5mW59blAbmqFsOvLq+z322ROua7klXbTrZXdwXuNGLFZpYl2w8qEZehe0NJNcJQ+mFworavxw",
    "15mkfBN1V1qp287lg1Bxu4jN00kQ1DsoQZQd3PeiHXOH9ltqm9FS4ytKmZ59hK9cxYvbvgR+HDZHPEIbNmfieoRQngp0rcDA7KDYlpPlzz2clWJHhvjair",
    "K2xBQ6zbmTJn2Zf0kR0KKPlk+fG24n0CogtU9uGMiehtv2iIn6sIVjFx",
    "mSe1qHUeCCyR26Xs+8pvZzwLzdp",
    "Sqp9SNmawj",
    "HdNzXr",
    "ESn65Cuu2D0VLnuRziUyQMDFDqLlm",
    "GbQ+whQw+ja+FARAvITQngpIp4c9Sz7Xk9f44kHuq1Lec5vl8izAD",
    "5JUkRW6rNRfUn665c8xpfAOVodicFqjZsrIhFNxiFe3rPkFMnr+BDWSS6K41P2DfrPJMkKS3fuFkjbNBtSafl",
    "bomqek5r78ZZGut17agpInGhKi1e0x8dJDY",
    "uenvyuq",
    "m7daVym7Rog3fzdDeT8MsrAHcWl9uEP+0UWiSXrFJIpmoDi4QXnGIwRngdke+L97",
    "bPiw+XX",
    "",
    "WS+ZNGMI+afSw",
    "fuLPRy4WNvMxB6bRZNCeeiCtYECMdPMVvx6+wmKJD23vNK37NJCl1BpdPG3A1lCUVggw7T1hTpidPzyD7Ytnj2C6oXth7QH69bR44f7y0FN7E6",
    "qJiJuD7h1NAgL4oGj75Q6sRkBs4o",
    "ldkEaVoRlere8gzHflETxeVoSFespV5Px1PpsDVkyIo4et3pwtxEukyPecNIbzzDZW+LGM9gyIpT4N5",
    "D+bFk2N5Fv6QOqZ73ef1HufG4LSLuZukmZQXhm",
    "XUWrgs7ipekCvF36dmKlKFnSZvnOMXIzkJxzKijzC0truHeEWkXsFu7j7sDOopqGTnvSKN9unzOSbhs6TNw2htYxBxDCi5DocD",
    "xsFF9J+p6sdOsF",
    "OmqRIX",
    "uty4N3iljkxabllXFPrBkJ",
    "6da8vMq20BIx20EMvFF9IVegSdIrzjntuvKj6AiN7c6CMlSncCawS566kurwSblnwZiE1AKOoe408EcWxplid1Ltz8vIqXW9450YcsIFdFEhb+wi2ymNwe4TY4J6kPOGSp+qb0OnL18ysU8048bZ0STJQt05HxTQtUzx76W0u3W8lINnlRjJSWL4EG9xDN9vfT5tX9w5PNVPvnMMcd91Y49mb9RNBSO63Cnzn1oUJ1YfFLeNSLK8nBA4l6Br9PzwzO2TFN0gZKY8ceN4bZXX0xE+qsQpcMUoF7VYSYS6Fcjyu6YpeibbBWBSKP0lflIdRHsUkvbq",
    "dNFBEQtwBUoVVu6K4BT9P5xz+W68kN7RNeZYrEVU7RckQmi85aC",
    "ejpq3TXnOOlwE1025s+LkyRpfzmKb3rm5MZpzf",
    "KYcpM+WEm57zRgpON2m8xHMfeiRSiqhO19uVR1f",
    "cNkcE69FEaa7RZFplFJqYOk9noJV3G997ryqe+fUdjUMTHfmW49doTfb6YaXVySg24byTe8jQPlwvl7MCczb2tqQC+cL3XfnCvd3eiT4qeDp5O1GVWefeN2D9QbOr5wV4djbWZu+RJnidbvhgZ56rSXxPlLxSl7aw6uM6l5O8X7awT4uRuIjFlnu2SwrRSboRruXL+al",
    "Dl84gyFQAkh+5UyRyRcdwJDt17Ma2LO977gDBWTiWRoUsR52OPXLKvXyE3Lp9iKt9RS",
    "HlAVG",
    "E5PtNJE2cYtbZB02kUX5MjDxWRu6cLrNLvqOMZLt8J+DFvBBCALqoHxc88y1vK17cCgAAfQW6RsGFi3DIdHOwgQoCACCE4NKiVPIeFBOtAACgz4HXKLjgyCuqkF8jTOag",
    "FpEAACARQgucs52njb+yMI4eNMBAGARgksIla31lXGB1XWNvu4Ohl5YCAAAfQW8RgEAAFzSoGsUAAAAhBAAAACAEAIAAAAQQgAAAABCCAAAAEAIAQAAAAghAAAAACEEAAAAIIQAAAAAhBAAAACAEAJwcXG2vPrPr3",
    "7zcZ9en8CXQ4ey6IsooxCVoCLAyy6DS51SkqrNh7IpI2FV4zV",
    "dl",
    "6rstMcXHw3nSmEjes2Fnck1tg+Iw+QDF6et+O5ySWcQ",
    "o0K8r7o81sPV8dzkWGZuMWXRHddWnbMrAgAhBODc4enudEVcCElLf6vv31fvoAsJnXv63c16j4z0",
    "33FY9cM9vMQe3btP",
    "HQv9bJx5AsvbE28c3HrpJVk+y2rzYevOGK0aOHB6NYAYAQAmAqZOW8",
    "Ph15+vqX7xwi9iuqWv477e7E1Lzl",
    "3rhy9euVPIG6vgM0umzJ0aY29nU1ff+PP2JJJV2v",
    "FC86RQ",
    "xku23s8MEQQgCMgzFCcDFAYnDiVD59Gz",
    "sbHl1L0e2ugzBlGgYgWRMfEjA",
    "v7QfHWYeWWkf3zAK6u20vdL985aeMVYUkHapm",
    "aJuOStjfvOW56Qiiqxo85nX+WPt3KnC7D1M2uLvOzyyLTewDFvDcFAWARAqDlpffXf7U9lSwVYWqs+m7XG2sTqS6eMzlamClLX",
    "zmhqlD77lh6swH3vNyttv0zgMihPte+IzMml",
    "f+qMYUlq5ZsuHPx9+87Grqusann5389K5sQ8uniEqNQphwlC",
    "d57V2kaz73uruLL+0Jon9NZ3b32+nUf11ELi7",
    "bU7dNlG2jU4tdIJMgw+nVvOkVD7zGKAOc",
    "+T9Ky9P3zBM",
    "H71+PG3",
    "sieNNIlDUHRXUp374Tc7KVGGotFj85RiQvlP5h2FRpGhCFDgIucFd1w7kTJhV1L2g4vb48z7yVLkPlhh5lJhkZpyQgj664GbpyrS8tUve9dsSqI8p59Umotnx9xw5TjWXb3s2n",
    "i",
    "z78lY",
    "XG2Z3S83EYo0K8RaFQhl169UTPN2cqCAoH3gnHfP8",
    "VcZiTkAsAhB1wzycqHvo+m5Yk",
    "C0Rz63rYvQ+w5kqb+d1TUYKq4qc6iClFYEiRsLD",
    "7jpwSx",
    "+4K5W+o8L8h4f5q6vRpGzxFx9Gp4hmPtkEFCBJo976dOn",
    "fUHVJV2Uqjw6hqo",
    "kmSql+XD6AASAwqTzSY+xpCdUVunNiMqqhvknyT89CmtqtOG8H9fCIODNh5fsZZVkOPJl+iueaQXERMiO6+EvifFBOk1JamxQvIspIjyhCVEHvKknFFHLK+M4snHUOZQWmTLj9JCieVA6EOZTz",
    "",
    "9vY6IwbZQ",
    "9aR4fxtTjDScaMHC+XGgmtotQMFeuGncmKYpULhZoLL36wkQuCdnJB0DFGYg4ALEJgEiMjAszMEsmcYi9KIWxUxTxf38htbWqV0zerGlXTVG0dy8hjg0Do36GU02zHUDXHlSapJn24HqRg2V78YdtRoYh8PGvwhBGBunGj2paCkg1KdiQh6+TzMH",
    "Zp5HMhUeXzKLYUpzfWL2ZKs1tiSnd8gslo",
    "D2BZNoY1l59QMvfkVxPnA0k51TyAShPKGa9y93XUGpFtbhG2t+k+3aHkDZwlbRiHAqBbPCs5X07efprPdgYbJTHMj++2bjPpL",
    "RTNGimSyYtGG7FbDFj",
    "lJJuMJDaUFiqUz1+6nTPwgQ5Zumr",
    "Cb0urJ+vV6vmM0um8IUoh+947lO1W+mpfBElxfFUasLmFn0MK7",
    "6ncPnYpUP4GJ9+t3NY0cOURQrH8OFwncmlRTbr9QQeWjFtxQTSoIR8xQAWISgC0YPD6ZqkaoYNoBY2GgPfZMScPXK",
    "XVc18THhsr2Igsb",
    "Uu1LYdAGknfV06M4APmTxoqgmWV5cBJONsV8Zh6Y0JMqK45SHUcHbx04WSxk2pSNmJkA5SOYRU004yoXXHZcBGsiVD8WQW5u5LURciSWgg1tuDiK+M4B+gSN88bz3Ztd4epqO4WH9IkqtzZytSrKGYdw3LiY3xIj7SfvqndIOsZ5QzlD+Ukm8hcXs8tnSn0hhJFP2ljzS8H9AZbVaPuEfXxaJdnSv5Tt09Xl0Jppd7jObvuuWGqVs+uHMdmtNB+LjK5WCnaIglysSoKhXaKXlzKtMtHBQtLGgBYhKDnUG1CMsYGEFeUf7x2HFkbOw9m0J4UjbCJ",
    "joeyGF7sba+kcSAVITNRA6BFU5jaJqxcFLNyPYiq9fi2TFrNiXRFbma42pRVwm4diMdVYwAXTVlOJ0iDFB1lML95GMc7G27mwPBvq7yT1Hps3Txxrodx+ijODHnzFlDGqaXm579TLGHR7kMHb",
    "io01iIK3d8tY3kio3KbilIqCc4fItKVXPC2SjSmH5aX6u4790uW7maDqdrPD5J3Ip8KjQQXQPGBof5ewiaZcNO4rDh39ZmJlbbKaZWKJbZOI+oSQIA1dxDBvNip0RQd5mZqmiyQIAhBD0kMmjw6imO3wiN25ECAsbVUbvfb+Xdj59zzySQ0X1yv4dKSfP1NY1sPFHske1GAsn",
    "SX0kqB6k75",
    "O5T1dIcVOH1CVFVtAx1PwqnSiBa36xUY6if0clfvkYfW+hy+hAKFIPWMZ5ZM0Qq2ynZ4mL",
    "xPr2xwwd3NwK67QBWi6Ppud3SbK25PMTv0evHv7E2kYqMrT32WzEScxcHO92OB74lMvOKFenqcfMFAAgh6DOiOlxaYiMDzDp6NckUo1rv4LEs0jChZ8yoqMGkdkfScs8UV7CwUZ1IVh3tJOuBK0rZGiCjhypx9QTw7ancxcrNfxJOdtUhJTYUt+rahgshi8jEeXTx5XpF4mx5NVk5gYM8TPFdND5sGRLgxYadOIw2xPbGxa",
    "1LPKch7KZ211uXzDphivHUcOFWks",
    "7kqlckzKKBRzH7uFo0bw8ktgw4FzB8YIQdd4uDqy597Kr35nYRMm4H+",
    "3V1cWU9KJtfyY0cOMdM4lwphM+sYC3xjzW+slHL408aqdY5nyLHK8sAkSSx7qLISK+CuMD5AJiHppF6Top",
    "wdHei75NnyuQpgOJjphnWuunZzz78Zqd8Fts93SXI35Mtv57NhgzwcdF7afZ1YjOXB2gV4fNP",
    "ksXHpukG4DM",
    "QcXz",
    "jhX3fT",
    "UB3i8J3l6EGAX0fTFf2sq76btefX",
    "9WREN2JJZzjJMAAIQQnA+LR+O0KTvFCCcaoWSycNJh",
    "JdwimHh5J2slAJ2N2VfCVZZFk6SWPbG1LumJVWpHAF5lkJdfeOaTUlCJs9ZK4Giqlinm8SDPWUcVGoTh2eMCHiotbsLudG1eKrAio82Kf4y5JUjm1ZcBK9",
    "tlM+mAxxynkxCsvtlfe",
    "6jT5gX",
    "yXwoomSTzS",
    "",
    "vC6GdpIicruo6PcY6",
    "cvZJcskleAbaxO5a5eiwY7EYg0BTt3",
    "ftpvpjPACQCEEJxDIexw2hTCJteMCmGTDxMnsnCa6ThKmGn8EnnSGx0gBpZElTdzXLg4cvZ9b43q6ACkKvWP16q9DR9aoX5ZBFWmVHU+vmItW6g9G+7qGdwp+vfVO2566iOq3ykaZN",
    "MfOA9nsE2dexQShfF6r4XPtuwM5kO4BUG6K+rLo",
    "t7rWW3TmbnTwpEAqKU03Jv+ax",
    "5p1zGJkuB+VTCu11GnaClQE7FJLucQ76cQ",
    "r1xPfz1+S7vn7c3zxnMn9kvvr2dPVJ5fQTvZFVZXm59ZMoXCfObNHyl1dDylndoidDwlnI8hU49KTbRX7r4unr7",
    "78NfudTorOff",
    "cVM6jDnyFDE5GLluY9YLg70BxgjBCbB7XT1xHZpGgOP5PGMQMXxPPtQ4e3Jw4p6ZwSyW6lsc7Bw0hXHRWtVVqxdwiy8Ymx1bQMZEyRCWs0e6mfEzbKfMufNx6566F",
    "rKAliOWy1H",
    "8Vo1mwn1s6k+p9Ej",
    "heEn",
    "ylMUumUUfvjcTS9+sFETWqep4kvnxsozSaJCB1HR8FR0M80qphRPypmKFWvV52p2tgv59eOFh616qdUH55EIkfixWxPH9s1l1xmK7dypMe99v1dOnZnG68fQmCiVLDvXyKVGCi3mQlBkCksqdYv19WXX40kE",
    "YF5W1sbcgGYAtkfhWcrZW8OXu6ZLA+97XRqziveInQ6",
    "+ze5FPTxkfpVqn8F2me4jULiivy2iKKBcb4XGEGKSJDp3i7O8s7FdHu1k85BEVsz5ZX7ztyil+lRMeTDslKQKds35fK",
    "zqobBUTww0lzQhkJ",
    "F8A0YRGd3DeIVu3XP1nqiILdl2clo4w+UA6fgDRzPFLIUR4QFyA4gvJx",
    "fZamZdbypird1X0fVZbEaua8AgBACAAAAWjBGCAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAADCAFbIAAOM0NbfuOJJ3ML34ZH5FbX2ztZVFgKdjTKhn",
    "DA",
    "X3cV8geAgY55W1sbcgEAQySkFHy8MaW0ql7vv",
    "Mnhtw2cyhyCQAIIQAXJ19tT",
    "96R4b46aSycVZZNzS1llTUiZ3Dg9yfvXWcpYU5sgsACCEAFxXbk",
    "NW",
    "pDM2xH+rvPjh4wK87SxsqSfmQWVG",
    "fnbDl0mv+NDvEgLUSOAQAhBKAb",
    "H1N8s60sgevCLk6PlDvARm5FQ",
    "89zBtbPzb1HMfvbKqhnve2MrbV44NunPOMN1jDqYXv",
    "TFft6+e+7w2XGBvbxo9W8bqn",
    "7xcrHz",
    "3Ohy3sMfrYc1ZvTj2RWxYzxPOGqeFiZ0VNw2db086crQn0drp1ZqS9DTwkQDu4FQDQw1c70nljRLCHXhUkRod7PbYw9l",
    "fqNX6k19TZ4wa3JsO0oaM1LPvvabeSDtubmnlce+TKIWe8evB0z8lZNJGWm65n7vD5JGDeP",
    "KH44cPllMG6mnyxqaWh68Jhp5BRhMnwCm8tPuHPqUVjZcCondc7yANx6YP9LIYfHD",
    "MIGudBGfWPLyTMVvbliY6Z2MLIxKwP3W49JyysX2zlFVWK7sKxWbOeX1iCjAIQQdJuVGzPpU1pZf9GntKKmoaa+iTaGDnbzdLE3fvDlsQG8sT05r6m5teePop2ddhv9or1A7vO0k7bvmTfcx02dsf6eDnddORwZBQToGgVASxvZEIVVvyXl8s+YIZ5dnuLVoZSbDuQkpBRQJevn4TDE14VENMjHqTsXh99p32Burn97RLDHygentiGjAYRwQFNa2XAo42xtfTNtB",
    "k4RId6yP9m5Kq75sICXBKOFRVXqO022Q8l+eTZ7MIaTcVtFxPmbm9rZXrgecU1dQ3NvJ1dpA7E3dnO3dlWHED",
    "JmWU8kV1IyYCOZh+ljZUdlbxw71NT7WhwGk",
    "hclJViSEzVbFfiO0tLbtOV5w6GRxSjZdSDs1wsqy6y4TS+mYytrGypzGlJyyrWZqKR3s5Tg+yvfKsUHOKptu1uXqMFtKiyt",
    "+b4pN6utudnKy8c+Zqxq",
    "GTdY2sTdtQeTLAJGuI873p1HNatbcw5pRp7GX3kw1qrKqp3bmnMTGspLzO3sLT08LQbOtJh8sxOWkG5mrSv5vffrL39XK6",
    "rdPp1VVln3",
    "QWlPtMGGqasIU+a+m01mV6762cHB0XXy3uaX2vqpN3Fl",
    "5GBLRRldwsrT2zYqWjUmXnE5EXj1tg2NJ9NaqirMbW2tffzpErYReoZmKW4UQ9sh4U5zFqgT++OXjbnZdLBq9ART8vX3Y",
    "k5RVVhg1zGRvrI+7",
    "YllZSUT89NmBYkDv93JaUdyijuKqu0UllMzzI3ZAbVHl1w5ZDuZkFFbUNzY721uH+rvPGB1uYm1fVNn72WxrdVDdPi3BzskXFBSEEfcYXW099vP20vGdyhNsT1w8TksY+lrRzZ1qZWqtUViyEJBjLP0k+fFo7WEJ",
    "vXpnrL+Xg9hD2vn8Vyly4LGDnf50w3BWu483neQwiVd+UHuRyN6epEZPfnS4tLZZPnf5bdGy1v60O2flxkxtBDZnuqisTUz4nW8kyoHfMN5v6dwIFjxO8oolI2Tp3bQ",
    "jzKK0vj5ny7rMvCzlfXrErN2H8vXO2W+tqG5yxBcHdpFjqo8Bzvr3OJq8dfp4urTxRnrE7KunxI2f2JINx5Lb9",
    "6o4eKVjzb1qAdka3e+ovdiFGeD",
    "",
    "F0tlV7GxIO178xgtqhTAzs40Y3lJSVPbpe+qfOzb7",
    "fM9Ukc+rOK7z0gzWutq5atQgOVrP3G98Q8Ol00Xklb00l9428LZxWn2fHFw0ct",
    "achIZd31feE",
    "tuFR7TZ0U1P+sw+31atbD22tbe5",
    "uF8tbHW1xSuerT+e3ClVP39r5enjsnCx4+VXdorGlvVla",
    "7bWqsdtKOwKn",
    "+xnHqbI",
    "7lslHUoAlb77IqaPENuWdLvvsA",
    "456NX",
    "WgcEG8",
    "VXUfP",
    "Pu7JN5+9tZx0SHt98yX29O",
    "2XnSjCfMPDh17c4MEkJxFt0b1Ej66y1jFK2iDfuzP",
    "31RENTi9hDh206kPPwtTHf7z61N7VQ3TbNK3",
    "93smouyCEoG",
    "YcvAMq+DcGK954",
    "xTcipIV0ic",
    "LacYlUQ0E4+RugQqyAJw12zQhxsrf63NSuzpI6k66NHx",
    "MxZEqyCpKIzp",
    "gT4bjZztP0ylv",
    "3TimcVqz7qZsb4xIa6sZKRD3q52UYEuwvxiFSTxWzAxgOw2Pve1tcf5XA6fz+Xwj2dXUFpkbevCDq5tpotOjfZZvzfv56TirxLzKQIkwyTkIZ72lBYKUBbCbcdK1HEe6dVlyOsSMqnlLg",
    "sUWUXFehGepaYWtimnlrU9eQiIZYjgj2oEiworc0sqMw4U550qiS7UN34qGts",
    "uTX1PzSmj",
    "OG2GqEZx8oHrbRt39pI4Ff3lg0BurzK2sxB6tqL+zorm4QGuonclhISx586Wa37fqvVBzUT7921J21vmqRXyK+Ktq4w9CCJtLClkFxV9CCOuTD7AKqk",
    "Pbvfx0aOCHeGcfe91u+GxVt5+7Tb0j1+ymOlSvX0TJcfnude0yT9yQGyXrHyZIq9NbP6ZLoWQjDyxfTz7rBDCg+lFYv+fPtjNw8MyR7POfrjhuFx8Ww",
    "nfvjLcd1LUOn",
    "5aM9cksIdReEEPQZH2zOZBV85Lph3OmnsrMi44xU4ZYZQ2TbSxwjTD22BV9YPIK7CiMGuzzwzn5Sl93HimaMVnuWk8CwGcfSRaLi5WJH0kiaSjpHRuEETU8mixkJktzl+N2ubAqKVFaYgEE+DstWH6VzyVJko5PDJ9HShu9qx5alKQjr8xH1dY+TFpLW8p6xoa4khKR8N00fIoSZ9qj",
    "ivQwHiwZB2QiiJ9x4d4Th",
    "lGD",
    "F0c7QlMzEhpYDb+O5OdhOifGmnbgipp8sohF1H26vjU",
    "mV9O3rrqIPBXWbxn3",
    "p4RMDurXg6dHhXmN69wjZ7CrtrSEN8gENLexJQEgw6tDS4pI8Dwferq9D9XGVlI+bYeBtX+g",
    "YjRtEEyI6ugua2dbWhEa31946k0sbPs0",
    "et",
    "YPsR42zjxlrbm3T1tSoDi0vp7kgz8rXX2MF7uykx8n7te2AA7vFtn1cvJlmHohQQbth0arxU8hArNu",
    "W0ipuVV7Z0Bj9ilZBSmxdDwlkExVYQJWfLvG5brFIvL6ExsYQid2mauy44ydtXZbZavtnGAVVNlaNTa3NrdoW0hUfEtmDWU3HLo93vnpiBxyRIBroLdTaVX9wfTizle0RN0FIQR9A1lUbD",
    "dNjNU7CQNI3Wk",
    "aQ3sjJdHtOpqk08UcLqKI4hYSNriRR0T0oJC2FVnTrwScO0jiEa5UvR6Eq9PBaoy69H1E8+2ZpCjEnn2FA7mH6WhZCki77",
    "MD1YjvzXv+eyYnXJzLhBYvv6yUEUGqWa8oRSRGpHCaFwWLA1rf6zfGS40QHCX",
    "ZlCxW8bLjf",
    "IkhQ",
    "y0x1fVtatOYVntRxuOr96cStWcn7vKx01laWFOJiCZd3klNbI7PjEtxl9xFaofn7h+1I7kvDc1K9T8nJhlohASlm4eXk8stw1TL2TaUl5a8tY",
    "648cbK+sf9",
    "qevOdVp6aoHRmLpK95TTravVoorm5epTxxy",
    "FX2ThuS5aYuGkTmnjyRMUppCTs++",
    "HvDOF+Z29qqxl9Xs",
    "q1d5A4mOM9dyFfspNOVFaRqHLe6g4liv8OUmQoj1eW6W0ne1BvX3lyfcqQ+aZ",
    "9qPGW7u13WumH",
    "9Yeee3Nrjfd2a5ME6YWvfwXs1a1DpV",
    "vcp57nUUMY0S6iR2ZJzTzLmktaZkqYV0uiGHGltry4cXxESHeNY3Nn+xLV0sHqTp56wYqTEiN+zLlsN8bGEsNZX458n8ihVfHTzb4VltDr+cAQKmTwwASirUA0VkdSk06ZqxfpMj3BRuL6rOPxPSyzS9dq7yTm9XO",
    "knGWob",
    "zbV0AovRiANZoUeOriT6gS428kq3q4Kho8xjpxAMa7JHZIkupQtsv4dzSpn4df1BpL5fGsa13pPLhr96HWxsgoSgd6O98wb4efRfi2yDE7lV",
    "x+LP",
    "bXSe",
    "3pGxPjGLGv6yClI9uOKeSdfGD9F7rYaOrldrq27YBz5Pv8RKoxZFV3efv",
    "7T0l3b2SvLT6e8Gj3B59kVamcWTe1e+cv3sma43",
    "kQqyBhExrp+",
    "c3hY3VUnaWBcxx1tXaqxxIMNN42TRmKs33un2",
    "q5OWnkIiLYw",
    "HryU536UrHy5cv1aMvLUB0SNJKmzjWyft9BcXNiQ1t67aDMkQqigOhXRca7X3dr+o62t7vA+vYlVjZvk89eXTVRBE7l6Qgg1VsiSc3W0vfeqES4OnTzCeONEbpnYefP0CKGCRKifC+kiqixYhKDvYYfJ4QFKX3zRH2gEFqpNBwvI",
    "hM7c0v1OIbIXqMmIqqGjzedlPcfy63SPdi4ZWk67A2UXVjD44IK65atz",
    "GRXUx7qGtUx9zK0mL8UB+9psOs0YPpcyC96HBGyeFTxQWltYpjrK0swv1dx0R4j43wMfQyJhLLT7ec4K5RdcMl3lR",
    "GZvgMOtA5cGOU2ZWfP95u4oU5OmeZW5j6",
    "XoM536MCXjzPmqhcpkqhwozKrN69oFOyNV3TkZNdLCybm1St3N23DiKKtd+",
    "FOzubWtmRlqhsihxJdb15ad0A7HqZ2QG2356aUfryyXV",
    "LS8s+ea",
    "s0",
    "ftY8c6xE93mDxDHC",
    "3zZpbWFDS2ho6bksLi6YcrWtVY26WykypdiThXo880+fPWuRgN",
    "lnqJ",
    "zwY6RRYsO47u8ulEcQKWvDCFAPcasO9AIIITgPCO7jOpF1yW1Wwif0nMP945SBEiV0w1Yn7qMCvM6lFFMtdVdr29ZPD1ySrS",
    "3tXR4sK96cOSVlbdUFnT2NDU4mBv7eJg4+Vib2hSBB2TdLJkT0r+70fzhbPN",
    "IkhI4I9TH0sfQbp2emlrXNbqvSsYkMWpDxkqLam6qWpIO56vIes",
    "YPEdmtNdYelNbl6y3r16c3NzQVnxJI3qrGXOU6ZXbD8MdomoSJFbMprd64xt7Z2mNQuhJYubh73Pnn23VeleLTVHdpLn6rNP3o+",
    "FcrT3WWqqdViBzLSJWdcZSaZ6mnmrIjy9Ky",
    "0fg9HVtWljIKdPjTtWKBZwhhOAC5K27Y41Mqvtpdw6rIBlbM2N9PV3UlSnPTDCR87IuNiP8RUkF951Qd5DGDnbq0vq8",
    "+qRD7+1g+zCiprGt3868sW29LhwrzERPkE+Th7OevpsfdxUvCiJISicwvLajLxyksD0MxVVtVqjgezO22cPnTMmyPREtVZX6tlZp1U1Czs9691Y+erIpzT8pZg70b5TUkpz63Zdd7hsOgshUbbm",
    "ebiwnahDY20Har1nDz74ZtNHUvB2Y+eQFqoNV6nXWHtH1jxzad1yft5qK9d8NKOFz7",
    "qP+bn6rNK9tOK+mQ6La1dO6NIDmxsLAJGuJ4+Rw9ifUL6I",
    "bqbW1rfNPPce4OdrllbRP9th6OHfJrE4vpNybWljX0Iw6B0II+hgvF3WVodufyfPc",
    "b0cjI+HmXU1H+6zne0TM2R3025B0egyDn0F54PKrpOj7M9JxaSC+06qBwhnj",
    "btMhBXR9vX7p307k9HkjPV2llaVb",
    "54Gn6mJubB2iWhvFwsqNj3BxtXRxsbW0srSzNNeaBeUtrW1NLa3VdY1VtE51VWdtYXt1QVF535myN7GTIOKlspkb7zx0X5NXVOm1KmzIjpa2pSZYWdSEmbBfblp56enSFkmkNvoAg4Q5TvW2D7hT12kStO6j14Hap1oz2ubRUqo3OWs1YYPv+mLFmGmec+mPqRlKnftFJM5TmaXiU95",
    "",
    "0Xy2uP7IQbIFaxN38H7aU",
    "P7VofJM60HDZYtYL8X32qpLBfKY26vMr7OnCJzziUjQzyOZrWPSf+UkOnubDc7bjC",
    "nyshpeCtH5NRZUEIQd",
    "DJlpmSZ1Cb",
    "7zw4nDp6uMW3s8oqaYaaeAxxHnjfPvbsTEdckaMxS+e4eBxX6eYj+7qvZAcdnXNMhbuxrA+EhPEsJfjxTr9dwx3Lywf",
    "bWcVRz",
    "XrwdNKpEtHTpZkF36vpXypbq+HBHqPDvCaPHGRr3ZPuu7aGhuJXn",
    "d++kWtxfntGrnzkNRIrzmjVOJZV9Xu3dUuhJr5+A7xl4t",
    "y79epfWCsbCQF2dxmDZHdjfVyGQwd2mqxsazEGo1ycbWfvR48ZP+rT+WZDci1m5YjJWHF1mH9Kk7vLfo5b",
    "yAY05mVR4NiHhFioHnkffmJXRcCpNOAe1l",
    "WhRApZf0oNGWvnhCvGBH7xW5qwHFdtSvn+95N+7g5l1Q0KR2IAIQR9Btl87iorquV",
    "PXBGXs+FR",
    "6Mm2IxIa4khD",
    "sy7",
    "mskBxJMmJHJSu1bjl4Bk9kqaJQ0lFQ1iAUmh",
    "TMhTLMl2uqiGZx+6O9vybIrtyYVCCEkUuxy2FMgKuvtYkUJf1WkMcxdyTteSV8zpkglRvvQpLq87ll2adKo4u7CKzDt5uRCTNNXVngTPx1UV7u8aFeQW7OOs6ol93KlTri5p35knljpOv5LEoG7",
    "7rok7dQ9sqUUmmEIu5FxJGBNp7P4Z8l",
    "Xqzdvc0uZoxZS3NNws6GVO1kONfrb5P7Kh3ipymEUL06mgb1ZMH",
    "vd3pr7HxYhivuaSo8IVlGuX+1H7UeJJAm6BQM2vrxlNav1Nrf",
    "WNZ25l5XrzXWIGRcEzD7kuup1OMbOybMzMqPrl28YstQeWxx+f0Ns12pPmhVnfDN052Fn",
    "6aa4l7",
    "Qzu6vqGmkD297ONtZWVqwImKwEEII+gwSsGvG+n28",
    "fTKjZkqO6sZoweRNrz63QkzzXiY8Xp",
    "Ztygz3aql3FZ",
    "kny3XNCSVGST55d81s26ZCXix1rFQsV7QzwcjTrWKJMN6jhAU6keb8eLogY7MJdsrTzpqlBtJM+",
    "",
    "72+G0zQ+1tLZMySv+9Lp2u+PkTLjxWNy",
    "Ol2L+VWJ+sK8jR",
    "7ZNUdNTz4d",
    "MhV4RTVhGNFvLAAqa88Ckj5w72jtD1tuGcPcpiUbJqrP08ErKpryi+tKa2sr6lvcnGwrW9sTs+rqGtsbmpusSSzydbKSeMjY2djSRWis8rG38PB0tLC29W+l6Xc1qh8v1VTXk7ZJ+",
    "p6SGQvCVldxh5wE",
    "g8",
    "SLZ564SwwQ1u7fTR",
    "lDRY7zkVMV9BgExxm6e4p5vVr1G5Se5Xh5WMdENyUm6W1O2dfo1fOyaSjjzJC5uZixVS1wbpnW",
    "3xJGGh0kdxeHPhGf2Jbag30m2gNU8btW0auX1TL23Lxzc2d2oDNTRJf0mnxIV7",
    "+nGuNW",
    "puaf7fQ6p",
    "hhfvdePUIsLmNhjnmEEELQd5A9d+hUOanXKz+kizVZyER7+JrILkX01Ttjn",
    "zoMJ0r+7",
    "QuYM7ehfvnxu6bPVROuDm1xJ4D+lrRZ26EzIlR2uNTYzyZM3bqTmMHWTo37",
    "dEPX8VymkQyxFIgQSRd4m03PX8RLdyJuyyhofplkBLkXsuf9qZaq5d5Q2xkR49DKrneytnfxdzTT9xGl55TbWlndcEWXk+NWbUxNTC5bMitI7E6Mbj6Kvtmva4bLLLZxcqjZ8rxQRSyvPR",
    "4qVhDVWIdas97KQ49fqKW7l99Lbxe9",
    "jd5QkIn+2bSDM8H",
    "6y7n4zRirWftAfi7GIzJFxSvqtLP3qzva53cBRTA9Vx8PTxevz5sk",
    "eFS42yjbHY8",
    "Jg38+z71a",
    "PrfRP+t8u6NjnO59mb9iXU3uITeIA9t09DTRWvmyu5O3tKorberKqPjXZIKVykne+2wq3dnb6kxEd70+f1YflpuObWTqFU0MkTdH05",
    "ifVmz9nAOegllsuXL0cuXPhYW1nMGu0X7q1SWZn7utgGedjPH+P32HVRcg+hq63FuDC3yMGuisfP2cFmerSPs425k60lnUifmyYNfnB+pDjXx101MdzNrKWFQ6Z",
    "b5s5xM",
    "FdkSAU1SgizhsiJ8TXcLW0pyOmRDmNjq8XXICvB3odEdrc3cHa",
    "qLzrp1atAdc8IoziIOk4Z7BbrbWbS18QGPzo+IDnJRhK+DuZ+zNcV8UXyACHzGCK8",
    "3TDc2UHpFZJbXLPtWAlp5D1zw",
    "sqz49mnX1uVeKO5DyVnXVEgCubFP",
    "4bP+nW054udgP1ljPZD6u+OpgTX3z",
    "rSihZNDeyWE3r7mVtakHzZDIrweeUYVN8HS1b21tra1qsLc3NzaL8Ahfprnw39VOLxYBwS11lS3VlfaDY91u",
    "UevS4kFo7OTrOutnLzpCJuralqa2zky9mPnuC+5F5eZVQXXtW6ueiMlZcvqZessrbBYeoF2Ogvkj36y7PTu0Ss",
    "QOdrphv5e1nbmXV1tTU1lBnbmFBP1VxEz3++DgvNNNJiSdOU3efmrVRQtjms3R2tRsR63rD7W633CXWY1PbqUFDWisrKAl2I0e73bxU",
    "ksm3N+1qLyWbL7LhvstnBwmzLIwf5fiCnW",
    "d",
    "ww3+smh5p37B8a6JZZUGlhYX5N",
    "BA6RQ4qwt81u6jK0sLi2vghZO3Jf50urnZxsAn0dhoV5jU20ic21NPPXS3Ar609lFvSLoThAa5To",
    "1RfV34mLehFxsMfD78Oe2rxHzxYoo+YdXm1HUJaivq1hmR12hWjTmWXbp8tbqvj9r+z906jvsBn3xvF78G",
    "aWl8fy2+r6ltbqqrbVFfuNEb2hrqG8+W0wSQkJoyvEtleWGLt1SWUGWoikhsLaZkNTW5uKCttZW0tfz6BTaJXUNzS9+vj",
    "1dFmIrzMZhREBbm6OtlSR5pfWbj2ce",
    "iktl",
    "k0etiFcoKLkxguYMBj9r3R7PkaZcLbXeLrIL2yXzi3XU2HTau8AU117jbsBAmphb0hxBaODr1YWjmtnbyvIWuu4wMC5gpKmiqBLYn1ULvSgIXGqcKKkkFaYPsyMyCSkOHBfs4QQUHClhrFAx4Pttyit+AYWSKSHepbWjmyo4a+2LRUeEL2tyi7UeJH9ZuWoml1MDFTZC3U5ctnuFB7i",
    "8YSLyChYhAP2O",
    "L7fR64K78OQU3JKeYL80EA34fln02EINkm+hf6ejkE+TtmFVQWltSfzK0L9XFAuFzeO9tYvLY3",
    "",
    "Vh+0qmSk2cqyqobauubWtvM7KwtXRxtBns5TYjynTJyEDIKQgjAucDLxW5yhHqV5JmxvjwVpK",
    "IyOtYttRf27NHNZ2VpQUJpGKi4cQoP34H7+5j+RDCS4TLhvtxz2dTc2s1CWFrm72tlQpuohBCAM4xJH59q38CsYbW0EB3M8kitLW21BXC8UN9vtimfpfCziNnbp0RaY7ZY5cS1lYWet",
    "bDAYQGCMEQAlJHQ8QEkE+Wl8VGysLdpNRCGGAlyPPUauqa4ITNgCwCAEY+M1DC",
    "PIALcTuWVXjQ+2ttQ2FsnUE0LY0tomv7npuVvH7UjOix7iicVEAIAQAjDwhdDc",
    "G+3jz9dVBXs66z4y8ZarYv1jS31msVExH5vV",
    "vrp4Qh6wAYkI88sgAAXcja01VBs461K9kiRC4BACEE4JLjijGBZAheNtzP0d4auQHAxQGWWAMAAACLEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAAAACCEAAAAAIQQAAAAghAAAAACEEAAAAIAQAgAAABBCAAAAAEIIAAAAQAgBAACAC5H",
    "F2AAEKrNsr8vLb4AAAAASUVORK5CYII="
    ];

    let result= await fetch("http://151.80.61.1:8888/card", {
      method: "POST",
      body: JSON.stringify(list),
      headers: {
        'Accept': 'application/json, text/plain, ',
        'Content-Type': 'application/json'
      }
    }).catch(error => {
      alert("Upload failed!");
    });
    let json= await result.json();
    if(json){
      alert(JSON.stringify(json) ) ;  
    }


}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);
export default App = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [type, setTypeCamera] = useState(RNCamera.Constants.Type.back);

  submitPicture = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Access Storage',
          message: 'Access Storage for the pictures',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // await CameraRoll.saveToCameraRoll(imageUri);
      } else {
        console.log('Permissao de camera negada.');
      }
    } catch (err) {
      console.warn(err);
    }
    console.log(imageUri);


    card(imageUri);
  };

  takePicture = async () => {
    try {
      if (this.camera) {
        const options = {
          quality: 0.5,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true,
        };

        const {uri} = await this.camera.takePictureAsync(options);
        setImageUri(uri);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  changeTypeCamera = () => {
    if (type === RNCamera.Constants.Type.back) {
      setTypeCamera(RNCamera.Constants.Type.front);
    } else {
      setTypeCamera(RNCamera.Constants.Type.back);
    }
  };

  return imageUri ? (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={{uri: imageUri}}>
      <Button title="Press me" onPress={() => submitPicture()} />
      <TouchableOpacity onPress={() => setImageUri(null)}>
        <Text style={{textAlign: 'center'}}>X</Text>
      </TouchableOpacity>
    </ImageBackground>
  ) : (
    <RNCamera
      ref={(camera) => {
        this.camera = camera;
      }}
      style={{height:700, width: 400}}

      type={type}
      autoFocus={RNCamera.Constants.AutoFocus.on}
      flashMode={RNCamera.Constants.FlashMode.off}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}>
      <SafeAreaView>
        <View style={styles.header} />
      </SafeAreaView>
      <SafeAreaView>
        <View style={styles.footer}>
          {/* <Icon
            name="times"
            size={25}
            color="#fff"
            onPress={() => navigation.goBack()}
          /> */}
          <TouchableOpacity onPress={takePicture}>
            <View style={styles.snapButton}>
              <View style={styles.innerSnapButton}>
                <Icon name="camera" size={50} color="white" />
              </View>
            </View>
          </TouchableOpacity>
         {/*  <Icon
            name="undo"
            size={25}
            color="#fff"
            onPress={() => changeTypeCamera()}
          /> */}
        </View>
      </SafeAreaView>
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
