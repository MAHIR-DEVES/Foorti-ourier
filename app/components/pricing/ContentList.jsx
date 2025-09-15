import { FaCheckSquare } from 'react-icons/fa';

const ContentList = () => {
  const items = [
    'পিক এন্ড ড্রপ সার্ভিসের ন্যূনতম চার্জ ৮০ টাকা প্রযোজ্য',
    '১% ক্যাশ অন ডেলিভারি ও রিক ম্যাসেজমেন্ট চার্জ প্রযোজ্য',
    'পার্সেল সাইজের কারণে ডেলিভারি সময়কাল পরিবর্তিত হতে পারে',
    'উচ্চ ডার্মসুম্ভ ভ্যাট ও ট্যারিফ ব্যাতিক',
    'অনাকাঙ্ক্ষিত কারণবশত ডেলিভারি সময়ের পরিবর্তন হতে পারে'
  ];

  return (
    <div className="space-y-4 p-4 md:p-8 ">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <FaCheckSquare className="text-primary-active mt-1 text-xl" />
          <p className="text-secondary">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
