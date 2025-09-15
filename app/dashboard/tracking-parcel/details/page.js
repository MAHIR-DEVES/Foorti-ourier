
'use client';
import ParcelDetails from '@/app/components/tracking-parcel/ParcelDetails';
import { useSearchParams } from 'next/navigation';

const ParcelDetailsPage = () => {
  const searchParams = useSearchParams();
  const tracking_id = searchParams.get('tracking_id');

  if (!tracking_id) {
    return (
      <div className="text-center mt-10 text-red-500">
        No tracking ID provided in query.
      </div>
    );
  }

  return <ParcelDetails tracking_id={tracking_id} />;
};

export default ParcelDetailsPage;


