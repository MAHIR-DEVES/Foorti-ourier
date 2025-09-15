import FloatingTab from "@/app/components/consignments/FloatingTab";
import TrackingParcel from "@/app/components/tracking-parcel/TrackingParcel";

const TrackingParcelPage = () => {
  return (
    <div>
      <div className="fixed left-1/2 transform -translate-x-1/2 top-6 z-40   hidden md:block">
        <FloatingTab />
      </div>
      <div className=" min-h-screen md:pt-8 ">
        <div className="container mx-auto  md:pb-4">
          <h1 className="text-2xl font-bold text-primary mb-5 md:mt-2 ">
            Track Parcel
          </h1>
        </div>
        <div>
          <TrackingParcel />
        </div>
      </div>
    </div>
  );
};

export default TrackingParcelPage;
