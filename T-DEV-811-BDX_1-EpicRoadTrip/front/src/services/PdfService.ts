import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { Itinerary } from "../domain/itinerary";
import { Marker } from "../domain/Marker";
//import { AppStore } from "../store";

export class PDFService {
  // constructor(private readonly store: AppStore) {}

  static async generateItineraryPDF(itineraryData: Itinerary) {
    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(12);

    const startX = 20;
    let startY = 20;

    doc.text(`Nom de l'itinéraire : ${itineraryData.name}`, startX, startY);
    startY += 10;

    const markerX = 20;
    const departureY = startY + 10;
    const arrivalY = departureY + 10;

    if (itineraryData.markers && itineraryData.markers.length >= 2) {
      doc.text(`Lieux de départ : ${itineraryData.markers[0].title}`, markerX, departureY);
      doc.text(
        `Adresse: ${itineraryData.markers[0].address.streetAddress}, ${itineraryData.markers[0].address.postalCode} ${itineraryData.markers[0].address.city}`,
        markerX,
        departureY + 6
      );
      doc.text(
        `Lieux d'arrivée : ${itineraryData.markers[itineraryData.markers.length - 1].title}`,
        markerX,
        arrivalY + 6
      );
      doc.text(
        `Adresse: ${itineraryData.markers[itineraryData.markers.length - 1].address.streetAddress}, ${
          itineraryData.markers[itineraryData.markers.length - 1].address.postalCode
        } ${itineraryData.markers[itineraryData.markers.length - 1].address.city}`,
        markerX,
        arrivalY + 12
      );

      let stepY = arrivalY + 25;

      doc.text("Étapes :", markerX, stepY);

      itineraryData.markers.forEach((step: Marker, index: number) => {
        doc.text(`Étape ${index + 1} : ${step.title}`, markerX + 10, stepY + 6);
        doc.text(
          `Adresse: ${step.address.streetAddress}, ${step.address.postalCode} ${step.address.city}`,
          markerX + 10,
          stepY + 12
        );
        stepY += 20;
      });
    }
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // const mapContainer = document.getElementsByClassName("map")[0] as HTMLElement;
    // if (mapContainer) {
    //   console.log(mapContainer);
    //   const mapBounds = mapContainer.getBoundingClientRect();
    //   setTimeout(async () => {
    //     const canvas = await html2canvas(mapContainer, {
    //       x: mapBounds.x,
    //       y: mapBounds.y,
    //       width: mapBounds.width,
    //       height: mapBounds.height,
    //     });
    //     console.log(canvas);
    //     setTimeout(() => {}, 5000);
    //     const imageData = canvas.toDataURL("image/png");
    //     console.log(imageData);
    //     doc.addImage(imageData, "JPEG", startX, 60, 160, 120);
    //   }, 5000);
    // }
    doc.save("itinerary.pdf");

    // doc.output("dataurlnewwindow");
  }
}
