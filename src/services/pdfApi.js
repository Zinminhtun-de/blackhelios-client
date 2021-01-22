import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

function buildTableBody(data, columns) {
  var body = [];
  body.push(
    columns.map((column) => {
      return {
        text: column,
        style: "tableHeader",
      };
    })
  );
  data.forEach(function (row) {
    var dataRow = [];
    columns.forEach(function (column) {
      dataRow.push(row[column] ? row[column].toString() : "");
    });
    body.push(dataRow);
  });

  return body;
}

export default (rows = [], style) => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  let refinedHeaders = rows.length > 0 ? Object.keys(rows[0]) : [];
  let footTable = style.has
    ? style.footer
    : [
        {
          text: "",
          text: "",
        },
      ];
  const documentDefinition = {
    pageSize: "A4",
    pageOrientation: style.orientation || "portrait",

    content: [
      {
        text: "",
        style: "header",
        alignment: "center",
      },
      "\n",
      {
        text: "",
        style: "subheader",
        alignment: "center",
      },
      "\n",
      {
        alignment: "justify",
        style: "columnTitle",
        columns: style.column1 || [],
      },

      {
        alignment: "justify",
        style: "columnTitle",
        columns: style.column2 || [],
      },
      "\n",
      {
        text: style.title || " title",
        style: "reportTitle",
        alignment: "center",
      },
      "\n",
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          dontBreakRows: true,

          body: buildTableBody(rows, refinedHeaders),
        },
      },
      {
        table: {
          style: "tableExample",

          widths: style.widths || [400, 400],
          body: footTable,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
      },
      subheader: {
        fontSize: 11,
        margin: [0, 0, 0, 0],
      },
      columnTitle: {
        fontSize: 10,
        bold: true,
      },
      tableExample: {
        fontSize: style.size || 10,
        alignment: "right",
        margin: [0, 0, 0, 0],
      },
      reportTitle: {
        fontSize: 13,
        italics: true,
        bold: true,
      },
      tableHeader: {
        bold: true,
        fontSize: style.theader_size || 11,
        color: "black",
      },
    },
  };

  pdfMake.createPdf(documentDefinition).download(`${style.title || "file"}`);
};
