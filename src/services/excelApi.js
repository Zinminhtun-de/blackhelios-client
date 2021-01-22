import * as FileSaver from "file-saver";
import moment from "moment";
import { number } from "prop-types";
const Excel = require("exceljs");
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";
const getExcelData = async ({
  title_name,
  title_A1,
  title_A2,
  csvData,
  landscape,
  width_columns,
}) => {
  var workbook = new Excel.Workbook();
  let orientation = landscape ? "landscape" : "portrait";
  var sheet = workbook.addWorksheet(title_name, {
    pageSetup: {
      fitToPage: true,
      orientation: orientation,
    },
  });

  if (csvData && csvData.length > 0) {
    let columns = Object.keys(csvData[0]).map((item) => {
      return { name: item, filterButton: false };
    });
    let rows = csvData.map((item) => {
      return Object.entries(item).map((item) => {
        return item[1];
      });
    });
    sheet.addTable({
      name: title_name,
      ref: "A3",
      columns: columns,
      rows: rows,
    });
    let table = sheet.getTable(title_name);

    sheet.mergeCells("A1:B1:C1");
    sheet.mergeCells("A2:B2:C2");
    sheet.getCell("A1").value = title_A1;
    sheet.getCell("A1").width = 18;
    sheet.getCell("A2").width = 18;
    sheet.getCell("A2").style = {
      font: { color: { argb: "black" }, size: 12, bold: true },
    };
    sheet.getColumn(1).width = 18;
    sheet.getColumn(2).width = 18;
    sheet.getCell("A1").style = {
      font: { color: { argb: "black" }, size: 12, bold: true },
    };
    const arr = [
      "A3",
      "B3",
      "C3",
      "D3",
      "E3",
      "F3",
      "G3",
      "H3",
      "I3",
      "J3",
      "K3",
      "L3",
      "M3",
      "N3",
      "O3",
      "P3",
      "Q3",
      "R3",
      "S3",
      "T3",
      "U3",
      "V3",
      "W3",
      "X3",
      "Y3",
      "Z3",
    ];
    arr.map((item, index) => {
      let point = index + 1;
      let width_column = width_columns || [];
      sheet.getCell(item).font = {
        size: 13,
        color: { argb: "black" },
        bold: true,
      };
      let correct_data = width_column.find((item) => {
        return item.position === point;
      });
      if (correct_data) {
        sheet.getColumn(correct_data.position).width = correct_data.width;
        sheet.getColumn(correct_data.position).alignment = {
          vertical: "center",
          horizontal: "center",
        };
      } else {
        sheet.getColumn(point).width = 13;
        sheet.getColumn(point).alignment = {
          vertical: "center",
          horizontal: "center",
        };
      }
    });
    sheet.getColumn(3).width = 13;
    sheet.getCell("A2").value = title_A2;

    // INITIALIZE BUFFER FOR DOWNLOADING EXCEL
    const buf = await workbook.xlsx.writeBuffer();
    const data = new Blob([buf], { type: fileType });
    return FileSaver.saveAs(data, `${title_A2}_${title_A1}` + fileExtension);
  } else {
    sheet.mergeCells("A1:B1:C1");
    sheet.mergeCells("A2:B2:C2");
    sheet.getCell("A1").value = title_A1;
    sheet.getCell("A1").width = 18;
    sheet.getCell("A2").width = 18;
    sheet.getCell("A2").style = {
      font: { color: { argb: "black" }, size: 12, bold: true },
    };
    sheet.getColumn(1).width = 18;
    sheet.getColumn(2).width = 18;
    sheet.getCell("A1").style = {
      font: { color: { argb: "black" }, size: 12, bold: true },
    };
    sheet.getColumn(3).width = 13;
    sheet.getCell("A2").value = title_A2;
    const buf = await workbook.xlsx.writeBuffer();
    const data = new Blob([buf], { type: fileType });
    return FileSaver.saveAs(data, `${title_A2}_${title_A1}` + fileExtension);
  }
};

export { getExcelData };
