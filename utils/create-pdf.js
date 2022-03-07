import image from "../controller/image";
import moment from "moment";

const fs = require("fs");
const path = require("path");

const createFormSubmit = async (req, res, result) => {
  const fonts = {
    Roboto: {
      normal: "fonts/Roboto-Regular.ttf",
      bold: "fonts/Roboto-Medium.ttf",
      italics: "fonts/Roboto-Italic.ttf",
      bolditalics: "fonts/Roboto-MediumItalic.ttf",
    },
  };

  const PdfPrinter = require("pdfmake");
  const printer = new PdfPrinter(fonts);

  var doc = printer.createPdfKitDocument({
    info: {
      title: "PDF with External Image",
      author: "Matt Hagemann",
      subject: "PDF with External Image",
    },
    content: [
      {
        style: "headerStyle",
        text: "Bukti Pendaftaran",
      },
      {
        style: "headerStyle",
        text: "Seleksi Terbuka JPT Madya Sekretaris Daerah Provinsi Jawa Timur",
      },
      {
        style: "imageStyle",
        image: image.jatimLogo,
        width: 35,
      },
      {
        style: "tableExample",
        table: {
          widths: [100, 4, "*"],
          body: [
            ["Nomer Pendaftaran", ":", result?.nomer_peserta],
            ["Nama", ":", result?.nama_gelar],
            ["NIP", ":", result?.nip],
            ["Tempat Lahir", ":", result?.tempat_lahir],
            [
              "Tanggal Lahir",
              ":",
              moment(result?.tanggal_lahir).format("DD-MM-YYYY"),
            ],
            ["Alamat Email", ":", result?.alamat_email],
            ["No. HP", ":", result?.no_hp],
            ["Pendidikan Terakhir", ":", result?.pendidikan_terakhir],
            ["Tahun Lulus", ":", result?.tahun_lulus],
            ["GOL/PANGKAT", ":", result?.gol_pangkat],
            [
              "TMT PANGKAT",
              ":",
              moment(result?.tmt_pangkat).format("DD-MM-YYYY"),
            ],
            ["Jabatan Terakhir", ":", result?.jabatan_terakhir],
            ["Eselon Terakhir", ":", result?.eselon_terakhir],
            [
              "TMT Jabatan Terakhir",
              ":",
              moment(result?.tmt_jab_terakhir).format("DD-MM-YYYY"),
            ],
            ["Instansi", ":", result?.instansi],
            [
              "Pengangkatan Pertama dalam JPTP",
              ":",
              result?.tmt_pengangkatan_pertama
                ? moment(result?.tmt_pengangkatan_pertama).format("DD-MM-YYYY")
                : "",
            ],
          ],
        },
      },
      { qr: result?.nomer_peserta },
    ],
    styles: {
      headerStyle: {
        alignment: "center",
        bold: true,
      },
      tableExample: {
        fontSize: 10,
        margin: [0, 20, 0, 15],
      },
      imageStyle: {
        alignment: "center",
        margin: [0, 10, 0, 0],
      },
    },
  });

  doc.end();
  res.setHeader("Content-type", "application/pdf");
  res.setHeader("Content-disposition", 'inline; filename="Example.pdf"');
  doc.pipe(res);
};

export default {
  createFormSubmit,
};
