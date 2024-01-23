export default function Landing() {
  return (
    <>
      <div className="relative bg-black-200 p-10 rounded-20">
        <h1 className="p-8 bg-orange tablet:bg-violet pc:bg-red">Landing</h1>
      </div>
      <div className="absolute top-0 left-0 p-4 bg-white border border-green text-green z-modal">안녕</div>
    </>
  );
}
