export default function LoadingModal() {
  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
    >
      <div className="bg-white h-fit w-fit p-3 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
        <div className="custom-loader"></div>
      </div>
    </div>
  );
}
