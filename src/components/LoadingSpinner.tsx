const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
    </div>
  );
};

export default LoadingSpinner;