class Request {

    static getInit_Graphique() {
        let sql = `SELECT Temperature, Humidite, Luminosite, Fertilite FROM Capteur ORDER BY Heure DESC LIMIT 10`;
        return sql;           
    }

    static getVitesse_Pompe() {
        let sql = "SELECT vit_pompe1, vit_pompe2, vit_pompe3, vit_pompe4 FROM Pompe";
        return sql;           
    }

    static getEtat_Pompe(){
        let sql = "SELECT Pompe1, Pompe2, Pompe3, Pompe4 FROM Pompe";
        return sql;
    }

    static getRefresh_Graphique(){
        let sql = "SELECT Temperature, Humidite, Luminosite, Fertilite FROM Capteur ORDER BY Heure DESC LIMIT 1";
        return sql;
    }

    static update(Pompe){
        let sql = Pompe;
        return sql;
    }
}
export default Request;