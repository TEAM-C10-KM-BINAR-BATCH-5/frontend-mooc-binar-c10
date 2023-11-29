import icons from "../assets/icon.png";
import DataCard from "../components/DataCard";
import Table from "../components/Table";

export default function Dashboard() {
  return (
    <>
      <DataCard />
      <div className=" mx-10 ">
        <Table />
      </div>
    </>
  );
}
