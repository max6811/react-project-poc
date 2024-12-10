import { gql } from "@apollo/client";

export const DOWNLOAD_EXCEL_FILE = gql`
  query Query {
    downloadExcelFile
  }
`;
