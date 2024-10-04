"use client";
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import Titleddiv from "@/components/Titleddiv";
import ReadMoreArea from "@foxeian/react-read-more";
import Servicebox from "@/components/dashboard/Servicebox";


const page = () => {
  return (
    <Layout>

<br />

     <div className="dashboard gaptransiton">
     <div className="detailpage">
  <h3 className="termtitle">Transaction Detail</h3>
  <div className="pendingtalk overview-text-subheader">
    The status of this
    transaction is still pending. Our team is diligently working to process your
    request and ensure a smooth completion. We appreciate your patience during
    this time. Rest assured, we are actively monitoring the progress and will
    notify you as soon as the transaction is finalized. Thank you for choosing
    our finance application and for your understanding.
  </div>
  <div className="detailindetail overview-text-subheader">
    <div className="topdetail">
      <div className="detailflex">
        <div className="topdet">Transaction Reference</div>
        <div className="bottomdet">2015746682</div>
      </div>
      <div className="detailflex">
        <div className="topdet">Transaction Date</div>
        <div className="bottomdet">September 19 2024</div>
      </div>
    </div>
    <div className="bottomdetail">
      <div className="detailflex">
        <div className="topdet">Payment Method</div>
        <div className="bottomdet">Card</div>
      </div>
      <div className="detailflex">
        <div className="topdet">Payment For</div>
        <div className="bottomdet">8522705266</div>
      </div>
      <div className="detailflex">
        <div className="topdet">Bank Name</div>
        <div className="bottomdet">Pnc bank</div>
      </div>
      <div className="detailflex">
        <div className="topdet">Amount</div>
        <div className="bottomdet">-10,000.0</div>
      </div>
      <div className="detailflex">
        <div className="topdet">Status</div>
        <div className="bottomdet">pending</div>
      </div>
    </div>
  </div>
</div>


</div>
    </Layout>
  )
}

export default page