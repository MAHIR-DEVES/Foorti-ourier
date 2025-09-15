
import ExpressCsvFile from "@/app/components/bulk-import/ExpressCsvFile";
import RegularCsvFile from "../../components/bulk-import/RegularCsvFile";
import FloatingTab from "../../components/consignments/FloatingTab";
const BulkImportPage = () => {
    return (
        <div>
            <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
                  <FloatingTab/>
                </div>
          <RegularCsvFile/>
          <ExpressCsvFile/>
        </div>
    );
};

export default BulkImportPage;
