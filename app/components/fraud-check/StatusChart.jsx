const StatusChart = () => {
  const success = 7;
  const cancellation = 0;
  const total = success + cancellation;
  const successPercent = (success / total) * 100 || 0;

  return (
    <div className="flex flex-col items-center space-y-2 py-8">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <circle
            className="text-red-400"
            stroke="currentColor"
            strokeWidth="3.8"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
          />
          <circle
            className="text-primary-active"
            stroke="currentColor"
            strokeWidth="3.8"
            strokeDasharray={`${successPercent}, 100`}
            strokeLinecap="round"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>

      <span className="text-sm text-primary-active font-medium">Successful</span>

      <div className="flex gap-4 text-sm">
        <div className="flex items-center space-x-1 text-primary-active">
          <div className="w-3 h-3 button-primary rounded"></div>
          <span>Success: {success}</span>
        </div>
        <div className="flex items-center space-x-1 text-red-500">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Cancellation: {cancellation}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusChart;
