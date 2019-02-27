
//Tableau de 10 valeurs (Température et Humidité)
var Temperature = new Array(10);
var Humidite = new Array(10);
var Luminosite = new Array(10);
var Fertilite = new Array(10);

var inter = 5000
var y_Humi=0;
var z_Temp=0;
var z_Lumi;
var z_Fert;

function ShiftTab(t){
    for (i = 0; i < 9; i++) {
        t[i]=t[i+1];  
    }
}

function GetTime(){
    
    var d = new Date();
    var t = d.getTime()/inter;
    var tamp = parseInt(t);
    tamp = t - tamp;
    tamp = tamp.toPrecision(3);
    t = t -tamp;
    t = t * inter;

    return t;
}

function InitTab(){
    for (i = 0; i < 10; i++) {
        Temperature[i]=Math.round(Math.random() * 45);
    }
    for (i = 0; i < 10; i++) {
        Humidite[i]=Math.round(Math.random() * 100);
    }
    for (i = 0; i < 10; i++) {
        Luminosite[i]=Math.round(Math.random() * 55);
    }
    for (i = 0; i < 10; i++) {
        Fertilite[i]=Math.round(Math.random() * 90);
    }
}

function dataserie(car){
    var data = [],
    time = GetTime(),
    i;

    if(car == 'T') {
        ShiftTab(Temperature);
        for (i = -9; i <= 0; i += 1) {
            data.push([time + i * inter,Temperature[i+9]]);
        }
        document.getElementById("temp").innerHTML = Temperature[9] + '°C ';
    }
    if(car == 'H') {
        ShiftTab(Humidite);
        for (i = -9; i <= 0; i += 1) {
            data.push([time + i * inter,Humidite[i+9]]);
        }
        document.getElementById("humi").innerHTML = Humidite[9] + '%';
    }
    if(car == 'L') {
        ShiftTab(Luminosite);
        for (i = -9; i <= 0; i += 1) {
            data.push([time + i * inter,Luminosite[i+9]]);
        }
        document.getElementById("lumi").innerHTML = Luminosite[9] + 'lm';
    }
    if(car == 'F') {
        ShiftTab(Fertilite);
        for (i = -9; i <= 0; i += 1) {
            data.push([time + i * inter,Fertilite[i+9]]);
        }
        document.getElementById("fert").innerHTML = Fertilite[9] + '%';
    }
    return data;
}

//InitTab();

$(function(){ //attention blocage CORS donc ajout d'extention "Allow-Control-Allow-Origin: *" à chrome
    $.get('/dbIndex/init_Graphique', {},function(row){// init tab
        var j = 0;
        for (i=9; i>=0 ;i--){
            Temperature[i] = row[i].Temperature;
            Humidite[i] = row[i].Humidite;
            Luminosite[i] = row[i].Luminosite;
            Fertilite[i] = row[i].Fertilite;
            j++;
        }

        $(function () {/////////////////////////////////// graphique Temperature et Humidite
            /////////// graph 1 /////////////////////
            var myChart = Highcharts.chart('container', {
                chart: {
                    backgroundColor: '#313031',
                    type: 'spline',
                    marginRight: 85,
                    events: {
                    load: function () {
                        
                        var series = this.series[0];
                        var series1 = this.series[1];
                        setInterval(function () {
                                        ShiftTab(Temperature);
                                        ShiftTab(Humidite);
                                        $(function(){
                                            $.get('/dbIndex/refresh_Graphique', {},function(row){
                                                z_Temp = row[0].Temperature;
                                                y_Humi = row[0].Humidite;
                                                var x =GetTime(); // current time
                                                Temperature[9] = z_Temp;
                                                Humidite[9] = y_Humi;
                                                series.addPoint([x, z_Temp], false, true);
                                                series1.addPoint([x, y_Humi], true, true);
                                                document.getElementById("temp").innerHTML = z_Temp + '°C';
                                                document.getElementById("humi").innerHTML = y_Humi + '%';
                                            });
                                        });
                                    }, inter);
                        }
                    }
                    
                },

                time: {
                    useUTC: false
                },

        /////////----Legend----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                legend: {
                    itemStyle: {                // couleur et format du texte des legendes //
                        color: '#e0e0e3',
                        fontWeight: 'bold'
                    },
                    itemHoverStyle: {
                        color: '#b8b8b8'
                    }
                },
                
        /////////----Titre Graphique----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                title: {
                    text: 'Stat Info Jardin Connecté',
                    align: 'center',
                    style: {
                        color: '#e0e0e3',
                        fontWeight: 'bold'
                    }
                },

        /////////----Exporter Graphique----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                exporting: {
                    enabled: false  //enlève l'option pour exporter le graphique en format pdf, png ...
                },

        /////////----Axe des abscisse----//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 10,
                    labels: {
                        format: '{value:%H:%M:%S}',
                    }
                },

                tooltip: {
                    xDateFormat: '%d/%m/%Y <br> %H:%M:%S',
                    style: {
                        color: '#e0e0e3',  
                    },
                    borderColor: '#b8b8b8',
                    backgroundColor: '#313031',
                    shared : true
                },

        /////////----Axe des ordonné----///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                yAxis: [
                //----Axe des ordonné N°1----//
                            {
                                lineColor: '#ff0000',
                                lineWidth: 3,
                                labels: {
                                    style: {
                                        color: '#ff0000',
                                    },
                                    format : '{value} °C'
                                },
                            title: {
                                text: 'Température',
                    
                                style: {
                                    color: '#ff0000',
                                    fontWeight : 'bold'
                                }
                            }
                            },
                
                //----Axe des ordonné N°2  03b9ff----//
                            {
                                opposite: true,
                                lineColor: '#038197',
                                lineWidth: 3,
                                labels: {
                                    style: {
                                        color: '#038197',    
                                    },
                                    format : '{value} %'
                                },
                                title: {
                                    text: 'Humidité',
                    
                                style: {
                                    color: '#038197',
                                    fontWeight : 'bold'
                                }
                                }
                            }
                ],

        /////////----Séies----/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                series: [

                //----Séies N°1----//
                {
                    name: 'Température',
                    yAxis: 0,
                    data: dataserie('T'),
                    shadow: {
                        width: 5,
                        opacity: 0.2,
                        color: '#ff0000'
                    },
                    color: '#ff0000',
                    tooltip:{
                        valueSuffix : '°C'
                    }
                },

                //----Séies N°2----//        
                {
                    name: 'Humidité',
                    yAxis: 1,
                    data: dataserie('H'),
                    shadow: {
                        width: 5,
                        opacity: 0.2,
                        color: '#038197'
                    },
                    color: '#038197',            
                    tooltip:{
                        valueSuffix : '%'
                    }
                }]
            });
        ////////////////fin graph 1//////////////
        });


        $(function () {/////////////////////////////////// graphique Luminosité
        /////////// graph luminosité /////////////////////
            var Luminosite = Highcharts.chart('graphLuminosite', {
                chart: {
                    backgroundColor: '#313031',
                    type: 'spline',
                    marginRight: 85,
                    events: {
                    load: function () {
                        
                        var series = this.series[0];
                        setInterval(function () {
                                        ShiftTab(Luminosite);
                                        $(function(){ //attention blocage CORS donc ajout d'extention "Allow-Control-Allow-Origin: *" à chrome
                                            $.get('/dbIndex/refresh_Graphique', {},function(row){
                                                z_Lumi = row[0].Luminosite;
                                                var x =GetTime(); // current time
                                                Luminosite[9] = z_Lumi;
                                                series.addPoint([x, z_Lumi], true, true);
                                                document.getElementById("lumi").innerHTML = z_Lumi + 'lm';
                                            });
                                        });
                                    }, inter);
                        }
                    }
                    
                },

                time: {
                    useUTC: false
                },

        /////////----Legend----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                legend: {
                    itemStyle: {                // couleur et format du texte des legendes /
                        color: '#e0e0e3',
                        fontWeight: 'bold'
                    },
                    itemHoverStyle: {
                        color: '#b8b8b8'
                    }
                },
                
        /////////----Titre Graphique----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                title: {
                    text: 'Stat Info Jardin Connecté',
                    align: 'center',
                    style: {
                        color: '#e0e0e3',
                        fontWeight: 'bold'
                    }
                },

        /////////----Exporter Graphique----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                exporting: {
                    enabled: false  //enlève l'option pour exporter le graphique en format pdf, png ...
                },

        /////////----Axe des abscisse----//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 10,
                    labels: {
                        format: '{value:%H:%M:%S}',
                    }
                },

                tooltip: {
                    xDateFormat: '%d/%m/%Y <br> %H:%M:%S',
                    style: {
                        color: '#e0e0e3',  
                    },
                    borderColor: '#b8b8b8',
                    backgroundColor: '#313031',
                    shared : true
                },

        /////////----Axe des ordonné----///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                yAxis: [
                //----Axe des ordonné N°1----//
                            {
                                lineColor: '#FCC938',
                                lineWidth: 3,
                                labels: {
                                    style: {
                                        color: '#FCC938',
                                    },
                                    format : '{value} lm'
                                },
                            title: {
                                text: 'Luminosite',
                    
                                style: {
                                    color: '#FCC938',
                                    fontWeight : 'bold'
                                }
                            }
                            }
                
                        ],

        /////////----Séies----/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                series: [

                            //----Séies N°1----//
                            {
                                name: 'Luminosite',
                                yAxis: 0,
                                data: dataserie('L'),
                                shadow: {
                                    width: 5,
                                    opacity: 0.2,
                                    color: '#FCC938'
                                },
                                color: '#FCC938',
                                tooltip:{
                                    valueSuffix : 'lm'
                                }
                            }
                        ]
            });
        });

        $(function () {/////////////////////////////////// graphique Fertilite
        /////////// graph luminosité /////////////////////
            var Fertilite = Highcharts.chart('graphFertilite', {
                chart: {
                    backgroundColor: '#313031',
                    type: 'spline',
                    marginRight: 85,
                    events: {
                    load: function () {
                        
                        var series = this.series[0];
                        setInterval(function () {
                                        ShiftTab(Fertilite);
                                        $(function(){ //attention blocage CORS donc ajout d'extention "Allow-Control-Allow-Origin: *" à chrome
                                            $.get('/dbIndex/refresh_Graphique', {},function(row){
                                                z_Fert = row[0].Fertilite;
                                                var x =GetTime(); // current time
                                                Fertilite[9] = z_Fert;
                                                series.addPoint([x, z_Fert], true, true);
                                                document.getElementById("fert").innerHTML = z_Fert + '%';
                                            });
                                        });
                                    }, inter);
                        }
                    }
                    
                },

                time: {
                    useUTC: false
                },

        /////////----Legend----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                legend: {
                    itemStyle: {                // couleur et format du texte des legendes /
                        color: '#e0e0e3',
                        fontWeight: 'bold'
                    },
                    itemHoverStyle: {
                        color: '#b8b8b8'
                    }
                },
                
        /////////----Titre Graphique----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                title: {
                    text: 'Stat Info Jardin Connecté',
                    align: 'center',
                    style: {
                        color: '#e0e0e3',
                        fontWeight: 'bold'
                    }
                },

        /////////----Exporter Graphique----////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                exporting: {
                    enabled: false  //enlève l'option pour exporter le graphique en format pdf, png ...
                },

        /////////----Axe des abscisse----//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 10,
                    labels: {
                        format: '{value:%H:%M:%S}',
                    }
                },

                tooltip: {
                    xDateFormat: '%d/%m/%Y <br> %H:%M:%S',
                    style: {
                        color: '#e0e0e3',  
                    },
                    borderColor: '#b8b8b8',
                    backgroundColor: '#313031',
                    shared : true
                },

        /////////----Axe des ordonné----///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                yAxis: [
                //----Axe des ordonné N°1----//
                            {
                                lineColor: '#54A657',
                                lineWidth: 3,
                                labels: {
                                    style: {
                                        color: '#54A657',
                                    },
                                    format : '{value} lm'
                                },
                            title: {
                                text: 'Fertilite',
                    
                                style: {
                                    color: '#54A657',
                                    fontWeight : 'bold'
                                }
                            }
                            }
                
                        ],

        /////////----Séies----/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                series: [

                            //----Séies N°1----//
                            {
                                name: 'Fertilite',
                                yAxis: 0,
                                data: dataserie('F'),
                                shadow: {
                                    width: 5,
                                    opacity: 0.2,
                                    color: '#54A657'
                                },
                                color: '#54A657',
                                tooltip:{
                                    valueSuffix : 'lm'
                                }
                            }
                        ]
            });
        });
    });
});