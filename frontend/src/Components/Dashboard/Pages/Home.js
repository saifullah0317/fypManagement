import React from "react";
import "../home.css";
import Widget from '../widget/Widget';
import Featured from '../featured/Featured'
import Chart from "../chart/Chart";
import Table from "../table/Table";

const Home = (props) => {
  return (
    <div className="home">
      <div
        className="homeContainer"
        style={{
          width: "100%",
          height: "",
          background: "white",
        }}
      >
        <div className="widgets" style={{}}>
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Activity (Last six months)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Recent Activity</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
