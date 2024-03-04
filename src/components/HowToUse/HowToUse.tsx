import React from "react";
import './HowToUse.css'



const HowToUse: React.FC = () => {
  return (
    <div id="howtouse">
      <div className="textCard">
        <div className="textCardText">
          <div className="header">Rezervuokite vietą automobiliui</div>
          <div>
            Rezervacijos skiltyje pasirinkite automobilio aikštelėje palikimo ir pasiėmimo datas. Pasirinkus datas spauskite „Tikrinti užimtumą“. Jei pasirinktomis dienomis aikštelėje vietų yra - jūs išvysite rezervacijos formą ir kainą. Norint tęsti rezervaciją, jums reikės pateikti nurodytus kontaktinius duomenis ir atlikti mokėjimą.
          </div>
        </div>
        <div className="imageBox">
          Aikštelės nuotrauka
        </div>
      </div>
      <div className="textCard">
        <div className="imageBox">
          Aikštelės nuotrauka
        </div>
        <div className="textCardText">
          <div className="header">Atvykimas į aikštelę</div>
          <div>
            Atvykus prie aikštelės, privažiuokite prie įvažiavimo ženklu pažymėto pakeliamo užtvaro. Privažiavus turėsite paskambinti ant užtvaro nurodytu telefono numeriu (tuo, kurį nurodėte atliekant rezervaciją). Paskambinus, užtvaras atsidarys ir galėsite palikti automobilį laisvoje stovėjimo vietoje.
          </div>
        </div>
      </div>
      <div className="textCard">
        <div className="textCardText">
          <div className="header">Kaip pasiekti oro uostą?</div>
          <div>
            Mūsų aikštelė yra 800m nuo oro uosto (pėščiomis ~11min). Palikus automobilį, oro uostą pasiekti galite eidami tulpių arba pievų gatvėmis. Šios gatvės yra ramios, asfaltuotos ir apšviestos.
          </div>
        </div>
        <div className="imageBox">
          Aikštelės nuotrauka
        </div>
      </div>
      <div className="textCard">
        <div className="imageBox">
          Aikštelės nuotrauka
        </div>
        <div className="textCardText">
          <div className="header">Patarimas</div>
          <div>
            Jei atvykstate ne vienas, rekomenduojame prieš paliekant automobilį aikštelėje, pirmiau oro uoste išleisti keleivius su lagaminais.
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;
