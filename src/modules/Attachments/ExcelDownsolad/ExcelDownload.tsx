import { type FC } from "react";

import { useApolloClient } from "@apollo/client";

import { DOWNLOAD_EXCEL_FILE } from "../../../graphql/queries/filesQueries";

import { showToast } from "../../../utils/toastUtils";
import { errorControl } from "../../../utils/errorUtils";

const ExcelDownload: FC = () => {
  const client = useApolloClient();

  const handleQueryExcel = async (orderId: string) => {
    console.log(orderId);

    const { data: excelData, error: excelError } = await client.query({
      query: DOWNLOAD_EXCEL_FILE,
    });

    if (excelError) {
      console.log("first")
      showToast({ error: excelError });
    }

    return excelData;
  };

  const handleDownloadExcel = async (orderId: string) => {
    const excelData = await handleQueryExcel(orderId);
    console.log(excelData);
    if (excelData) {
      const link = document.createElement("a");
      link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelData.downloadExcelFile}`;
      link.download = "fileName";
      link.click();
    }
  };

  const handleTryFetchDataExcel = async (
    rowId: string
  ) => {
    try {
      await handleDownloadExcel(rowId);
    } catch (error) {
      errorControl(error);
    }
  };

  return (
    <div>
      <h1>Download your excel file :</h1>
      <button
        style={{ backgroundColor: "green", padding: "8px" }}
        onClick={() => {
          handleTryFetchDataExcel('1');
        }}
      >
        Download Excel File
      </button>
    </div>
  );
};
export default ExcelDownload;
