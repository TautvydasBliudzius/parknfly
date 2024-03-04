import React from "react";
import { useNavigate } from "react-router-dom";
import './Rules.css'



const Rules: React.FC = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate("/")
  }
  return (
    <div id="rules">
      <div id="rulesContainer">
        <h1>Paslaugos naudojimosi taisyklės</h1>
        <h3>1. BENDRA INFORMACIJA</h3>
        <p>1.1 Šios taisyklės galioja paslaugos „FLYParking“ aikštelės rezervacijai, atliekamai interneto svetainėje
          www.flyparking.lt.</p>
        <p>1.2 Aikštelės adresas Dariaus ir Girėno g. 71, Vilnius.</p>
        <p>1.3 Paslaugos teikėjas yra UAB „Naujasis sostapilis“ (toliau – Teikėjas).</p>
        <p>1.4 Paslaugos užakovas – (toliau Klientas).</p>
        <p>1.5 Kilus klausimams, prašome kreiptis e.p. info@flyparking.lt arba tel. +370 620 82222.</p>
        <h3>2. UŽSAKYMŲ, ATSISKAITYMO IR UŽSAKYMŲ KEITIMO SĄLYGOS</h3>
        <p>2.1 Vieta parkavimo aikštelėje rezervuojama interneto svetainėje www.flyparking.lt. Rezervacija įsigalioja gavus jos patvirtinimą elektroniniu paštu.</p>
        <p>2.2 Minimalus automobilio parkavimo paslaugos užsakymas – 1 para.</p>
        <p>2.3 Automobilio parkavimo mokesčio dydis priklauso nuo parkavimo trukmės ir aikštelės užpildymo.</p>
        <p>2.4 Interneto svetainėje paskaičiuojama parkavimo kaina yra galutinė ir apima visus mokesčius. Visos paslaugų kainos nurodytos eurais, įskaitant PVM.</p>
        <p>2.5 Atsiskaityti už paslaugas galima per elektroninę bankininkystę, pildant rezervacijos paraišką, arba automobilio parkavimo metu kasoje grynaisiais pinigais arba banko mokėjimo kortele.</p>
        <p>2.6 Klientas įsipareigoja laikytis rezervacijos paraiškoje nurodytų terminų (automobilio parkavimo pradžios ir pabaigos laiko).</p>
        <p>2.7 Faktiniam automobilio parkavimo laikui viršyjus nurodytąjį rezervacijos paraiškoje, Klientas privalo padengti skirtumą, atsiskaitydamas su Teikėju pagal tuo metu galiojančius tarifus.</p>
        <p>2.8 Keisti/ atšaukti rezervaciją ir susigrąžinti sumokėtus pinigus galima tik likus daugiau nei parai (24 val.) iki rezervacijos paraiškoje numatyto automobilio parkavimo laiko. Likus 24 val., keisti/atšaukti rezervacijos nebegalima, pinigai nebus grąžinami.</p>
        <h3>3. ŠALIŲ ATSAKOMYBĖS</h3>
        <p>3.1 Klientas privalo tvarkingai parkuoti automobilį, vadovaudamasis automobilio statymo taisyklėmis.</p>
        <p>3.2 Klientas, apgadinęs svetimą turtą nuomos laikotarpiu, prisiima pilną atsakomybę dėl tokio turto apgadinimo</p>
        <p>3.3 Teikėjas neatsako už automobilių ir juose paliktų daiktų saugumą</p>
        <h3>4. SKUNDAI</h3>
        <p>Visi skundai turi būti pateikti UAB „Naujasis sostapilis“ adresu M. Daukšos 8/6, Vilnius arba el. paštu info@flyparking.lt</p>
        <h3>5. REGLAMENTUOJANTYS TEISĖS AKTAI</h3>
        <p>5.1 Bet koks ginčas ar nesutarimas dėl šios Sutarties ir/ar susijęs su ja, kuris per 30 (trisdešimt) dienų nuo vienos
          Šalies pareikšto reikalavimo dėl įsipareigojimų vykdymo neišsprendžiamas derybų keliu, turi būti sprendžiamas Lietuvos Respublikos norminių aktų nustatyta tvarka pagal tiekėjo buveinės adresą.</p>
        <p>5.2 Šiai Sutarčiai taikomi ir ji aiškinama pagal galiojančius Lietuvos Respublikos įstatymus.</p>
        <button onClick={goBack}>Grįžti į pagrindinį</button>
      </div>
    </div>
  );
}

export default Rules;
