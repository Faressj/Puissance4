(function($) {
    
    $.fn.grid = function Game(x, y, p1_color, p2_color, name_p1, name_p2, turn) {
        z=1;
        $("#p1").html(name_p1);
        $("#p2").html(name_p2);
        var p1victory = 0;
        var p2victory = 0;

        for(i=1; i<=y; i++){
            let grid = $("#grid");
            var colonne = $(`<div class=colonne id=c` + i + ` value=empty></div>`);
            grid.append(colonne);
            for(c=1; c<=x; c++){
                var div = $(`<div class=row id=` + z + ` value=empty></div>`);
                colonne.append(div);
                z++
            }
        }
        if(x == y){
            placeWidth = (grid.offsetWidth / x);
            placeHeight = (grid.offsetHeight / y);
        }else{
            placeWidth = 100;
            placeHeight = 100;
            gridwidth = $("#grid").css("width", y*placeWidth);
            gridheight =  $("#grid").css("height", x*placeHeight);
        }
        $(".row").css({"width": placeWidth, "height": placeHeight, "background-image": "url('../images/cercle.png')","background-color": "white","clip-path": "circle(48.2% at 50% 50%)", "background-size": "cover"});
        $(".colonne").css({"width": placeWidth});
        var color;
        var game;
        color = p1_color;
        $("#tour").text("Tour : 1");
        p1 = "Victoire de " + name_p1 + ": " + p1victory;
        p2 = "Victoire de " + name_p2 + ": " + p2victory;
        $("#score").html(p1 + " <br/>"+ p2);

        const onClick = (event) => {
            //PLUGIN
            turn++;
            $("#tour").text("Tours : " + turn);
            //FIN PLUGIN
            var lignevalue = 0;
            var slash = 0;
            var antislash = 0;
            
            //PLACEMENT DES JETONS
            if(event.srcElement.className != "colonne"){
                var colonnenbr = $(event.srcElement).parent().attr('id');
                for(i=0; i<=x-1; i++){
                    var check = document.getElementById(colonnenbr);
                    check2 = check.getElementsByClassName("row");
                    check3 = check2[i];
                    divvalue = check3.getAttribute('value')
                    if(divvalue == "empty"){
                        z=i;
                    }
                }
                
                var ciblage = document.getElementById(colonnenbr);
                ciblage2 = ciblage.getElementsByClassName("row");
                ciblage3 = ciblage2[z];
                divvalue = ciblage3.getAttribute('value')
                if(divvalue =="empty"){
                    ciblage3.setAttribute('value', color)
                    $(ciblage3).css("background-color", color);
                }
                divid = ciblage3.getAttribute('id');
                dividnbr = parseInt(divid);
                modulo = divid % x;

                //TEST COLONNE
                if(modulo <=x-3 && modulo != 0){
                    var resultattest1 = document.getElementById(dividnbr+1);
                    divcolortest1 = resultattest1.getAttribute('value')
                    if(divcolortest1 == color){
                        var resultattest1 = document.getElementById(dividnbr+2);
                        divcolortest1 = resultattest1.getAttribute('value')
                        if(divcolortest1 == color){
                            var resultattest1 = document.getElementById(dividnbr+3);
                            divcolortest1 = resultattest1.getAttribute('value')
                            if(divcolortest1 == color){
                                game = 1;
                            }
                         }
                    }
                }
                //FIN TEST COLONNE

                //TEST LIGNE
                avantdernierecolonne = y-1;
                avantdernierecolonne = "c" + avantdernierecolonne;
                avantavantdernierecolonne = y-2
                avantavantdernierecolonne = "c" + avantavantdernierecolonne;

                if(colonnenbr != "c" + y){
                    casedroite = document.getElementById(dividnbr+x);
                    casedroite = casedroite.getAttribute('value');
                    if(casedroite == color){
                        lignevalue++;
                        if(colonnenbr !== avantdernierecolonne){
                            casedroite2 = document.getElementById(dividnbr+x+x);
                            casedroite2 = casedroite2.getAttribute('value');
                            if(casedroite2 ==color){
                                lignevalue++;
                                if(colonnenbr !== avantavantdernierecolonne){
                                    casedroite3 = document.getElementById(dividnbr+x+x+x);
                                    casedroite3 = casedroite3.getAttribute('value');
                                    if(casedroite3 ==color){
                                        lignevalue++;
                                    }
                                }
                            }
                        }
                    }
                }      
                premierecolonne = "c1";
                deuxiemecolonne = "c2";
                troisiemecolonne = "c3";
                if(colonnenbr != premierecolonne){
                    casegauche = document.getElementById(dividnbr-x);
                    casegauche = casegauche.getAttribute('value');
                    if(casegauche == color){
                        lignevalue++;
                        if(colonnenbr !== deuxiemecolonne){
                            casegauche2 = document.getElementById(dividnbr-x-x);
                            casegauche2 = casegauche2.getAttribute('value');
                            if(casegauche2 ==color){
                                lignevalue++;
                                if(colonnenbr !== troisiemecolonne){
                                    casegauche3 = document.getElementById(dividnbr-x-x-x);
                                    casegauche3 = casegauche3.getAttribute('value');
                                    if(casegauche3 ==color){
                                        lignevalue++;
                                    }
                                }
                            }
                        }
                    }
                }    
                if(lignevalue >=3 ){
                    game = 1;
                }
                //FIN TEST LIGNE

                //TEST DIAGONALE
                //SLASH
                if(colonnenbr != "c" + y && modulo != 1){
                    case3 = document.getElementById(dividnbr+x-1);
                    case3 = case3.getAttribute('value');
                    if(case3 == color){
                        slash++;
                        if(colonnenbr !== avantdernierecolonne && modulo !=2){
                            case33 = document.getElementById(dividnbr+x+x-2);
                            case33 = case33.getAttribute('value');
                            if(case33 ==color){
                                slash++;
                                if(colonnenbr !== avantavantdernierecolonne && modulo !=3){
                                    case333 = document.getElementById(dividnbr+x+x+x-3);
                                    case333 = case333.getAttribute('value');
                                    if(case333 == color){
                                        slash++;
                                    }
                                }
                            }
                        }
                    }
                }
                if(colonnenbr != "c1" && modulo != 0){
                    case6 = document.getElementById(dividnbr-x+1);
                    case6 = case6.getAttribute('value');
                    if(case6 == color){
                        slash++;
                        if(colonnenbr !== "c2" && modulo !=x-1){
                            case66 = document.getElementById(dividnbr-x-x+2);
                            case66 = case66.getAttribute('value');
                            if(case66 ==color){
                                slash++;
                                if(colonnenbr !== "c3" && modulo !=x-2){
                                    case666 = document.getElementById(dividnbr-x-x-x+3);
                                    case666 = case666.getAttribute('value');
                                    if(case666 == color){
                                        slash++;
                                    }
                                }
                            }
                        }
                    }
                }
                //ANTISLASH
                if(colonnenbr != "c1" && modulo != 1){
                    case1 = document.getElementById(dividnbr-x-1);
                    case1 = case1.getAttribute('value');
                    if(case1 == color){
                        antislash++;
                        if(colonnenbr !== "c2" && modulo !=2){
                            case11 = document.getElementById(dividnbr-x-x-2);
                            case11 = case11.getAttribute('value');
                            if(case11 ==color){
                                antislash++;
                                if(colonnenbr !== "c3" && modulo !=3){
                                    case111 = document.getElementById(dividnbr-x-x-x-3);
                                    case111 = case111.getAttribute('value');
                                    if(case111 == color){
                                        antislash++;
                                    }
                                }
                            }
                        }
                    }
                }      
                if(colonnenbr != "c" + y && modulo != 0){
                    case8 = document.getElementById(dividnbr+x+1);
                    case8 = case8.getAttribute('value');
                    if(case8 == color){
                        antislash++;
                        if(colonnenbr !== avantdernierecolonne && modulo !=x-1){
                            case88 = document.getElementById(dividnbr+x+x+2);
                            case88 = case88.getAttribute('value');
                            if(case88 ==color){
                                antislash++;
                                if(colonnenbr !== avantavantdernierecolonne && modulo !=x-2){
                                    case888 = document.getElementById(dividnbr+x+x+x+3);
                                    case888 = case888.getAttribute('value');
                                    if(case888 == color){
                                        antislash++;
                                    }
                                }
                            }
                        }
                    }
                }
                //FIN TEST DIAGONALE

                //VICTOIRE
                if(lignevalue >=3 || slash>=3 || antislash >=3){
                    game = 1;
                }
                m=1;
                nombredediv = x*y;
                if(game == 1){
                    if(color == p1_color){
                        alert(`Victoire pour le ` + name_p1);
                        p1victory++;
                        while(m != nombredediv+1){
                            reinitialize = document.getElementById(m);
                            reinitialize.setAttribute("value", "empty");
                            $(reinitialize).css("background-color", "white");
                            m++;
                        }
                        //REMISE à ZERO
                        p1 = "Victoire de " + name_p1 + ": " + p1victory;
                        p2 = "Victoire de " + name_p2 + ": " + p2victory;
                        $("#score").html(p1 + " <br/>"+ p2);
                        turn = 1;
                        $("#tour").text("Tours : " + turn);
                        game = 0;
                    }else{
                        alert(`Victoire pour le ` + name_p2);
                        p2victory++;
                        while(m != nombredediv+1){
                            reinitialize = document.getElementById(m);
                            reinitialize.setAttribute("value", "empty");
                            $(reinitialize).css("background-color", "white");
                            m++;
                        }
                        //REMISE à ZERO
                        p1 = "Victoire de " + name_p1 + ": " + p1victory;
                        p2 = "Victoire de " + name_p2 + ": " + p2victory;
                        $("#score").html(p1 + " <br/>"+ p2);
                        turn = 1;
                        $("#tour").text("Tours : " + turn);
                        game = 0;
                    }
                }
                if(divvalue != null && divvalue == "empty" ){
                    if(color == p1_color){
                        color = p2_color;
                    }else{
                        color = p1_color;
                    }
                }
            }
        }

        grid.addEventListener('click', onClick);
    };
})(jQuery);